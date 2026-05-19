import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserResponse } from '@Core/User/application/UserResponse'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'

export class UserGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
      }

      const query = new FindUserByIdQuery(userId)

      const response = await this.queryBus.ask<UserResponse>(query)

      return res.status(200).json({
        message: 'User retrieved successfully',
        data: { user: response.response }
      })
    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }
      if (e instanceof UserNotFound) {
        return res.status(404).json({ message: 'User not found' })
      }

      console.error('UserGetController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}