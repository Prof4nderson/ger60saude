import type { FontScale, ThemeMode } from '../data/dashboard'

const keys = {
  theme: 'geri60-theme',
  fontScale: 'geri60-font-scale',
  selectedElder: 'geri60-selected-elder',
}

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export const preferences = {
  getTheme: () => read<ThemeMode>(keys.theme, 'holo'),
  setTheme: (theme: ThemeMode) => localStorage.setItem(keys.theme, JSON.stringify(theme)),
  getFontScale: () => read<FontScale>(keys.fontScale, 'normal'),
  setFontScale: (scale: FontScale) => localStorage.setItem(keys.fontScale, JSON.stringify(scale)),
  getSelectedElder: () => read<string>(keys.selectedElder, 'lucia'),
  setSelectedElder: (elderId: string) => localStorage.setItem(keys.selectedElder, JSON.stringify(elderId)),
}

export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'pt-BR'
  utterance.rate = 0.92
  window.speechSynthesis.speak(utterance)
  return true
}

export function formatLiters(ml: number) {
  return `${(ml / 1000).toFixed(2).replace('.', ',')} L`
}
