<template>
  <lava-lamp :dark-mode="themeStore.isDark" class="background-webgl" />
  <button @click="themeStore.toggleTheme" class="theme-toggle">
    {{ themeStore.themeIcon }}
  </button>
  <div class="drawers">
    <div class="navigation-drawer" ref="navigationDrawer" :class="{ 'mobile-open': isMobileDrawerOpen }">
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
      
      <!-- Bookmark inside drawer but positioned outside -->
      <div class="bookmark" @click="toggleMobileDrawer">
        ☰
      </div>
    </div>
  </div>

  <div class="main-content">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import lavaLamp from '@/lavaLamp.vue';
import avatarImage from '@/assets/selfie.png';
import { useThemeStore } from '@/stores/theme';
import divider from '@/components/ui/divider.vue';

const isMobileDrawerOpen = ref(false);
const navigationDrawer = ref(null);

// Use the theme store
const themeStore = useThemeStore();

// Use Vue Router
const router = useRouter();

// Toggle mobile drawer
const toggleMobileDrawer = () => {
  isMobileDrawerOpen.value = !isMobileDrawerOpen.value;
};

// Click outside to close drawer
const handleClickOutside = (event) => {
  const drawer = navigationDrawer.value;
  
  // Only close if drawer is open and click is outside the drawer
  // (bookmark is now inside drawer, so we don't need to exclude it)
  if (isMobileDrawerOpen.value &&
      drawer && !drawer.contains(event.target)) {
    isMobileDrawerOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Navigation functions
const navigateToHome = () => {
  router.push('/');
  isMobileDrawerOpen.value = false;
};

const navigateToInfo = () => {
  router.push('/info');
  isMobileDrawerOpen.value = false;
};

const navigateToExperience = () => {
  router.push('/experience');
  isMobileDrawerOpen.value = false;
};

const navigateToContest = () => {
  router.push('/contest');
  isMobileDrawerOpen.value = false;
};

const navigateToPortfolio = () => {
  router.push('/portfolio');
  isMobileDrawerOpen.value = false;
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
  overflow: visible; /* Changed from hidden to visible */
  height: 100vh;
  background-color: color-mix(in srgb, var(--bg-secondary) 90%, transparent);
  padding: 15px 10px 15px 10px;
  border-right: 1px solid var(--border-color);
  transition: 0.3s;
}

.bookmark {
  display: none;
  position: absolute; /* Changed from fixed to absolute */
  top: 10%;
  right: -12px; /* Position outside the drawer */
  width: 12px;
  height: 60px;
  background-color: red;
  border-radius: 0 10px 10px 0;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 4;
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
  }

  .navigation-drawer {
    width: 80%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  /* When drawer is open, show it */
  .navigation-drawer.mobile-open {
    transform: translateX(0);
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

@media (min-width: 376px) and (max-width: 425px) {
  .bookmark {
    display: flex;
  }

  .navigation-drawer {
    width: 80%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  /* When drawer is open, show it */
  .navigation-drawer.mobile-open {
    transform: translateX(0);
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

@media (min-width: 426px) and (max-width: 768px) {
  .bookmark {
    display: flex;
  }

  .navigation-drawer {
    width: 40%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  /* When drawer is open, show it */
  .navigation-drawer.mobile-open {
    transform: translateX(0);
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
