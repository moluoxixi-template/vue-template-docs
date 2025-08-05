import { ref } from 'vue'

export function useFullScreen() {
  const isFullScreen = ref(false)

  const toggleFullScreen = (value?: boolean) => {
    isFullScreen.value = value !== undefined ? value : !isFullScreen.value
  }

  return {
    isFullScreen,
    toggleFullScreen,
  }
}
