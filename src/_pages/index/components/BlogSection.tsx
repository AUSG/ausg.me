import ArrowRightIcon from 'public/icons/arrow_right.svg';

export default function BlogSection() {
  return (
    <div className="bg-primary">
      <div className="px-[20px] py-[48px] md:mx-auto md:max-w-screen-xl xl:py-[100px]">
        <h1 className="text-[24px] font-bold leading-[34px] text-white xl:text-[36px] xl:leading-[52px]">
          AUSG 멤버들이 공유한 <br className="xl:hidden" />
          지식과 경험을 확인해보세요!
        </h1>
        <section className="space-evenly mt-6 flex flex-col gap-[16px] md:flex-row xl:mt-12 xl:gap-[48px]">
          <div className="flex basis-[50%] flex-col">
            <div className="flex items-center justify-between gap-3 pb-4">
              <span className="min-w-0 text-[20px] font-bold text-white md:text-2xl">
                BigChat 발표영상 플레이리스트
              </span>
              <a
                href="https://www.youtube.com/playlist?list=PLzE5CrlMM0CDLVzxgir4Kbj7oPBD4VUvC"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                전체 영상 보기
                <ArrowRightIcon className="h-4 w-4 fill-primary" />
              </a>
            </div>

            {/* ref for dynamic youtube iframe sizing : https://stackoverflow.com/a/54924505/8556340 */}
            <div className="relative mx-auto h-0 w-full pb-[56.25%]">
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src="https://www.youtube.com/embed/videoseries?list=PLzE5CrlMM0CDLVzxgir4Kbj7oPBD4VUvC"
                title="BigChat 발표영상 플레이리스트"
                frameBorder="1"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex basis-[50%] flex-col">
            <div className="flex items-center justify-between gap-3 pb-4">
              <span className="min-w-0 text-[20px] font-bold text-white md:text-2xl">
                AUSGCON 발표영상 플레이리스트
              </span>
              <a
                href="https://www.youtube.com/playlist?list=PLzE5CrlMM0CC2zMxggs4GasLICq5dKDqW"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                전체 영상 보기
                <ArrowRightIcon className="h-4 w-4 fill-primary" />
              </a>
            </div>

            <div className="relative mx-auto h-0 w-full pb-[56.25%]">
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src="https://www.youtube.com/embed/videoseries?list=PLzE5CrlMM0CC2zMxggs4GasLICq5dKDqW"
                title="AUSGCON 발표영상 플레이리스트"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        {/* {posts.map(post => ( */}
        {/*  <Card */}
        {/*    key={post.url} */}
        {/*    title={post.title} */}
        {/*    url={post.url} */}
        {/*    author={post.author} */}
        {/*  /> */}
        {/* ))} */}
        <div className="flex justify-center pr-[20px]">
          {/* TODO: 블로그 페이지 개발 후 주석 해제하기 */}
          {/* <button
          type="button"
          className="mt-[36px] flex items-center gap-x-[8px] rounded-[20px] bg-white py-[6px] px-[48px] text-[14px] font-bold leading-[36px]"
        >
          더 보러가기
          <ArrowRightIcon className="h-[24px] w-[24px]" />
        </button> */}
        </div>
      </div>
    </div>
  );
}
