import type { MouseEvent } from 'react';

export const PHOTO_BASE = '/activities';
export const PHOTO_PLACEHOLDER = '/images/activities/placeholder.svg';

export const photoPath = (file: string) => `${PHOTO_BASE}/${file}`;

export const onPhotoContextMenu = (e: MouseEvent<HTMLImageElement>) => {
  e.preventDefault();
};
