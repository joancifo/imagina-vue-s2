z
<script setup lang="ts">
import { ESTAT_ACTIU, ESTAT_ESTRELLA } from '@/constants'
import type Desig from '@/interfaces/Desig'
import { computed, ref, type Ref } from 'vue'
import InputText from '../form/InputText.vue'

// const props = defineProps(['llista', 'esDeLaMar'])
const props: any = defineProps({
  llista: {
    required: true
  },
  esDeLaMar: {
    default: false
  }
})

const emit = defineEmits(['nouDesig'])

// const props: any = defineProps<{
//   llista: Desig[]
//   esDeLaMar?: boolean
// }>()

const llista = computed(() =>
  props.llista.map((desig: Desig): Desig => {
    // desig.nom = desig.nom.toUpperCase()

    // return desig
    return {
      ...desig,
      nom: desig.nom.toUpperCase()
    }
  })
)

const actius: Ref<Desig[]> = computed(() =>
  llista.value.filter((desig: Desig): boolean => desig.estat === ESTAT_ACTIU)
)

const deLaMar = actius.value.filter((desig: Desig) => desig.nom.includes('MAR'))

// const actius = llista

const columnes: string[] = Object.keys(llista.value?.[0] ?? [])

const desigEstrella: Desig | undefined = llista.value.find(
  (desig: Desig) => desig.estat === ESTAT_ESTRELLA
)

const classesDeLaFila = (index: number) => {
  // esParell?
  if (index % 2 === 0) {
    return 'table-danger'
  }

  return 'table-info'
}

const nouDesig = ref<string>('')
const afegirDesig = () => {
  emit('nouDesig', nouDesig.value)
  nouDesig.value = ''
}
</script>
<template>
  <div class="card">
    <slot name="header" :llista="llista">
      <div class="card-header">
        <h5>Llista de desitjos</h5>
      </div>
    </slot>
    <div class="card-body">
      <div v-if="desigEstrella" class="alert alert-success display-3">
        El teu desig estrella: {{ desigEstrella.nom }}
      </div>

      <ul>
        <li v-for="(desitj, index) in actius" :key="index">{{ desitj.id }}: {{ desitj.nom }}</li>
      </ul>

      <table class="table">
        <thead>
          <tr>
            <th v-for="(columna, index) in columnes" :key="index">
              {{ columna }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(desig, index) in actius" :key="desig.id" :class="classesDeLaFila(index)">
            <!-- Estem recorrent un objecte! -->
            <td v-for="(atribut, key) in desig" :key="key">
              {{ atribut }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="esDeLaMar" class="card-body">
      <div>
        <h5>Els desitjos de la mar:</h5>
        <div class="d-flex justify-content-between">
          <div v-for="desig in deLaMar" :key="desig.id">
            {{ desig.nom }}
          </div>
        </div>
      </div>
    </div>

    <slot />

    <slot name="formulari">
      <div class="card-body mt-5">
        <form @submit.prevent="afegirDesig">
          <div class="my-3">
            <InputText v-model="nouDesig" text-ajuda="Què desitges ara mateix?" type="text" />
          </div>
          <button class="btn btn-primary" type="submit">Afegir desig!</button>
        </form>
      </div>
    </slot>
  </div>
</template>
