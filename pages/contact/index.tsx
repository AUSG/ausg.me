import { useState } from 'react';
import Header from '@/src/components/Header';
import ContactImage from 'public/images/contact.png';
import Image from 'next/image';
import Head from 'next/head';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>AUSG - Contact</title>
      </Head>
      <div className="md:mx-auto md:max-w-screen-xl">
        <Header />
        <div className="ml-5 mt-3 text-2xl font-bold md:text-center md:text-4xl">
          Contact
        </div>

        <div
          className="mx-5 mt-[26px] overflow-hidden rounded-[20px] shadow-[0px_0px_8px_rgba(0,0,0,0.1)]
          md:mt-[100px] md:flex md:h-[286px] md:items-center md:justify-between"
        >
          <div className="ml-4 mt-4 text-2xl font-bold md:flex-1 md:text-center">
            궁금한게 있다면 <br className="xl:hidden" />
            언제든지 + 24시간 <br className="xl:hidden" />
            질문 받습니다.
          </div>
          <div
            className="relative mb-3 ml-auto mr-3 mt-1 aspect-[441/226] h-24
            md:m-0 md:mr-12 md:h-[calc(100%-60px)] md:w-auto"
          >
            <Image
              src={ContactImage}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        </div>

        <div className="relative mx-5 mb-12 mt-6 md:mt-10">
          {isLoaded ? undefined : (
            <div className="absolute inset-0 flex h-[440px] w-full items-center justify-center bg-gray-100">
              <svg
                className="h-8 w-8 animate-spin text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          <iframe
            src="https://tally.so/embed/wdOj8V?alignLeft=1&hideTitle=1&transparentBackground=1"
            width="100%"
            height="480"
            title="AUSG로 문의하기"
            className="z-10"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
