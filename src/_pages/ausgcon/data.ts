export interface AusgconCard {
  year: string;
  title: string;
  meta: string[];
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  eventPageUrl?: string;
  videoUrl?: string;
}

export const ausgconCards: AusgconCard[] = [
  {
    year: '2025',
    title: '2025 AUSGCON',
    meta: ['2025.09.13', 'AWS 센터필드'],
    imageSrc: '/images/ausgcon/ausgcon-2025.png',
    imageWidth: 1000,
    imageHeight: 500,
    eventPageUrl: 'https://2025.ausg.me/',
  },
  {
    year: '2024',
    title: '2024 AUSGCON',
    meta: ['2024.09.21', 'AWS 센터필드'],
    imageSrc: '/images/ausgcon/ausgcon-2024.png',
    imageWidth: 1000,
    imageHeight: 500,
    eventPageUrl: 'https://2024.ausg.me/',
  },
  {
    year: '2023',
    title: '2023 AUSGCON',
    meta: ['2023.06.03', 'AWS 센터필드'],
    imageSrc: '/images/ausgcon/ausgcon-2023.png',
    imageWidth: 1006,
    imageHeight: 499,
    videoUrl: 'https://www.youtube.com/channel/UCaN1L9bj7pCuv1PiKzx-2rQ',
  },
];
