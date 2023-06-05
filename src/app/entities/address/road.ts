export class Road {
  private readonly road: string

  get value(): string {
    return this.road.trim()
  }

  private validateNameLength(road: string): boolean {
    return road.length >= 3 && road.length <= 100
  }

  constructor(road: string) {
    const isNameLengthValid = this.validateNameLength(road)
    if (!isNameLengthValid) {
      throw new Error('Road length error')
    }
    this.road = road
  }
}
