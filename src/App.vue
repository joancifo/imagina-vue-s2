<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect, type Ref } from 'vue'
import UserForm from '@/interfaces/UserForm'
import type Desig from './interfaces/Desig'

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
const llistaDeDesitjos: Desig[] = [
  {
    id: 1,
    nom: 'Anar la platja'
  },
  {
    id: 2,
    nom: 'Anar a la muntanya'
  }
]

const columnes: string[] = Object.keys(llistaDeDesitjos?.[0] ?? [])

const desigU: Desig = llistaDeDesitjos[0]
console.log(desigU.nom, desigU['nom'], desigU[columnes[1]])
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
        <div>
          <h5>Llista de desitjos</h5>
          <ul>
            <li v-for="(desitj, index) in llistaDeDesitjos" :key="index">
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
              <tr v-for="desig in llistaDeDesitjos" :key="desig.id">
                <td v-for="(columna, index) in columnes" :key="index">
                  {{ desig[columna] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
