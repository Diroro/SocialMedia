import SHA256 from 'crypto-js/sha256';
import { APP_SECRET } from '../../secrets';

export const hash = (text: string): string => SHA256(`${APP_SECRET}${text}${APP_SECRET}`).toString();
