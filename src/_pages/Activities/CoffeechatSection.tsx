import clsx from 'clsx';

import activities from '@/data/activities.json';
import ActivityImage from './ActivityImage';

const ROTATIONS = [
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-2',
  '-rotate-1',
  'rotate-1',
];

const CoffeechatSection = () => {
  const { index, label, title, description, pairs } = activities.coffeechat;

  return (
    <section id="coffeechat" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 lg:px-8">
        <header className="mb-12 flex flex-col gap-3 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-baseline gap-3 text-gray-900/50">
              <span className="font-mono text-sm lg:text-base">{index}</span>
              <span className="text-xs font-semibold tracking-[0.25em] lg:text-sm">
                {label}
              </span>
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-gray-900 lg:text-5xl"
              style={{ wordBreak: 'keep-all' }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-md whitespace-pre-line text-sm leading-relaxed text-gray-900/60 lg:text-right lg:text-base"
            style={{ wordBreak: 'keep-all' }}
          >
            {description}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-10">
          {pairs.map((pair, i) => (
            <figure
              key={pair.photo}
              className={clsx(
                'group transition-transform duration-300 ease-out hover:rotate-0 hover:scale-[1.03]',
                ROTATIONS[i % ROTATIONS.length]
              )}
            >
              <div className="bg-white p-2.5 pb-8 shadow-[0_8px_24px_rgba(20,20,20,0.08)] lg:p-3 lg:pb-10">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <ActivityImage
                    file={pair.photo}
                    alt=""
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 50vw"
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoffeechatSection;
