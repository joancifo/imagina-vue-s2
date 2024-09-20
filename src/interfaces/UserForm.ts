export default class UserForm {
  nom: string
  edat?: number
  cognoms?: string[]
  sobretu?: string
  acceptarCondicions?: boolean
  estat?: number
  estudis?: number

  constructor(nom: string) {
    this.nom = nom
  }
}
