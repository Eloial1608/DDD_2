import { UpdateIsAdminCommand } from "@Core/User/application/UpdateIsAdmin/UpdateIsAdminUserCommand";
import { User } from "@Core/User/domain/User";


export class UpdateIsAdminUserCommandMother{
    static updateIsAdmin(
        id: string,
        isAdmin: boolean,
        communityId: string
    ):UpdateIsAdminCommand{
        return new UpdateIsAdminCommand(
            id,
            isAdmin,
            communityId
        )
    }

    static fromAggregate(user: User): UpdateIsAdminCommand{
        return this.updateIsAdmin(
            user.id.valueOf(),
            user.isAdmin.valueOf(),
            user.communityId.valueOf()
        )
    }
}