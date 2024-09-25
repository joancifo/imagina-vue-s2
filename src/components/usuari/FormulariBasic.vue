<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'

const nomDeUsuari = ref<string>('Joan ref')
const nivellEstudis = ref<number>()

const classesAddicionals = computed(() => {
  return {
    'bg-info': nomDeUsuari.value === 'Joan',
    'bg-warning': nomDeUsuari.value === 'Miquel'
  }
})

watch(nomDeUsuari, (valorActual: string, valorAnterior: string) => {
  console.log('watching nomDeUsuari')
  console.log(valorActual, valorAnterior)
})

const etsEnJoan: Ref<boolean> = computed(() => nomDeUsuari.value === 'Joan')
const etsEnMiquel: Ref<boolean> = computed(() => nomDeUsuari.value === 'Miquel')

const estaDeshabilitat: Ref<boolean> = computed((): boolean => {
  if (!nomDeUsuari.value || !nivellEstudis.value) {
    return true
  }

  return false
})

const enviarDades = () => {
  fetch('/api/perfil', {
    method: 'POST',
    body: JSON.stringify({
      nomDeUsuari: nomDeUsuari.value,
      nivellEstudis: nivellEstudis.value
    })
  })
}
</script>
<template>
  <form @submit.prevent="enviarDades" class="card">
    <div class="card-header">
      <h5>Formulari bàsic - {{ nomDeUsuari }}</h5>
    </div>
    <div class="card-body d-flex flex-column gap-4" :class="classesAddicionals">
      <div>
        <label>
          Ref:
          <input v-model="nomDeUsuari" name="nomDeUsuari" required class="form-control" />
        </label>
      </div>

      <div>
        <label>
          Nivell d'estudis
          <select v-model.number="nivellEstudis" class="form-control">
            <option value="1">Bàsics</option>
            <option value="2">Universitaris</option>
          </select>
        </label>
      </div>
    </div>
    <div class="card-body">
      <div v-if="etsEnJoan" class="alert alert-danger">Tu ets en Joan!</div>
      <div v-else-if="etsEnMiquel" class="alert alert-warning">Ah, ets en Miquel.</div>
      <div v-else>No ets en Joan ni en Miquel.</div>
      <div v-show="etsEnJoan">Ah, ets en Joan però jo ja ho sabia.</div>
    </div>

    <div class="card-footer">
      <button
        type="submit"
        :disabled="estaDeshabilitat"
        class="btn"
        :class="estaDeshabilitat ? 'btn-warning' : 'btn-primary'"
      >
        Enviar
      </button>
    </div>
  </form>
</template>
