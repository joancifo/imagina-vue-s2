<script setup lang="ts">
defineProps<{
  textAjuda: string
}>()

const input = defineModel()
</script>

<template>
  <input v-model="input" type="text" class="form-control" :placeholder="textAjuda" />
</template>
