<template>
  <div class="lava-lamp-container">
    <canvas ref="canvasRef" class="background"></canvas>
    <canvas ref="flowCanvasRef" style="position: absolute; top:0; left:0; pointer-events: none;"></canvas>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref(null);
const flowCanvasRef = ref(null);

onMounted(() => {
  const lavaLamp = new OptimizedLavaLamp();
  window.lavaLamp = lavaLamp; // Expose for debugging
});

onUnmounted(() => {
  if (window.lavaLamp) {
    window.lavaLamp = null; // Clean up reference
  }
});
class OptimizedLavaLamp {
  constructor() {
    this.canvas = canvasRef.value;
    this.flowCanvas = flowCanvasRef.value;
    this.flowCtx = this.flowCanvas.getContext('2d');
    this.showFlowField = false;
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    this.animationID = null;
    this.isDestroyed = false;

    if (!this.gl) {
      alert('WebGL not supported! Falling back to canvas method...');
      this.fallbackToCanvas();
      return;
    }

    this.metaballs = [];
    this.flowField = [];
    this.time = 0;
    this.lastTime = 0;
    this.fps = 0;
    this.frameCount = 0;

    this.resize();
    this.initWebGL();
    this.createMetaballs(8);
    this.setupFlowField();
    this.animate();

    // Event listeners
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('click', (e) => this.addMetaball(e));
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  initWebGL() {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, `
                        attribute vec2 a_position;
                        varying vec2 v_texCoord;
    
                        void main() {
                            gl_Position = vec4(a_position, 0.0, 1.0);
                            v_texCoord = (a_position + 1.0) * 0.5;
                        }
                    `);

    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, `
                        precision highp float;
    
                        uniform vec2 u_resolution;
                        uniform float u_time;
                        uniform vec3 u_metaballs[16]; // x, y, radius
                        uniform vec3 u_colors[16];    // hue as vec3 for easier processing
                        uniform int u_count;
    
                        varying vec2 v_texCoord;
    
                        vec3 hsv2rgb(vec3 c) {
                            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                        }
    
                        void main() {
                            vec2 pos = v_texCoord * u_resolution;
                            float sum = 0.0;
                            vec3 colorSum = vec3(0.0);
                            float weightSum = 0.0;
    
                            // Calculate metaball influences
                            for(int i = 0; i < 16; i++) {
                                if(i >= u_count) break;
    
                                vec2 ballPos = u_metaballs[i].xy;
                                float radius = u_metaballs[i].z;
    
                                float dist = distance(pos, ballPos);
                                if(dist > 0.0) {
                                    float influence = (radius * radius) / (dist * dist);
                                    sum += influence;
    
                                    // Weight colors by influence
                                    colorSum += u_colors[i] * influence;
                                    weightSum += influence;
                                }
                            }
                            sum  = clamp(sum, 0.0, 15.0);
                            if(sum > 1.0) {
                                // Calculate average color
                                vec3 avgColor = weightSum > 0.0 ? colorSum / weightSum : vec3(0.8, 0.8, 0.9);
    
                                // Create intensity-based effects
                                float intensity = smoothstep(1.0, 4.0, sum);
                                float saturation = mix(0.6, 0.9, intensity / 3.0);
                                float brightness = mix(0.7, 1.0, intensity / 3.0);
                                float alpha = mix(0.3, 1.0, intensity / 3.0);
    
                                vec3 finalColor = hsv2rgb(vec3(avgColor.x, saturation, brightness));
                                gl_FragColor = vec4(finalColor, alpha);
                            } else {
                                float fadeAlpha = smoothstep(0.5, 1.0, sum);
                                gl_FragColor = vec4(0.0, 0.0, 0.0, fadeAlpha * 0.1);
                            }
                        }
                    `);

    this.program = this.createProgram(vertexShader, fragmentShader);

    // Create quad for full screen
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.timeUniformLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.metaballsUniformLocation = this.gl.getUniformLocation(this.program, 'u_metaballs');
    this.colorsUniformLocation = this.gl.getUniformLocation(this.program, 'u_colors');
    this.countUniformLocation = this.gl.getUniformLocation(this.program, 'u_count');

    this.gl.enableVertexAttribArray(this.positionAttributeLocation);
    this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program linking error:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  createMetaballs(count) {
    this.metaballs = [];
    for (let i = 0; i < count; i++) {
      this.metaballs.push({
        prevX: 0,
        prevY: 0,
        prevRadius: 0,
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 40 + Math.random() * 80,
        baseRadius: 40 + Math.random() * 80,
        hue: 260 + Math.random() * 60, // Purple to magenta
        pulseSpeed: 0.01 + Math.random() * 0.02,
        flowStrength: 0.3 + Math.random() * 0.7
      });
    }
  }

