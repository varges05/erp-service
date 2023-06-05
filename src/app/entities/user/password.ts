export class Password {
  private readonly password: string

  get value(): string {
    return this.password.trim()
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 6 && password.length <= 60
  }

  private validatePasswordFormat(password: string): boolean {
    const letterRegex = /[a-zA-Z]/
    const numberRegex = /[0-9]/
    return letterRegex.test(password) && numberRegex.test(password)
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password)
    const isPasswordFormatValid = this.validatePasswordFormat(password)

    if (!isPasswordLengthValid) {
      throw new Error('Password length error')
    }

    if (!isPasswordFormatValid) {
      throw new Error('Password format error')
    }

    this.password = password
  }
}
