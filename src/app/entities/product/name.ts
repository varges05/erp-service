export class Name {
  private readonly name: string

  get value(): string {
    return this.name.trim()
  }

  private validateNameLength(name: string): boolean {
    return name.length >= 3 && name.length <= 50
  }

  constructor(name: string) {
    const isNameLengthValid = this.validateNameLength(name)
    if (!isNameLengthValid) {
      throw new Error('Name length error')
    }
    this.name = name
  }
}
