const API_URL = 'https://jsonplaceholder.typicode.com/users/1'

export function actualitzarPerfil(form: any) {
  alert(JSON.stringify(form))
  fetch(API_URL, {
    method: 'post',
    body: JSON.stringify(form)
  })
}

export async function obtenirPerfil() {
  const response = await fetch(API_URL)

  return await response.json()
}
