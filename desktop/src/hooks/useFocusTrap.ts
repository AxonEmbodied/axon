import { useEffect, useRef } from 'react'

/**
 * Trap focus within a container element (for modals/dialogs).
 * Returns a ref to attach to the container.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(active: boolean) {
  const ref = useRef<T>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active || !ref.current) return

    // Save current focus to restore later
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the first focusable element
    const focusable = getFocusableElements(ref.current)
    if (focusable.length > 0) {
      ;(focusable[0] as HTMLElement).focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const container = ref.current
      if (!container) return

      const elements = getFocusableElements(container)
      if (elements.length === 0) return

      const first = elements[0] as HTMLElement
      const last = elements[elements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus
      previousFocusRef.current?.focus()
    }
  }, [active])

  return ref
}

function getFocusableElements(container: HTMLElement): NodeListOf<Element> {
  return container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
}
