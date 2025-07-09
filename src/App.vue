<script setup>
import { onMounted, ref } from 'vue';
import lavaLamp from './lavaLamp.vue';
import glsl_tutorial from './glsl_tutorial.vue';
import avatarImage from '@/assets/selfie.png';
</script>

<template>
  <v-app>
    <lava-lamp class="background-webgl" />
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item :prepend-avatar="avatarImage" subtitle="102silencer@gmail.com"
          title="顏珖宇"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="navigation-list">
        <v-list-item title="簡介" value="aboutme">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="經歷" value="experience">
          <template v-slot:prepend>
            <v-icon>mdi-book-account</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="比賽" value="contest">
          <template v-slot:prepend>
            <v-icon>mdi-medal</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <div class="content">
        <h1 class="main-title">顏珖宇</h1>
      </div>
    </v-main>
  </v-app>
</template>

<style>
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
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.main-title {
  color: aqua;
  font-size: 4rem;
  font-family: Arial, sans-serif;
  pointer-events: auto;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
}
</style>
