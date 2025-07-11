import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(getInitialTheme())
  
  // Get Vuetify theme instance
  let vuetifyTheme = null
  
  // Initialize Vuetify theme after component is mounted
  function initVuetifyTheme() {
    if (typeof window !== 'undefined') {
      vuetifyTheme = useTheme()
      vuetifyTheme.global.name.value = isDark.value ? 'dark' : 'light'
    }
  }

  // Getters
  const themeMode = computed(() => isDark.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDark.value ? '☀️' : '🌙')

  // Actions
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(mode) {
    isDark.value = mode === 'dark'
  }

  // Helper function to get initial theme
  function getInitialTheme() {
    // Check localStorage first
    const stored = localStorage.getItem('theme-preference')
    if (stored) {
      return stored === 'dark'
    }
    
    // Fall back to system preference
    return getSystemTheme() === 'dark'
  }

  function getSystemTheme() {
    if (typeof window !== 'undefined') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    }
    return 'light' // default fallback
  }

  // Watch for changes and persist to localStorage
  watch(isDark, (newValue) => {
    localStorage.setItem('theme-preference', newValue ? 'dark' : 'light')
    
    // Apply theme class to document root
    const root = document.documentElement
    if (newValue) {
      root.classList.add('theme-dark')
      root.classList.remove('theme-light')
    } else {
      root.classList.add('theme-light')
      root.classList.remove('theme-dark')
    }
    
    // Update Vuetify theme
    if (vuetifyTheme) {
      vuetifyTheme.global.name.value = newValue ? 'dark' : 'light'
    }
  }, { immediate: true })

  // Listen for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      const stored = localStorage.getItem('theme-preference')
      if (!stored) {
        isDark.value = e.matches
      }
    })
  }

  return {
    // State
    isDark,
    // Getters
    themeMode,
    themeIcon,
    // Actions
    toggleTheme,
    setTheme,
    initVuetifyTheme
  }
})
