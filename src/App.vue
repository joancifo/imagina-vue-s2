<script setup lang="ts">
import LlistaDesitjos from '@/components/desig/LlistaDesitjos.vue'
import FormulariPerfil from '@/components/usuari/FormulariPerfil.vue'
import LlistaAtributs from '@/components/usuari/LlistaAtributs.vue'
import { computed, onMounted, ref, type Ref } from 'vue'
import { ESTAT_ACTIU, ESTAT_DESACTIVAT, ESTAT_ESTRELLA } from './constants'
import type Desig from './interfaces/Desig'

// const llista: string[] = ['Anar a la platja', 'Anar a la muntanya']
const llista: Ref<Desig[]> = ref([
  {
    id: 1,
    nom: 'Anar la platja',
    estat: ESTAT_ACTIU
  },
  {
    id: 2,
    nom: 'Anar a la muntanya',
    estat: ESTAT_ESTRELLA
  },
  {
    id: 3,
    nom: 'Anar a la mar',
    estat: ESTAT_ACTIU
  },
  {
    id: 4,
    nom: 'Anar a passejar',
    estat: ESTAT_ACTIU
  },
  {
    id: 5,
    nom: 'Mirar la mar',
    estat: ESTAT_ACTIU
  },
  {
    id: 6,
    nom: 'No tenc cap més desig',
    estat: ESTAT_DESACTIVAT
  }
])

const desitjosDeLaMar: Ref<Desig[]> = computed(() =>
  llista.value.filter((desig: Desig): boolean => desig.nom.toLowerCase().includes('mar'))
)

const desitjosDeLaPlatja: Ref<Desig[]> = computed(() =>
  llista.value.filter((desig: Desig): boolean => desig.nom.toLowerCase().includes('platja'))
)

const container = ref()

onMounted(() => {
  // S'ha de fer dins onMounted!
  console.log(container.value)

  llista.value.push({
    id: Math.random() * 1000,
    nom: "la mar m'agrada",
    estat: ESTAT_ACTIU
  })

  llista.value.push({
    id: Math.random() * 1000,
    nom: "la mar m'agrada",
    estat: ESTAT_ACTIU
  })

  llista.value.push({
    id: Math.random() * 1000,
    nom: "la mar m'agrada",
    estat: ESTAT_ACTIU
  })
})

const afegirDesig = (nom: string) => {
  llista.value.push({
    id: Math.random() * 1000,
    nom,
    estat: ESTAT_ACTIU
  })
}

// provide('laLlistaCompleta', llista)
</script>

<template>
  <div ref="container" class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"></div>
        </div>

        <FormulariPerfil />

        <LlistaDesitjos
          class="mt-5"
          :llista="desitjosDeLaMar"
          :esDeLaMar="true"
          @nouDesig="afegirDesig"
        >
          <template #header="{ llista }">
            <div class="card-header">
              <h1>Desitjos importants {{ llista.length }}</h1>
            </div>
          </template>
        </LlistaDesitjos>

        <LlistaDesitjos class="mt-5" :llista="desitjosDeLaPlatja" @nouDesig="afegirDesig">
          <template #header>
            <h1>Soc un header més lleig</h1>
          </template>

          <div>Estic a l'slot?</div>
        </LlistaDesitjos>

        <LlistaAtributs class="mt-5" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Compte! Afecta als fills! */
.card {
  /* background-color: green; */
}
</style>
