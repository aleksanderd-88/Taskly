import every from 'lodash/every'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'

dotenv.config()

export const requestIsValid = (data: Record<string, unknown>) => !isEmpty(data) && every(values(data))

export const generateAuthToken = (payload: Record<string, unknown>, expiresIn = '3h') => {
  try {
    return JWT.sign(payload, process.env.SECRET_KEY || '', { expiresIn })
  } catch (error) {
    return null
  }
}

export const generateOtp = () => {
  const randomNum = Math.random() * 9000
  return Math.floor(1000 + randomNum)
}