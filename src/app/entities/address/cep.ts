export class Cep {
  private readonly cep: string

  get value(): string {
    return this.cep
  }

  private validateCEP(cep: string): boolean {
    const cepRegex = /^\d{8}$/
    return cepRegex.test(cep)
  }

  constructor(cep: string) {
    const isCepLengthValid = this.validateCEP(cep)
    if (!isCepLengthValid) {
      throw new Error('Road length error')
    }
    this.cep = cep
  }
}
