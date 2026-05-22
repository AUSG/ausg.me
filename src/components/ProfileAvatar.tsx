import Image from 'next/image';
import clsx from 'clsx';

type ProfileAvatarSize = 'sm' | 'md' | 'lg';

const avatarSizeConfig: Record<
  ProfileAvatarSize,
  { className: string; sizes: string }
> = {
  sm: {
    className: 'h-[48px] w-[48px] xl:h-[60px] xl:w-[60px]',
    sizes: '(min-width: 1280px) 60px, 48px',
  },
  md: {
    className: 'h-12 w-12 md:h-14 md:w-14',
    sizes: '(min-width: 768px) 56px, 48px',
  },
  lg: {
    className: 'h-12 w-12 lg:h-24 lg:w-24',
    sizes: '(min-width: 1024px) 96px, 48px',
  },
};

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: ProfileAvatarSize;
  className?: string;
}

const ProfileAvatar = ({
  src,
  alt,
  size = 'md',
  className,
}: ProfileAvatarProps) => {
  const sizeConfig = avatarSizeConfig[size];

  return (
    <div
      className={clsx(
        'relative shrink-0 overflow-hidden rounded-full',
        sizeConfig.className,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        sizes={sizeConfig.sizes}
      />
    </div>
  );
};

export default ProfileAvatar;
