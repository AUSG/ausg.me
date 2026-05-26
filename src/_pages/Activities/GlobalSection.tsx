import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';

import activities from '@/data/activities.json';
import { usePrevNextButtons } from '../hooks/usePrevNextButton';
import { onPhotoError, photoPath } from './utils';

interface Event {
  name: string;
  tag: string;
  year: string;
  summary: string;
  photos: string[];
}

interface EventRowProps {
  event: Event;
  reverse?: boolean;
}

const EventRow = ({ event, reverse }: EventRowProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div
      className={clsx(
        'grid gap-4 lg:gap-8',
        'lg:grid-cols-[1.4fr_1fr] lg:items-stretch',
        reverse && 'lg:[&>*:first-child]:order-2'
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 lg:aspect-auto">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full touch-pan-x">
            {event.photos.map((file, i) => (
              <div className="embla__slide h-full" key={file}>
                <img
                  src={photoPath('global', file)}
                  onError={onPhotoError}
                  alt={`${event.name} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
          <span className="rounded-full bg-gray-900/60 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {event.tag}
          </span>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              aria-label="prev"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              aria-label="next"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-primary p-6 text-white lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {event.year}
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight lg:text-3xl">
            {event.name}
          </h3>
          <p
            className="text-white/85 mt-4 text-sm leading-relaxed lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {event.summary}
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-white/20 pt-4">
          <span className="text-xs text-white/60">{event.tag}</span>
          <span className="font-mono text-xs text-white/60">
            {String(event.photos.length).padStart(2, '0')} photos
          </span>
        </div>
      </div>
    </div>
  );
};

const GlobalSection = () => {
  const { index, label, title, description, events } = activities.global;

  return (
    <section id="global" className="bg-white py-16 lg:py-24">
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
            className="max-w-md text-sm leading-relaxed text-gray-900/60 lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {description}
          </p>
        </header>

        <div className="flex flex-col gap-10 lg:gap-16">
          {events.map((event, i) => (
            <EventRow key={event.name} event={event} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalSection;
