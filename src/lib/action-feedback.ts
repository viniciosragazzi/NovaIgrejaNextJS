type AuthValidationInput = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function validateAuthFields(input: AuthValidationInput) {
  const name = input.name?.trim()
  const email = input.email?.trim()
  const password = input.password ?? ""
  const confirmPassword = input.confirmPassword

  if ("name" in input && !name) {
    return "Informe seu nome."
  }

  if (!email) {
    return "Informe um e-mail."
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return "Informe um e-mail valido."
  }

  if (!password) {
    return "Informe uma senha."
  }

  if (password.length < 8) {
    return "A senha precisa ter pelo menos 8 caracteres."
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return "As senhas nao coincidem."
  }

  return null
}

export function mapActionError(error: unknown, fallback: string) {
  if (!(error instanceof Error)) {
    return fallback
  }

  const message = error.message.toLowerCase()

  if (message.includes("password") && (message.includes("8") || message.includes("least"))) {
    return "A senha precisa ter pelo menos 8 caracteres."
  }

  if (message.includes("invalid email") || message.includes("email is invalid")) {
    return "Informe um e-mail valido."
  }

  if (
    message.includes("already exists") ||
    message.includes("already been taken") ||
    message.includes("duplicate") ||
    message.includes("user already") ||
    message.includes("email already")
  ) {
    return "Este e-mail ja esta em uso."
  }

  if (message.includes("invalid password") || message.includes("wrong password") || message.includes("credentials")) {
    return "E-mail ou senha incorretos."
  }

  return fallback
}
