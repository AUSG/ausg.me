import React, { useState, useEffect } from 'react';
import ArrowRightIcon from 'public/icons/arrow_right.svg';
import QUOTES from '@/src/constants/quotes';
import QuoteCard from './QuoteCard';

const INITIAL_COUNT = 6;

export default function MemberSection() {
  const [showAll, setShowAll] = useState(false);
  const [shuffled, setShuffled] = useState(QUOTES.slice(0, INITIAL_COUNT));

  useEffect(() => {
    setShuffled([...QUOTES].sort(() => Math.random() - 0.5));
  }, []);

  const displayed = showAll ? shuffled : shuffled.slice(0, INITIAL_COUNT);

  return (
    <div className="px-[20px] pt-[40px] pb-[80px] md:mx-auto md:max-w-screen-xl xl:py-[100px]">
      <h1 className="text-[24px] font-bold leading-[34px] xl:text-[36px] xl:leading-[52px]">
        우리는 대학생이지만 - <br className="xl:hidden" />
        전문가가 될 수 있다!
      </h1>

      <section
        className="my-[36px] flex flex-col gap-y-[24px]
          md:mt-[60px] md:block md:columns-2 md:gap-x-[48px] xl:gap-x-[60px]"
      >
        {displayed.map(props => (
          <div
            key={props.profile}
            className="md:mb-[24px] md:break-inside-avoid-column"
          >
            <QuoteCard {...props} />
          </div>
        ))}
      </section>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mx-auto mt-[36px] flex items-center rounded-[20px] bg-primary px-[48px] py-[6px] transition-transform duration-200 hover:-translate-y-1 xl:mt-[60px]"
        >
          <span className="mr-[8px] text-[14px] font-bold leading-[36px] text-white xl:text-[16px] xl:leading-[48px]">
            AUSG 멤버 더 살펴보기
          </span>
          <ArrowRightIcon className="h-[24px] w-[24px] rotate-90 fill-white" />
        </button>
      )}
    </div>
  );
}
