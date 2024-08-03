import { Response } from "express";
import { RequestCustom } from "../../../types";
import models from "../../../models";
import get from 'lodash/get'

export default async (req: RequestCustom, res: Response) => {
  try {
    const userId = get(req, 'user._id', null)
    const projects = await models.Project.find({ userId }).lean()
    res.status(200).send({ rows: projects, count: projects.length })
  } catch (error) {
    res.status(500).send(get(error, 'message', 'Could not create project'))
  }
}