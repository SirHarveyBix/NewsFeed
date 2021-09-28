import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  globalThis['prisma'] = globalThis['prisma'] || new PrismaClient();
  prisma = globalThis['prisma'];
}
export const context = async ({ request, response }) => {
  try {
    const { user: auth0User } = getSession(request, response);
    // const auth0User = { nickname: 'faker', sub: '1', picture: '/blank.png' }; // fake user
    let user = await prisma.user.findUnique({ where: { auth0: auth0User.sub } });
    if (!user) {
      const { picture, nickname, sub } = auth0User;
      user = await prisma.user.create({
        data: {
          id: uuidv4(),
          auth0: sub,
          picture,
          nickname,
        },
      });
    }
    return { user, prisma };
  } catch (error) {
    return { user: {}, prisma };
  }
};
