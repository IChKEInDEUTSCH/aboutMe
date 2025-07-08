<script setup>
import { onMounted, ref } from 'vue';
import lavaLamp from './lavaLamp.vue';
import glsl_tutorial from './glsl_tutorial.vue';
</script>

<template>
  <header>
    <title>Ryan Gan</title>
  </header>

  <!-- <lava-lamp /> -->
   <glsl_tutorial/>
</template>

<style>
#app {
  padding: 0 0 0 0;
}

@media (min-width: 1024px) {
  body{
    max-width: 100%;
    max-height: 100%;
  }
  #app {
    max-width: 100%;
    max-height: 100%;
  }
  header{
    display: none;
  }
}
</style>
