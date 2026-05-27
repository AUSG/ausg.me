import { useState, type ReactNode } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';

import ArrowRightIcon from '@/public/icons/arrow_right.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import BooksImage from '@/public/images/books.svg';
import ShareImage from '@/public/images/share.svg';
import { getPeopleData, type Person } from '@/data/people';
import videoData from '@/data/videos.json';
import Header from '@/src/components/Header';
import ProfileAvatar from '@/src/components/ProfileAvatar';
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
  { id: 'publicBigchat', label: 'Public BIGCHAT' },
  { id: 'bigchat', label: 'BIGCHAT' },
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
      'AUSG에서는 모두가 BIGCHAT에 참여해 저마다의 클라우드 개발 경험과 노하우를 멤버들과 공유해요. AUSG에 합류하는 순간부터, 모두가 지식 공유자가 되는거죠.',
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

const getYoutubeEmbedUrl = (url: string) => {
  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/
  )?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const publicBigchatVideos: VideoItem[] = publicBigchat
  .filter((item): item is PublicBigchat & { videoUrl: string } =>
    Boolean(item.videoUrl)
  )
  .map(item => ({
    speaker: item.speaker,
    title: `PUBLIC BIGCHAT: ${item.title} - ${item.speaker}`,
    embedUrl: getYoutubeEmbedUrl(item.videoUrl),
  }));

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

const getSpeakerText = (speaker: MatchedSpeaker) => speaker.name;

const getSpeakerGenerations = (speakers: MatchedSpeaker[]) =>
  speakers
    .map(speaker => speaker.person && formatGeneration(speaker.person.year))
    .filter((generation): generation is string => Boolean(generation));

