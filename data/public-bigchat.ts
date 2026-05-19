import publicBigchatJson from '@/data/public-bigchat.json';

export interface PublicBigchat {
  date: string;
  speaker: string;
  title: string;
  backgroundYear: 2021 | 2023;
  videoUrl?: string;
}

export interface PublicBigchatData {
  publicBigchat: PublicBigchat[];
}

export const getPublicBigchatData = (): PublicBigchatData => {
  return publicBigchatJson as PublicBigchatData;
};
