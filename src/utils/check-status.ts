import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { RECRUITMENT_CONFIG, BIGCHAT_CONFIG } from '../constants/config';

dayjs.extend(utc);
dayjs.extend(timezone);

// 모집 상태 확인 함수
export const getRecruitmentStatus = () => {
  const krCurrentDate = dayjs().tz('Asia/Seoul');

  const isApplyPeriod =
    krCurrentDate.isAfter(RECRUITMENT_CONFIG.openDate) &&
    krCurrentDate.isBefore(RECRUITMENT_CONFIG.deadlineDate);

  const isBeforeApply = krCurrentDate.isBefore(RECRUITMENT_CONFIG.openDate);
  const isAfterApply = krCurrentDate.isAfter(RECRUITMENT_CONFIG.deadlineDate);

  return {
    isApplyPeriod,
    isBeforeApply,
    isAfterApply,
    generation: RECRUITMENT_CONFIG.generation,
    applyDeadline: RECRUITMENT_CONFIG.deadlineDate,
    showEmailInput: RECRUITMENT_CONFIG.showEmailInput,
    showScheduleBubble: RECRUITMENT_CONFIG.showScheduleBubble,
  };
};

// 빅챗 상태 확인 함수
export const getBigchatStatus = () => {
  const krCurrentDate = dayjs().tz('Asia/Seoul');

  const isBigchatPeriod =
    krCurrentDate.isAfter(BIGCHAT_CONFIG.openDate) &&
    krCurrentDate.isBefore(BIGCHAT_CONFIG.deadlineDate);

  const isBeforeBigchat = krCurrentDate.isBefore(BIGCHAT_CONFIG.openDate);
  const isAfterBigchat = krCurrentDate.isAfter(BIGCHAT_CONFIG.deadlineDate);

  return {
    isBigchatPeriod,
    isBeforeBigchat,
    isAfterBigchat,
    bigchatDeadline: BIGCHAT_CONFIG.deadlineDate,
  };
};
