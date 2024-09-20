<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  textAjuda: string
}>()

const input = defineModel()

const myList: any = inject('laLlistaCompleta')

// onMounted(() => {
//   myList.value.push({
//     id: 22,
//     nom: 'Vull anar a la mar',
//     estat: ESTAT_ACTIU
//   })
// })
</script>

<template>
  {{ myList.length }}
  <input v-model="input" type="text" class="form-control" :placeholder="textAjuda" />
</template>
