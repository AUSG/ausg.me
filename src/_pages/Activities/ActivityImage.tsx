import { useState } from 'react';
import Image from 'next/image';

import { onPhotoContextMenu, PHOTO_PLACEHOLDER, photoPath } from './utils';

interface ActivityImageProps {
  file: string;
  alt: string;
  sizes: string;
  className?: string;
  objectPosition?: string;
}

const ActivityImage = ({
  file,
  alt,
  sizes,
  className,
  objectPosition,
}: ActivityImageProps) => {
  const [src, setSrc] = useState(photoPath(file));

  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition={objectPosition}
      sizes={sizes}
      className={className}
      draggable={false}
      onContextMenu={onPhotoContextMenu}
      onError={() => {
        setSrc(PHOTO_PLACEHOLDER);
      }}
      unoptimized={src === PHOTO_PLACEHOLDER}
    />
  );
};

export default ActivityImage;
