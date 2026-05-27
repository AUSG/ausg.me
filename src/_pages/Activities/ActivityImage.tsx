import { useState } from 'react';
import Image from 'next/image';

import { onPhotoContextMenu, photoPath, PHOTO_PLACEHOLDER } from './utils';

interface ActivityImageProps {
  alt: string;
  className?: string;
  file: string;
  objectPosition?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  sizes: string;
}

const ActivityImage = ({
  alt,
  className,
  file,
  objectPosition,
  priority = false,
  loading,
  sizes,
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
      quality={78}
      priority={priority}
      loading={loading}
      onError={() =>
        setSrc(current =>
          current === PHOTO_PLACEHOLDER ? current : PHOTO_PLACEHOLDER
        )
      }
      onContextMenu={onPhotoContextMenu}
      draggable={false}
      className={className}
    />
  );
};

export default ActivityImage;
