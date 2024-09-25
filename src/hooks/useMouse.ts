import { onMounted, onUnmounted, ref } from 'vue'

export function useMouse() {
  const eixX = ref(100)
  const eixY = ref(100)

  const mostrar = () => {
    alert('hola!')
  }

  const actualitzarValor = (event: MouseEvent) => {
    eixX.value = event.x
    eixY.value = event.y
  }

  onMounted(() => {
    window.addEventListener('mousemove', actualitzarValor)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', actualitzarValor)
  })

  return {
    eixX,
    eixY,
    mostrar
  }
}
