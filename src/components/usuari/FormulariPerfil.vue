<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect, type Ref } from 'vue'

import UserForm from '@/interfaces/UserForm'
import { ESTAT_ACTIU, ESTAT_DESACTIVAT } from '@/constants'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'



const form: UserForm = reactive<UserForm>({
  nom: 'Joan reactive',
  edat: 10,
  sobretu: 'hola\nholahola',
  acceptarCondicions: false,
  estat: ESTAT_ACTIU,
  estudis: undefined
})

// const schema = yup.object({
//   nomDeUsuari: yup.string().required().min(3).max(10),
//   acceptarCondicions: yup.bool().required().isTrue("Has d'acceptar les condicions")
// })





watch<UserForm>(form, (valorActual: UserForm, valorAnterior: UserForm) => {
  console.log('watching form')
  console.log(valorActual, valorAnterior)
})

watchEffect(() => {
  console.log('watchingEffect form: ' + form.nom)
})


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
  <Form @submit="actualitzaPerfil" :validation-schema="schema" class="card">
    <div class="card-header">
      <h5>Hola, {{ form.nom }}</h5>
    </div>

    <div class="card-body">

      <div>
        <label>
          Reactive:
          <input type="text" v-model="form.nom" class="form-control" />
        </label>
      </div>
      <div class="d-flex flex-column gap-4 mt-4">
        <div>
          <label>
            <Field name="acceptarCondicions" type="checkbox" v-model="form.acceptarCondicions" :value="true"
              :unchecked-value="false" />
            Accept les condicions
          </label>
          <div>
            <ErrorMessage name="acceptarCondicions" />
          </div>
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

    </div>

    <div class="card-body">
      <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
  </Form>
</template>
