import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  BarChart3,
  Award,
  TrendingUp,
  Star,
  Target,
  FileText,
  Lock,
  Sparkles,
  CheckCircle2,
  Share2,
  Trophy,
} from 'lucide-react-native';

interface GradeDetailScreenProps {
  onBack: () => void;
  initialTab?: 'overview' | 'grades' | 'badges' | 'achievements';
}

export const GradeDetailScreen: React.FC<GradeDetailScreenProps> = ({ 
  onBack, 
  initialTab = 'overview' 
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // 샘플 데이터
  const levelData = {
    level: 7,
    currentXP: 2450,
    maxXP: 3000,
    averageScore: 92,
    badgeCount: 12,
    completedTasks: 8,
    totalTasks: 10,
  };

  const semesterGrades = {
    semester: '2025-1학기',
    gpa: 92,
    grade: 'A+',
    subjects: [
      { name: '기초간호학', score: 95, grade: 'A+' },
      { name: '해부생리학', score: 88, grade: 'A' },
      { name: '간호학개론', score: 92, grade: 'A+' },
      { name: '임상실습', score: 90, grade: 'A' },
      { name: '성인간호학', score: 87, grade: 'B+' },
      { name: '아동간호학', score: 93, grade: 'A+' },
    ],
  };

  const recentTests = [
    { id: 1, name: '기초간호학 중간고사', date: '2025.01.15', score: 95 },
    { id: 2, name: '해부생리학 퀴즈', date: '2025.01.12', score: 88 },
    { id: 3, name: '간호학개론 과제', date: '2025.01.10', score: 92 },
    { id: 4, name: '임상실습 평가', date: '2025.01.08', score: 90 },
    { id: 5, name: '성인간호학 시험', date: '2025.01.05', score: 87 },
  ];

  const badges = [
    {
      id: 1,
      name: '첫 A+ 달성',
      emoji: '🏆',
      colors: ['#FCD34D', '#F59E0B'],
      unlocked: true,
      date: '2025.01.10',
    },
    {
      id: 2,
      name: '실습 마스터',
      emoji: '💉',
      colors: ['#60A5FA', '#3B82F6'],
      unlocked: true,
      date: '2025.01.08',
    },
    {
      id: 3,
      name: '완벽한 출석',
      emoji: '🎯',
      colors: ['#34D399', '#10B981'],
      unlocked: false,
      requirement: '출석률 100%',
    },
    {
      id: 4,
      name: '성실왕',
      emoji: '⭐',
      colors: ['#A78BFA', '#8B5CF6'],
      unlocked: false,
      requirement: '과제 10개 완료',
    },
    {
      id: 5,
      name: '실습 완주',
      emoji: '🏥',
      colors: ['#F9A8D4', '#EC4899'],
      unlocked: true,
      date: '2025.01.05',
    },
    {
      id: 6,
      name: '팀워크 마스터',
      emoji: '🤝',
      colors: ['#FBBF24', '#F59E0B'],
      unlocked: false,
      requirement: '팀 프로젝트 3개',
    },
  ];

  const achievements = [
    { id: 1, name: '첫 시험 완주', date: '2025.01.15', xp: 100 },
    { id: 2, name: '실습 5회 완료', date: '2025.01.10', xp: 200 },
    { id: 3, name: '과제 마감 준수', date: '2025.01.08', xp: 150 },
    { id: 4, name: '연속 출석 30일', date: '2025.01.05', xp: 100 },
    { id: 5, name: '퀴즈 10회 완료', date: '2025.01.03', xp: 75 },
  ];

  const progressPercentage = (levelData.currentXP / levelData.maxXP) * 100;

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ChevronLeft color="#191F28" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>성적 & 뱃지</Text>
      <TouchableOpacity style={styles.shareButton}>
        <Share2 color="#191F28" size={24} />
      </TouchableOpacity>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {[
        { key: 'overview', label: '전체' },
        { key: 'grades', label: '성적' },
        { key: 'badges', label: '뱃지' },
        { key: 'achievements', label: '업적' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab.key as any)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderLevelHero = () => (
    <LinearGradient
      colors={['#1884FF', '#1565C0']}
      style={styles.levelHero}
    >
      <View style={styles.levelContent}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelLabel}>현재 레벨</Text>
          <Text style={styles.levelValue}>Level {levelData.level}</Text>
          <Text style={styles.xpText}>
            {levelData.currentXP.toLocaleString()} / {levelData.maxXP.toLocaleString()} XP
          </Text>
        </View>
        <View style={styles.badgeIcon}>
          <Award color="#FCD34D" size={48} />
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <TrendingUp color="#FFFFFF" size={20} />
          <Text style={styles.statValue}>{levelData.averageScore}점</Text>
          <Text style={styles.statLabel}>평균</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Star color="#FFFFFF" size={20} />
          <Text style={styles.statValue}>{levelData.badgeCount}개</Text>
          <Text style={styles.statLabel}>뱃지</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Target color="#FFFFFF" size={20} />
          <Text style={styles.statValue}>{levelData.completedTasks}/{levelData.totalTasks}</Text>
          <Text style={styles.statLabel}>완료</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {renderLevelHero()}
      
      {/* 평균 점수 상세 */}
      <View style={styles.averageCard}>
        <View style={styles.averageHeader}>
          <Text style={styles.averageTitle}>{semesterGrades.semester}</Text>
          <Text style={styles.averageScore}>{semesterGrades.gpa}점</Text>
        </View>
        <View style={styles.gradeDisplay}>
          <Text style={styles.gradeLetter}>{semesterGrades.grade}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${semesterGrades.gpa}%` }]} />
        </View>
      </View>

      {/* 과목별 성적 리스트 */}
      <View style={styles.subjectsSection}>
        <Text style={styles.sectionTitle}>과목별 성적</Text>
        {semesterGrades.subjects.map((subject, index) => (
          <View key={index} style={styles.subjectItem}>
            <View style={styles.subjectRow}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <View style={styles.scoreBox}>
                <Text style={styles.score}>{subject.score}</Text>
                <Text style={styles.grade}>{subject.grade}</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${subject.score}%`,
                    backgroundColor: subject.score >= 95 ? '#10B981' : 
                                   subject.score >= 90 ? '#3B82F6' : 
                                   subject.score >= 80 ? '#F59E0B' : '#EF4444',
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* 뱃지 그리드 (2x3) */}
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>뱃지 컬렉션</Text>
        <View style={styles.badgeGrid}>
          {badges.map((badge) => (
            <TouchableOpacity
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked && styles.lockedBadgeCard]}
            >
              {badge.unlocked ? (
                <LinearGradient
                  colors={badge.colors}
                  style={styles.badgeCircle}
                >
                  <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.lockedBadge}>
                  <Lock color="#9CA3AF" size={32} />
                </View>
              )}
              <Text style={styles.badgeName}>{badge.name}</Text>
              {badge.unlocked ? (
                <Text style={styles.badgeDate}>{badge.date}</Text>
              ) : (
                <Text style={styles.badgeRequirement}>{badge.requirement}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 진행중인 도전과제 */}
      <View style={styles.challengeSection}>
        <Text style={styles.sectionTitle}>진행중인 도전과제</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIconBox}>
              <Target color="#1884FF" size={24} />
            </View>
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>10개 실습 완료하기</Text>
              <Text style={styles.challengeSubtitle}>
                {levelData.completedTasks} / {levelData.totalTasks} 완료
              </Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(levelData.completedTasks / levelData.totalTasks) * 100}%`,
                  backgroundColor: '#1884FF',
                },
              ]}
            />
          </View>

          <View style={styles.reward}>
            <Sparkles color="#F59E0B" size={16} />
            <Text style={styles.rewardText}>+200 XP</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderGradesTab = () => (
    <View style={styles.tabContent}>
      {renderLevelHero()}
      
      {/* 학기 성적 요약 */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.semesterTitle}>{semesterGrades.semester}</Text>
          <Text style={styles.gpaText}>평균 {semesterGrades.gpa}점</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.bigGrade}>{semesterGrades.grade}</Text>
        </View>

        <View style={styles.subjectList}>
          {semesterGrades.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectItem}>
              <View style={styles.subjectRow}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={styles.scoreBox}>
                  <Text style={styles.score}>{subject.score}</Text>
                  <Text style={styles.grade}>{subject.grade}</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${subject.score}%`,
                      backgroundColor: subject.score >= 95 ? '#10B981' : 
                                     subject.score >= 90 ? '#3B82F6' : 
                                     subject.score >= 80 ? '#F59E0B' : '#EF4444',
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 최근 시험 */}
      <View style={styles.recentTests}>
        <Text style={styles.sectionTitle}>최근 시험</Text>
        {recentTests.map((test) => (
          <TouchableOpacity key={test.id} style={styles.testCard}>
            <View style={styles.testIconBox}>
              <FileText color="#1884FF" size={24} />
            </View>
            <View style={styles.testContent}>
              <Text style={styles.testName}>{test.name}</Text>
              <Text style={styles.testDate}>{test.date}</Text>
            </View>
            <View style={styles.scoreChip}>
              <Text style={styles.scoreChipText}>{test.score}점</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBadgesTab = () => (
    <View style={styles.tabContent}>
      {renderLevelHero()}
      
      {/* 뱃지 진행률 */}
      <View style={styles.badgeProgress}>
        <Text style={styles.badgeProgressNumber}>
          {badges.filter(b => b.unlocked).length} / {badges.length}
        </Text>
        <Text style={styles.badgeProgressSubtitle}>뱃지 획득</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(badges.filter(b => b.unlocked).length / badges.length) * 100}%`,
                backgroundColor: '#1884FF',
              },
            ]}
          />
        </View>
      </View>

      {/* 뱃지 그리드 */}
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[styles.badgeCard, !badge.unlocked && styles.lockedBadgeCard]}
          >
            {badge.unlocked ? (
              <LinearGradient
                colors={badge.colors}
                style={styles.badgeCircle}
              >
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.lockedBadge}>
                <Lock color="#9CA3AF" size={32} />
              </View>
            )}
            <Text style={styles.badgeName}>{badge.name}</Text>
            {badge.unlocked ? (
              <Text style={styles.badgeDate}>{badge.date}</Text>
            ) : (
              <Text style={styles.badgeRequirement}>{badge.requirement}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAchievementsTab = () => (
    <View style={styles.tabContent}>
      {renderLevelHero()}
      
      {/* 진행중인 도전과제 */}
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={styles.challengeIconBox}>
            <Target color="#1884FF" size={24} />
          </View>
          <View style={styles.challengeContent}>
            <Text style={styles.challengeTitle}>10개 실습 완료하기</Text>
            <Text style={styles.challengeSubtitle}>
              {levelData.completedTasks} / {levelData.totalTasks} 완료
            </Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(levelData.completedTasks / levelData.totalTasks) * 100}%`,
                backgroundColor: '#1884FF',
              },
            ]}
          />
        </View>

        <View style={styles.reward}>
          <Sparkles color="#F59E0B" size={16} />
          <Text style={styles.rewardText}>+200 XP</Text>
        </View>
      </View>

      {/* 완료된 업적 */}
      <View style={styles.completedSection}>
        <Text style={styles.sectionTitle}>완료된 업적</Text>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={styles.checkIcon}>
              <CheckCircle2 color="#10B981" size={24} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDate}>완료: {achievement.date}</Text>
            </View>
            <Text style={styles.achievementXP}>+{achievement.xp} XP</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'grades':
        return renderGradesTab();
      case 'badges':
        return renderBadgesTab();
      case 'achievements':
        return renderAchievementsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
  },
  shareButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#1884FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  
  // 레벨 Hero 카드
  levelHero: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 24,
    height: 200,
  },
  levelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  levelValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  xpText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 20,
  },
  progress: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  // 평균 점수 상세
  averageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  averageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  averageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191F28',
  },
  averageScore: {
    fontSize: 16,
    color: '#6B7280',
  },
  gradeDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  gradeLetter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10B981',
  },
  
  // 과목별 성적
  subjectsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191F28',
    marginBottom: 16,
  },
  subjectList: {
    gap: 16,
  },
  subjectItem: {
    marginBottom: 16,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191F28',
  },
  grade: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  // 뱃지 섹션
  badgesSection: {
    marginBottom: 24,
  },
  badgeProgress: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  badgeProgressNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#191F28',
    marginBottom: 8,
  },
  badgeProgressSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  badgeCard: {
    width: '48%',
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
  lockedBadgeCard: {
    opacity: 0.6,
  },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeEmoji: {
    fontSize: 32,
  },
  lockedBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191F28',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  badgeRequirement: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  
  // 도전과제
  challengeSection: {
    marginBottom: 24,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191F28',
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  
  // 완료된 업적
  completedSection: {
    marginBottom: 24,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  checkIcon: {
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  achievementXP: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  
  // 기존 성적 탭 스타일
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  semesterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191F28',
  },
  gpaText: {
    fontSize: 16,
    color: '#6B7280',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bigGrade: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10B981',
  },
  
  // 최근 시험
  recentTests: {
    marginBottom: 24,
  },
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  testContent: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  testDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreChip: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1884FF',
  },
});
