import { Response } from "express";
import { RequestCustom } from "../../../types";
import get from 'lodash/get'
import { verifyJwtToken } from "../../libs";

export default async (req: RequestCustom, res: Response) => {
  try {
    const token = get(req, 'body.data.token', null)
    if ( !token )
      throw new Error('Token is missing and is required for verification')

    verifyJwtToken(token)
    
    res.status(200).end()
  } catch (error) {
    res.status(401).send(get(error, 'message', 'No access'))
  }
}