import crypto from 'crypto';

export function verifyTelegramAuth(initData) {
  const { TELEGRAM_BOT_TOKEN } = process.env;

  const secretKey = crypto
    .createHash('sha256')
    .update(TELEGRAM_BOT_TOKEN)
    .digest();

  const urlParams = new URLSearchParams(initData);
  const dataCheckString = Array.from(urlParams.entries())
    .filter(([key]) => key !== 'hash')
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const hash = urlParams.get('hash');

  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (hmac !== hash) {
    return null;
  }

  const userData = Object.fromEntries(urlParams);
  return JSON.parse(userData.user);
}
