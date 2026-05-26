import type { CSSProperties } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import activities from '@/data/activities.json';
import { usePrevNextButtons } from '../hooks/usePrevNextButton';
import { onPhotoError, photoPath } from './utils';

const sliderStyle = {
  '--slide-size': '78%',
} as CSSProperties;

const WarmUpSection = () => {
  const { index, label, title, description, photos } = activities.warmUp;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section id="warm-up" className="bg-primary py-16 text-white lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 lg:px-8">
        <header className="mb-10 flex flex-col gap-3 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-baseline gap-3 text-white/60">
              <span className="font-mono text-sm lg:text-base">{index}</span>
              <span className="text-xs font-semibold tracking-[0.25em] lg:text-sm">
                {label}
              </span>
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight lg:text-5xl"
              style={{ wordBreak: 'keep-all' }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed text-white/75 lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {description}
          </p>
        </header>
      </div>

      <div
        className="embla pl-5 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]"
        style={sliderStyle}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container touch-pan-x">
            {photos.map((photo, i) => (
              <div className="embla__slide" key={photo.file}>
                <figure className="flex flex-col">
                  <div className="aspect-[3/2] overflow-hidden rounded-3xl bg-white/10">
                    <img
                      src={photoPath('warmup', photo.file)}
                      onError={onPhotoError}
                      alt={photo.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-white/80">
                    <span className="text-sm font-semibold lg:text-base">
                      {photo.caption}
                    </span>
                    <span className="font-mono text-xs">
                      {String(i + 1).padStart(2, '0')} /{' '}
                      {String(photos.length).padStart(2, '0')}
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-screen-xl items-center justify-end gap-3 px-5 lg:mt-10 lg:px-8">
        <button
          type="button"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="prev"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
    </section>
  );
};

export default WarmUpSection;
