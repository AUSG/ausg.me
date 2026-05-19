import type { CSSProperties } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import ArrowRightIcon from '@/public/icons/arrow_right.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import videoData from '@/data/videos.json';
import Header from '@/src/components/Header';
import type { AusgconCard } from './data';
import { ausgconCards } from './data';

interface VideoItem {
  speaker: string;
  title: string;
  embedUrl: string;
}

const youtubeUrl = 'https://www.youtube.com/channel/UCaN1L9bj7pCuv1PiKzx-2rQ';

/** 발표 다시보기: 상단 하늘빛 블룸 + 측면 인디고 글로우 + 남색 베이스 */
const ausgconVideoClusterStyle: CSSProperties = {
  backgroundColor: '#101322',
  backgroundImage: `
    linear-gradient(
      180deg,
      rgb(16 19 34 / 0) 0%,
      rgb(16 19 34 / 0.45) 18%,
      rgb(16 19 34 / 0.9) 100%
    )
  `,
};

/**
 * 페이지 히어로 ~ 발표 다시보기까지 한 덩어리 배경.
 * 베이스: primary 계열 -> 하늘 1 -> 하늘 2(라벤더)
 */
const ausgconPageAtmosphereStyle: CSSProperties = {
  backgroundColor: '#101322',
  backgroundImage: `
    radial-gradient(ellipse 125% 85% at 50% 0%, rgb(255 255 255 / 0.38) 0%, transparent 52%),
    radial-gradient(ellipse 78% 52% at 6% 22%, rgb(210 222 255 / 0.5) 0%, transparent 50%),
    radial-gradient(ellipse 74% 50% at 94% 26%, rgb(186 228 252 / 0.48) 0%, transparent 48%),
    radial-gradient(ellipse 95% 58% at 18% 58%, rgb(199 210 255 / 0.22) 0%, transparent 52%),
    radial-gradient(ellipse 90% 55% at 88% 62%, rgb(165 200 255 / 0.18) 0%, transparent 48%),
    radial-gradient(ellipse 110% 75% at 50% 98%, rgb(0 0 0 / 0.32) 0%, transparent 50%),
    linear-gradient(180deg,
      rgb(69 77 255) 0%,
      rgb(88 118 235) 7%,
      rgb(130 178 236) 14%,
      rgb(176 214 248) 22%,
      rgb(206 232 252) 30%,
      rgb(220 236 255) 38%,
      rgb(226 232 255) 46%,
      rgb(232 236 255) 54%,
      rgb(214 224 252) 62%,
      rgb(168 182 228) 72%,
      rgb(105 118 168) 80%,
      rgb(52 58 92) 88%,
      rgb(28 31 48) 94%,
      #101322 100%)
  `,
};

const PosterImage = ({
  card,
  priority = false,
}: {
  card: AusgconCard;
  priority?: boolean;
}) => (
  <Image
    src={card.imageSrc}
    alt={`${card.title} poster`}
    width={card.imageWidth}
    height={card.imageHeight}
    sizes="100vw"
    className="h-auto w-full object-cover"
    priority={priority}
  />
);

const EventLink = ({
  card,
  compact = false,
}: {
  card: AusgconCard;
  compact?: boolean;
}) => {
  const href = card.href ?? youtubeUrl;
  const label = card.href ? '행사 페이지 보기' : '영상으로 보기';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-primary font-semibold text-white transition-colors hover:bg-[#3138e8] ${
        compact ? 'px-4 py-2 text-sm' : 'px-5 py-3 text-base'
      }`}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4 fill-white" />
    </a>
  );
};

const LatestEventSection = ({ card }: { card: AusgconCard }) => (
  <section className="px-4 py-16 md:py-24">
    <div className="mx-auto max-w-[1180px]">
      <div className="text-center">
        <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
          Latest Event
        </span>
        <h2 className="mt-5 text-[44px] font-semibold leading-[52px] text-slate-950 md:text-[72px] md:leading-[82px]">
          {card.title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-[620px] text-base font-medium leading-7 text-slate-600 md:text-lg md:leading-8"
          style={{ wordBreak: 'keep-all' }}
        >
          AUSGCON은 “IT에 대한 열정이 있는 사람들을 위한 교류의 장”이라는 컨셉으로 열리는 오프라인 기술 컨퍼런스입니다.
        </p>
      </div>

      <a
        href={card.href ?? youtubeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${card.title} 바로가기`}
        className="mt-10 block overflow-hidden rounded-[36px] border border-white/80 bg-white/60 p-3 shadow-[0_24px_60px_rgba(34,64,120,0.14)] backdrop-blur"
      >
        <div className="overflow-hidden rounded-[28px]">
          <PosterImage card={card} priority />
        </div>
      </a>

      <div className="mt-7 flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          {card.meta.map(item => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-500"
            >
              {item}
            </span>
          ))}
        </div>
        <EventLink card={card} />
      </div>
    </div>
  </section>
);

