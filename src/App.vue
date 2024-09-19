<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect, type Ref } from 'vue'
import UserForm from '@/interfaces/UserForm'
import type Desig from './interfaces/Desig'
import { ESTAT_ACTIU, ESTAT_DESACTIVAT } from './constants'

const nomDeUsuari = ref<string>('Joan ref')

watch<string>(nomDeUsuari, (valorActual: string, valorAnterior: string) => {
  console.log('watching nomDeUsuari')
  console.log(valorActual, valorAnterior)
})

const form: UserForm = reactive<UserForm>({
  nom: 'Joan reactive',
  edat: 10
})

watch<UserForm>(form, (valorActual: UserForm, valorAnterior: UserForm) => {
  console.log('watching form')
  console.log(valorActual, valorAnterior)
})

watchEffect(() => {
  // console.log('watchEffect: ' + nomDeUsuari.value)
  console.log('watchingEffect form: ' + form.nom)
})

const classesAddicionals = computed(() => {
  return {
    'bg-info': nomDeUsuari.value === form.nom,
    'bg-warning': nomDeUsuari.value === 'Miquel'
  }
})

const titol = ref()

onMounted(() => {
  // S'ha de fer dins onMounted!
  console.log(titol.value)
})

const etsEnJoan: Ref<boolean> = computed(() => nomDeUsuari.value === 'Joan')
const etsEnMiquel: Ref<boolean> = computed(() => nomDeUsuari.value === 'Miquel')

// const llistaDeDesitjos: string[] = ['Anar a la platja', 'Anar a la muntanya']
const llistaDeDesitjos: Ref<Desig[]> = ref([
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

const desitjosActius: Ref<Desig[]> = computed(() =>
  llistaDeDesitjos.value.filter((desig: Desig) => desig.estat === ESTAT_ACTIU)
)

const desitjosDeLaMar = desitjosActius.value.filter((desig: Desig) => desig.nom.includes('mar'))

// const desitjosActius = llistaDeDesitjos

const columnes: string[] = Object.keys(llistaDeDesitjos.value?.[0] ?? [])

const classesDeLaFila = (index: number) => {
  // esParell?
  if (index % 2 === 0) {
    return 'table-danger'
  }

  return 'table-info'
}

const usuari = {
  titol: 'Senyor',
  nom: 'Joan',
  edat: 35
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div ref="titol" class="card-header">Hola, {{ nomDeUsuari }} o bé {{ form.nom }}</div>
          <div class="card-body" :class="classesAddicionals">
            <div>
              <label>
                Ref:
                <input type="text" v-model="nomDeUsuari" class="form-control" />
              </label>
            </div>
            <div>
              <label>
                Reactive:
                <input type="text" v-model="form.nom" class="form-control" />
              </label>
            </div>
          </div>
          <div class="card-body">
            <div v-if="etsEnJoan" class="alert alert-danger">Tu ets en Joan!</div>
            <div v-else-if="etsEnMiquel" class="alert alert-warning">Ah, ets en Miquel.</div>
            <div v-else>No ets en Joan ni en Miquel.</div>
            <div v-show="etsEnJoan">Ah, ets en Joan però jo ja ho sabia.</div>
          </div>
        </div>
        <div class="card mt-5">
          <div class="card-header">
            <h5>Llista de desitjos</h5>
          </div>
          <div class="card-body">
            <ul>
              <li v-for="(desitj, index) in desitjosActius" :key="index">
                {{ desitj.id }}: {{ desitj.nom }}
              </li>
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
                <tr
                  v-for="(desig, index) in desitjosActius"
                  :key="desig.id"
                  :class="classesDeLaFila(index)"
                >
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
                <div v-for="desig in desitjosDeLaMar" :key="desig.id">
                  {{ desig.nom }}
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div v-for="(atribut, key) in usuari" :key="key">{{ key }} : {{ atribut }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
