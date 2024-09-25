<script setup lang="ts">
import { useFormulari } from '@/hooks/useFormulari'
import { useForm } from 'vee-validate'
import { ref, computed, watch, type Ref } from 'vue'
import * as yup from 'yup'

const { enviant, textBoto, classBoto, enviar } = useFormulari()

const enviarDades = () => {
  enviar('/api/perfil', {
    nomDeUsuari: nomDeUsuari.value,
    nivellEstudis: nivellEstudis.value
  })
}

const nomDeUsuari = ref<string>('Joan ref')
const nivellEstudis = ref<number | undefined>()

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

const { values, defineField, errors, meta } = useForm({
  validationSchema: yup.object({
    email: yup.string().email()
  })
})

const [email] = defineField('email')
const [telefon] = defineField('telefon')
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
      <div class="alert alert-secondary d-flex flex-column gap-2">
        <h6>Vee Validate test</h6>

        <div>
          <label>
            Correu electrònic:
            <input type="email" name="email" v-model="email" class="form-control" />
          </label>
        </div>

        <div>
          <label>
            Telèfon:
            <input type="tel" name="telefon" v-model="telefon" class="form-control" />
          </label>
        </div>

        <div class="bg-success text-white rounded p-3">
          {{ values }}
        </div>

        <div class="bg-danger text-white rounded p-3">
          {{ errors }}
        </div>

        <div class="bg-info text-white rounded p-3">
          {{ meta }}
        </div>

        <button class="btn btn-secondary" :disabled="!meta.valid">Enviar</button>
      </div>
    </div>
    <div class="card-body">
      <div v-if="etsEnJoan" class="alert alert-danger">Tu ets en Joan!</div>
      <div v-else-if="etsEnMiquel" class="alert alert-warning">Ah, ets en Miquel.</div>
      <div v-else>No ets en Joan ni en Miquel.</div>
      <div v-show="etsEnJoan">Ah, ets en Joan però jo ja ho sabia.</div>
    </div>

    <div class="card-footer">
      <button type="submit" :disabled="estaDeshabilitat" class="btn" :class="classBoto">
        {{ textBoto }}

        <div v-if="enviant" class="spinner-border spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </div>
  </form>
</template>
