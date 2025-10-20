// 간호 실습 뱃지 데이터
export interface NursingBadge {
  id: number;
  icon: string;
  name: string;
  subtitle: string;
  description: string;
  concept: string;
  difficulty: '하' | '중' | '상';
  color: string;
  
  // 상태 관리
  status: 'pending' | 'active' | 'completed';
  currentScore: number;
  passingScore: number;
  requiredScore: number;
  attempts: number;
  lastAttempt: string | null;
  completedDate?: string;
  scoreHistory: number[]; // 점수 기록
}

export const nursingBadges: NursingBadge[] = [
  // 1. 활력징후 측정
  { 
    id: 1,
    icon: '📡',
    name: '첫 신호',
    subtitle: '생명 징후를 읽는 시작점',
    description: '활력징후 측정',
    concept: '환자의 상태를 처음으로 파악하는 순간',
    difficulty: '상',
    color: '#E3F2FD',
    
    status: 'pending',
    currentScore: 45,
    passingScore: 70,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: null,
    scoreHistory: [42, 45],
  },
  
  // 2. 경구투약
  { 
    id: 2,
    icon: '🌱',
    name: '회복의 씨앗',
    subtitle: '치유의 씨앗을 심다',
    description: '경구투약',
    concept: '약이 몸속에서 자라 회복으로 이어지는 은유',
    difficulty: '하',
    color: '#E8F5E9',
    
    status: 'active',
    currentScore: 68,
    passingScore: 70,
    requiredScore: 60,
    attempts: 3,
    lastAttempt: '2024-01-12',
    scoreHistory: [62, 65, 68],
  },
  
  // 3. 근육주사
  { 
    id: 3,
    icon: '💧',
    name: '용기의 한 방울',
    subtitle: '두려움을 넘어서',
    description: '근육주사',
    concept: '주사에 대한 두려움을 극복하는 순간',
    difficulty: '중',
    color: '#F3E5F5',
    
    status: 'completed',
    currentScore: 85,
    passingScore: 70,
    requiredScore: 60,
    attempts: 4,
    lastAttempt: '2024-01-10',
    completedDate: '2024-01-10',
    scoreHistory: [62, 65, 68, 72, 85],
  },
  
  // 4. 정맥주사
  { 
    id: 4,
    icon: '🩸',
    name: '생명의 강',
    subtitle: '혈관을 따라 흐르는 생명',
    description: '정맥주사',
    concept: '혈관을 통해 생명을 전달하는 기술',
    difficulty: '상',
    color: '#FFEBEE',
    
    status: 'pending',
    currentScore: 52,
    passingScore: 75,
    requiredScore: 60,
    attempts: 1,
    lastAttempt: null,
    scoreHistory: [52],
  },
  
  // 5. 기관절개관 관리
  { 
    id: 5,
    icon: '🫁',
    name: '호흡의 문',
    subtitle: '생명의 숨결을 지키다',
    description: '기관절개관 관리',
    concept: '호흡을 돕는 생명의 문을 관리하는 기술',
    difficulty: '상',
    color: '#E0F2F1',
    
    status: 'active',
    currentScore: 72,
    passingScore: 80,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: '2024-01-13',
    scoreHistory: [68, 72],
  },
  
  // 6. 상처 드레싱
  { 
    id: 6,
    icon: '🩹',
    name: '치유의 손길',
    subtitle: '상처를 어루만지는 마음',
    description: '상처 드레싱',
    concept: '상처를 치유하는 따뜻한 손길',
    difficulty: '중',
    color: '#FFF3E0',
    
    status: 'completed',
    currentScore: 88,
    passingScore: 75,
    requiredScore: 60,
    attempts: 3,
    lastAttempt: '2024-01-08',
    completedDate: '2024-01-08',
    scoreHistory: [72, 78, 88],
  },
  
  // 7. 도뇨관 관리
  { 
    id: 7,
    icon: '💧',
    name: '배설의 길',
    subtitle: '자연스러운 배설을 돕다',
    description: '도뇨관 관리',
    concept: '환자의 배설을 돕는 자연스러운 길',
    difficulty: '중',
    color: '#E8EAF6',
    
    status: 'pending',
    currentScore: 48,
    passingScore: 70,
    requiredScore: 60,
    attempts: 1,
    lastAttempt: null,
    scoreHistory: [48],
  },
  
  // 8. 산소요법
  { 
    id: 8,
    icon: '💨',
    name: '생명의 바람',
    subtitle: '호흡을 돕는 신선한 바람',
    description: '산소요법',
    concept: '생명을 지탱하는 산소를 전달하는 기술',
    difficulty: '중',
    color: '#E1F5FE',
    
    status: 'active',
    currentScore: 65,
    passingScore: 70,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: '2024-01-11',
    scoreHistory: [62, 65],
  },
  
  // 9. 심전도 모니터링
  { 
    id: 9,
    icon: '📊',
    name: '심장의 목소리',
    subtitle: '심장이 전하는 메시지',
    description: '심전도 모니터링',
    concept: '심장의 리듬을 읽고 해석하는 기술',
    difficulty: '상',
    color: '#F1F8E9',
    
    status: 'pending',
    currentScore: 38,
    passingScore: 80,
    requiredScore: 60,
    attempts: 1,
    lastAttempt: null,
    scoreHistory: [38],
  },
  
  // 10. 수혈 관리
  { 
    id: 10,
    icon: '🩸',
    name: '생명의 선물',
    subtitle: '타인의 생명을 전달하다',
    description: '수혈 관리',
    concept: '타인의 생명을 안전하게 전달하는 기술',
    difficulty: '상',
    color: '#FFEBEE',
    
    status: 'completed',
    currentScore: 92,
    passingScore: 85,
    requiredScore: 60,
    attempts: 5,
    lastAttempt: '2024-01-05',
    completedDate: '2024-01-05',
    scoreHistory: [75, 78, 82, 85, 92],
  },
  
  // 11. 인공호흡기 관리
  { 
    id: 11,
    icon: '🫁',
    name: '호흡의 기계',
    subtitle: '기계와 함께하는 호흡',
    description: '인공호흡기 관리',
    concept: '기계와 함께 환자의 호흡을 돕는 기술',
    difficulty: '상',
    color: '#E0F2F1',
    
    status: 'active',
    currentScore: 78,
    passingScore: 85,
    requiredScore: 60,
    attempts: 3,
    lastAttempt: '2024-01-14',
    scoreHistory: [72, 75, 78],
  },
  
  // 12. 영양관리
  { 
    id: 12,
    icon: '🍎',
    name: '생명의 영양',
    subtitle: '건강한 회복을 위한 영양',
    description: '영양관리',
    concept: '환자의 회복을 돕는 적절한 영양 공급',
    difficulty: '하',
    color: '#FFF8E1',
    
    status: 'completed',
    currentScore: 76,
    passingScore: 70,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: '2024-01-07',
    completedDate: '2024-01-07',
    scoreHistory: [68, 76],
  },
  
  // 13. 감염관리
  { 
    id: 13,
    icon: '🛡️',
    name: '보호의 방패',
    subtitle: '감염으로부터 보호하다',
    description: '감염관리',
    concept: '환자와 자신을 감염으로부터 보호하는 기술',
    difficulty: '중',
    color: '#F3E5F5',
    
    status: 'pending',
    currentScore: 55,
    passingScore: 75,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: null,
    scoreHistory: [52, 55],
  },
  
  // 14. 통증관리
  { 
    id: 14,
    icon: '💊',
    name: '고통의 완화',
    subtitle: '환자의 고통을 덜어주다',
    description: '통증관리',
    concept: '환자의 고통을 이해하고 완화하는 기술',
    difficulty: '중',
    color: '#E8F5E9',
    
    status: 'active',
    currentScore: 69,
    passingScore: 75,
    requiredScore: 60,
    attempts: 2,
    lastAttempt: '2024-01-12',
    scoreHistory: [65, 69],
  },
  
  // 15. 응급처치
  { 
    id: 15,
    icon: '🚨',
    name: '생명의 응급처치',
    subtitle: '위기 상황에서의 빠른 대응',
    description: '응급처치',
    concept: '위기 상황에서 생명을 구하는 기술',
    difficulty: '상',
    color: '#FFEBEE',
    
    status: 'completed',
    currentScore: 89,
    passingScore: 80,
    requiredScore: 60,
    attempts: 4,
    lastAttempt: '2024-01-06',
    completedDate: '2024-01-06',
    scoreHistory: [72, 78, 82, 89],
  },
];

