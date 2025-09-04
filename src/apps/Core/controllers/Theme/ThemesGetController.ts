import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { ThemeResponseBody } from '@Core/Theme/application/ThemeResponse'
import { ThemeNotFound } from '@Core/Theme/domain/Errors/ThemeNotFound'
import { FindThemesByCriteriaQuery } from '@Core/Theme/application/FindByCriteria/FindThemesByCriteriaQuery'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { ThemeCollectionResponse } from '@Core/Theme/application/ThemeCollectionResponse'

export class ThemesGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindThemesByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const themes = (await this.queryBus.ask<ThemeCollectionResponse>(query)).response

      const themeToSend = []

      for (const theme of themes) {
        const p = await this.filterTheme(theme, req.headers.authorization as string)
        if (p) themeToSend.push(p)
      }

      return res.status(200).json(themeToSend)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThemeNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterTheme (theme: ThemeResponseBody, token: string) {
    if (theme.communityId == null) return theme

    if (!token) return

    const data = await this.decoder.run(token)

    if (data.communityId !== theme.communityId) return

    return theme
  }
}
