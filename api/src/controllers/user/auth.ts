import { Request, Response } from 'express'
import models from '../../../models'
import get from 'lodash/get'
import pick from 'lodash/pick'
import bcrypt from 'bcryptjs'
import { requestIsValid, generateAuthToken } from '../../libs'

export default async (req: Request, res: Response) => {
  try {
    const data = get(req, 'body.data', null)
  
    // Sanity check
    if ( !requestIsValid(data) )
      throw new Error('One or more parameters are missing')
    
    const { email, password } = data
    const user = await models.User.findOne({ email }).lean()
    if ( !user )
      throw new Error('Failed to find user')

    const passwordIsVerified = await bcrypt.compare(password, get(user, 'password', ''))
    if ( !passwordIsVerified )
      throw new Error('Failed to verify password')

    const authToken = generateAuthToken({ ...pick(user, ['username, email']) })
    if ( !authToken )
      throw new Error('Failed to generate authentication token')

    res.status(201).send({ ...user, authToken })
  } catch (error) {
    return res.status(500).send(get(error, 'message', 'Authentication failed'))
  }
}