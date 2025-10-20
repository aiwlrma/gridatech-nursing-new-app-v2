import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { 
  nursingBadges, 
  getPendingBadges, 
  getActiveBadges, 
  getCompletedBadges,
  getBadgeStats,
  updateBadgeScore,
  NursingBadge 
} from '../data/nursingBadges';
import { BadgeDetailModal } from '../components/BadgeDetailModal';
import { VRConfirmModal } from '../components/VRConfirmModal';

const { width } = Dimensions.get('window');

interface NursingBadgesScreenProps {
  onBack?: () => void;
}

export const NursingBadgesScreen: React.FC<NursingBadgesScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedBadge, setSelectedBadge] = useState<NursingBadge | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showVRConfirmModal, setShowVRConfirmModal] = useState(false);
  
  const getFilteredBadges = (): NursingBadge[] => {
    switch (filter) {
      case 'active':
        return getActiveBadges();
      case 'completed':
        return getCompletedBadges();
      default:
        return nursingBadges;
    }
  };

  const stats = getBadgeStats();

  const handleBadgePress = (badge: NursingBadge) => {
    setSelectedBadge(badge);
    setShowDetailModal(true);
  };

  const handleStartPractice = (badge: NursingBadge) => {
    setSelectedBadge(badge);
    setShowVRConfirmModal(true);
  };

  const handleRetryPractice = (badge: NursingBadge) => {
    setSelectedBadge(badge);
    setShowVRConfirmModal(true);
  };

  const handleVRConfirm = (badge: NursingBadge) => {
    // 실제 VR 실습 화면으로 이동하는 로직
    Alert.alert(
      'VR 실습 시작',
      `${badge.name} VR 실습을 시작합니다.\n\n실습이 완료되면 점수가 업데이트됩니다.`,
      [{ text: '확인' }]
    );
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedBadge(null);
  };

  const handleCloseVRConfirmModal = () => {
    setShowVRConfirmModal(false);
    setSelectedBadge(null);
  };

  const renderBadgeItem = (badge: NursingBadge) => (
    <TouchableOpacity 
      style={styles.badgeItem}
      key={badge.id}
      onPress={() => handleBadgePress(badge)}
      activeOpacity={0.7}
    >
      {/* 뱃지 원형 */}
      <View style={[
        styles.badgeCircle,
        badge.status === 'pending' && styles.badgePending,
        badge.status === 'active' && { backgroundColor: badge.color },
        badge.status === 'completed' && styles.badgeCompleted,
      ]}>
        {/* 아이콘 */}
        {badge.status === 'pending' && (
          <Text style={styles.badgeIcon}>🔒</Text>
        )}
        {badge.status === 'active' && (
          <Text style={styles.badgeIcon}>{badge.icon}</Text>
        )}
        {badge.status === 'completed' && (
          <Text style={styles.badgeIcon}>✓</Text>
        )}
      </View>
      
      {/* 뱃지 이름 */}
      <Text style={[
        styles.badgeName,
        badge.status === 'pending' && styles.badgeNamePending,
        badge.status === 'completed' && styles.badgeNameCompleted,
      ]}>
        {badge.name}
      </Text>
      
      {/* 상태별 정보 */}
      {badge.status === 'pending' && (
        <Text style={styles.badgeScore}>
          {badge.currentScore}점 / {badge.requiredScore}점 필요
        </Text>
      )}
      
      {badge.status === 'active' && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>
            {badge.currentScore}점
          </Text>
          <View style={styles.progressMini}>
            <View 
              style={[
                styles.progressMiniFill,
                {width: `${Math.min((badge.currentScore / badge.passingScore) * 100, 100)}%`}
              ]} 
            />
          </View>
          <Text style={styles.activeGoal}>
            {badge.passingScore}점 통과
          </Text>
        </View>
      )}
      
      {badge.status === 'completed' && (
        <Text style={styles.completedText}>
          {badge.completedDate}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={onBack}
                activeOpacity={0.7}
              >
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
            )}
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>실습 뱃지</Text>
              <Text style={styles.headerSub}>
                60점 이상이면 도전할 수 있어요!
              </Text>
            </View>
          </View>
        </View>

        {/* 통계 */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.active}</Text>
            <Text style={styles.statLabel}>도전 가능</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>통과 완료</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>대기 중</Text>
          </View>
        </View>

        {/* 필터 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity 
            style={[
              styles.filterChip,
              filter === 'all' && styles.filterChipActive
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive
            ]}>
              전체 ({stats.total})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterChip,
              filter === 'active' && styles.filterChipActive
            ]}
            onPress={() => setFilter('active')}
          >
            <Text style={[
              styles.filterText,
              filter === 'active' && styles.filterTextActive
            ]}>
              ✨ 도전 가능 ({stats.active})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterChip,
              filter === 'completed' && styles.filterChipActive
            ]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[
              styles.filterText,
              filter === 'completed' && styles.filterTextActive
            ]}>
              ✓ 완료 ({stats.completed})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 뱃지 그리드 */}
        <View style={styles.badgeGrid}>
          {getFilteredBadges().map(renderBadgeItem)}
        </View>

        {/* 하단 여백 */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* 뱃지 상세 모달 */}
      <BadgeDetailModal
        visible={showDetailModal}
        badge={selectedBadge}
        onClose={handleCloseDetailModal}
        onStartPractice={handleStartPractice}
        onRetryPractice={handleRetryPractice}
      />

      {/* VR 실습 시작 확인 모달 */}
      <VRConfirmModal
        visible={showVRConfirmModal}
        badge={selectedBadge}
        onClose={handleCloseVRConfirmModal}
        onConfirm={handleVRConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // 헤더
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  
  backIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  
  headerContent: {
    flex: 1,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
  },
  
  headerSub: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 통계
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1884FF',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  // 필터
  filterScroll: {
    marginBottom: 16,
  },
  
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  filterChipActive: {
    backgroundColor: '#1884FF',
    borderColor: '#1884FF',
  },
  
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  filterTextActive: {
    color: '#FFFFFF',
  },
  
  // 뱃지 그리드
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  
  badgeItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  
  // 뱃지 원형
  badgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  badgePending: {
    backgroundColor: '#F3F4F6',
    opacity: 0.5,
  },
  
  badgeCompleted: {
    backgroundColor: '#E5E7EB',
  },
  
  badgeIcon: {
    fontSize: 36,
  },
  
  // 뱃지 이름
  badgeName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#191F28',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  badgeNamePending: {
    color: '#9CA3AF',
  },
  
  badgeNameCompleted: {
    color: '#6B7280',
  },
  
  // 점수 (pending)
  badgeScore: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  
  // 활성 뱃지
  activeBadge: {
    width: '100%',
    alignItems: 'center',
  },
  
  activeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1884FF',
    marginBottom: 4,
  },
  
  progressMini: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  
  progressMiniFill: {
    height: '100%',
    backgroundColor: '#1884FF',
    borderRadius: 2,
  },
  
  activeGoal: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  
  // 완료 텍스트
  completedText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  
  // 하단 여백
  bottomSpacing: {
    height: 100,
  },
});
