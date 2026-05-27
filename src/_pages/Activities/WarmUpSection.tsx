import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import activities from '@/data/activities.json';
import { usePrevNextButtons } from '../hooks/usePrevNextButton';
import ActivityImage from './ActivityImage';

const AUTOPLAY_INTERVAL = 4000;

const WarmUpSection = () => {
  const { index, label, title, description, photos } = activities.warmUp;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return undefined;
    let paused = false;
    const root = emblaApi.rootNode();
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    root.addEventListener('mouseenter', onEnter);
    root.addEventListener('mouseleave', onLeave);
    const id = setInterval(() => {
      if (!paused) emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => {
      clearInterval(id);
      root.removeEventListener('mouseenter', onEnter);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [emblaApi]);

  return (
    <section id="warm-up" className="bg-primary py-12 text-white lg:py-16">
      <div className="mx-auto max-w-screen-xl px-5 lg:px-8">
        <header className="mb-8 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-baseline gap-3 text-white/60">
              <span className="font-mono text-sm lg:text-base">{index}</span>
              <span className="text-xs font-semibold tracking-[0.25em] lg:text-sm">
                {label}
              </span>
            </div>
            <h2
              className="mt-3 max-w-2xl text-2xl font-bold leading-tight lg:text-4xl"
              style={{ wordBreak: 'keep-all' }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-md whitespace-pre-line text-sm leading-relaxed text-white/75 lg:text-right lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {description}
          </p>
        </header>
      </div>

      <div className="embla [--slide-size:80%] md:[--slide-size:50%] lg:[--slide-size:38%]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container cursor-grab touch-pan-x select-none active:cursor-grabbing">
            {photos.map((photo, i) => (
              <div className="embla__slide" key={photo.file}>
                <figure className="flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/10">
                    <ActivityImage
                      file={photo.file}
                      alt={photo.caption}
                      className="h-full w-full object-cover"
                      objectPosition={
                        'objectPosition' in photo
                          ? photo.objectPosition
                          : undefined
                      }
                      sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 80vw"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-white/80">
                    <span className="text-xs font-semibold lg:text-sm">
                      {photo.caption}
                    </span>
                    <span className="font-mono text-[10px] lg:text-xs">
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

      <div className="mx-auto mt-6 flex max-w-screen-xl items-center justify-end gap-3 px-5 lg:mt-8 lg:px-8">
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
