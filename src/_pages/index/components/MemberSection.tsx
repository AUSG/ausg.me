import React, { useState, useEffect } from 'react';
import QUOTES from '@/src/constants/quotes';
import QuoteCard from './QuoteCard';

const INITIAL_COUNT = 6;

type Quote = typeof QUOTES[number];

function balanceColumns(items: Quote[]): [Quote[], Quote[]] {
  const sorted = [...items].sort((a, b) => b.content.length - a.content.length);
  return sorted.reduce<[Quote[], Quote[]]>(
    ([left, right], item, i) =>
      i % 2 === 0 ? [[...left, item], right] : [left, [...right, item]],
    [[], []]
  );
}

export default function MemberSection() {
  const [showAll, setShowAll] = useState(false);
  const [shuffled, setShuffled] = useState(QUOTES.slice(0, INITIAL_COUNT));

  useEffect(() => {
    setShuffled([...QUOTES].sort(() => Math.random() - 0.5));
  }, []);

  const displayed = showAll ? shuffled : shuffled.slice(0, INITIAL_COUNT);
  const [left, right] = balanceColumns(displayed);

  return (
    <div className="px-[20px] pt-[40px] pb-[80px] md:mx-auto md:max-w-screen-xl xl:py-[100px]">
      <h1 className="text-[24px] font-bold leading-[34px] xl:text-[36px] xl:leading-[52px]">
        우리는 대학생이지만 - <br className="xl:hidden" />
        전문가가 될 수 있다!
      </h1>

      <section className="my-[36px] flex flex-col gap-y-[24px] md:mt-[60px] md:flex-row md:gap-x-[48px] xl:gap-x-[60px]">
        <div className="flex flex-col gap-y-[24px] md:flex-1">
          {left.map(props => (
            <QuoteCard key={props.profile} {...props} />
          ))}
        </div>
        <div className="flex flex-col gap-y-[24px] md:flex-1">
          {right.map(props => (
            <QuoteCard key={props.profile} {...props} />
          ))}
        </div>
      </section>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mx-auto mt-[36px] flex items-center rounded-[20px] bg-primary px-[48px] py-[6px] transition-transform duration-200 hover:-translate-y-1 xl:mt-[60px]"
        >
          <span className="mr-[8px] text-[14px] font-bold leading-[36px] text-white xl:text-[16px] xl:leading-[48px]">
            AUSG 후기 더 살펴보기
          </span>
          <span className="text-[20px] font-bold text-white">＋</span>
        </button>
      )}
    </div>
  );
}
