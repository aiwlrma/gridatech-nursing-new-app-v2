import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { SvgIcon } from '../components/SvgIcon';

interface LearningReportScreenProps {
  onBack: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const LearningReportScreen: React.FC<LearningReportScreenProps> = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester'>('week');

  // 학습 데이터 (예시)
  const learningData = {
    week: {
      totalStudyTime: 24,
      completedTasks: 8,
      averageScore: 87,
      progress: 75,
    },
    month: {
      totalStudyTime: 96,
      completedTasks: 32,
      averageScore: 89,
      progress: 68,
    },
    semester: {
      totalStudyTime: 480,
      completedTasks: 160,
      averageScore: 91,
      progress: 85,
    },
  };

  const currentData = learningData[selectedPeriod];

  const StatCard = ({ title, value, unit, icon, color }: {
    title: string;
    value: number;
    unit: string;
    icon: string;
    color: string;
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <SvgIcon name={icon} size={20} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>
        {value}
        <Text style={styles.statUnit}>{unit}</Text>
      </Text>
    </View>
  );

  const ProgressBar = ({ progress }: { progress: number }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );

  const RecentActivity = () => (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>최근 학습 활동</Text>
      {[
        { title: '기초간호학 실습', time: '2시간 30분', date: '2024.01.19', score: 95 },
        { title: '성인간호학 이론', time: '1시간 45분', date: '2024.01.18', score: 88 },
        { title: '아동간호학 실습', time: '3시간 15분', date: '2024.01.17', score: 92 },
        { title: '정신간호학 이론', time: '2시간 00분', date: '2024.01.16', score: 85 },
      ].map((activity, index) => (
        <View key={index} style={styles.activityItem}>
          <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDetails}>
              {activity.time} • {activity.date}
            </Text>
          </View>
          <View style={styles.activityScore}>
            <Text style={styles.scoreText}>{activity.score}점</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={24} color="#191F28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>학습 리포트</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 기간 선택 */}
        <View style={styles.periodSelector}>
          {[
            { key: 'week', label: '주간' },
            { key: 'month', label: '월간' },
            { key: 'semester', label: '학기' },
          ].map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.key as any)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.key && styles.periodButtonTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 통계 카드 */}
        <View style={styles.statsGrid}>
          <StatCard
            title="총 학습시간"
            value={currentData.totalStudyTime}
            unit="시간"
            icon="clock"
            color="#1884FF"
          />
          <StatCard
            title="완료 과제"
            value={currentData.completedTasks}
            unit="개"
            icon="check-circle"
            color="#10B981"
          />
          <StatCard
            title="평균 점수"
            value={currentData.averageScore}
            unit="점"
            icon="star"
            color="#F59E0B"
          />
          <StatCard
            title="진행률"
            value={currentData.progress}
            unit="%"
            icon="trending-up"
            color="#8B5CF6"
          />
        </View>

        {/* 진행률 바 */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>전체 학습 진행률</Text>
          <ProgressBar progress={currentData.progress} />
        </View>

        {/* 최근 활동 */}
        <RecentActivity />

        {/* 학습 목표 */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>이번 주 학습 목표</Text>
          <View style={styles.goalItem}>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>기초간호학 실습 완료</Text>
              <Text style={styles.goalDescription}>실습 보고서 작성 및 제출</Text>
            </View>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '80%' }]} />
              </View>
              <Text style={styles.goalProgressText}>80%</Text>
            </View>
          </View>
          <View style={styles.goalItem}>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>성인간호학 이론 학습</Text>
              <Text style={styles.goalDescription}>챕터 3-5 복습 및 퀴즈</Text>
            </View>
            <View style={styles.goalProgress}>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.goalProgressText}>60%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#1884FF',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: (screenWidth - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 16,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1884FF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1884FF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  activityDetails: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  activityScore: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1884FF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  goalsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  goalInfo: {
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  goalDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 8,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  goalProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