  setupFlowField() {
    const cols = Math.floor(this.canvas.width / 20) + 1;
    const rows = Math.floor(this.canvas.height / 20) + 1;
    this.flowField = [];

    for (let i = 0; i < cols * rows; i++) {
      this.flowField[i] = { x: 0, y: 0 };
    }

    this.flowCols = cols;
    this.flowRows = rows;
  }

  updateFlowField() {
    const inc = 0.02;
    let yoff = 0;

    for (let y = 0; y < this.flowRows; y++) {
      let xoff = 0;
      for (let x = 0; x < this.flowCols; x++) {
        const index = x + y * this.flowCols;
        const angle = this.noise(xoff, yoff, this.time * 0.003) * Math.PI * 4;
        this.flowField[index] = {
          x: Math.cos(angle) * 0.5,
          y: Math.sin(angle) * 0.5
        };
        xoff += inc;
      }
      yoff += inc;
    }
  }

  drawFlowField() {
    if (!this.showFlowField) {
      this.flowCtx.clearRect(0, 0, this.flowCanvas.width, this.flowCanvas.height);
      return;
    }

    this.flowCtx.clearRect(0, 0, this.flowCanvas.width, this.flowCanvas.height);
    this.flowCtx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
    this.flowCtx.lineWidth = 1;

    const gridSize = 20;
    for (let y = 0; y < this.flowRows; y++) {
      for (let x = 0; x < this.flowCols; x++) {
        const index = x + y * this.flowCols;
        const flowVector = this.flowField[index];

        if (flowVector) {
          const centerX = x * gridSize + gridSize / 2;
          const centerY = y * gridSize + gridSize / 2;

          const endX = centerX + flowVector.x * 15;
          const endY = centerY + flowVector.y * 15;

          // Draw arrow
          this.flowCtx.beginPath();
          this.flowCtx.moveTo(centerX, centerY);
          this.flowCtx.lineTo(endX, endY);
          this.flowCtx.stroke();

          // Draw arrowhead
          const angle = Math.atan2(flowVector.y, flowVector.x);
          const arrowSize = 3;

          this.flowCtx.beginPath();
          this.flowCtx.moveTo(endX, endY);
          this.flowCtx.lineTo(
            endX - arrowSize * Math.cos(angle - Math.PI / 6),
            endY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          this.flowCtx.moveTo(endX, endY);
          this.flowCtx.lineTo(
            endX - arrowSize * Math.cos(angle + Math.PI / 6),
            endY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          this.flowCtx.stroke();
        }
      }
    }
  }

  updateMetaballs() {
    this.metaballs.forEach(ball => {
      ball.prevX = ball.x !== undefined ? ball.x : ball.prevX;
      ball.prevY = ball.y !== undefined ? ball.y : ball.prevY;
      ball.prevRadius = ball.radius !== undefined ? ball.radius : ball.prevRadius;
      // Follow flow field
      const col = Math.floor(ball.x / 20);
      const row = Math.floor(ball.y / 20);
      const index = col + row * this.flowCols;

      // Add boundary checks for flow field
      if (col >= 0 && col < this.flowCols && row >= 0 && row < this.flowRows) {
        const index = col + row * this.flowCols;
        if (this.flowField[index]) {
          ball.vx += this.flowField[index].x * ball.flowStrength;
          ball.vy += this.flowField[index].y * ball.flowStrength;
        }
      }


      // Apply some damping
      ball.vx *= 0.95;
      ball.vy *= 0.95;

      // Limit speed
      const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
      if (speed > 2) {
        ball.vx = (ball.vx / speed) * 2;
        ball.vy = (ball.vy / speed) * 2;
      }

      const smoothingFactor = 0.1;
      ball.prevX = ball.x;
      ball.prevY = ball.y;

      // Update position
      ball.x += ball.vx;
      ball.y += ball.vy;

      ball.x = ball.prevX + (ball.x - ball.prevX) * (1.0 - smoothingFactor);
      ball.y = ball.prevY + (ball.y - ball.prevY) * (1.0 - smoothingFactor);

      // Replace the wrapping section with bouncing:
      const margin = ball.radius;

      if (ball.x <= margin) {
        ball.x = margin;
        ball.vx = Math.abs(ball.vx) * 0.8; // Bounce with some energy loss
      }
      if (ball.x >= this.canvas.width - margin) {
        ball.x = this.canvas.width - margin;
        ball.vx = -Math.abs(ball.vx) * 0.8;
      }
      if (ball.y <= margin) {
        ball.y = margin;
        ball.vy = Math.abs(ball.vy) * 0.8;
      }
      if (ball.y >= this.canvas.height - margin) {
        ball.y = this.canvas.height - margin;
        ball.vy = -Math.abs(ball.vy) * 0.8;
      }

      // Pulse radius
      ball.prevRadius = ball.radius;
      const newRadius = ball.baseRadius + Math.sin(this.time * ball.pulseSpeed) * 15;
      ball.radius = ball.prevRadius + (newRadius - ball.prevRadius) * 0.1;
      // ball.radius = ball.baseRadius + Math.sin(this.time * ball.pulseSpeed) * 20;

      // Occasionally change hue slightly (no need for performance)
      // if (Math.random() < 0.01) {
      //     ball.hue += (Math.random() - 0.5) * 20;
      //     ball.hue = Math.max(260, Math.min(320, ball.hue));
      // }
    });
  }

  render() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);

    // Set uniforms
    this.gl.uniform2f(this.resolutionUniformLocation, this.canvas.width, this.canvas.height);
    this.gl.uniform1f(this.timeUniformLocation, this.time);
    this.gl.uniform1i(this.countUniformLocation, this.metaballs.length);

    // Prepare metaball data
    const metaballData = new Float32Array(48); // 16 * 3
    const colorData = new Float32Array(48);    // 16 * 3

    for (let i = 0; i < Math.min(this.metaballs.length, 16); i++) {
      const ball = this.metaballs[i];
      metaballData[i * 3] = ball.x;
      metaballData[i * 3 + 1] = ball.y;
      metaballData[i * 3 + 2] = ball.radius;

      colorData[i * 3] = ball.hue / 360;
      colorData[i * 3 + 1] = 0.8;
      colorData[i * 3 + 2] = 0.9;
    }

    this.gl.uniform3fv(this.metaballsUniformLocation, metaballData);
    this.gl.uniform3fv(this.colorsUniformLocation, colorData);

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

  animate() {
    if (this.isDestroyed) return;
    try {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;
      this.time = currentTime * 0.001;

      // Update FPS
      this.frameCount++;
      // if (this.frameCount % 60 === 0) {
      //   this.fps = Math.round(1000 / deltaTime);
      //   document.getElementById('fps').textContent = `FPS: ${this.fps}`;
      // }

      this.updateFlowField();
      this.updateMetaballs();
      this.render();
      this.drawFlowField();

      this.animationID = requestAnimationFrame(() => this.animate());
    } catch (error) {
      console.error('Animation error:', error);
      this.destroy(); // Clean up resources
    }
  }

  destroy() {
    this.isDestroyed = true;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Remove event listeners safely
    try {
      window.removeEventListener('resize', this.resizeHandler);
      if (this.canvas) {
        this.canvas.removeEventListener('click', this.clickHandler);
      }
      document.removeEventListener('keydown', this.keyHandler);
    } catch (e) {
      console.warn('Error removing event listeners:', e);
    }

    // Clean up WebGL resources
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }

    // Clear references
    this.canvas = null;
    this.gl = null;
    this.metaballs = [];
    this.flowField = [];
  }

