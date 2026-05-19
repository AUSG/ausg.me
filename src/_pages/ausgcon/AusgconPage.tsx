import Head from 'next/head';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import ArrowRightIcon from '@/public/icons/arrow_right.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import videoData from '@/data/videos.json';
import { usePrevNextButtons } from '@/src/_pages/hooks/usePrevNextButton';
import Header from '@/src/components/Header';
import { ausgconCards } from './data';

interface VideoItem {
  speaker: string;
  title: string;
  embedUrl: string;
}

const youtubeUrl = 'https://www.youtube.com/channel/UCaN1L9bj7pCuv1PiKzx-2rQ';

const CarouselArrow = ({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    aria-label={direction === 'prev' ? 'Previous video' : 'Next video'}
    className="disabled:text-gray-200"
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    <svg width={32} height={32} viewBox="0 0 532 532">
      <path
        fill="currentColor"
        d={
          direction === 'prev'
            ? 'M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z'
            : 'M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z'
        }
      />
    </svg>
  </button>
);

const VideoCarousel = ({
  videos,
  title,
}: {
  videos: VideoItem[];
  title: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div>
      <h2 className="ml-5 mt-8 text-lg font-bold md:ml-8 md:text-2xl lg:mt-16">
        {title}
      </h2>
      <div className="embla mt-3">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container touch-pan-x">
            {videos.map(video => (
              <div className="embla__slide" key={video.embedUrl}>
                <iframe
                  className="flex h-[var(--slide-height)] w-full"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-end p-4">
          <div className="flex gap-6">
            <CarouselArrow
              direction="prev"
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            />
            <CarouselArrow
              direction="next"
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AusgconCardImage = ({ card }: { card: typeof ausgconCards[number] }) => {
  const image = (
    <Image
      src={card.imageSrc}
      alt={`${card.title} poster`}
      width={card.imageWidth}
      height={card.imageHeight}
      layout="responsive"
      objectFit="cover"
      priority={card.year === '2025'}
    />
  );

  if (!card.href) {
    return image;
  }

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${card.title} website`}
      className="block transition-opacity hover:opacity-90"
    >
      {image}
    </a>
  );
};

const YoutubeLink = () => (
  <div className="mb-16 mt-4 flex justify-center md:mt-8">
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center p-2"
    >
      <YoutubeIcon className="h-6 w-6 fill-gray-900 md:h-8 md:w-8" />
      <div className="mx-2 font-semibold md:text-xl">유튜브 보러가기</div>
      <ArrowRightIcon className="h-6 w-6 fill-sub md:h-8 md:w-8" />
    </a>
  </div>
);

export default function AusgconPage() {
  return (
    <>
      <Head>
        <title>AUSG - AUSGCON</title>
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="md:mx-auto md:max-w-screen-xl">
          <Header />
        </div>

        <header className="flex h-[180px] items-center bg-primary px-4 text-white">
          <div className="container mx-auto text-center">
            <h1 className="mb-4 text-2xl font-bold md:text-4xl">AUSGCON</h1>
            <p
              className="mx-auto max-w-3xl text-base md:text-lg"
              style={{ wordBreak: 'keep-all' }}
            >
              아우쓱은 클라우드 커뮤니티로서, 모두가 지식 공유자가 되어 성장하는
              공간을 만들어가고 있습니다.
              <br />
              AUSGCON은 아우쓱이{' '}
              <strong className="font-extrabold">
                세상에 공유하고자 하는 가치
              </strong>
              를 담은 행사입니다.
            </p>
          </div>
        </header>

        <section className="py-12">
          <div className="lg:mx-auto lg:max-w-screen-xl">
            <VideoCarousel
              videos={videoData.ausgconVideos}
              title="지난 AUSGCON VIDEOS"
            />
          </div>

          <div className="mt-10 space-y-10 px-4 pb-16 md:mt-16 md:space-y-14">
            {ausgconCards.map(card => (
              <article
                key={card.year}
                className="mx-auto max-w-[1120px] rounded-[28px] bg-white p-5 shadow-[0_18px_36px_rgba(18,20,26,0.14)] md:p-8"
              >
                <h3 className="mb-5 text-center text-[22px] font-bold leading-8 text-gray-900 md:text-[36px] md:leading-[50px]">
                  {card.title}
                </h3>
                <div className="mx-auto w-full max-w-[1000px] overflow-hidden">
                  <AusgconCardImage card={card} />
                </div>
              </article>
            ))}
          </div>

          <YoutubeLink />
        </section>
      </main>
    </>
  );
}
