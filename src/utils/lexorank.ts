import { LexoRank } from 'lexorank';

// prevRank와 nextRank의 중간인 midRank 값 생성
export function midRank(
  prevRank: string | null,
  nextRank: string | null
): string {
  console.log({ prevRank, nextRank });

  // prevRank와 nextRank 둘 다 없는 경우, 중간 값 반환
  if (!prevRank && !nextRank) {
    return LexoRank.middle().toString();
  }

  // prevRank 없는 경우, nextRank의 이전 값 반환
  if (!prevRank) {
    return LexoRank.parse(nextRank).genPrev().toString();
  }

  // nextRank 없는 경우, prevRank의 이후 값 반환
  if (!nextRank) {
    return LexoRank.parse(prevRank).genNext().toString();
  }

  // prevRank와 nextRank 둘 다 있는 경우, prevRank와 nextRank의 사이 값 반환
  if (prevRank && nextRank) {
    return LexoRank.parse(prevRank)
      .between(LexoRank.parse(nextRank))
      .toString();
  }
}
