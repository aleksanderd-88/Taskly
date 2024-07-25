import { Request, Response } from 'express'
import models from '../../../models'
import get from 'lodash/get'
import bcrypt from 'bcryptjs'
import { requestIsValid } from '../../libs'

export default async (req: Request, res: Response) => {
  try {
    const data = get(req, 'body.data', null)
  
    // Sanity check
    if ( !requestIsValid(data) )
      throw new Error('One or more parameters are missing')
    
    const { password, verifiedPassword } = data

    if ( password !== verifiedPassword )
      throw new Error('Please verify password')

    data.password = await bcrypt.hash(password, 10)
    delete data.verifiedPassword // Don't need this

    const user = await models.User.create(data)
    res.status(201).send(user)
  } catch (error) {
    return res.status(500).send(get(error, 'message', 'Could not create user'))
  }
}