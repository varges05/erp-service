export class Abbreviation {
  private readonly abbreviation: string

  get value(): string {
    return this.abbreviation.trim()
  }

  private validateAbbreviationLength(abbreviation: string): boolean {
    return abbreviation.length >= 2 && abbreviation.length <= 4
  }

  constructor(abbreviation: string) {
    const isAbbreviationLengthValid =
      this.validateAbbreviationLength(abbreviation)
    if (!isAbbreviationLengthValid) {
      throw new Error('Abbreviation length error')
    }
    this.abbreviation = abbreviation
  }
}
