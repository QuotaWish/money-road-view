// utils/darkMode.ts

export function setupAutoDarkMode() {
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  const applyTheme = () => {
    document.body.classList.toggle('arco-theme-dark', media.matches)
  }

  // 初次加载应用主题
  applyTheme()

  // 监听系统暗黑模式变化
  media.addEventListener('change', applyTheme)
}
