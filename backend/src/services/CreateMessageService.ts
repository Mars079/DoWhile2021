import client from "../prisma/client"

import { io } from "../app"

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await client.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true,
      }
    })

    const infoWS = {
      id: message.id,
      text: message.text,
      user_id: message.user,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user?.avatar_url
      }
    }

    io.emit("new_message", infoWS)
    return message;
  }
}

export { CreateMessageService }