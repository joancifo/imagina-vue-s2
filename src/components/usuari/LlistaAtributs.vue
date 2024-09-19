<script setup lang="ts">
const usuari = {
  titol: 'Senyor',
  nom: 'Joan',
  edat: 35
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h5>Atributs de l'usuari</h5>
    </div>
    <div class="card-body">
      <div v-for="(atribut, key) in usuari" :key="key">{{ key }} : {{ atribut }}</div>
    </div>
  </div>
</template>
