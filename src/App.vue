<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormulariPerfil from './components/usuari/FormulariPerfil.vue'
import LlistaDesitjos from './components/desig/LlistaDesitjos.vue'
import LlistaAtributs from './components/usuari/LlistaAtributs.vue'

const container = ref()

onMounted(() => {
  // S'ha de fer dins onMounted!
  console.log(container.value)
})
</script>

<template>
  <div ref="container" class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"></div>
        </div>

        <FormulariPerfil />

        <LlistaDesitjos class="mt-5" />

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