const ArchiveCard = ({ card }: { card: AusgconCard }) => (
  <article className="group overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-[0_12px_30px_rgba(69,77,255,0.08)] transition-transform duration-300 hover:-translate-y-1">
    <a
      href={card.href ?? youtubeUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${card.title} 바로가기`}
      className="block overflow-hidden bg-[#f3f5ff]"
    >
      <div className="transition-transform duration-500 group-hover:scale-[1.02]">
        <PosterImage card={card} />
      </div>
    </a>
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-sm font-semibold text-primary">
          {card.year}
        </span>
        <EventLink card={card} compact />
      </div>
      <h3 className="mt-5 text-[24px] font-semibold leading-8 text-slate-950 md:text-[30px] md:leading-[38px]">
        {card.title}
      </h3>
      <p className="mt-3 text-base font-medium leading-7 text-slate-600">
        {card.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {card.meta.map(item => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-500"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const VideoCard = ({ video }: { video: VideoItem }) => (
  <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[#161a28] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
    <iframe
      className="aspect-video w-full"
      src={video.embedUrl}
      title={video.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
    <div className="border-t border-white/10 bg-[#12151f] p-5 md:p-6">
      <div className="text-sm font-semibold text-primary/90">{video.speaker}</div>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-7 text-white">
        {video.title}
      </h3>
    </div>
  </article>
);

const VideoArchive = ({ videos }: { videos: VideoItem[] }) => (
  <section
    className="px-4 py-16 text-white md:py-24"
    style={ausgconVideoClusterStyle}
  >
    <div className="mx-auto max-w-[1360px]">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-point">
            Session Videos
          </p>
          <h2 className="mt-3 text-[36px] font-semibold leading-[44px] md:text-[56px] md:leading-[64px]">
            발표 다시보기
          </h2>
          <p className="mt-4 max-w-[640px] text-base font-medium leading-7 text-white/62 md:text-lg md:leading-8">
            지난 AUSGCON을 영상으로 다시 볼 수 있어요.
          </p>
        </div>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-[0_4px_14px_rgba(69,77,255,0.35)] transition-colors hover:bg-[#3138e8]"
        >
          <YoutubeIcon className="h-5 w-5 fill-white" />
          유튜브 보러가기
        </a>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {videos.map(video => (
          <VideoCard key={video.embedUrl} video={video} />
        ))}
      </div>
    </div>
  </section>
);

export default function AusgconPage() {
  const [latestEvent, ...archiveEvents] = ausgconCards;

  if (!latestEvent) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AUSG - AUSGCON</title>
      </Head>
      <main className="min-h-screen">
        <div className="bg-[#f8f9ff] md:mx-auto md:max-w-screen-xl">
          <Header />
        </div>

        <div style={ausgconPageAtmosphereStyle}>
          <header className="flex h-[180px] items-center bg-transparent px-4 text-white">
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
          <LatestEventSection card={latestEvent} />

          <section className="px-4 py-16 md:py-24">
            <div className="mx-auto max-w-[1360px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                    Previous Events
                  </p>
                  <h2 className="mt-3 text-[36px] font-semibold leading-[44px] text-slate-950 md:text-[56px] md:leading-[64px]">
                    지난 AUSGCON
                  </h2>
                </div>
                <p className="max-w-[520px] text-base font-medium leading-7 text-slate-600 md:text-right md:text-lg md:leading-8">
                  매년 이어온 AUSGCON의 기록을 확인할 수 있어요.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {archiveEvents.map(card => (
                  <ArchiveCard key={card.year} card={card} />
                ))}
              </div>
            </div>
          </section>
          <VideoArchive videos={videoData.ausgconVideos} />
        </div>
      </main>
    </>
  );
}
