<template>
  <canvas ref="canvasRef" class="tutorial_canvas"></canvas>
  <div id="ui">
    <div ref="x_scroll"></div>
    <div ref="y_scroll"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import fragmentShaderSource from './glsl/fragment/tutorial_frag.frag?raw';
import vertexShaderSource from './glsl/vertex/tutorial_vert.vert?raw';
import WebGLUtils from './glsl/utils/webglUtils.js';
import UICreator from './UICreator.js';

const canvasRef = ref(null);
const x_scroll = ref(null);
const y_scroll = ref(null);
const webglUtils = new WebGLUtils();
const uiCreator = new UICreator();

let translation = [0, 0];
let width = 100;
let height = 30;
let color = [Math.random(), Math.random(), Math.random(), 1];

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]), gl.STATIC_DRAW);
}


onMounted(() => {
  let canvas = canvasRef.value;
  let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    alert('WebGL not supported');
  }

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // three 2d points
  // var positions = [
  //     10, 20,
  //     80, 20,
  //     10, 30,
  //     10, 30,
  //     80, 20,
  //     80, 30,
  // ];
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.enableVertexAttribArray(positionAttributeLocation);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var colorUniformLocation = gl.getUniformLocation(program, "u_color");

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)
  // for (var ii = 0; ii < 50; ++ii) {
  //     // Setup a random rectangle
  //     // This will write to positionBuffer because
  //     // its the last thing we bound on the ARRAY_BUFFER
  //     // bind point
  //     setRectangle(
  //         gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

  //     // Set a random color.
  //     gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

  //     // Draw the rectangle.
  //     gl.drawArrays(gl.TRIANGLES, 0, 6);
  // }
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Setup a rectangle
    setRectangle(gl, translation[0], translation[1], width, height);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorUniformLocation, color);

    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
  
  // Create sliders using UIcreator with refs
  uiCreator.createSlider(x_scroll, {
    id: 'X_scroll',
    min: 0,
    max: gl.canvas.width,
    step: 1,
    value: translation[0],
    label: 'X',
    onChange: (value) => {
      translation[0] = value;
      drawScene();
    }
  });

  uiCreator.createSlider(y_scroll, {
    id: 'Y_scroll',
    min: 0,
    max: gl.canvas.height,
    step: 1,
    value: translation[1],
    label: 'Y軸',
    onChange: (value) => {
      translation[1] = value;
      drawScene();
    }
  });
  
  drawScene();
})

</script>
<style>
.tutorial_canvas {
  position: fixed ;
  top: 0 ;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  background-color: #ffffff;
  z-index: 0;
}

#ui {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-family: Arial, sans-serif;
  pointer-events: auto;
}

.slider-wrapper {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.slider-wrapper label {
  font-size: 14px;
  font-weight: bold;
}

.slider {
  width: 200px;
  margin: 5px 0;
}

.slider-value {
  font-size: 12px;
  color: #ccc;
  text-align: center;
  min-width: 40px;
}
</style>