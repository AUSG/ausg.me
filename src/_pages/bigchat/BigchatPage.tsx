import { useState, type ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';

import ArrowRightIcon from '@/public/icons/arrow_right.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import BooksImage from '@/public/images/books.svg';
import ShareImage from '@/public/images/share.svg';
import { getPeopleData, type Person } from '@/data/people';
import videoData from '@/data/videos.json';
import Header from '@/src/components/Header';
import { usePrevNextButtons } from '@/src/_pages/hooks/usePrevNextButton';
import BigChatBackground from '@/src/_pages/index/components/BigChatBackground';
import {
  bigchatTalks,
  bigchatYears,
  publicBigchat,
  type BigchatTalk,
  type BigchatYear,
  type PublicBigchat,
} from './data';

type BigchatTab = 'publicBigchat' | 'bigchat';

interface VideoItem {
  speaker: string;
  title: string;
  embedUrl: string;
}

const tabs: { id: BigchatTab; label: string }[] = [
  { id: 'publicBigchat', label: 'Public Bigchat' },
  { id: 'bigchat', label: 'Bigchat' },
];

const yearPaginationItems: {
  label: string;
  targetYear: BigchatYear;
  activeYears: BigchatYear[];
}[] = [
  { label: '2026', targetYear: '2026', activeYears: ['2026'] },
  { label: '2025', targetYear: '2025', activeYears: ['2025'] },
  { label: '2024', targetYear: '2024', activeYears: ['2024'] },
  { label: '2023', targetYear: '2023', activeYears: ['2023'] },
  { label: '2022', targetYear: '2022', activeYears: ['2022'] },
  {
    label: '2020 ~',
    targetYear: '2020',
    activeYears: ['2020', '2019', '2017', '2016'],
  },
];

const featureCards = [
  {
    id: 'share',
    title: '우리 모두가 지식 공유자',
    description:
      'AUSG에서는 모두가 빅챗에 참여해 저마다의 클라우드 개발 경험과 노하우를 멤버들과 공유해요. AUSG에 합류하는 순간부터, 모두가 지식 공유자가 되는거죠.',
  },
  {
    id: 'books',
    title: '나누면서 더 커지는 지식',
    description:
      '내가 알고 있던 것도, 모르고 있던 것도 나누는 순간 내 것이 되는 경험. AUSG 멤버들과 함께 성장해요.',
  },
];

const youtubeUrl = 'https://www.youtube.com/channel/UCaN1L9bj7pCuv1PiKzx-2rQ';
const peopleByKoreanName = new Map<string, Person>(
  getPeopleData().people.map(person => [person.name_ko, person])
);

interface MatchedSpeaker {
  name: string;
  person?: Person;
}

const formatGeneration = (year: string) => {
  const generation = year.match(/^(\d+)(st|nd|rd|th)$/);

  return generation ? `${generation[1]}기` : year;
};

const getMatchedSpeakers = (speaker: string): MatchedSpeaker[] =>
  speaker
    .split(',')
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => ({
      name,
      person: peopleByKoreanName.get(name),
    }));

const getSpeakerText = (speaker: MatchedSpeaker) =>
  speaker.person
    ? `${speaker.name} *${formatGeneration(speaker.person.year)}`
    : speaker.name;

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

