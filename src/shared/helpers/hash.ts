import crypto from 'node:crypto';

export function createSHA256(line: string, salt: string): string {
  const hash = crypto.createHmac('sha256', salt).update(line).digest('hex');
  return hash.slice(0, 12);
}
