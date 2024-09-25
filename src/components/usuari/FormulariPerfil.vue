<script setup lang="ts">
import { onMounted, reactive, watch, watchEffect } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'

import { ESTAT_ACTIU, ESTAT_DESACTIVAT } from '@/constants'
import { actualitzarPerfil, obtenirPerfil } from '@/api/usuari'
import UserForm from '@/interfaces/UserForm'

import * as yup from 'yup'

const form: UserForm = reactive<UserForm>({
  nom: '',
  edat: undefined,
  sobretu: '',
  acceptarCondicions: false,
  estat: ESTAT_ACTIU,
  estudis: undefined
})

const schema = yup.object({
  nom: yup.string().required('El nom és obligatori').min(3).max(10),
  acceptarCondicions: yup.bool().required().isTrue("Has d'acceptar les condicions"),
  estat: yup.number().required().oneOf([ESTAT_ACTIU]),
  estudis: yup.number().required().positive("Tria el teu nivell d'estudis"),
  sobretu: yup.string()
})

watch<UserForm>(form, (valorActual: UserForm, valorAnterior: UserForm) => {
  console.log('watching form')
  console.log(valorActual, valorAnterior)
})

watchEffect(() => {
  console.log('watchingEffect form: ' + form.nom)
})

onMounted(async () => {
  // setInterval(actualitzaPerfil, 30 * 1000)

  const usuari = await obtenirPerfil()

  form.nom = usuari.name
})
</script>
<template>
  <Form @submit="actualitzarPerfil(form)" :validation-schema="schema" class="card">
    <div class="card-header">
      <h5>Hola, {{ form.nom }}</h5>
    </div>

    <div class="card-body">
      <div>
        <label>
          Nom:
          <Field v-model="form.nom" name="nom" class="form-control" />
          <ErrorMessage name="nom" />
        </label>
      </div>
      <div class="d-flex flex-column gap-4 mt-4">
        <div>
          <label>
            <Field
              name="acceptarCondicions"
              type="checkbox"
              v-model="form.acceptarCondicions"
              :value="true"
              :unchecked-value="false"
            />
            Accept les condicions
          </label>
          <div>
            <ErrorMessage name="acceptarCondicions" />
          </div>
        </div>
        <div class="d-flex gap-4">
          <label>
            <Field name="estat" type="radio" v-model="form.estat" :value="ESTAT_ACTIU" />
            Actiu
          </label>
          <label>
            <Field
              name="estat"
              type="radio"
              v-model="form.estat"
              :value="ESTAT_DESACTIVAT"
            />Desactivat
          </label>
          <div>
            <ErrorMessage name="estat" />
          </div>
        </div>
        <div>
          <label>Estudis</label>
          <Field as="select" name="estudis" v-model.number="form.estudis" class="form-control">
            <option value="0">--</option>
            <option value="1">Superiors</option>
            <option value="2">Bàsics</option>
          </Field>
          <ErrorMessage name="estudis" />
        </div>
        <Field as="textarea" name="sobretu" v-model="form.sobretu" class="form-control" />
        <ErrorMessage name="sobretu" />
      </div>
    </div>

    <div class="card-body">
      <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
  </Form>
</template>
