import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Check, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TOSS_THEME } from '../constants/tossTheme';
import { TossText } from '../components/TossText';
import { TossCard } from '../components/TossCard';

interface AllBadgesScreenProps {
  onBack: () => void;
}

interface Badge {
  id: number;
  icon: string;
  name: string;
  unlocked: boolean;
  date?: string;
  isFeatured?: boolean;
  description?: string;
  colors?: string[];
}

export const AllBadgesScreen: React.FC<AllBadgesScreenProps> = ({ onBack }) => {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [featuredBadgeId, setFeaturedBadgeId] = useState<number | null>(12);

  const badges: Badge[] = [
    { id: 1, icon: '🔒', name: '수학 마스터', unlocked: false, description: '수학 과목에서 만점을 받은 사람' },
    { id: 2, icon: '🔒', name: '영어 달인', unlocked: false, description: '영어 과목에서 우수한 성적을 받은 사람' },
    { id: 3, icon: '🔒', name: '과학 탐험가', unlocked: false, description: '과학 과목에서 뛰어난 성과를 낸 사람' },
    { id: 4, icon: '🔒', name: '국어 문학가', unlocked: false, description: '국어 과목에서 탁월한 실력을 보인 사람' },
    { id: 5, icon: '🔒', name: '사회 연구자', unlocked: false, description: '사회 과목에서 깊이 있는 학습을 한 사람' },
    { id: 6, icon: '🔒', name: '체육 챔피언', unlocked: false, description: '체육 과목에서 뛰어난 기량을 보인 사람' },
    { id: 7, icon: '📚', name: '성적 향상가', unlocked: true, date: '2024.01.15', description: '전체 성적이 크게 향상된 사람', colors: ['#60A5FA', '#3B82F6'] },
    { id: 8, icon: '🔒', name: '과제 완성자', unlocked: false, description: '모든 과제를 완벽하게 제출한 사람' },
    { id: 9, icon: '🔒', name: '출석왕', unlocked: false, description: '완벽한 출석률을 유지한 사람' },
    { id: 10, icon: '🔒', name: '학습 열정가', unlocked: false, description: '학습에 대한 열정이 뛰어난 사람' },
    { id: 11, icon: '🏆', name: '우등생', unlocked: true, date: '2024.01.10', description: '전체 평균 90점 이상을 받은 사람', colors: ['#34D399', '#10B981'] },
    { id: 12, icon: '⭐', name: '황금 성적', unlocked: true, date: '2024.01.08', isFeatured: true, description: '모든 과목에서 A+를 받은 사람', colors: ['#FCD34D', '#F59E0B'] },
  ];

  const featuredBadge = badges.find(b => b.id === featuredBadgeId);
  const unlockedCount = badges.filter(b => b.unlocked).length;

  const handleBadgePress = (badge: Badge) => {
    if (badge.unlocked) {
      setSelectedBadge(badge);
      setShowDetailModal(true);
    }
  };

  const handleSetAsFeatured = (badgeId: number) => {
    setFeaturedBadgeId(badgeId);
    setShowDetailModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>성적 & 뱃지</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 나의 대표 뱃지 섹션 */}
        <TossCard style={styles.featuredSection}>
          <TossText variant="title" style={styles.featuredTitle}>나의 대표 뱃지</TossText>
          <TossText variant="caption" style={styles.featuredSub}>
            획득한 성적뱃지가 {unlockedCount}개 있어요.{'\n'}
            '성적뱃지'만 대표 뱃지로 설정할 수 있어요.
          </TossText>

          {/* 대표 뱃지 */}
          <TouchableOpacity 
            style={styles.featuredBadge}
            onPress={() => setShowBadgeModal(true)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.featuredCircle,
              !featuredBadge?.unlocked && styles.lockedCircle
            ]}>
              {featuredBadge?.unlocked && featuredBadge.colors ? (
                <LinearGradient colors={featuredBadge.colors} style={styles.featuredGradient}>
                  <Text style={styles.featuredEmoji}>{featuredBadge.icon}</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.featuredEmoji}>
                  {featuredBadge?.icon || '🔒'}
                </Text>
              )}
            </View>
            {featuredBadge?.unlocked && (
              <View style={styles.featuredInfo}>
                <TossText variant="body" style={styles.featuredName}>{featuredBadge.name}</TossText>
                <TossText variant="caption" style={styles.featuredDate}>{featuredBadge.date}</TossText>
              </View>
            )}
            {!featuredBadge && (
              <TossText variant="caption" style={styles.featuredEmpty}>대표 뱃지를 선택해주세요</TossText>
            )}
          </TouchableOpacity>
        </TossCard>

        {/* 전체 뱃지 그리드 */}
        <TossCard style={styles.badgeSection}>
          <TossText variant="title" style={styles.sectionTitle}>전체 성적 뱃지 ({unlockedCount}/{badges.length})</TossText>
          
          <View style={styles.badgeGrid}>
            {badges.map(badge => (
              <TouchableOpacity 
                style={styles.badgeItem}
                key={badge.id}
                onPress={() => handleBadgePress(badge)}
                disabled={!badge.unlocked}
                activeOpacity={badge.unlocked ? 0.8 : 1}
              >
                <View style={[
                  styles.badgeCircle,
                  !badge.unlocked && styles.badgeLocked
                ]}>
                  {badge.unlocked && badge.colors ? (
                    <LinearGradient colors={badge.colors} style={styles.badgeGradient}>
                      <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                  )}
                </View>
                <TossText 
                  variant="caption" 
                  style={!badge.unlocked ? styles.badgeNameLocked : styles.badgeName} 
                  numberOfLines={1}
                >
                  {badge.name}
                </TossText>
                {badge.unlocked && badge.date && (
                  <TossText variant="small" style={styles.badgeDate}>{badge.date}</TossText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TossCard>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* 대표 뱃지 선택 모달 */}
      <Modal
        visible={showBadgeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBadgeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TossText variant="title" style={styles.modalTitle}>대표 성적 뱃지 선택</TossText>
            
            <ScrollView style={styles.modalBadgeList} showsVerticalScrollIndicator={false}>
              {badges.filter(b => b.unlocked).map(badge => (
                <TouchableOpacity
                  style={styles.modalBadgeItem}
                  key={badge.id}
                  onPress={() => {
                    setFeaturedBadgeId(badge.id);
                    setShowBadgeModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.modalBadgeIcon}>
                    {badge.colors ? (
                      <LinearGradient colors={badge.colors} style={styles.modalBadgeGradient}>
                        <Text style={styles.modalBadgeEmoji}>{badge.icon}</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.modalBadgeEmoji}>{badge.icon}</Text>
                    )}
                  </View>
                  <View style={styles.modalBadgeInfo}>
                    <TossText variant="body" style={styles.modalBadgeName}>{badge.name}</TossText>
                    <TossText variant="caption" style={styles.modalBadgeDate}>{badge.date}</TossText>
                  </View>
                  {badge.id === featuredBadgeId && (
                    <Check size={20} color={TOSS_THEME.colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowBadgeModal(false)}
              activeOpacity={0.8}
            >
              <TossText variant="body" style={styles.modalCloseText}>닫기</TossText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 뱃지 상세 모달 */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModalContent}>
            {selectedBadge && (
              <>
                <View style={styles.detailBadgeIcon}>
                  {selectedBadge.colors ? (
                    <LinearGradient colors={selectedBadge.colors} style={styles.detailBadgeGradient}>
                      <Text style={styles.detailBadgeEmoji}>{selectedBadge.icon}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.detailBadgeEmoji}>{selectedBadge.icon}</Text>
                  )}
                </View>
                <TossText variant="title" style={styles.detailBadgeName}>{selectedBadge.name}</TossText>
                <TossText variant="caption" style={styles.detailDescription}>
                  {selectedBadge.description}
                </TossText>
                <TossText variant="caption" style={styles.detailDate}>
                  획득일: {selectedBadge.date}
                </TossText>
                
                <TouchableOpacity
                  style={styles.setFeaturedButton}
                  onPress={() => handleSetAsFeatured(selectedBadge.id)}
                  activeOpacity={0.8}
                >
                  <TossText variant="body" style={styles.setFeaturedText}>대표 성적 뱃지로 설정</TossText>
                </TouchableOpacity>
              </>
            )}
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDetailModal(false)}
              activeOpacity={0.8}
            >
              <TossText variant="body" style={styles.modalCloseText}>닫기</TossText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TOSS_THEME.colors.background,
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingTop: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.md,
    backgroundColor: TOSS_THEME.colors.card,
  },
  backButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  backButtonText: {
    fontSize: 24,
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  
  // 콘텐츠
  content: {
    flex: 1,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  
  // 나의 대표 뱃지 섹션
  featuredSection: {
    marginTop: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.md,
    alignItems: 'center',
  },
  featuredTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.sm,
  },
  featuredSub: {
    color: TOSS_THEME.colors.text.secondary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.xl,
  },
  featuredBadge: {
    alignItems: 'center',
    paddingVertical: TOSS_THEME.spacing.lg,
  },
  featuredCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.md,
    ...TOSS_THEME.shadow.medium,
  },
  lockedCircle: {
    backgroundColor: TOSS_THEME.colors.divider,
    opacity: 0.6,
  },
  featuredGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredEmoji: {
    fontSize: 64,
  },
  featuredInfo: {
    alignItems: 'center',
  },
  featuredName: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  featuredDate: {
    color: TOSS_THEME.colors.text.tertiary,
  },
  featuredEmpty: {
    color: TOSS_THEME.colors.text.tertiary,
    marginTop: TOSS_THEME.spacing.sm,
  },
  
  // 뱃지 섹션
  badgeSection: {
    paddingTop: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.xl,
  },
  sectionTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.lg,
  },
  
  // 뱃지 그리드
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.lg,
  },
  badgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: TOSS_THEME.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.sm,
    ...TOSS_THEME.shadow.small,
  },
  badgeLocked: {
    backgroundColor: TOSS_THEME.colors.divider,
    opacity: 0.5,
  },
  badgeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 40,
  },
  badgeName: {
    color: TOSS_THEME.colors.text.primary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  badgeNameLocked: {
    color: TOSS_THEME.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  badgeDate: {
    color: TOSS_THEME.colors.text.tertiary,
    textAlign: 'center',
  },
  
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: TOSS_THEME.colors.card,
    borderTopLeftRadius: TOSS_THEME.borderRadius.xl,
    borderTopRightRadius: TOSS_THEME.borderRadius.xl,
    paddingTop: TOSS_THEME.spacing.lg,
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.xl,
    maxHeight: '80%',
  },
  modalTitle: {
    color: TOSS_THEME.colors.text.primary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.lg,
  },
  modalBadgeList: {
    maxHeight: 400,
  },
  modalBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: TOSS_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: TOSS_THEME.colors.divider,
  },
  modalBadgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: TOSS_THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: TOSS_THEME.spacing.md,
  },
  modalBadgeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBadgeEmoji: {
    fontSize: 24,
  },
  modalBadgeInfo: {
    flex: 1,
  },
  modalBadgeName: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  modalBadgeDate: {
    color: TOSS_THEME.colors.text.secondary,
  },
  modalCloseButton: {
    backgroundColor: TOSS_THEME.colors.primary,
    paddingVertical: TOSS_THEME.spacing.md,
    borderRadius: TOSS_THEME.borderRadius.md,
    alignItems: 'center',
    marginTop: TOSS_THEME.spacing.lg,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // 상세 모달
  detailModalContent: {
    backgroundColor: TOSS_THEME.colors.card,
    borderTopLeftRadius: TOSS_THEME.borderRadius.xl,
    borderTopRightRadius: TOSS_THEME.borderRadius.xl,
    paddingTop: TOSS_THEME.spacing.xl,
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.xl,
    alignItems: 'center',
  },
  detailBadgeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: TOSS_THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.lg,
    ...TOSS_THEME.shadow.medium,
  },
  detailBadgeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBadgeEmoji: {
    fontSize: 48,
  },
  detailBadgeName: {
    color: TOSS_THEME.colors.text.primary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.sm,
  },
  detailDescription: {
    color: TOSS_THEME.colors.text.secondary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.md,
  },
  detailDate: {
    color: TOSS_THEME.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.xl,
  },
  setFeaturedButton: {
    backgroundColor: TOSS_THEME.colors.primary,
    paddingVertical: TOSS_THEME.spacing.md,
    paddingHorizontal: TOSS_THEME.spacing.xl,
    borderRadius: TOSS_THEME.borderRadius.md,
    marginBottom: TOSS_THEME.spacing.lg,
  },
  setFeaturedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  bottomSpacing: {
    height: 100,
  },
});
