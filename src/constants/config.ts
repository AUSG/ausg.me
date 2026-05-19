import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 모집 설정
export const RECRUITMENT_CONFIG = {
  generation: 10, // 기수
  openDate: dayjs('2025-06-13 00:00:00').tz('Asia/Seoul'), // 모집 시작일
  deadlineDate: dayjs('2025-06-30 23:59:59').tz('Asia/Seoul'), // 모집 마감일
  tallyFormUrl: 'https://tally.so/r/nrbQ2N', // Tally 폼 URL
  emailApiUrl:
    'https://ovshxcxfyslspeeqa26og2uvya0gqkfc.lambda-url.ap-northeast-2.on.aws/email/register', // 이메일 등록 API URL
  showEmailInput: true, // 모집 알림 이메일 여부
  showScheduleBubble: true, // 모집 일정 말풍선 표시 여부
};
