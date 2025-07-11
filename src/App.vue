<template>
  <v-app>
    <lava-lamp :dark-mode="themeStore.isDark" class="background-webgl" />
    <v-btn @click="themeStore.toggleTheme" class="theme-toggle">
      {{ themeStore.themeIcon }}
    </v-btn>
    <v-navigation-drawer expand-on-hover rail :theme="themeStore.themeMode">
      <v-list>
        <v-list-item :prepend-avatar="avatarImage" subtitle="102silencer@gmail.com" title="顏珖宇"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="navigation-list">
        <v-list-item title="簡介" value="aboutme" @click="console.log('About Me clicked')">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="經歷" value="experience" @click="console.log('Experience clicked')">
          <template v-slot:prepend>
            <v-icon>mdi-book-account</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="比賽" value="contest" @click="console.log('Contest clicked')">
          <template v-slot:prepend>
            <v-icon>mdi-medal</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="content">
        <h1 class="main-title">顏珖宇</h1>
        <p>在名為人生的遊戲中努力增加自己籌碼的人</p>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import lavaLamp from './lavaLamp.vue';
import glsl_tutorial from './glsl_tutorial.vue';
import avatarImage from '@/assets/selfie.png';
import { useThemeStore } from '@/stores/theme';

// Use the theme store
const themeStore = useThemeStore();

// Initialize Vuetify theme after component is mounted
onMounted(() => {
  themeStore.initVuetifyTheme();
});
</script>

<style>
/* Theme CSS Variables */
:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --accent-color: #4981bd;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

:root.theme-dark {
  /* Dark theme */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #aaaaaa;
  --accent-color: #4fd1c7;
  --border-color: #333333;
  --shadow-color: rgba(255, 255, 255, 0.1);
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.background-webgl {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 0 !important;
}

/* Override any canvas styles from the child component */
.background-webgl canvas {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 0 !important;
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  pointer-events: none;
}

.main-title {
  color: var(--text-primary);
  font-size: 4rem;
  font-family: Arial, sans-serif;
  pointer-events: auto;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 4px var(--shadow-color);
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.content p {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  pointer-events: auto;
  text-align: center;
  margin-top: 0.1rem;
  text-shadow: 1px 1px 2px var(--shadow-color);
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.theme-toggle {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 1000 !important;
  min-width: 56px !important;
  min-height: 56px !important;
  padding: 0 !important;
  border-radius: 50% !important;
  font-size: 1.5rem !important;
  background-color: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border: 2px solid var(--border-color) !important;
  box-shadow: 0 4px 8px var(--shadow-color) !important;
  transition: all 0.2s ease !important;
}

.theme-toggle:hover {
  background-color: var(--accent-color) !important;
  transform: scale(1.1) !important;
}

/* Navigation drawer - let Vuetify handle the theming */
.v-navigation-drawer {
  transition: all 0.2s ease !important;
}

/* Optional: Add subtle custom styling that works with both themes */
.v-list-item:hover {
  transform: translateX(4px) !important;
  transition: transform 0.2s ease !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .content p {
    font-size: 1rem;
  }

  .theme-toggle {
    top: 15px !important;
    right: 15px !important;
    width: 48px !important;
    height: 48px !important;
    font-size: 1.2rem !important;
  }
}

/* Media query based theme preferences (fallback) */
@media (prefers-color-scheme: dark) {
  :root:not(.theme-light) {
    --bg-primary: #121212;
    --bg-secondary: #1e1e1e;
    --text-primary: #ffffff;
    --text-secondary: #aaaaaa;
    --accent-color: #4fd1c7;
    --border-color: #333333;
    --shadow-color: rgba(255, 255, 255, 0.1);
  }
}

@media (prefers-color-scheme: light) {
  :root:not(.theme-dark) {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #000000;
    --text-secondary: #666666;
    --accent-color: #007bff;
    --border-color: #e0e0e0;
    --shadow-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
