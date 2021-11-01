import client from "../prisma/client";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await client.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        socials: true,
      }
    });

    return user;
  }
}

export { ProfileUserService };