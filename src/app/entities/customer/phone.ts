export class Phone {
  private readonly phone: string

  get value(): string {
    return this.phone
  }

  private validatePhoneFormat(phone: string): boolean {
    const phoneRegex = /^\d{11}$/
    return phoneRegex.test(phone)
  }

  constructor(phone: string) {
    const isPhoneFormatValid = this.validatePhoneFormat(phone)
    if (!isPhoneFormatValid) {
      throw new Error('Invalid phone format')
    }
    this.phone = phone
  }
}
