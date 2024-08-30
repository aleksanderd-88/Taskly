import { Response } from "express";
import models from '../../../models'
import { requestIsValid } from '../../libs'
import { sendMail } from '../../libs/mail'
import { get, pick } from "lodash";
import { validate } from "email-validator";
import dotenv from 'dotenv'
import { generateAuthToken } from "../../libs";
import { RequestCustom } from "../../../types";

dotenv.config()

export default async (req: RequestCustom, res: Response) => {
  try {
    const data = get(req, 'body.data', null)
  
    // Sanity check
    if ( !requestIsValid(pick(data, ['name'])) )
      throw new Error('One or more parameters are missing')
    
    let { name, members } = data

    const projectExist = await models.Project.findOne({ name, isDeleted: false })
    if ( projectExist )
      throw new Error('Project with this name already exist. Please choose another name.')

    data.userId = get(req, 'user._id', null)

    const newData = { ...data, members: members.map((member: string) => ({ email: member })) }

    const project = await models.Project.create(newData)
    if ( !project )
      throw new Error('Failed to create project')

    for (const member of members) {
      if ( member && !validate(member) )
        throw new Error('Member email address is not valid')

      await sendMail({
        recipient: member,
        subject: 'Invitation',
        html: `
          <p>You have been invited to join a project</p>
          <p>Project to join: <b>@Taskly/${ name }<b></p>
          <a href="${ process.env.PROJECT_JOIN_REDIRECT_URL }/projects/${ project._id }/join/${ generateAuthToken({ email: member }, '24h') }" target="_blank">
            Accept invitation
          </a>
        `
      })
    }

    res.status(201).end()
  } catch (error) {
    res.status(500).send(get(error, 'message', 'Could not create project'))
  }
}