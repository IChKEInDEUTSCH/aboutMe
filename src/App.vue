<template>
  <lava-lamp :dark-mode="themeStore.isDark" class="background-webgl" />
  <button @click="themeStore.toggleTheme" class="theme-toggle">
    {{ themeStore.themeIcon }}
  </button>
  <div class="drawers">
    <input type="checkbox" id="drawer-toggle" class="drawer-toggle" ref="drawerToggle">
    <div class="navigation-drawer">
      <div class="list-title">
        <img :src="avatarImage" class="image-icon" />
        <div class="title-info">
          <div>顏珖宇</div>
          <div>102silencer@gmail.com</div>
        </div>
      </div>
      <divider :parent-padding="10" />
      <div class="list-item" @click="navigateToHome" :class="{ active: $route.path === '/' }">
        <v-icon scale="2" name="gi-house" />
        <div>首頁</div>
      </div>
      <div class="list-item" @click="navigateToInfo" :class="{ active: $route.path === '/info' }">
        <v-icon scale="2" name="gi-info" />
        <div>簡介</div>
      </div>
      <div class="list-item" @click="navigateToExperience" :class="{ active: $route.path === '/experience' }">
        <v-icon scale="2" name="gi-sands-of-time" />
        <div>經歷</div>
      </div>
      <div class="list-item" @click="navigateToContest" :class="{ active: $route.path === '/contest' }">
        <v-icon scale="2" name="gi-trophy" />
        <div>比賽</div>
      </div>
      <div class="list-item" @click="navigateToPortfolio" :class="{ active: $route.path === '/portfolio' }">
        <v-icon scale="2" name="gi-full-folder" />
        <div>作品</div>
      </div>
    </div>
    <label for="drawer-toggle" class="bookmark">
      ☰
    </label>
  </div>

  <div class="main-content">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import lavaLamp from '@/lavaLamp.vue';
import avatarImage from '@/assets/selfie.png';
import { useThemeStore } from '@/stores/theme';
import divider from '@/components/ui/divider.vue';

const drawerToggle = ref(null);

// Use the theme store
const themeStore = useThemeStore();

// Use Vue Router
const router = useRouter();

// Navigation functions
const navigateToHome = () => {
  router.push('/');
  drawerToggle.value.checked = false;
};

const navigateToInfo = () => {
  router.push('/info');
  drawerToggle.value.checked = false;
};

const navigateToExperience = () => {
  router.push('/experience');
  drawerToggle.value.checked = false;
};

const navigateToContest = () => {
  router.push('/contest');
  drawerToggle.value.checked = false;
};

const navigateToPortfolio = () => {
  router.push('/portfolio');
  drawerToggle.value.checked = false;
};
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

.drawers {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

.navigation-drawer {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 0;
  width: 3%;
  overflow-x: hidden;
  height: 100vh;
  background-color: color-mix(in srgb, var(--bg-secondary) 90%, transparent);
  padding: 15px 10px 15px 10px;
  border-right: 1px solid var(--border-color);
  transition: 0.3s;
}

.bookmark {
  display: none;
  position: fixed;
  top: 10%;
  width: 12px;
  height: 60px;
  background-color: red;
  border-radius: 0 10px 10px 0;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 3;
}

.drawer-toggle {
  display: none;
}

@media (hover: hover) {
  .navigation-drawer:hover {
    transition: 0.3s;
    width: 15%;
  }

  .navigation-drawer:hover .list-title .image-icon {
    width: 50px;
    height: 50px;
  }

  .navigation-drawer .list-item:hover {
    background-color: var(--accent-color);
    cursor: pointer;
  }

  /* .navigation-drawer:hover+.bookmark {
    left: 15%;
  } */
}

.navigation-drawer .list-title {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: bold;
  display: flex;
  align-items: center;
}

.navigation-drawer .list-title .title-info {
  margin-left: 10px;
}

.navigation-drawer .list-title .image-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: width 0.3s ease, height 0.3s ease;
}

.navigation-drawer .list-item {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 5px 0 5px 0;
  font-size: 1.2rem;
  height: calc(5%);
  border-radius: 10px;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.navigation-drawer .list-item.active {
  background-color: var(--accent-color);
  font-weight: bold;
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
  z-index: 1;
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
@media (max-width: 375px) {
  .bookmark {
    display: flex;
    left: 0px;
    transition: left 0.3s ease;
  }

  .navigation-drawer {
    width: 80%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  /* When checkbox is checked, show the drawer */
  .drawer-toggle:checked ~ .navigation-drawer {
    transform: translateX(0);
  }

  /* Move bookmark when drawer is open */
  .drawer-toggle:checked ~ .bookmark {
    left: calc(80%);
  }

  .main-content {
    margin-left: 0%;
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
