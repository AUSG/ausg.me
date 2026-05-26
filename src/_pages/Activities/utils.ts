import type { SyntheticEvent } from 'react';

export const PHOTO_BASE = '/images/activities';
export const PHOTO_PLACEHOLDER = `${PHOTO_BASE}/placeholder.svg`;

export type PhotoFolder = 'global' | 'study' | 'warmup' | 'coffeechat';

export const photoPath = (folder: PhotoFolder, file: string) =>
  `${PHOTO_BASE}/${folder}/${file}`;

export const onPhotoError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  if (img.src.endsWith('placeholder.svg')) return;
  img.src = PHOTO_PLACEHOLDER;
};
