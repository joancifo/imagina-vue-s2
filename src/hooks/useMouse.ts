import { ref } from 'vue'

export function useMouse() {
  const eixX = ref()
  const eixY = ref()

  const mostrar = () => {
    alert('hola!')
  }

  return {
    eixX,
    eixY,
    mostrar
  }
}
