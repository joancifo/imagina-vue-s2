import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useMouse(target: Ref) {
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
    target.value.addEventListener('mousemove', actualitzarValor)
  })

  onUnmounted(() => {
    target.value.removeEventListener('mousemove', actualitzarValor)
  })

  return {
    eixX,
    eixY,
    mostrar
  }
}