  // Simple noise function (simplified Perlin noise)
  noise(x, y, z = 0) {
    return (Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453) % 1;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.flowCanvas.width = window.innerWidth;
    this.flowCanvas.height = window.innerHeight;

    this.setupFlowField();
  }

  addMetaball(e) {
    if (this.metaballs.length < 16) {
      const rect = this.canvas.getBoundingClientRect();
      this.metaballs.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 40 + Math.random() * 80,
        baseRadius: 40 + Math.random() * 80,
        hue: 260 + Math.random() * 60,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        flowStrength: 0.3 + Math.random() * 0.7
      });
    }
  }

  handleKeyPress(e) {
    switch (e.key.toLowerCase()) {
      case 'r':
        this.createMetaballs(8);
        break;
      case 'f':
        this.showFlowField = !this.showFlowField;
        if (!this.showFlowField) {
          this.flowCtx.clearRect(0, 0, this.flowCanvas.width, this.flowCanvas.height);
        }
        break;
      case '+':
      case '=':
        if (this.metaballs.length < 16) {
          this.metaballs.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 40 + Math.random() * 80,
            baseRadius: 40 + Math.random() * 80,
            hue: 260 + Math.random() * 60,
            pulseSpeed: 0.01 + Math.random() * 0.02,
            flowStrength: 0.3 + Math.random() * 0.7
          });
        }
        break;
      case '-':
        if (this.metaballs.length > 2) {
          this.metaballs.pop();
        }
        break;
      // case 's':
      //   this.saveImage();
      //   break;
    }
  }

  saveImage() {
    const link = document.createElement('a');
    link.download = 'lava-lamp.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  fallbackToCanvas() {
    // Fallback implementation for non-WebGL browsers
    console.log('Implementing canvas fallback...');
    // You could implement the original canvas version here as a fallback
  }
}
</script>

<style scoped>
#fps {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
}

.lava-lamp-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  background-color: #000000;
  z-index: 0;
}

#controls {
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 10;
}
</style>