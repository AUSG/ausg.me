import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { RECRUITMENT_CONFIG } from './config';

dayjs.extend(utc);
dayjs.extend(timezone);

const targetDate = dayjs(RECRUITMENT_CONFIG.deadlineDate)
  .tz('Asia/Seoul')
  .toDate(); // 지원 마감일 (KST)
const krCurrentDate = dayjs().tz('Asia/Seoul').toDate(); // 한국 시간 기준 현재 시간

const isClosed = krCurrentDate > targetDate;

interface Question {
  title: string;
  description: string;
  isHidden?: boolean;
  order: number;
}

// 노션에서 내용 복사 => 아래 사이트에서 HTML로 변환 => 링크 밑줄 등 추가적인 스타일 적용이 필요하다면 HTML 태그 직접 수정
// https://www.ttmkt.com/kr/tools/markdown-to-html/
const RECRUIT_QUESTIONS: Question[] = [
  {
    title: '현재 모집 중인가요?',
    description:
      '<p>현재 <b>AUSG 10기를 모집</b> 중이에요. 홈페이지 및 인스타그램 @ausg.awskrug를 통해 자세한 정보를 확인해 주세요!</p>',
    isHidden: isClosed,
    order: 1,
  },
  {
    title: '지원 마감은 언제인가요?',
    description:
      '<p>한국 시간 기준 <b>6월 30일 월요일 23:59:59</b> 까지 지원을 받을 예정이에요.</p>',
    isHidden: isClosed,
    order: 2,
  },
  {
    title: '선발 절차는 어떻게 되나요?',
    description:
      '<p><b>1차 서류 전형, 2차 면접 전형이 있습니다.</b></p>' +
      '<p>자기소개서와 면접은 지원자 분을 보다 잘 알아가기 위해 진행합니다. 여러분이 어떤 경험을 가지고 있는지, 어떤 고민과 노력을 해오셨는지 궁금합니다. <br> 그 과정에 AUSG가 왜 필요한 지도요! 평가로 생각하기보다는 여러분의 이야기를 들려주세요 😊</p>',
    isHidden: isClosed,
    order: 3,
  },
  {
    title: 'AUSG 10기 활동 기간은 얼마나 되나요?',
    description:
      '<p>필수 활동 기간은 <b>1년</b>입니다. 이후에는 자율로 참여 가능합니다 😁</p>',
    isHidden: isClosed,
    order: 4,
  },
  {
    title: '지원 자격이 궁금해요.',
    description:
      '<p>AUSG는 대학생 동아리인만큼, 대학생이 아닌 분들의 지원은 받지 않고 있어요 😢 <br> 다만, 대학생 신분으로 직장을 병행하고 있는 직장인은 지원 가능합니다.</p>' +
      '<p>지원 가능: 대학교 재학생(<b>2025년 여름학기 졸업자 포함</b>), 휴학생, 수료생(졸업유예생), 대학과 병행 중인 직장인\n' +
      '지원 불가능: 대학교 졸업생, 대학원생, 대학생이 아닌 직장인</p>',
    isHidden: isClosed,
    order: 8,
  },
];

const QUESTIONS: Question[] = [
  {
    title: 'AUSG는 어떤 동아리인가요?',
    description:
      '<p>AUSG는 AWSKRUG University Student Group의 약자로, AWS와 Cloud, 프로그래밍에 관심있는 대학생들의 모임이에요.</p>' +
      '<p>자유로운 분위기에서 다양한 사람을 만나 각자의 경험을 나누고 소통할 수 있습니다. <strong><a href="https://awskrug.github.io/" class="underline">AWS 한국사용자모임</a></strong>과 함께하고 있어요! 😎</p>',
    order: 5,
  },
  {
    title: 'AUSG는 어떤 활동을 하나요?',
    description:
      '<p>격주 1회 약 2시간 정도 정기모임을 갖습니다. 클라우드, 개발, 프로덕트 등 다양한 주제로 대화를 나누는 시간을 가져요! 또한 스터디, 외부 강연, AWS 한국사용자모임 행사 등에도 참여하고 있답니다.</p>' +
      '<p>이외에도 친목 모임을 가지면서 좋은 사람들과 함께 즐거운 추억을 만들어요.</p>' +
      '<p>(소곤소곤) AUSG 커뮤니티의 최고 자랑은 좋은 사람들! 이랍니다 🤫</p>',
    order: 6,
  },
  {
    title: '클라우드 경험이 반드시 있어야 하나요?',
    description:
      '<p>AUSG에서는 개발자가 아니라도, AWS 및 클라우드 경험이 없어도 활동할 수 있어요. 하지만 클라우드 및 개발에 대한 관심과 열정은 반드시 필요해요!</p>',
    order: 7,
  },
  {
    title: '대학 재학 중이 아니어도 지원 가능한가요?',
    description:
      '<p><b>아쉽지만 불가능합니다.</b></p>' +
      '<p>AUSG는 대학생 동아리인만큼, 대학생이 아닌 분들의 지원은 받지 않고 있어요 😢 다만, 대학생 신분으로 직장을 병행하고 있는 직장인은 지원 가능합니다.</p>' +
      '<p>지원 가능: 대학교 재학생, 휴학생, 수료생(졸업유예생), 대학과 병행 중인 직장인\n' +
      '지원 불가능: 대학교 졸업생, 대학원생, 대학생이 아닌 직장인</p>',
    isHidden: !isClosed,
    order: 8,
  },
  {
    title: '모임은 어떻게 진행되나요?',
    description:
      '<p><b>격주 월요일 저녁 7시 30분 ~ 9시 30분에 오프라인 정기 모임</b>이 진행됩니다.</p>' +
      '<p>발표 세션과 스터디, 친목을 위주로 많은 분들이 활발하게 활동하고 있고, 이러한 활동에 적극적으로 함께 해주실 분들을 찾고 있어요.</p>',
    order: 9,
    isHidden: !isClosed,
  },
  {
    title: '수도권 거주자만 참여할 수 있나요?',
    description:
      '<p><b>꼭 수도권 거주자만 참여할 수 있는 것은 아닙니다.</b> 다만, 격주로 진행되는 정기 모임(BIGCHAT)에 참여하셔야 하고, AUSG의 활동들에 적극적으로 참여하실 수 있어야 합니다.</p>',
    order: 10,
  },
  {
    title: '문의사항이 있어요.',
    description:
      "<p>하단의 '아직 궁금한 점이 있다면' 버튼을 클릭하셔서 문의사항을 남겨주세요!</p>",
    order: 100,
  },
];

export { RECRUIT_QUESTIONS, QUESTIONS };
