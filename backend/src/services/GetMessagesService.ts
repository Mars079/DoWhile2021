import client from "../prisma/client";

class GetMessagesService {
  async execute(cursor: number) {
    const messages = await client.message.findMany({
      take: 10,
      where: {
        id: {
          lte: cursor
        }
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetMessagesService };