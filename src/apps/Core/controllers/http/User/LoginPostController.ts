import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import jwt from 'jsonwebtoken'

export class LoginPostController implements Controller {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' })
      }

      const users = await this.userRepository.search(
        new Criteria(
          new Filters([
            Filter.simple('email', '=', email)
          ])
        )
      )

      const user = users.pop()

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const passwordMatch = await user.password.comparePassword(password)
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        console.error('JWT_SECRET not configured')
        return res.status(500).json({ message: 'Server configuration error' })
      }

      const token = jwt.sign(
        { id: user.id.valueOf() },
        jwtSecret,
        { expiresIn: '1h', algorithm: 'HS512' }
      )

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      })

      return res.status(200).json({
        token,
        user: {
          id: user.id.valueOf(),
          name: user.name.valueOf(),
          username: user.username.valueOf(),
          email: user.email.valueOf(),
          isAdmin: user.isAdmin.valueOf(),
          createdAt: user.createdAt.valueOf(),
          updatedAt: user.updatedAt.valueOf()
        }
      })

    } catch (e) {
      console.error(e)

      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}