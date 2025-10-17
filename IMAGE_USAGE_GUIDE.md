# 이미지 캐릭터 사용 가이드

## 📁 이미지 파일 추가 방법

1. **이미지 준비**
   - 크기: 200x200px 이상 권장
   - 형식: PNG (투명 배경), JPG, SVG
   - 이름: `your-character.png`

2. **파일 위치**
   ```
   /assets/characters/your-character.png
   ```

3. **코드에서 사용**
   ```tsx
   import { ImageCharacter } from '../components';
   
   <ImageCharacter 
     source={require('../../assets/characters/your-character.png')} 
     size={64} 
   />
   ```

## 🔄 LoginScreen에서 교체하기

현재 LoginScreen.tsx의 115-121번째 줄을 다음과 같이 수정:

```tsx
// 기존 (이모지)
<NurseCharacter size={64} />

// 변경 (이미지)
<ImageCharacter 
  source={require('../../assets/characters/your-character.png')} 
  size={64} 
/>
```

## 🎨 추가 옵션

### 여러 캐릭터 준비
```
/assets/characters/
├── nurse-character.png
├── doctor-character.png
├── cute-character.png
└── main-character.png
```

### 동적 캐릭터 변경
```tsx
const [characterType, setCharacterType] = useState('nurse');

const getCharacterSource = () => {
  switch(characterType) {
    case 'nurse': return require('../../assets/characters/nurse-character.png');
    case 'doctor': return require('../../assets/characters/doctor-character.png');
    default: return require('../../assets/characters/main-character.png');
  }
};

<ImageCharacter 
  source={getCharacterSource()} 
  size={64} 
/>
```

## ⚠️ 주의사항

1. **이미지 파일명**: 영어, 숫자, 하이픈(-)만 사용
2. **파일 크기**: 너무 크면 앱이 무거워질 수 있음
3. **해상도**: 고해상도 이미지 권장 (Retina 디스플레이 대응)
4. **형식**: PNG가 투명 배경 지원으로 가장 적합
