<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect, type Ref } from 'vue'

import UserForm from '@/interfaces/UserForm'

const nomDeUsuari = ref<string>('Joan ref')

const form: UserForm = reactive<UserForm>({
  nom: 'Joan reactive',
  edat: 10
})

const classesAddicionals = computed(() => {
  return {
    'bg-info': nomDeUsuari.value === form.nom,
    'bg-warning': nomDeUsuari.value === 'Miquel'
  }
})

watch<string>(nomDeUsuari, (valorActual: string, valorAnterior: string) => {
  console.log('watching nomDeUsuari')
  console.log(valorActual, valorAnterior)
})

watch<UserForm>(form, (valorActual: UserForm, valorAnterior: UserForm) => {
  console.log('watching form')
  console.log(valorActual, valorAnterior)
})

watchEffect(() => {
  // console.log('watchEffect: ' + nomDeUsuari.value)
  console.log('watchingEffect form: ' + form.nom)
})

const etsEnJoan: Ref<boolean> = computed(() => nomDeUsuari.value === 'Joan')
const etsEnMiquel: Ref<boolean> = computed(() => nomDeUsuari.value === 'Miquel')
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h5>Hola, {{ nomDeUsuari }} o bé {{ form.nom }}</h5>
    </div>

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
      <div class="card-body">
        <div v-if="etsEnJoan" class="alert alert-danger">Tu ets en Joan!</div>
        <div v-else-if="etsEnMiquel" class="alert alert-warning">Ah, ets en Miquel.</div>
        <div v-else>No ets en Joan ni en Miquel.</div>
        <div v-show="etsEnJoan">Ah, ets en Joan però jo ja ho sabia.</div>
      </div>
    </div>
  </div>
</template>
