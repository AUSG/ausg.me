import { Fragment } from 'react';
import Head from 'next/head';

import Header from '@/src/components/Header';
import ScrollNavigation from '@/src/_pages/people/ScrollNavigation';
import IntroCard from '@/src/_pages/people/IntroCard';
import { getPeopleData } from '@/data/people';
import { VISIBLE_PEOPLE_YEARS_ORDER } from '@/src/lib/config';
import { createSeededRandom, shuffle } from '@/src/utils/shuffle';

const People = ({ seed }: { seed: number }) => {
  const peopleData = getPeopleData();
  const random = createSeededRandom(seed);

  return (
    <>
      <Head>
        <title>AUSG - People</title>
      </Head>
      <div className="md:mx-auto md:max-w-screen-xl">
        <Header />
        <h1 className="ml-5 mt-3 text-2xl font-bold md:text-center md:text-4xl lg:mb-16">
          People
        </h1>

        {VISIBLE_PEOPLE_YEARS_ORDER.map(
          tab =>
            peopleData.people.filter(({ year }) => year === tab).length > 0 && (
              <Fragment key={tab}>
                <ScrollNavigation currentTab={tab} />
                <div className="mb-6 mt-8 grid grid-cols-1 gap-y-4 px-5 lg:mb-[60px] lg:mt-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12 lg:px-8">
                  {shuffle(
                    peopleData.people.filter(({ year }) => year === tab),
                    random
                  ).map(person => (
                    <IntroCard key={person.name_en} {...person} />
                  ))}
                </div>
              </Fragment>
            )
        )}
      </div>
    </>
  );
};

// 왜 굳이 시드를 서버에서 생성해서 props로 넘겨주는가?
// => 이렇게 안하면 Server에서 랜덤으로 배치한 UI와 Client에서 랜덤으로 배치한 UI가 서로 달라서 hydration이 실패하기 때문
export const getServerSideProps = async () => ({
  props: { seed: Math.floor(Math.random() * 2 ** 32) },
});

export default People;
