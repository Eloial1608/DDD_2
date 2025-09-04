import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityOnboardingStepPatchController } from '@Apps/Core/controllers/Community/CommunityOnboardingStepPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityOnboardingStepPatchController>('Apps.Core.Controllers.CommunityOnboardingStepPatchController')
  router.patch('/v1/communities/onboarding-step/:id', (req: Request, res: Response) => controller.run(req, res))
}
