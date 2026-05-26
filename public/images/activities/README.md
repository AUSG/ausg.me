# Activities 사진 추가 가이드

이 폴더에 들어가는 사진은 `/activities` 페이지에 자동으로 표시됩니다.

## 폴더 구조

```
public/images/activities/
├── global/        # AWS Summit, JAWS 등 글로벌 행사 사진
├── study/         # Tech Study 트랙별 대표 사진
├── warmup/        # 기수별 Warm-up 사진
├── coffeechat/    # Coffeechat Buddy 사진
└── placeholder.svg  # 사진이 없을 때 표시되는 기본 이미지
```

## 사진 교체 방법

1. **사진 업로드**: 위 4개 폴더 중 알맞은 곳에 사진을 넣으세요.
   - 예: `public/images/activities/global/aws-summit-01.jpg`
2. **JSON 수정**: `data/activities.json`을 열고 해당 섹션의 `photos`/`photo` 값을 업로드한 파일명으로 바꾸면 끝.
   - 파일명만 적으면 됩니다 (폴더 경로는 컴포넌트가 알아서 붙임).

## 권장 사이즈

| 위치 | 비율 | 권장 사이즈 |
|------|------|-------------|
| Global 메인 슬라이드 | 4:3 | 1600 × 1200 |
| Global 서브 그리드 | 1:1 | 800 × 800 |
| Tech Study 카드 | 4:3 | 1200 × 900 |
| Warm-up 슬라이드 | 3:2 | 1500 × 1000 |
| Coffeechat 폴라로이드 | 1:1 | 800 × 800 |

사진이 없거나 파일명이 잘못되면 placeholder.svg가 자동으로 표시됩니다.
