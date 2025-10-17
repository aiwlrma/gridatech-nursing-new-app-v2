import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, BarChart3, TrendingUp, Star, Target, Award, Lock, CheckCircle2, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TOSS_THEME } from '../constants/tossTheme';
import { TossCard } from '../components/TossCard';
import { TossText } from '../components/TossText';
import { TossButton } from '../components/TossButton';

interface TossGradeScreenProps {
  onBack: () => void;
  onNavigateToAllBadges?: () => void;
}

export const TossGradeScreen: React.FC<TossGradeScreenProps> = ({ onBack, onNavigateToAllBadges }) => {
  const [activeTab, setActiveTab] = useState('grades');

  // 성적 데이터
  const subjects = [
    { name: '기초간호학', score: 95, grade: 'A+' },
    { name: '성인간호학', score: 88, grade: 'A' },
    { name: '아동간호학', score: 92, grade: 'A+' },
    { name: '정신간호학', score: 85, grade: 'B+' },
  ];

  // 최근 시험 데이터
  const recentTests = [
    { name: '기초간호학 중간고사', date: '2025.01.15', score: 95 },
    { name: '성인간호학 퀴즈', date: '2025.01.12', score: 88 },
    { name: '아동간호학 실습평가', date: '2025.01.10', score: 92 },
  ];

  // 뱃지 데이터
  const badges = [
    { id: 1, name: '첫 A+ 달성', emoji: '🏆', colors: ['#FCD34D', '#F59E0B'], unlocked: true, date: '2025.01.10' },
    { id: 2, name: '실습 마스터', emoji: '💉', colors: ['#60A5FA', '#3B82F6'], unlocked: true, date: '2025.01.08' },
    { id: 3, name: '완벽한 출석', emoji: '🎯', colors: ['#34D399', '#10B981'], unlocked: false, requirement: '출석률 100%' },
    { id: 4, name: '성실왕', emoji: '⭐', colors: ['#A78BFA', '#8B5CF6'], unlocked: false, requirement: '과제 10개 완료' },
    { id: 5, name: '퀴즈 마스터', emoji: '🧠', colors: ['#F9A8D4', '#EC4899'], unlocked: true, date: '2025.01.05' },
    { id: 6, name: '실습 완주', emoji: '🏥', colors: ['#FBBF24', '#F59E0B'], unlocked: false, requirement: '실습 20회 완료' },
  ];

  // 업적 데이터
  const achievements = [
    { name: '첫 번째 A+ 달성', date: '2025.01.10', xp: 100 },
    { name: '연속 출석 30일', date: '2025.01.08', xp: 50 },
    { name: '퀴즈 10회 완료', date: '2025.01.05', xp: 75 },
  ];

  const tabs = [
    { id: 'grades', label: '성적' },
    { id: 'badges', label: '뱃지' },
    { id: 'achievements', label: '업적' },
  ];

  const renderGradesTab = () => (
    <View>
      {/* 학기 성적 요약 */}
      <TossCard style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <TossText type="title" style={styles.summaryTitle}>2025-1학기</TossText>
          <View style={styles.gpaContainer}>
            <TossText type="hero" style={styles.gpaNumber}>92</TossText>
            <TossText type="caption" style={styles.gpaLabel}>평균</TossText>
          </View>
        </View>
        
        <View style={styles.gradeDisplay}>
          <TossText type="hero" style={styles.gradeLetter}>A+</TossText>
        </View>
      </TossCard>

      {/* 과목별 성적 */}
      <View style={styles.subjectsSection}>
        <TossText type="title" style={styles.sectionTitle}>과목별 성적</TossText>
        {subjects.map((subject, index) => (
          <TossCard key={index} style={styles.subjectCard}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectInfo}>
                <TossText type="body" style={styles.subjectName}>{subject.name}</TossText>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${subject.score}%` }]} />
                </View>
              </View>
              <View style={styles.scoreContainer}>
                <TossText type="display" style={styles.subjectScore}>{subject.score}</TossText>
                <TossText type="caption" style={styles.subjectGrade}>{subject.grade}</TossText>
              </View>
            </View>
          </TossCard>
        ))}
      </View>

      {/* 최근 시험 */}
      <View style={styles.recentTestsSection}>
        <TossText type="title" style={styles.sectionTitle}>최근 시험</TossText>
        {recentTests.map((test, index) => (
          <TouchableOpacity key={index} style={styles.testCard}>
            <TossCard style={styles.testCardContent}>
              <View style={styles.testIcon}>
                <BarChart3 size={24} color={TOSS_THEME.colors.primary} />
              </View>
              <View style={styles.testInfo}>
                <TossText type="body" style={styles.testName}>{test.name}</TossText>
                <TossText type="caption" style={styles.testDate}>{test.date}</TossText>
              </View>
              <View style={styles.testScore}>
                <TossText type="display" style={styles.testScoreText}>{test.score}점</TossText>
              </View>
            </TossCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBadgesTab = () => (
    <View>
      {/* 뱃지 진행률 */}
      <TossCard style={styles.badgeProgressCard}>
        <View style={styles.badgeProgressContent}>
          <TossText type="hero" style={styles.badgeProgressNumber}>3 / 6</TossText>
          <TossText type="caption" style={styles.badgeProgressLabel}>뱃지 획득</TossText>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>
      </TossCard>

      {/* 전체 뱃지 보기 버튼 */}
      {onNavigateToAllBadges && (
        <TouchableOpacity
          style={styles.viewAllBadgesButton}
          onPress={onNavigateToAllBadges}
          activeOpacity={0.8}
        >
          <TossCard style={styles.viewAllBadgesCard}>
            <View style={styles.viewAllBadgesContent}>
              <TossText variant="body" style={styles.viewAllBadgesText}>전체 뱃지 보기</TossText>
              <ChevronLeft size={20} color={TOSS_THEME.colors.primary} style={styles.viewAllBadgesIcon} />
            </View>
          </TossCard>
        </TouchableOpacity>
      )}

      {/* 뱃지 그리드 */}
      <View style={styles.badgesGrid}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[styles.badgeCard, !badge.unlocked && styles.lockedBadge]}
            activeOpacity={0.8}
          >
            <TossCard style={styles.badgeCardContent}>
              {badge.unlocked ? (
                <LinearGradient colors={badge.colors} style={styles.badgeIcon}>
                  <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.lockedIcon}>
                  <Lock size={32} color={TOSS_THEME.colors.text.tertiary} />
                </View>
              )}
              <TossText type="caption" style={styles.badgeName}>{badge.name}</TossText>
              {badge.unlocked ? (
                <TossText type="small" style={styles.badgeDate}>{badge.date}</TossText>
              ) : (
                <TossText type="small" style={styles.badgeRequirement}>{badge.requirement}</TossText>
              )}
            </TossCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAchievementsTab = () => (
    <View>
      {/* 진행중인 도전과제 */}
      <TossCard style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={styles.challengeIcon}>
            <Target size={24} color={TOSS_THEME.colors.primary} />
          </View>
          <View style={styles.challengeInfo}>
            <TossText type="body" style={styles.challengeTitle}>10개 실습 완료하기</TossText>
            <TossText type="caption" style={styles.challengeProgress}>8 / 10 완료</TossText>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
        </View>
        <View style={styles.rewardContainer}>
          <Sparkles size={16} color="#F59E0B" />
          <TossText type="caption" style={styles.rewardText}>+200 XP</TossText>
        </View>
      </TossCard>

      {/* 완료된 업적 */}
      <View style={styles.completedSection}>
        <TossText type="title" style={styles.sectionTitle}>완료된 업적</TossText>
        {achievements.map((achievement, index) => (
          <TossCard key={index} style={styles.achievementCard}>
            <View style={styles.achievementContent}>
              <View style={styles.achievementIcon}>
                <CheckCircle2 size={24} color={TOSS_THEME.colors.success} />
              </View>
              <View style={styles.achievementInfo}>
                <TossText type="body" style={styles.achievementName}>{achievement.name}</TossText>
                <TossText type="caption" style={styles.achievementDate}>완료: {achievement.date}</TossText>
              </View>
              <TossText type="display" style={styles.achievementXp}>+{achievement.xp} XP</TossText>
            </View>
          </TossCard>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color={TOSS_THEME.colors.text.primary} />
        </TouchableOpacity>
        <TossText type="title" style={styles.headerTitle}>성적 조회</TossText>
        <TouchableOpacity style={styles.chartButton}>
          <BarChart3 size={24} color={TOSS_THEME.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 레벨 Hero 카드 */}
      <LinearGradient colors={['#1E88E5', '#1565C0']} style={styles.levelCard}>
        <View style={styles.levelContent}>
          <View style={styles.levelInfo}>
            <TossText type="caption" style={styles.levelLabel}>현재 레벨</TossText>
            <TossText type="hero" style={styles.levelValue}>Level 7</TossText>
            <TossText type="caption" style={styles.xpText}>2,450 / 3,000 XP</TossText>
          </View>
          <View style={styles.badgeIcon}>
            <Award color="#FCD34D" size={48} />
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '82%' }]} />
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <TrendingUp color="#FFFFFF" size={20} />
            <TossText type="display" style={styles.statValue}>92점</TossText>
            <TossText type="caption" style={styles.statLabel}>평균</TossText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Star color="#FFFFFF" size={20} />
            <TossText type="display" style={styles.statValue}>3개</TossText>
            <TossText type="caption" style={styles.statLabel}>뱃지</TossText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Target color="#FFFFFF" size={20} />
            <TossText type="display" style={styles.statValue}>8/10</TossText>
            <TossText type="caption" style={styles.statLabel}>완료</TossText>
          </View>
        </View>
      </LinearGradient>

      {/* 탭 */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <TossText
              type="body"
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </TossText>
          </TouchableOpacity>
        ))}
      </View>

      {/* 콘텐츠 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'grades' && renderGradesTab()}
        {activeTab === 'badges' && renderBadgesTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TOSS_THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingTop: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.md,
  },
  backButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  headerTitle: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '700',
  },
  chartButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  levelCard: {
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.lg,
    borderRadius: TOSS_THEME.borderRadius.lg,
    padding: TOSS_THEME.spacing.lg,
    height: 200,
  },
  levelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.md,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  levelValue: {
    color: '#FFFFFF',
    marginVertical: TOSS_THEME.spacing.xs,
  },
  xpText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  badgeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: TOSS_THEME.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    marginVertical: TOSS_THEME.spacing.xs / 2,
  },
  statLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.lg,
    backgroundColor: TOSS_THEME.colors.background,
    borderRadius: TOSS_THEME.borderRadius.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: TOSS_THEME.spacing.sm,
    alignItems: 'center',
    borderRadius: TOSS_THEME.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: TOSS_THEME.colors.primary,
  },
  tabText: {
    color: TOSS_THEME.colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  summaryCard: {
    marginBottom: TOSS_THEME.spacing.lg,
    alignItems: 'center',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: TOSS_THEME.spacing.md,
  },
  summaryTitle: {
    color: TOSS_THEME.colors.text.primary,
  },
  gpaContainer: {
    alignItems: 'center',
  },
  gpaNumber: {
    color: TOSS_THEME.colors.primary,
  },
  gpaLabel: {
    color: TOSS_THEME.colors.text.secondary,
  },
  gradeDisplay: {
    alignItems: 'center',
  },
  gradeLetter: {
    color: TOSS_THEME.colors.success,
    fontSize: 64,
  },
  subjectsSection: {
    marginBottom: TOSS_THEME.spacing.lg,
  },
  sectionTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.md,
  },
  subjectCard: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  subjectScore: {
    color: TOSS_THEME.colors.primary,
  },
  subjectGrade: {
    color: TOSS_THEME.colors.text.secondary,
  },
  recentTestsSection: {
    marginBottom: TOSS_THEME.spacing.lg,
  },
  testCard: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  testCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testIcon: {
    marginRight: TOSS_THEME.spacing.md,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  testDate: {
    color: TOSS_THEME.colors.text.secondary,
  },
  testScore: {
    alignItems: 'center',
  },
  testScoreText: {
    color: TOSS_THEME.colors.primary,
  },
  badgeProgressCard: {
    marginBottom: TOSS_THEME.spacing.lg,
    alignItems: 'center',
  },
  viewAllBadgesButton: {
    marginBottom: TOSS_THEME.spacing.lg,
  },
  viewAllBadgesCard: {
    paddingVertical: TOSS_THEME.spacing.md,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  viewAllBadgesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllBadgesText: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '600',
  },
  viewAllBadgesIcon: {
    transform: [{ rotate: '180deg' }],
  },
  badgeProgressContent: {
    alignItems: 'center',
  },
  badgeProgressNumber: {
    color: TOSS_THEME.colors.primary,
    marginBottom: TOSS_THEME.spacing.xs,
  },
  badgeProgressLabel: {
    color: TOSS_THEME.colors.text.secondary,
    marginBottom: TOSS_THEME.spacing.md,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    marginBottom: TOSS_THEME.spacing.md,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeCardContent: {
    alignItems: 'center',
    padding: TOSS_THEME.spacing.md,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: TOSS_THEME.spacing.sm,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  lockedIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: TOSS_THEME.spacing.sm,
    backgroundColor: TOSS_THEME.colors.background,
  },
  badgeName: {
    color: TOSS_THEME.colors.text.primary,
    textAlign: 'center',
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  badgeDate: {
    color: TOSS_THEME.colors.text.secondary,
    textAlign: 'center',
  },
  badgeRequirement: {
    color: TOSS_THEME.colors.text.tertiary,
    textAlign: 'center',
  },
  challengeCard: {
    marginBottom: TOSS_THEME.spacing.lg,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.md,
  },
  challengeIcon: {
    marginRight: TOSS_THEME.spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  challengeProgress: {
    color: TOSS_THEME.colors.text.secondary,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: TOSS_THEME.spacing.sm,
  },
  rewardText: {
    color: '#F59E0B',
    marginLeft: TOSS_THEME.spacing.xs,
  },
  completedSection: {
    marginBottom: TOSS_THEME.spacing.lg,
  },
  achievementCard: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    marginRight: TOSS_THEME.spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  achievementDate: {
    color: TOSS_THEME.colors.text.secondary,
  },
  achievementXp: {
    color: TOSS_THEME.colors.success,
  },
  bottomSpacing: {
    height: 100,
  },
});
