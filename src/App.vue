<template>
  <lava-lamp :dark-mode="themeStore.isDark" class="background-webgl" />
  <button @click="themeStore.toggleTheme" class="theme-toggle">
    {{ themeStore.themeIcon }}
  </button>
  <div class="navigation-drawer">
    <div class="list-title">
      <img :src="avatarImage" class="image-icon"/>
      basic info
    </div>
    <divider :parent-padding="10" />
  </div>

  <!-- <v-navigation-drawer expand-on-hover :theme="themeStore.themeMode">
      <v-list>
        <div class="bookmark">
          <v-list-item :prepend-avatar="avatarImage" subtitle="102silencer@gmail.com" title="顏珖宇"></v-list-item>
          <svg data-name="Layer 2" viewBox="0 0 628.48 488.77" xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 1">
              <path stroke="red" fill="white" class="cls-1"
                d="m627.61 0.5h-627.11s0 487.34 0 487.34l627.11 0.43-139.77-243.88v0l139.77-243.89z" />
            </g>
          </svg>
        </div>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="navigation-list">
        <v-list-item title="簡介" value="aboutme" @click="handleNavClick('About Me clicked')">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
</v-list-item>
<v-list-item title="經歷" value="experience" @click="handleNavClick('Experience clicked')">
  <template v-slot:prepend>
            <v-icon>mdi-book-account</v-icon>
          </template>
</v-list-item>
<v-list-item title="比賽" value="contest" @click="handleNavClick('Contest clicked')">
  <template v-slot:prepend>
            <v-icon>mdi-medal</v-icon>
          </template>
</v-list-item>
</v-list>
</v-navigation-drawer> -->

  <div class="content">
    <h1 class="main-title">顏珖宇</h1>
    <p>在名為人生的遊戲中努力增加自己籌碼的人</p>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, onUnmounted } from 'vue';
import lavaLamp from './lavaLamp.vue';
import glsl_tutorial from './glsl_tutorial.vue';
import avatarImage from '@/assets/selfie.png';
import { useThemeStore } from '@/stores/theme';
import divider from './components/ui/divider.vue';

// Use the theme store
const themeStore = useThemeStore();

</script>

<style>
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

.navigation-drawer {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 1;
  width: 15%;
  height: 100vh;
  background-color: var(--bg-secondary);
  padding: 15px 10px 15px 10px;
  border-right: 1px solid var(--border-color);
}

.navigation-drawer .list-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: bold;
  display: flex;
}

.navigation-drawer .list-title .image-icon {
  border-radius: 50%;
  width: 50px;
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

.bookmark {
  background-color: red;
}

.theme-toggle:hover {
  background-color: var(--accent-color) !important;
  transform: scale(1.1) !important;
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
</style>
