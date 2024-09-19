z
<script setup lang="ts">
import { ESTAT_ACTIU, ESTAT_DESACTIVAT } from '@/constants'
import type Desig from '@/interfaces/Desig'
import { computed, ref, type Ref } from 'vue'

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
    estat: ESTAT_DESACTIVAT
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

const actius: Ref<Desig[]> = computed(() =>
  llista.value.filter((desig: Desig) => desig.estat === ESTAT_ACTIU)
)

const deLaMar = actius.value.filter((desig: Desig) => desig.nom.includes('mar'))

// const actius = llista

const columnes: string[] = Object.keys(llista.value?.[0] ?? [])

const classesDeLaFila = (index: number) => {
  // esParell?
  if (index % 2 === 0) {
    return 'table-danger'
  }

  return 'table-info'
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h5>Llista de desitjos</h5>
    </div>
    <div class="card-body">
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
    <div class="card-body">
      <div>
        <h5>Els desitjos de la mar:</h5>
        <div class="d-flex justify-content-between">
          <div v-for="desig in deLaMar" :key="desig.id">
            {{ desig.nom }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