const getSpeakerGenerationBadge = (speakers: MatchedSpeaker[]) => {
  const generations = getSpeakerGenerations(speakers);

  if (!generations.length) return null;

  return Array.from(new Set(generations)).join(', ');
};

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
  compact = false,
}: {
  videos: VideoItem[];
  title: string;
  className?: string;
  compact?: boolean;
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
      <h3
        className={clsx(
          'ml-5 mt-8 text-lg font-bold md:ml-8 md:text-2xl lg:mt-16',
          compact && 'ml-0 mt-0 md:ml-0 lg:mt-0'
        )}
      >
        {title}
      </h3>
      <div className={clsx('embla mt-3', compact && '[--slide-height:22rem]')}>
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

const BigchatSessionOverview = () => (
  <section className="mx-auto max-w-[1360px] px-5 pt-10 md:px-8 lg:pt-14">
    <div className="grid gap-5 rounded-[32px] bg-[#e8edff] p-5 md:p-7 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-8 lg:p-8">
      <div className="grid gap-4">
        {featureCards.map(feature => (
          <article
            key={feature.id}
            className="relative overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_14px_32px_rgba(69,77,255,0.06)]"
          >
            <div className="relative z-10 max-w-[320px]">
              <h4 className="text-xl font-semibold tracking-[-0.02em] text-gray-900">
                {feature.title}
              </h4>
              <p
                className="mt-3 text-base font-medium leading-7 text-[#525b75]"
                style={{ wordBreak: 'keep-all' }}
              >
                {feature.description}
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              {feature.id === 'share' ? (
                <ShareImage className="h-[96px] w-[112px]" />
              ) : (
                <BooksImage className="h-[112px] w-[98px]" />
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="min-w-0 rounded-[24px] bg-white p-5 shadow-[0_14px_32px_rgba(69,77,255,0.06)] md:p-6">
        <VideoCarousel
          compact
          videos={videoData.bigChatVideos}
          title="Latest BIGCHAT Videos"
        />
      </div>
    </div>
  </section>
);

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
      PUBLIC BIGCHAT
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
      Public BIGCHAT Featured
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
    <BigchatHero title="Public BIGCHAT" />

    <div className="lg:mx-auto lg:max-w-screen-xl">
      <FeatureCards />
      <VideoCarousel
        videos={publicBigchatVideos}
        title="Last Public BIGCHAT Video"
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
    aria-label="BIGCHAT year pagination"
    className="mx-auto mt-12 max-w-[1360px] px-5 md:px-8 lg:mt-16"
  >
    <div className="flex flex-col gap-5 border-t border-[#e0e5ff] pt-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
          BIGCHAT Archive
        </p>
        <h3 className="mt-2 text-[32px] font-semibold leading-tight tracking-[-0.03em] text-gray-900 md:text-[44px]">
          연도별 세션
        </h3>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2 rounded-full border border-[#dfe5ff] bg-white p-1.5 shadow-[0_1px_2px_rgba(69,77,255,0.06)]">
          {yearPaginationItems.map(item => {
            const isActive = item.activeYears.includes(selectedYear);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelectYear(item.targetYear)}
                className={clsx(
                  'h-10 min-w-[78px] rounded-full px-4 text-[15px] font-semibold leading-5 transition-colors',
                  isActive
                    ? 'bg-primary text-white shadow-[0_4px_10px_rgba(69,77,255,0.18)]'
                    : 'text-[#525b75] hover:bg-[#f3f5ff] hover:text-primary'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </nav>
);

const SpeakerAvatarGroup = ({ speakers }: { speakers: MatchedSpeaker[] }) => {
  const speaker = speakers[0];
  const avatarItems = (speakers.length ? speakers : [speaker]).slice(0, 3);
  const keyCounts = new Map<string, number>();

  return (
    <div className="flex h-12 min-w-[48px] shrink-0 items-center md:h-14 md:min-w-[56px]">
      {avatarItems.map((item, i) => {
        const keyBase = item?.person?.photo ?? item?.name ?? 'speaker';
        const keyCount = keyCounts.get(keyBase) ?? 0;

        keyCounts.set(keyBase, keyCount + 1);

        return (
          <ProfileAvatar
            key={`${keyBase}-${keyCount}`}
            src={
              item?.person
                ? `/people/${item.person.photo}`
                : '/images/profile-1.png'
            }
            alt={`${item?.name ?? 'BIGCHAT speaker'} profile`}
            size="md"
            className={clsx(
              'border-2 border-[#cbd8ff] bg-white',
              i > 0 && '-ml-3'
            )}
          />
        );
      })}
    </div>
  );
};

const TalkCard = ({ talk }: { talk: BigchatTalk }) => {
  const speakers = getMatchedSpeakers(talk.speaker);
  const speakerGenerations = getSpeakerGenerations(speakers);
  const speakerGenerationBadge = getSpeakerGenerationBadge(speakers);
  const avatarSpeakers = talk.avatarSpeakers
    ? talk.avatarSpeakers.map(speaker => ({
        name: speaker,
        person: peopleByKoreanName.get(speaker),
      }))
    : speakers;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[#eef2ff] p-5 text-primary transition-colors hover:bg-[#e7edff] md:min-h-[176px] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
            {talk.year}
          </span>
          {speakerGenerationBadge && (
            <span className="rounded-full bg-[#dbe3ff] px-3 py-1 text-sm font-semibold text-primary">
              {speakerGenerationBadge}
            </span>
          )}
        </div>
        {talk.videoUrl && (
          <a
            href={talk.videoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${talk.title} YouTube`}
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#dbe3ff] transition-colors hover:bg-primary"
          >
            <YoutubeIcon className="h-[18px] w-[18px] fill-primary transition-colors group-hover:fill-white" />
          </a>
        )}
      </div>

      <h3
        className="mt-7 text-[22px] font-semibold leading-[31px] tracking-[-0.02em] md:mt-8 md:text-[28px] md:leading-[38px]"
        style={{ wordBreak: 'keep-all' }}
      >
        {talk.title}
      </h3>

      <div className="mt-auto flex items-end justify-between gap-5 pt-8 md:pt-10">
        <div className="flex min-w-0 items-center gap-4">
          <SpeakerAvatarGroup speakers={avatarSpeakers} />
          <div className="min-w-0">
            <p
              className="text-base font-semibold leading-6 text-primary md:text-lg"
              style={{ wordBreak: 'keep-all' }}
            >
              {speakers.map(getSpeakerText).join(', ')}
            </p>
            {speakerGenerations.length > 0 && (
              <p className="text-sm font-semibold text-primary/60">
                AUSG {speakerGenerations.join(', ')}
              </p>
            )}
          </div>
        </div>
        {talk.videoUrl && (
          <span
            aria-hidden="true"
            className="hidden shrink-0 text-sm font-semibold text-primary/70 md:block"
          >
            다시보기
          </span>
        )}
      </div>
    </article>
  );
};

const BigchatYearSection = ({ year }: { year: BigchatYear }) => {
  const talks = bigchatTalks.filter(talk => talk.year === year);

  return (
    <section id={`bigchat-year-${year}`} className="scroll-mt-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-primary md:text-[72px]">
          {year}
        </h2>
        <p className="mb-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary/60 md:text-base">
          {talks.length} sessions
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {talks.map(talk => (
          <TalkCard key={`${talk.speaker}-${talk.title}`} talk={talk} />
        ))}
      </div>
    </section>
  );
};

const BigchatTalkList = () => (
  <section className="mx-auto mt-8 max-w-[1360px] px-5 pb-16 md:px-8 lg:mt-12">
    <div className="rounded-[32px] bg-[#dce4ff] p-5 shadow-[0_18px_40px_rgba(69,77,255,0.12)] md:p-8 lg:p-10">
      <div className="space-y-16">
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
    <BigchatHero title="BIGCHAT" />
    <BigchatSessionOverview />
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
        <title>AUSG - BIGCHAT</title>
      </Head>
      <main>
        <div className="md:mx-auto lg:max-w-screen-xl">
          <Header />
          <h1 className="mb-6 ml-5 mt-3 text-2xl font-bold md:text-center md:text-4xl lg:mb-16">
            BIGCHAT
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
