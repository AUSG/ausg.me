import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface IndexItem {
  id: string;
  index: string;
  label: string;
}

const ITEMS: IndexItem[] = [
  { id: 'global', index: '01', label: 'Global' },
  { id: 'tech-study', index: '02', label: 'Tech Study' },
  { id: 'warm-up', index: '03', label: 'Warm-up & Beyond' },
  { id: 'coffeechat', index: '04', label: 'Coffeechat Buddy' },
];

const SectionIndex = () => {
  const [active, setActive] = useState<string>('global');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav className="border-y border-gray-900/10 bg-white">
      <div className="mx-auto flex max-w-screen-xl items-stretch overflow-x-auto px-5 lg:px-8">
        <ul className="flex flex-1 items-stretch gap-1 lg:gap-2">
          {ITEMS.map(({ id, index, label }) => (
            <li key={id} className="flex">
              <a
                href={`#${id}`}
                className={clsx(
                  'group relative flex items-center gap-2 whitespace-nowrap py-4 text-sm transition-colors lg:py-5 lg:text-base',
                  active === id
                    ? 'text-gray-900'
                    : 'text-gray-900/40 hover:text-gray-900/70'
                )}
              >
                <span className="font-mono text-[10px] lg:text-xs">
                  {index}
                </span>
                <span className="font-semibold">{label}</span>
                <span
                  className={clsx(
                    'absolute inset-x-2 -bottom-px h-[2px] origin-left transition-transform',
                    active === id
                      ? 'scale-x-100 bg-primary'
                      : 'scale-x-0 bg-transparent'
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SectionIndex;
