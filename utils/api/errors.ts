interface ErrorData {
  type: string
  message: string
  data: any
}

export const extractError = (error: ErrorData) => {
  const { type, message } = error

  if (type !== "SUCCESS") {
    const error = type.split("|")[1]
    return {
      errorType: error,
      message
    }
  }
}