const FeatureCards = ({ compact = false }: { compact?: boolean }) => (
  <>
    <div
      className={clsx('mt-6 overflow-hidden lg:hidden', compact && 'lg:mt-0')}
    >
      <div className="flex w-full select-none overflow-x-auto pb-2">
        {featureCards.map(feature => (
          <div
            key={feature.id}
            className="relative mx-2 min-w-[80%] justify-between rounded-3xl bg-gray-100 p-5 md:min-w-[90%]"
          >
            <div className="mr-8">
              <h4 className="text-base font-semibold">{feature.title}</h4>
              <p className="mt-1.5 text-sm" style={{ wordBreak: 'keep-all' }}>
                {feature.description}
              </p>
            </div>
            <div className="mt-4 -mb-4 flex justify-end">
              {feature.id === 'share' ? (
                <ShareImage className="h-[100px] w-[105px]" />
              ) : (
                <BooksImage className="h-[120px] w-[105px]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div
      className={clsx(
        'mx-8 mt-16 hidden select-none gap-12 lg:flex',
        compact && 'lg:m-0 lg:flex-col lg:gap-6'
      )}
    >
      {featureCards.map(feature => (
        <div
          key={feature.id}
          className="flex flex-1 justify-between rounded-3xl bg-gray-100 p-5"
        >
          <div className="mr-6">
            <h4 className="text-xl font-semibold">{feature.title}</h4>
            <p className="mt-3 text-base" style={{ wordBreak: 'keep-all' }}>
              {feature.description}
            </p>
          </div>
          <div className="-mb-4 mt-10 flex items-end">
            {feature.id === 'share' ? (
              <ShareImage className="h-[150px] w-[180px]" />
            ) : (
              <BooksImage className="h-[160px] w-[140px]" />
            )}
          </div>
        </div>
      ))}
    </div>
  </>
);

const VideoCarousel = ({
  videos,
  title,
  className,
}: {
  videos: VideoItem[];
  title: string;
  className?: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={className}>
      <h3 className="ml-5 mt-8 text-lg font-bold md:ml-8 md:text-2xl lg:mt-16">
        {title}
      </h3>
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

const BigchatHero = ({ title }: { title: ReactNode }) => (
  <div className="h-[280px] bg-primary p-5 md:py-20 md:text-center">
    <h2 className="text-2xl font-semibold text-white md:text-4xl">{title}</h2>

    <p className="mt-4 text-white lg:mt-8" style={{ wordBreak: 'keep-all' }}>
      다양한 분야의 AUSG 멤버들이 한 데 모여 클라우드 개발 경험과 노하우를
      공유해요.
    </p>
  </div>
);

const publicBigchatCardClassName =
  'relative mr-4 h-[240px] flex-shrink-0 basis-[180px] overflow-hidden rounded-[20px] md:mr-0 md:aspect-[180/240] md:h-auto md:w-full md:basis-auto';

const PublicBigchatCardContent = ({ item }: { item: PublicBigchat }) => (
  <>
    <BigChatBackground year={item.backgroundYear} />
    <div className="absolute left-1/2 top-[29%] flex h-[13%] w-[61%] -translate-x-1/2 items-center justify-center rounded-sm bg-[#e6e6e6] text-center text-[11px] font-bold text-[#676767]">
      {item.date}
    </div>
    <div className="absolute left-[8%] right-[8%] top-[43%] h-[17%] bg-[#e7e7e7]" />
    <div className="absolute left-1/2 top-[51%] w-[84%] -translate-x-1/2 -translate-y-1/2 text-center text-[20px] font-extrabold leading-[26px] text-[#626262] lg:text-[24px] lg:leading-[30px]">
      Public BigChat
    </div>
    <div className="absolute inset-x-1 bottom-1 max-h-[38%] overflow-hidden rounded-[20px] bg-gray-900 bg-opacity-70 p-2.5 text-white">
      <div className="text-xs">{item.speaker}</div>
      <div
        className="mt-0.5 text-sm font-semibold leading-[17px]"
        style={{ wordBreak: 'keep-all' }}
      >
        {item.title}
      </div>
    </div>
  </>
);

const PublicBigchatCard = ({ item }: { item: PublicBigchat }) => {
  const ariaLabel = `${item.speaker} ${item.title}`;

  if (item.videoUrl) {
    return (
      <a
        href={item.videoUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={clsx(publicBigchatCardClassName, 'hover:opacity-90')}
      >
        <PublicBigchatCardContent item={item} />
      </a>
    );
  }

  return (
    <article
      aria-label={ariaLabel}
      className={clsx(publicBigchatCardClassName, 'cursor-default')}
    >
      <PublicBigchatCardContent item={item} />
    </article>
  );
};

const PublicBigchatGrid = () => (
  <>
    <h3 className="ml-5 mt-8 text-lg font-bold md:ml-8 md:text-2xl lg:mt-16">
      Public Big Chat Featured
    </h3>
    <div className="mt-3 flex overflow-x-auto px-5 pb-4 md:mt-12 md:grid md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] md:gap-x-8 md:gap-y-8 md:overflow-visible md:px-8">
      {publicBigchat.map(item => (
        <PublicBigchatCard
          key={`${item.date}-${item.speaker}-${item.title}`}
          item={item}
        />
      ))}
    </div>
  </>
);

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

const PublicBigchatSection = () => (
  <>
    <BigchatHero title="PUBLIC BIG CHAT" />

    <div className="lg:mx-auto lg:max-w-screen-xl">
      <FeatureCards />
      <VideoCarousel
        videos={videoData.bigChatVideos}
        title="Last Public Big Chat Video"
      />
      <PublicBigchatGrid />
      <YoutubeLink />
    </div>
  </>
);

const YearPagination = ({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: BigchatYear;
  onSelectYear: (year: BigchatYear) => void;
}) => (
  <nav
    aria-label="Bigchat year pagination"
    className="mt-8 flex justify-center overflow-x-auto px-5 md:mt-12"
  >
    <div className="flex h-14 min-w-max items-center justify-center gap-[6px] rounded-full border border-[#dde2ff] bg-[rgba(255,255,255,0.94)] px-2 py-1.5 shadow-[0_2px_6px_rgba(69,77,255,0.08),0_12px_28px_rgba(40,49,120,0.12)]">
      {yearPaginationItems.map(item => {
        const isActive = item.activeYears.includes(selectedYear);

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelectYear(item.targetYear)}
            className={clsx(
              'h-11 w-20 rounded-full text-[15px] font-semibold leading-5 transition-colors',
              isActive
                ? 'bg-gradient-to-r from-[#454dff] to-[#2834e0] text-white shadow-[0_8px_8px_rgba(69,77,255,0.22)]'
                : 'border border-[rgba(221,226,255,0.72)] bg-[rgba(247,248,255,0.72)] text-[#525b75] hover:text-primary'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  </nav>
);

const SpeakerAvatarGroup = ({ speakers }: { speakers: MatchedSpeaker[] }) => {
  const speaker = speakers[0];

  return (
    <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center md:h-[102px] md:w-[106px]">
      <div className="relative h-[82px] w-[82px] overflow-hidden rounded-full bg-gray-100 md:h-[102px] md:w-[106px]">
        <Image
          src={
            speaker?.person
              ? `/people/${speaker.person.photo}`
              : '/images/profile-1.png'
          }
          alt={`${speaker?.name ?? 'Bigchat speaker'} profile`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

const TalkCard = ({ talk }: { talk: BigchatTalk }) => {
  const speakers = getMatchedSpeakers(talk.speaker);
  const avatarSpeakers = talk.avatarSpeakers
    ? talk.avatarSpeakers.map(speaker => ({
        name: speaker,
        person: peopleByKoreanName.get(speaker),
      }))
    : speakers;

  return (
    <article className="grid gap-4 rounded-[20.353px] bg-white p-5 shadow-[0_1.696px_1.696px_rgba(0,0,0,0.05)] md:min-h-[142.487px] md:grid-cols-[106px_minmax(0,1fr)_40px] md:items-center md:gap-x-6 md:px-[27.293px] md:py-5">
      <SpeakerAvatarGroup speakers={avatarSpeakers} />
      <div className="min-w-0 md:max-w-[900px]">
        <h3
          className="text-[20px] font-bold leading-8 text-black md:text-[25px] md:leading-[47.491px]"
          style={{ wordBreak: 'keep-all' }}
        >
          {talk.title}
        </h3>
        <p
          className="mt-1 text-[18px] font-medium leading-7 text-gray-700 md:mt-0 md:text-[22px] md:leading-[40.707px]"
          style={{ wordBreak: 'keep-all' }}
        >
          {speakers.map(getSpeakerText).join(', ')}
        </p>
      </div>
      {talk.videoUrl && (
        <a
          href={talk.videoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${talk.title} YouTube`}
          className="flex h-10 w-10 items-center justify-center justify-self-end md:justify-self-center"
        >
          <YoutubeIcon className="h-8 w-8 fill-[#ff0000]" />
        </a>
      )}
    </article>
  );
};

const BigchatYearBadge = ({ year }: { year: BigchatYear }) => (
  <div className="mx-auto flex h-14 w-[128px] items-center justify-center rounded-full bg-[#454dff] text-center text-[24px] font-bold leading-8 text-white shadow-[0_10px_18px_-8px_rgba(31,41,115,0.22)] md:h-[72px] md:w-[160.839px] md:text-[28px] md:leading-9">
    {year}
  </div>
);

const BigchatYearSection = ({ year }: { year: BigchatYear }) => {
  const talks = bigchatTalks.filter(talk => talk.year === year);

  return (
    <section id={`bigchat-year-${year}`} className="scroll-mt-8">
      <BigchatYearBadge year={year} />
      <div className="mt-6 space-y-[27.138px]">
        {talks.map(talk => (
          <TalkCard key={`${talk.speaker}-${talk.title}`} talk={talk} />
        ))}
      </div>
    </section>
  );
};

const BigchatTalkList = () => (
  <section className="mx-auto mt-8 max-w-[1248px] px-5 pb-16 md:px-8 lg:mt-[109px] lg:px-0">
    <div className="rounded-[40.707px] bg-[#dde2ff] p-5 shadow-[0_6.784px_5.089px_rgba(0,0,0,0.1),0_16.961px_12.721px_rgba(0,0,0,0.1)] md:p-[40.706px]">
      <div className="space-y-[61.138px]">
        {bigchatYears.map(year => (
          <BigchatYearSection key={year} year={year} />
        ))}
      </div>
    </div>
  </section>
);

const BigchatArchiveSection = ({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: BigchatYear;
  onSelectYear: (year: BigchatYear) => void;
}) => (
  <>
    <BigchatHero title="BIG CHAT" />
    <div className="mx-auto max-w-screen-xl px-5 pt-6 md:px-8 lg:grid lg:grid-cols-[590px_1fr] lg:gap-8 lg:pt-10">
      <FeatureCards compact />
      <VideoCarousel
        className="min-w-0"
        videos={videoData.bigChatVideos}
        title="Latest Big Chat Videos"
      />
    </div>
    <YearPagination selectedYear={selectedYear} onSelectYear={onSelectYear} />
    <BigchatTalkList />
  </>
);

export default function BigchatPage() {
  const [currentTab, setCurrentTab] = useState<BigchatTab>('publicBigchat');
  const [selectedYear, setSelectedYear] = useState<BigchatYear>('2026');

  const handleSelectYear = (year: BigchatYear) => {
    setSelectedYear(year);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`bigchat-year-${year}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <Head>
        <title>AUSG - Bigchat</title>
      </Head>
      <main>
        <div className="md:mx-auto lg:max-w-screen-xl">
          <Header />
          <h1 className="mb-6 ml-5 mt-3 text-2xl font-bold md:text-center md:text-4xl lg:mb-16">
            Bigchat
          </h1>
        </div>

        <div className="mt-6 flex items-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={clsx(
                currentTab === tab.id && 'border-b-[6px] border-b-gray-800',
                'flex-1 p-1 text-center font-semibold'
              )}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {currentTab === 'publicBigchat' ? (
          <PublicBigchatSection />
        ) : (
          <BigchatArchiveSection
            selectedYear={selectedYear}
            onSelectYear={handleSelectYear}
          />
        )}
      </main>
    </>
  );
}
