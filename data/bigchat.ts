import bigchatJson from '@/data/bigchat.json';

export type BigchatYear =
  | '2026'
  | '2025'
  | '2024'
  | '2023'
  | '2022'
  | '2020'
  | '2019'
  | '2017'
  | '2016';

export interface BigchatTalk {
  year: BigchatYear;
  title: string;
  speaker: string;
  avatarSpeakers?: string[];
  imageSrc?: string;
  videoUrl?: string;
}

export interface BigchatData {
  bigchat: BigchatTalk[];
}

export const getBigchatData = (): BigchatData => {
  return bigchatJson as BigchatData;
};
