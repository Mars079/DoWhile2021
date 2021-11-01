import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { GetMessagesController } from "./controllers/GetMessagesController";
import { ProfileUserController } from "./controllers/Profile";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.get("/messages", new GetMessagesController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }