import { isClient } from '@vueuse/core'
import { watch } from 'vue'

export function useToggleWidgets(isOpen: any, onClose: () => void) {
  if (!isClient)
    return

  watch(isOpen, (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }
  })
}
