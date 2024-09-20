<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

defineProps<{
  textAjuda: string
}>()

const emit = defineEmits(['canviInput'])

const input: Ref<string> = ref<string>('')

watch(input, (nouValor) => {
  emit('canviInput', nouValor)
})
</script>

<template>
  <input v-model="input" type="text" class="form-control" :placeholder="textAjuda" />
</template>
