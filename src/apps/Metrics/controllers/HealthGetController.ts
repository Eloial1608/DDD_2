import { Request, Response } from 'express'
import { Controller } from './@types/Controller'

export class HealthGetController implements Controller {
  async run (req: Request, res: Response): Promise<Response> {
    return res.status(200).send()
  }
}
