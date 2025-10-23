import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindThemeByIdQuery } from '@Core/Theme/application/FindById/FindThemeByIdQuery'
import { ThemeResponse } from '@Core/Theme/application/ThemeResponse'
import { ThemeNotFound } from '@Core/Theme/domain/Errors/ThemeNotFound'

export class ThemeGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindThemeByIdQuery(req.params.id)

      const theme = (await this.queryBus.ask<ThemeResponse>(query)).response

      if (theme.communityId) {
        if (req.headers.authorization) {
          const data = await this.decoder.run(req.headers.authorization)

          if (data.communityId !== theme.communityId) {
            return res.status(403).send()
          }
        }
      }

      return res.status(200).json(theme)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThemeNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
