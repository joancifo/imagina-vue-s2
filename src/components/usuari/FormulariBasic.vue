<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const nomDeUsuari = ref<string>('Joan ref')

const classesAddicionals = computed(() => {
    return {
        'bg-info': nomDeUsuari.value === "Joan",
        'bg-warning': nomDeUsuari.value === 'Miquel'
    }
})

watch<string>(nomDeUsuari, (valorActual: string, valorAnterior: string) => {
    console.log('watching nomDeUsuari')
    console.log(valorActual, valorAnterior)
})

const etsEnJoan: Ref<boolean> = computed(() => nomDeUsuari.value === 'Joan')
const etsEnMiquel: Ref<boolean> = computed(() => nomDeUsuari.value === 'Miquel')

</script>
<template>
    <div class="card">
        <div class="card-header">
            <h5>Formulari bàsic - {{ nomDeUsuari }}</h5>
        </div>
        <div class="card-body" :class="classesAddicionals">
            <div>
                <label>
                    Ref:
                    <input v-model="nomDeUsuari" name="nomDeUsuari" class="form-control" />
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
</template>