// 상태별 필터링 함수들
export const getPendingBadges = () => nursingBadges.filter(b => b.status === 'pending');
export const getActiveBadges = () => nursingBadges.filter(b => b.status === 'active');
export const getCompletedBadges = () => nursingBadges.filter(b => b.status === 'completed');

// 점수 업데이트 함수
export const updateBadgeScore = (badgeId: number, newScore: number): NursingBadge | null => {
  const badgeIndex = nursingBadges.findIndex(b => b.id === badgeId);
  if (badgeIndex === -1) return null;
  
  const badge = nursingBadges[badgeIndex];
  badge.currentScore = newScore;
  badge.attempts += 1;
  badge.lastAttempt = new Date().toISOString().split('T')[0];
  badge.scoreHistory.push(newScore);
  
  // 상태 업데이트
  if (newScore < badge.requiredScore) {
    badge.status = 'pending';
  } else if (newScore >= badge.requiredScore && newScore < badge.passingScore) {
    badge.status = 'active';
  } else if (newScore >= badge.passingScore) {
    badge.status = 'completed';
    badge.completedDate = badge.lastAttempt;
  }
  
  return badge;
};

// 뱃지 통계
export const getBadgeStats = () => {
  const pending = getPendingBadges().length;
  const active = getActiveBadges().length;
  const completed = getCompletedBadges().length;
  const total = nursingBadges.length;
  
  return {
    pending,
    active,
    completed,
    total,
    completionRate: Math.round((completed / total) * 100),
  };
};
