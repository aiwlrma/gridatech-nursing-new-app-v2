import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, TrendingUp, Star, Target, Award, Clock, CheckCircle2, Sparkles, BookOpen, Zap, Brain } from 'lucide-react-native';
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
  // 이번 주 성과 데이터
  const weeklyHighlights = {
    scoreImprovement: 8,
    vrPracticeTime: 4.5,
    completedScenarios: 3,
    weekRange: '10/13 - 10/17'
  };

  // 성장 그래프 데이터 (최근 5회 점수)
  const growthChartData = [68, 72, 75, 78, 85];

  // 강점 분석 데이터
  const strengths = [
    { 
      name: '응급 처치', 
      score: 92, 
      icon: '🩺', 
      comment: '최고 기록!',
      progress: 92 
    },
    { 
      name: '주사 실습', 
      score: 85, 
      icon: '💉', 
      comment: '안정적!',
      progress: 85 
    },
    { 
      name: '환자 소통', 
      score: 88, 
      icon: '💬', 
      comment: '뛰어나요!',
      progress: 88 
    }
  ];

  // 다음 목표 데이터 (하나만 표시)
  const nextGoal = {
    name: '피하주사',
    currentScore: 68,
    targetScore: 70,
    icon: '🩹',
    description: '68점 → 70점'
  };

  // AI 튜터 조언 (간결하게)
  const aiTip = "손목 각도 45도 유지하기";

  // 이번 주 하이라이트 (간결하게)
  const renderWeeklyHighlights = () => (
    <TossCard style={styles.highlightCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerEmoji}>🎉</Text>
        <TossText variant="title" style={styles.cardTitle}>이번 주 하이라이트</TossText>
      </View>
      
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📈</Text>
          <TossText variant="display" style={styles.gridStatValue}>+{weeklyHighlights.scoreImprovement}점</TossText>
          <TossText variant="caption" style={styles.gridStatLabel}>지난주 대비</TossText>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>⏱️</Text>
          <TossText variant="display" style={styles.gridStatValue}>{weeklyHighlights.vrPracticeTime}시간</TossText>
          <TossText variant="caption" style={styles.gridStatLabel}>VR 실습</TossText>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>✅</Text>
          <TossText variant="display" style={styles.gridStatValue}>{weeklyHighlights.completedScenarios}개</TossText>
          <TossText variant="caption" style={styles.gridStatLabel}>완료</TossText>
        </View>
      </View>
    </TossCard>
  );

  // 성장 추세 (간결하게)
  const renderGrowthChart = () => (
    <TossCard style={styles.chartCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerEmoji}>📈</Text>
        <TossText variant="title" style={styles.cardTitle}>성장 추세</TossText>
      </View>
      
      <View style={styles.chart}>
        {growthChartData.map((score, idx) => (
          <View style={styles.chartBar} key={idx}>
            <View style={[styles.chartFill, {height: `${score}%`}]} />
            <TossText variant="caption" style={styles.chartLabel}>{score}</TossText>
          </View>
        ))}
      </View>
      
      <View style={styles.insightBox}>
        <Text style={styles.insightIcon}>💪</Text>
        <TossText variant="caption" style={styles.insightText}>계속 상승 중!</TossText>
      </View>
    </TossCard>
  );

  // TOP 3 강점 (간결하게)
  const renderStrengthAnalysis = () => (
    <TossCard style={styles.strengthCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerEmoji}>🌟</Text>
        <TossText variant="title" style={styles.cardTitle}>TOP 3 강점</TossText>
      </View>
      
      {strengths.map((strength, index) => (
        <View style={styles.strengthItem} key={index}>
          <Text style={styles.strengthIcon}>{strength.icon}</Text>
          <View style={styles.strengthContent}>
            <View style={styles.strengthHeader}>
              <TossText variant="body" style={styles.strengthName}>{strength.name}</TossText>
              <TossText variant="caption" style={styles.strengthScore}>{strength.score}점</TossText>
            </View>
            <View style={styles.strengthBar}>
              <View style={[styles.strengthFill, {width: `${strength.progress}%`}]} />
            </View>
          </View>
        </View>
      ))}
    </TossCard>
  );

  // 다음 목표 (하나만)
  const renderNextGoal = () => (
    <TossCard style={styles.goalCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerEmoji}>🎯</Text>
        <TossText variant="title" style={styles.cardTitle}>다음 목표</TossText>
      </View>
      
      <View style={styles.goalBox}>
        <View style={styles.goalIconBox}>
          <Text style={styles.goalIcon}>{nextGoal.icon}</Text>
        </View>
        
        <View style={styles.goalContent}>
          <TossText variant="body" style={styles.goalName}>{nextGoal.name}</TossText>
          <TossText variant="caption" style={styles.goalDesc}>{nextGoal.description}</TossText>
          <TossText variant="caption" style={styles.goalMeta}>2점만 더!</TossText>
        </View>
        
        <TouchableOpacity style={styles.goalButton}>
          <TossText variant="caption" style={styles.goalButtonText}>연습</TossText>
        </TouchableOpacity>
      </View>
    </TossCard>
  );

  // AI 팁 (간결하게)
  const renderAITip = () => (
    <View style={styles.tipBanner}>
      <Text style={styles.tipIcon}>💡</Text>
      <TossText variant="caption" style={styles.tipText}>
        AI 팁: {aiTip}
      </TossText>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color={TOSS_THEME.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>학습 리포트</Text>
        <TouchableOpacity style={styles.chartButton}>
          <TrendingUp size={24} color={TOSS_THEME.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 레벨 Hero 카드 (유지) */}
      <LinearGradient colors={['#1E88E5', '#1565C0']} style={styles.levelCard}>
        <View style={styles.levelContent}>
          <View style={styles.levelInfo}>
            <TossText variant="caption" style={styles.levelLabel}>현재 레벨</TossText>
            <TossText variant="hero" style={styles.levelValue}>Level 7</TossText>
            <TossText variant="caption" style={styles.xpText}>2,450 / 3,000 XP</TossText>
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
            <TossText variant="display" style={styles.statValue}>92점</TossText>
            <TossText variant="caption" style={styles.statLabel}>평균</TossText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Star color="#FFFFFF" size={20} />
            <TossText variant="display" style={styles.statValue}>3개</TossText>
            <TossText variant="caption" style={styles.statLabel}>뱃지</TossText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Target color="#FFFFFF" size={20} />
            <TossText variant="display" style={styles.statValue}>8/10</TossText>
            <TossText variant="caption" style={styles.statLabel}>완료</TossText>
          </View>
        </View>
      </LinearGradient>

      {/* 학습 리포트 콘텐츠 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderWeeklyHighlights()}
        {renderGrowthChart()}
        {renderStrengthAnalysis()}
        {renderNextGoal()}
        {renderAITip()}
        
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
    paddingTop: TOSS_THEME.spacing.md,
    paddingBottom: TOSS_THEME.spacing.sm,
  },
  backButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  chartButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  levelCard: {
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.md,
    borderRadius: TOSS_THEME.borderRadius.lg,
    padding: TOSS_THEME.spacing.md,
    height: 120,
  },
  levelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: TOSS_THEME.spacing.xs,
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
    marginVertical: 2,
    fontSize: 28, // 기존보다 15px 줄임
  },
  xpText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  badgeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: TOSS_THEME.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
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
  content: {
    flex: 1,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  bottomSpacing: {
    height: 100,
  },

  // 통일된 카드 스타일
  highlightCard: {
    marginBottom: 16,
  },
  chartCard: {
    marginBottom: 16,
  },
  strengthCard: {
    marginBottom: 16,
  },
  goalCard: {
    marginBottom: 16,
  },
  
  // 카드 헤더 (통일)
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    color: TOSS_THEME.colors.text.primary,
    fontSize: 16, // 18px → 16px로 줄임
    fontWeight: '700',
  },
  
  // 통계 그리드
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridStatValue: {
    color: TOSS_THEME.colors.primary,
    fontSize: 18, // 20px → 18px로 줄임
    fontWeight: '800',
    marginBottom: 4,
  },
  gridStatLabel: {
    color: TOSS_THEME.colors.text.secondary,
    fontSize: 11,
    fontWeight: '600',
  },

  // 차트 스타일
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 16,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  chartFill: {
    width: 20,
    backgroundColor: TOSS_THEME.colors.primary,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 20,
  },
  chartLabel: {
    color: TOSS_THEME.colors.text.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  insightText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },

  // 강점 스타일
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  strengthIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  strengthContent: {
    flex: 1,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  strengthName: {
    color: TOSS_THEME.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  strengthScore: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
  strengthBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  strengthFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },

  // 목표 스타일
  goalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalIcon: {
    fontSize: 28,
  },
  goalContent: {
    flex: 1,
  },
  goalName: {
    color: TOSS_THEME.colors.text.primary,
    fontSize: 14, // 15px → 14px로 줄임
    fontWeight: '700',
    marginBottom: 2,
  },
  goalDesc: {
    color: TOSS_THEME.colors.text.secondary,
    fontSize: 12, // 13px → 12px로 줄임
    fontWeight: '600',
    marginBottom: 2,
  },
  goalMeta: {
    color: '#9CA3AF',
    fontSize: 11, // 12px → 11px로 줄임
  },
  goalButton: {
    backgroundColor: TOSS_THEME.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goalButtonText: {
    color: '#FFFFFF',
    fontSize: 13, // 14px → 13px로 줄임
    fontWeight: '700',
  },

  // AI 팁 스타일
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    color: '#F59E0B',
    fontSize: 13, // 14px → 13px로 줄임
    fontWeight: '600',
  },
});
