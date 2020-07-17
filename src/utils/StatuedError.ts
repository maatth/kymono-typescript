class StatuedError extends Error {
  readonly statusCode: number

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

export default StatuedError
