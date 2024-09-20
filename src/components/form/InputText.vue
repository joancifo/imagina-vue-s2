<script setup lang="ts">
defineProps<{
  textAjuda: string
  type?: string
}>()

const input = defineModel()

// const myList: any = inject('laLlistaCompleta')

// onMounted(() => {
//   myList.value.push({
//     id: 22,
//     nom: 'Vull anar a la mar',
//     estat: ESTAT_ACTIU
//   })
// })
</script>

<template>
  <input v-model="input" class="form-control" :placeholder="textAjuda" :type="type" />
</template>
