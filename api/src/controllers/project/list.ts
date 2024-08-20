import { Response } from "express";
import { RequestCustom } from "../../../types";
import models from "../../../models";
import get from 'lodash/get'

export default async (req: RequestCustom, res: Response) => {
  try {
    const userId = get(req, 'user._id', null)
    let projects = await models.Project.find({ userId }).lean()
    
    for (const project of projects) {
      project.tasks = await models.Task.find({ projectId: get(project, '_id', null) })
    }

    res.status(200).send({ rows: projects, count: projects.length })
  } catch (error) {
    res.status(500).send(get(error, 'message', 'Could not create project'))
  }
}