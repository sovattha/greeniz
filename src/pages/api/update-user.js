import { PrismaClient } from '@prisma/client';
import { verifyTelegramAuth } from '../../utils/verifyTelegramAuth.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { initData, energy, points, lastTapTime } = req.body;

  // Vérifier l'authentification Telegram
  const userData = verifyTelegramAuth(initData);
  if (!userData) {
    return res.status(401).json({ error: 'Authentification invalide' });
  }

  const { id: telegramId } = userData;

  // Mettre à jour les données de l'utilisateur
  const user = await prisma.user.update({
    where: { telegramId },
    data: {
      energy,
      points,
      lastTapTime: new Date(lastTapTime),
    },
  });

  res.status(200).json({ status: 'success' });
}
