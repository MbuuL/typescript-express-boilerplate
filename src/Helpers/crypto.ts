import crypto from 'bcrypt'

export const hashing = (text: string) => {
  const salt = crypto.genSaltSync(512)
  const hash = crypto.hashSync(text, salt)
  return hash
}

export const verifyHash = (text: string, hash: string) => {
  return crypto.compareSync(text, hash)
}