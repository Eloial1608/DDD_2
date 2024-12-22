import { DeletePlanForUsersCommand } from '@Core/PlanForUsers/application/Delete/DeletePlanForUsersCommand'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'

export class DeletePlanForUsersCommandMother {
  static delete (id: string, communityId: string): DeletePlanForUsersCommand {
    return new DeletePlanForUsersCommand(id, communityId)
  }

  static fromAggregate (planForUsers: PlanForUsers): DeletePlanForUsersCommand {
    return this.delete(
      planForUsers.id.valueOf(),
      planForUsers.communityId.valueOf()
    )
  }
}
