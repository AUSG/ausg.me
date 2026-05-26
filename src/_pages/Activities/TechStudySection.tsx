import clsx from 'clsx';

import activities from '@/data/activities.json';
import { onPhotoContextMenu, onPhotoError, photoPath } from './utils';

interface Track {
  title: string;
  subtitle: string;
  description: string;
  photo: string;
  size: string;
}

interface TrackCardProps {
  track: Track;
  large?: boolean;
}

const TrackCard = ({ track, large }: TrackCardProps) => (
  <article
    className={clsx(
      'group relative flex flex-col overflow-hidden rounded-3xl bg-gray-900 text-white',
      large ? 'lg:col-span-2 lg:row-span-2' : ''
    )}
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
      <img
        src={photoPath(track.photo)}
        onError={onPhotoError}
        onContextMenu={onPhotoContextMenu}
        alt={track.title}
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent" />
      <div className="absolute inset-x-5 bottom-5">
        <p
          className={clsx(
            'font-mono uppercase tracking-[0.18em] text-white/75',
            large ? 'text-xs lg:text-sm' : 'text-[10px] lg:text-xs'
          )}
        >
          {track.subtitle}
        </p>
        <h3
          className={clsx(
            'mt-1 font-bold leading-tight',
            large ? 'text-2xl lg:text-4xl' : 'text-lg lg:text-2xl'
          )}
        >
          {track.title}
        </h3>
      </div>
    </div>
    <p
      className={clsx(
        'p-5 leading-relaxed text-white/75',
        large ? 'text-sm lg:p-6 lg:text-base' : 'text-xs lg:text-sm'
      )}
      style={{ wordBreak: 'keep-all' }}
    >
      {track.description}
    </p>
  </article>
);

const TechStudySection = () => {
  const { index, label, title, description, tracks } = activities.techStudy;
  const [hero, ...rest] = tracks;

  return (
    <section id="tech-study" className="bg-gray-100 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 lg:px-8">
        <header className="mb-10 flex flex-col gap-3 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-baseline gap-3 text-gray-900/50">
              <span className="font-mono text-sm lg:text-base">{index}</span>
              <span className="text-xs font-semibold tracking-[0.25em] lg:text-sm">
                {label}
              </span>
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-gray-900 lg:text-5xl"
              style={{ wordBreak: 'keep-all' }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-md whitespace-pre-line text-sm leading-relaxed text-gray-900/60 lg:text-right lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <TrackCard track={hero} large />
          {rest.map(track => (
            <TrackCard key={track.title} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStudySection;
