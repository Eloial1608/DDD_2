import { Request, Response } from "express";

export interface IController {
    run (req: Request, res: Response): Promise<Response>
}