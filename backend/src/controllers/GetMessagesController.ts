import { Request, Response } from "express";
import { GetMessagesService } from "../services/GetMessagesService";

class GetMessagesController {
  async handle(req: Request, res: Response) {
    const service = new GetMessagesService();
    const cursor = parseInt(req.query?.cursor as string);
    const result = await service.execute(cursor || undefined);
    return res.json(result);
  }
}

export { GetMessagesController };