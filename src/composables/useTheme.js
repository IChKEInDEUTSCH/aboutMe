import { useThemeStore } from '@/stores/theme'

export function useTheme() {
  const themeStore = useThemeStore()
  
  return {
    isDark: themeStore.isDark,
    themeMode: themeStore.themeMode,
    themeIcon: themeStore.themeIcon,
    toggleTheme: themeStore.toggleTheme,
    setTheme: themeStore.setTheme
  }
}
