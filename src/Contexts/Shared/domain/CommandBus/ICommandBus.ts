import { Command } from "./Command";

export interface ICommandBus {
    dispatch(command: Command): Promise<void>
}