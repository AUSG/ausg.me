import React from 'react';

import ProfileAvatar from '@/src/components/ProfileAvatar';
import QuoteIcon from 'public/icons/quote.svg';

interface QuoteCardType {
  content: string;
  name: string;
  profile: string;
  imagePath: string;
}

export default function QuoteCard({
  content,
  name,
  profile,
  imagePath,
}: QuoteCardType) {
  return (
    <div className="rounded-[20px] bg-gray-100 px-[30px] py-[20px] xl:px-[40px] xl:py-[26px]">
      <QuoteIcon className="fill-primary text-[30px]" />
      <div className="mt-[12px] whitespace-pre-line text-[14px] xl:mt-[18px] xl:text-[16px]">
        {content}
      </div>
      <div className="mt-[24px] flex items-center xl:mt-[32px]">
        <ProfileAvatar
          src={imagePath}
          alt=""
          size="sm"
          className="mr-[8px] xl:mr-[30px]"
        />
        <div className="text-[14px]">
          <strong>{name}</strong>
          <br />
          <span className="text-[12px]">{profile}</span>
        </div>
      </div>
    </div>
  );
}
