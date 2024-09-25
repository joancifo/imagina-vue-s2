import { computed, ref } from 'vue'

export function useFormulari() {
  const enviant = ref<boolean>(false)
  const textBoto = computed(() => (enviant.value ? 'Enviant' : 'Enviar'))
  const classBoto = computed(() => (enviant.value ? 'btn-warning' : 'btn-primary'))

  const enviar = async (url: string, form: any) => {
    enviant.value = true

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(form)
    })

    setTimeout(() => {
      enviant.value = false
    }, 1500)
  }

  return {
    enviant,
    enviar,
    textBoto,
    classBoto
  }
}
