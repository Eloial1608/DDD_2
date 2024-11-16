import { Command } from '@Shared/domain/CommandBus/Command';
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { mockFn } from '../../../mockUtils';


export class CommandBusMock implements CommandBus {

    private dispatcher = mockFn()

    async dispatch(command: Command): Promise<void> {
        this.dispatcher(command)
    }

    assertCommandHasBeenDispatch(command: Command): void {
        expect(this.dispatcher).toHaveBeenCalledWith(command)
    }
    
}