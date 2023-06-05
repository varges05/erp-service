export class Code {
  private readonly code: string

  get value(): string {
    return this.code.trim()
  }

  private validateCodeLength(code: string): boolean {
    return code.length >= 2 && code.length <= 10
  }

  constructor(code: string) {
    const isCodeLengthValid = this.validateCodeLength(code)
    if (!isCodeLengthValid) {
      throw new Error('Code length error')
    }
    this.code = code
  }
}
