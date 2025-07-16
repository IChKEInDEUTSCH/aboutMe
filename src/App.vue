<template>
  <lava-lamp :dark-mode="themeStore.isDark" class="background-webgl" />
  <button @click="themeStore.toggleTheme" class="theme-toggle">
    {{ themeStore.themeIcon }}
  </button>
  <div class="navigation-drawer">
    <div class="list-title">
      <img :src="avatarImage" class="image-icon" />
      basic info
    </div>
    <divider :parent-padding="10" />
    <div class="list-item" @click="navigateToHome" :class="{ active: $route.path === '/' }">
      <v-icon scale="2" name="gi-house" />首頁
    </div>
    <div class="list-item" @click="navigateToInfo" :class="{ active: $route.path === '/info' }">
      <v-icon scale="2" name="gi-info" />簡介
    </div>
    <div class="list-item" @click="navigateToExperience" :class="{ active: $route.path === '/experience' }">
      <v-icon scale="2" name="gi-sands-of-time" />經歷
    </div>
    <div class="list-item" @click="navigateToContest" :class="{ active: $route.path === '/contest' }">
      <v-icon scale="2" name="gi-trophy" />比賽
    </div>
    <div class="list-item" @click="navigateToPortfolio" :class="{ active: $route.path === '/portfolio' }">
      <v-icon scale="2" name="gi-full-folder" />作品
    </div>
  </div>

  <div class="main-content">
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import lavaLamp from '@/lavaLamp.vue';
import avatarImage from '@/assets/selfie.png';
import { useThemeStore } from '@/stores/theme';
import divider from '@/components/ui/divider.vue';

// Use the theme store
const themeStore = useThemeStore();

// Use Vue Router
const router = useRouter();

// Navigation functions
const navigateToHome = () => {
  router.push('/');
};

const navigateToInfo = () => {
  router.push('/info');
};

const navigateToExperience = () => {
  router.push('/experience');
};

const navigateToContest = () => {
  router.push('/contest');
};

const navigateToPortfolio = () => {
  router.push('/portfolio');
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
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

.navigation-drawer .list-item {
  display: flex;
  align-items: center;
  margin: 5px 0 5px 0;
  font-size: 1.2rem;
  height: calc(5%);
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

.navigation-drawer .list-item:hover {
  background-color: var(--accent-color);
  cursor: pointer;
}

.navigation-drawer .list-item.active {
  background-color: var(--accent-color);
  font-weight: bold;
}

.navigation-drawer .list-title .image-icon {
  border-radius: 50%;
  width: 50px;
}

.background-webgl {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
}

.main-content {
  margin-left: 15%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  background-color: rgba(var(--bg-primary-rgb), 0.9);
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  min-width: 56px;
  min-height: 56px;
  padding: 0;
  border-radius: 50%;
  font-size: 1.5rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 8px var(--shadow-color);
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: var(--accent-color) !important;
  transform: scale(1.1) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .navigation-drawer {
    width: 20%;
  }

  .main-content {
    margin-left: 20%;
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
