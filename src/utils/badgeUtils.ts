import { Alert } from 'react-native';
import { NursingBadge, updateBadgeScore } from '../data/nursingBadges';

// 뱃지 완료 알림
export const showBadgeCompletedAlert = (badge: NursingBadge) => {
  Alert.alert(
    '🎉 통과!',
    `${badge.name} 실습을 통과했어요!\n\n최종 점수: ${badge.currentScore}점\n시도 횟수: ${badge.attempts}회\n\n훌륭합니다! 🎉`,
    [{ text: '확인' }]
  );
};

// 뱃지 활성화 알림
export const showBadgeActivatedAlert = (badge: NursingBadge) => {
  Alert.alert(
    '✨ 뱃지 활성화!',
    `${badge.name} 뱃지가 활성화되었어요!\n\n현재 점수: ${badge.currentScore}점\n통과 점수: ${badge.passingScore}점\n\n이제 실습을 시작할 수 있습니다!`,
    [{ text: '확인' }]
  );
};

// 점수 업데이트 및 상태 변경 처리
export const handleScoreUpdate = (
  badgeId: number, 
  newScore: number,
  onBadgeUpdate?: (badge: NursingBadge) => void
): NursingBadge | null => {
  const updatedBadge = updateBadgeScore(badgeId, newScore);
  
  if (updatedBadge) {
    const previousStatus = getPreviousStatus(badgeId);
    
    // 상태가 변경된 경우 알림 표시
    if (previousStatus !== updatedBadge.status) {
      if (updatedBadge.status === 'completed') {
        showBadgeCompletedAlert(updatedBadge);
      } else if (updatedBadge.status === 'active' && previousStatus === 'pending') {
        showBadgeActivatedAlert(updatedBadge);
      }
    }
    
    // 콜백 함수 호출
    if (onBadgeUpdate) {
      onBadgeUpdate(updatedBadge);
    }
  }
  
  return updatedBadge;
};

// 이전 상태를 저장하기 위한 맵 (실제 앱에서는 상태 관리 라이브러리 사용)
const previousStatusMap = new Map<number, string>();

// 이전 상태 저장
export const savePreviousStatus = (badgeId: number, status: string) => {
  previousStatusMap.set(badgeId, status);
};

// 이전 상태 가져오기
export const getPreviousStatus = (badgeId: number): string => {
  return previousStatusMap.get(badgeId) || 'pending';
};

// 뱃지 진행률 계산
export const calculateProgress = (badge: NursingBadge): number => {
  if (badge.status === 'completed') return 100;
  if (badge.status === 'pending') {
    return Math.round((badge.currentScore / badge.requiredScore) * 100);
  }
  return Math.round((badge.currentScore / badge.passingScore) * 100);
};

// 뱃지 난이도별 색상
export const getDifficultyColor = (difficulty: '하' | '중' | '상'): string => {
  switch (difficulty) {
    case '하':
      return '#4CAF50'; // 초록색
    case '중':
      return '#FF9800'; // 주황색
    case '상':
      return '#F44336'; // 빨간색
    default:
      return '#9E9E9E'; // 회색
  }
};

// 뱃지 상태별 아이콘
export const getStatusIcon = (status: 'pending' | 'active' | 'completed'): string => {
  switch (status) {
    case 'pending':
      return '🔒';
    case 'active':
      return '✨';
    case 'completed':
      return '✓';
    default:
      return '❓';
  }
};

// 뱃지 상태별 텍스트
export const getStatusText = (status: 'pending' | 'active' | 'completed'): string => {
  switch (status) {
    case 'pending':
      return '대기 중';
    case 'active':
      return '도전 가능';
    case 'completed':
      return '완료';
    default:
      return '알 수 없음';
  }
};

// 뱃지 통계 계산
export const calculateBadgeStats = (badges: NursingBadge[]) => {
  const stats = {
    total: badges.length,
    pending: 0,
    active: 0,
    completed: 0,
    totalScore: 0,
    averageScore: 0,
    completionRate: 0,
  };

  badges.forEach(badge => {
    stats[badge.status]++;
    stats.totalScore += badge.currentScore;
  });

  stats.averageScore = Math.round(stats.totalScore / stats.total);
  stats.completionRate = Math.round((stats.completed / stats.total) * 100);

  return stats;
};

// 뱃지 필터링
export const filterBadges = (
  badges: NursingBadge[], 
  filter: 'all' | 'pending' | 'active' | 'completed'
): NursingBadge[] => {
  if (filter === 'all') return badges;
  return badges.filter(badge => badge.status === filter);
};

// 뱃지 검색
export const searchBadges = (badges: NursingBadge[], query: string): NursingBadge[] => {
  if (!query.trim()) return badges;
  
  const lowercaseQuery = query.toLowerCase();
  return badges.filter(badge => 
    badge.name.toLowerCase().includes(lowercaseQuery) ||
    badge.description.toLowerCase().includes(lowercaseQuery) ||
    badge.concept.toLowerCase().includes(lowercaseQuery)
  );
};

// 뱃지 정렬
export const sortBadges = (
  badges: NursingBadge[], 
  sortBy: 'name' | 'score' | 'difficulty' | 'status'
): NursingBadge[] => {
  return [...badges].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'score':
        return b.currentScore - a.currentScore;
      case 'difficulty':
        const difficultyOrder = { '하': 1, '중': 2, '상': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'status':
        const statusOrder = { 'pending': 1, 'active': 2, 'completed': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });
};
