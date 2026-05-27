/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { onPhotoContextMenu, photoPath, PHOTO_PLACEHOLDER } from './utils';

interface ActivityImageProps {
  alt: string;
  className?: string;
  file: string;
  objectPosition?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

const ActivityImage = ({
  alt,
  className,
  file,
  objectPosition,
  priority = false,
  loading,
}: ActivityImageProps) => {
  const [src, setSrc] = useState(photoPath(file));

  return (
    <img
      src={src}
      alt={alt}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding="async"
      onError={() =>
        setSrc(current =>
          current === PHOTO_PLACEHOLDER ? current : PHOTO_PLACEHOLDER
        )
      }
      onContextMenu={onPhotoContextMenu}
      draggable={false}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
};

export default ActivityImage;
