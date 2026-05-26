import type { MouseEvent, SyntheticEvent } from 'react';

export const PHOTO_BASE = '/activities';
export const PHOTO_PLACEHOLDER = '/images/activities/placeholder.svg';

export const photoPath = (file: string) => `${PHOTO_BASE}/${file}`;

export const onPhotoError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  if (img.src.endsWith('placeholder.svg')) return;
  img.src = PHOTO_PLACEHOLDER;
};

export const onPhotoContextMenu = (e: MouseEvent<HTMLImageElement>) => {
  e.preventDefault();
};
