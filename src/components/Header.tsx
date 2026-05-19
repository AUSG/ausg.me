import React, { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import ReactModal from 'react-modal';
import MenuIcon from '@/public/icons/menu.svg';
import LogoWhite from '@/public/images/logo-white.svg';
import LogoColor from '@/public/images/logo-color.svg';
import InstagramIcon from '@/public/icons/instagram.svg';
import GithubIcon from '@/public/icons/github.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import ArrowRight from '@/public/icons/arrow_right.svg';
import Close from '@/public/icons/close.svg';
import clsx from 'clsx';

interface HeaderProps {
  theme?: 'white' | 'colored';
}

export default function Header({ theme = 'white' }: HeaderProps) {
  const [showSidemenu, setShowSidemenu] = useState(false);
  const closeSidemenu = useCallback(() => setShowSidemenu(false), []);

  const fillColor = useMemo(() => {
    if (theme === 'white') return 'fill-primary';
    return 'fill-white';
  }, [theme]);

  const externalLinks = useMemo(
    () => [
      {
        url: 'https://www.instagram.com/ausg.awskrug',
        icon: (
          <InstagramIcon width="100%" height="100%" className={fillColor} />
        ),
      },
      {
        url: 'https://www.youtube.com/channel/UCaN1L9bj7pCuv1PiKzx-2rQ',
        icon: <YoutubeIcon width="100%" height="100%" className={fillColor} />,
      },
      {
        url: 'https://github.com/AUSG',
        icon: <GithubIcon width="100%" height="100%" className={fillColor} />,
      },
    ],
    [fillColor]
  );

  return (
    <div className="relative lg:mx-auto lg:max-w-screen-xl">
      <div className="flex h-[60px] items-center justify-between lg:h-[120px]">
        <nav className="flex items-center">
          <Link href="/">
            <a className="flex h-full items-center px-5 lg:mr-4 lg:px-8">
              {theme === 'white' ? (
                <LogoColor
                  height="100%"
                  className="aspect-[92/16] w-[100px] md:w-[140px] lg:w-[200px]"
                />
              ) : (
                <LogoWhite
                  height="100%"
                  className="aspect-[92/16] w-[100px] md:w-[140px] lg:w-[200px]"
                />
              )}
            </a>
          </Link>
          <Link href="/bigchat">
            <a
              className={clsx(
                theme === 'white' ? 'text-primary' : 'text-white',
                'mr-6 hidden items-center p-3 font-bold lg:flex'
              )}
            >
              Bigchat
            </a>
          </Link>
          <Link href="/people">
            <a
              className={clsx(
                theme === 'white' ? 'text-primary' : 'text-white',
                'mr-4 hidden items-center p-3 font-bold lg:flex'
              )}
            >
              People
            </a>
          </Link>
          {/* {isApplyPeriod && (
            <Link href="/apply">
              <a
                className={clsx(
                  theme === 'white' ? 'text-primary' : 'text-white',
                  'mr-4 hidden items-center p-3 font-bold lg:flex'
                )}
              >
                Recruit
              </a>
            </Link>
          )} */}
          <Link href="/ausgcon">
            <a
              className={clsx(
                theme === 'white' ? 'text-primary' : 'text-white',
                'mr-4 hidden items-center p-3 font-bold lg:flex'
              )}
            >
              AUSGCON
            </a>
          </Link>
          <Link href="/contact">
            <a
              className={clsx(
                theme === 'white' ? 'text-primary' : 'text-white',
                'hidden items-center p-3 font-bold lg:flex'
              )}
            >
              Contact
            </a>
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-full items-center px-[20px] lg:hidden"
          onClick={() => setShowSidemenu(true)}
        >
          <MenuIcon className={`h-[24px] w-[24px] ${fillColor}`} />
        </button>
        <div className="mr-2 hidden items-center lg:flex">
          {externalLinks.map(({ url, icon }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mr-4 px-1 ${fillColor} h-[40px] w-[40px] `}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <ReactModal
        isOpen={showSidemenu}
        onRequestClose={closeSidemenu}
        // eslint-disable-next-line react/no-unstable-nested-components
        contentElement={(props, children) => (
          <div
            {...props}
            style={undefined}
            className="ml-auto h-screen w-[256px] bg-primary px-[20px]"
          >
            {children}
          </div>
        )}
      >
        <div className="flex flex-col">
          <button
            type="button"
            className="-mr-[20px] self-end p-[12px]"
            onClick={closeSidemenu}
          >
            <Close width="24" height="24" fill="white" />
          </button>
          <div className="flex h-[60px] items-center">
            {externalLinks.map(({ url, icon }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mr-4 px-1 ${fillColor} h-[40px] w-[40px]`}
              >
                {icon}
              </a>
            ))}
          </div>
          <nav className="mt-[50px] flex flex-col gap-4">
            <Link href="/bigchat">
              <a className="flex items-center">
                <span className="mr-[8px] text-[24px] font-bold text-white">
                  Bigchat
                </span>
                <ArrowRight width="36" height="36" fill="white" />
              </a>
            </Link>
            <Link href="/people">
              <a className="flex items-center">
                <span className="mr-[8px] text-[24px] font-bold text-white">
                  People
                </span>
                <ArrowRight width="36" height="36" fill="white" />
              </a>
            </Link>
            {/* {isApplyPeriod && (
              <Link href="/apply">
                <a className="flex items-center">
                  <span className="mr-[8px] text-[24px] font-bold text-white">
                    Recruit
                  </span>
                  <ArrowRight width="36" height="36" fill="white" />
                </a>
              </Link>
            )} */}
            <Link href="/ausgcon">
              <a className="flex items-center">
                <span className="mr-[8px] text-[24px] font-bold text-white">
                  AUSGCON
                </span>
                <ArrowRight width="36" height="36" fill="white" />
              </a>
            </Link>
            <Link href="/contact">
              <a className="flex items-center">
                <span className="mr-[8px] text-[24px] font-bold text-white">
                  Contact
                </span>
                <ArrowRight width="36" height="36" fill="white" />
              </a>
            </Link>
          </nav>
        </div>
      </ReactModal>
    </div>
  );
}
