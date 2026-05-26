import Head from 'next/head';

import Header from '@/src/components/Header';
import SectionIndex from '@/src/_pages/Activities/SectionIndex';
import GlobalSection from '@/src/_pages/Activities/GlobalSection';
import TechStudySection from '@/src/_pages/Activities/TechStudySection';
import WarmUpSection from '@/src/_pages/Activities/WarmUpSection';
import CoffeechatSection from '@/src/_pages/Activities/CoffeechatSection';

const Activities = () => (
  <>
    <Head>
      <title>AUSG - Activities</title>
    </Head>
    <main className="bg-white">
      <div className="md:mx-auto lg:max-w-screen-xl">
        <Header />
      </div>

      <div className="sticky top-0 z-30">
        <SectionIndex />
      </div>

      <GlobalSection />
      <TechStudySection />
      <WarmUpSection />
      <CoffeechatSection />
    </main>
  </>
);

export default Activities;
