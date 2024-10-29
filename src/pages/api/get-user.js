import { PrismaClient } from '@prisma/client';
import { verifyTelegramAuth } from '../../utils/verifyTelegramAuth.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('GET /api/get-user');
  const { query } = req;
  const { initData } = query;

  // Vérifier l'authentification Telegram
  const userData = verifyTelegramAuth(initData);
  if (!userData) {
    return res.status(401).json({ error: 'Authentification invalide' });
  }

  const { id: telegramId } = userData;

  // Récupérer ou créer l'utilisateur
  let user = await prisma.user.findUnique({
    where: { telegramId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId,
      },
    });
  }

  res.status(200).json({
    points: user.points,
    energy: user.energy,
    lastTapTime: user.lastTapTime,
  });
}
