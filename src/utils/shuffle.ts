// 시드 기반 난수 생성기 (mulberry32). 같은 시드면 서버/클라이언트에서 같은 수열을 만든다.
/* eslint-disable no-bitwise */
export const createSeededRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
/* eslint-enable no-bitwise */

// Fisher-Yates 셔플. 원본 배열은 변경하지 않는다.
export const shuffle = <T>(array: readonly T[], random = Math.random): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
