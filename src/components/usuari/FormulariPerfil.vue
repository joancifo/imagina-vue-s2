<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect, type Ref } from 'vue'

import UserForm from '@/interfaces/UserForm'
import { ESTAT_ACTIU, ESTAT_DESACTIVAT } from '@/constants'

const nomDeUsuari = ref<string>('Joan ref')

const form: UserForm = reactive<UserForm>({
  nom: 'Joan reactive',
  edat: 10,
  sobretu: 'hola\nholahola',
  acceptarCondicions: false,
  estat: ESTAT_ACTIU,
  estudis: undefined
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

const actualitzaPerfil = () => {
  fetch('/api/actualitza-perfil', {
    method: 'post',
    body: JSON.stringify(form)
  })
}

onMounted(() => {
  setInterval(actualitzaPerfil, 30 * 1000)
})
</script>
<template>
  <form @submit.prevent="actualitzaPerfil" class="card">
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
      <div class="d-flex flex-column gap-4 mt-4">
        <div>
          <label>
            <input type="checkbox" v-model="form.acceptarCondicions" />
            Accept les condicions
          </label>
        </div>
        <div class="d-flex gap-4">
          <label><input type="radio" v-model="form.estat" :value="ESTAT_ACTIU" />Actiu</label>
          <label>
            <input type="radio" v-model="form.estat" :value="ESTAT_DESACTIVAT" />Desactivat
          </label>
        </div>
        <div>
          <label>Estudis</label>
          <select v-model.number="form.estudis" class="form-control">
            <option value="1">Superiors</option>
            <option value="2">Bàsics</option>
          </select>
        </div>
        <textarea v-model="form.sobretu" class="form-control"></textarea>
      </div>
      <div class="card-body">
        <div v-if="etsEnJoan" class="alert alert-danger">Tu ets en Joan!</div>
        <div v-else-if="etsEnMiquel" class="alert alert-warning">Ah, ets en Miquel.</div>
        <div v-else>No ets en Joan ni en Miquel.</div>
        <div v-show="etsEnJoan">Ah, ets en Joan però jo ja ho sabia.</div>
      </div>
    </div>

    <div class="card-body">
      <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
  </form>
</template>
