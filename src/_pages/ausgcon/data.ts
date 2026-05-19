export interface AusgconCard {
  year: string;
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  href?: string;
}

export const ausgconCards: AusgconCard[] = [
  {
    year: '2025',
    title: '2025 AUSGCON',
    imageSrc: '/images/ausgcon/ausgcon-2025.png',
    imageWidth: 1000,
    imageHeight: 500,
    href: 'https://2025.ausg.me/',
  },
  {
    year: '2024',
    title: '2024 AUSGCON',
    imageSrc: '/images/ausgcon/ausgcon-2024.png',
    imageWidth: 1000,
    imageHeight: 500,
    href: 'https://2024.ausg.me/',
  },
  {
    year: '2023',
    title: '2023 AUSGCON',
    imageSrc: '/images/ausgcon/ausgcon-2023.png',
    imageWidth: 1006,
    imageHeight: 499,
  },
];
