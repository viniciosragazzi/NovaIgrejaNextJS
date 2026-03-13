function onlyNumbers(value: string) {
  return value.replace(/\D/g, "")
}

function sanitizeText(value: string, maxLength: number) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim()
    .slice(0, maxLength)
}

function tlv(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`
}

function crc16(payload: string) {
  let crc = 0xffff

  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0")
}

export function buildPixPayload({
  pixKey,
  amount,
  churchName,
  city,
  description,
}: {
  pixKey: string
  amount?: number
  churchName: string
  city: string
  description?: string
}) {
  const merchantName = sanitizeText(churchName || "Nova Igreja", 25) || "Nova Igreja"
  const merchantCity = sanitizeText(city || "Cidade", 15) || "Cidade"

  const merchantAccountInfo = [
    tlv("00", "br.gov.bcb.pix"),
    tlv("01", pixKey.trim()),
    description ? tlv("02", sanitizeText(description, 50)) : "",
  ].join("")

  const payload = [
    tlv("00", "01"),
    tlv("26", merchantAccountInfo),
    tlv("52", "0000"),
    tlv("53", "986"),
    amount && amount > 0 ? tlv("54", amount.toFixed(2)) : "",
    tlv("58", "BR"),
    tlv("59", merchantName),
    tlv("60", merchantCity),
    tlv("62", tlv("05", "***")),
    "6304",
  ].join("")

  return `${payload}${crc16(payload)}`
}

export function getPixPaymentLink(payload: string) {
  return `pix://pay?payload=${encodeURIComponent(payload)}`
}

export function extractCityFromAddress(address: string) {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean)
  return parts[parts.length - 1] || "Cidade"
}

export function formatPixKeyForDisplay(pixKey: string) {
  const numbers = onlyNumbers(pixKey)
  return numbers.length === pixKey.length ? numbers : pixKey
}
