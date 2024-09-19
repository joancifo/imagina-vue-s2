export default class UserForm {
  public nom: string
  public edat?: number
  public cognoms?: string[]

  constructor(nom: string, edat?: number, cognoms?: string[]) {
    this.nom = nom
    this.edat = edat
    this.cognoms = cognoms
  }
}
