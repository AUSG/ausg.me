import {
  getBigchatData,
  type BigchatTalk,
  type BigchatYear,
} from '@/data/bigchat';
import {
  getPublicBigchatData,
  type PublicBigchat,
} from '@/data/public-bigchat';

export type { BigchatTalk, BigchatYear, PublicBigchat };

export const bigchatYears: BigchatYear[] = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2020',
  '2019',
  '2017',
  '2016',
];

const { bigchat } = getBigchatData();
const { publicBigchat: publicBigchatData } = getPublicBigchatData();

export const publicBigchat: PublicBigchat[] = publicBigchatData;

export const bigchatTalks: BigchatTalk[] = bigchat;
