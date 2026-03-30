export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  const number = digits.length > 10 ? digits.slice(-10) : digits
  return `+7${number}`
}
