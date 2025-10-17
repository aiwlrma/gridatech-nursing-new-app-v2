import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, Trophy, FileText, ChevronRight, Star } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants';

interface Grade {
  id: string;
  subject: string;
  score: number;
  grade: string;
  date?: string;
}

interface GradeCardProps {
  averageScore: number;
  grades: Grade[];
  level?: number;
  xp?: number;
  badges?: number;
  onViewDetails?: () => void;
}

export const GradeCard: React.FC<GradeCardProps> = ({
  averageScore,
  grades = [],
  level = 7,
  xp = 2450,
  badges = 12,
  onViewDetails,
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return '#10B981';
      case 'A':
        return '#10B981';
      case 'B+':
        return '#F59E0B';
      case 'B':
        return '#F59E0B';
      default:
        return COLORS.textSecondary;
    }
  };

  const getRankText = (score: number) => {
    if (score >= 95) return '상위 5% 🏆';
    if (score >= 90) return '상위 15% 🎉';
    if (score >= 85) return '상위 30% 👍';
    return '화이팅! 💪';
  };

  return (
    <View style={styles.container}>
      {/* Hero - 평균 점수 */}
      <View style={styles.scoreHero}>
        <Text style={styles.heroLabel}>이번 학기 평균</Text>
        <Text style={styles.heroScore}>{averageScore}점</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${averageScore}%` }]} />
        </View>
        <Text style={styles.heroSub}>{getRankText(averageScore)}</Text>
      </View>

      {/* 레벨/뱃지 요약 */}
      <View style={styles.gameStats}>
        <View style={styles.statBox}>
          <Award color="#F59E0B" size={32} />
          <Text style={styles.statValue}>Level {level}</Text>
          <Text style={styles.statLabel}>{xp.toLocaleString()} XP</Text>
        </View>
        
        <View style={styles.statBox}>
          <Trophy color="#1884FF" size={32} />
          <Text style={styles.statValue}>{badges}개</Text>
          <Text style={styles.statLabel}>획득 뱃지</Text>
        </View>
      </View>

      {/* 최근 시험 */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>최근 시험</Text>
        <View style={styles.recentTests}>
          {grades.slice(0, 3).map((grade) => (
            <View key={grade.id} style={styles.testCard}>
              <FileText size={24} color="#1976D2" />
              <View style={styles.testContent}>
                <Text style={styles.testName}>{grade.subject}</Text>
                <Text style={styles.testDate}>{grade.date || '2025.01.10'}</Text>
              </View>
              <Text style={styles.testScore}>{grade.score}점</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* 전체 성적 보기 버튼 */}
      <TouchableOpacity style={styles.secondaryButton} onPress={onViewDetails}>
        <Text style={styles.secondaryButtonText}>전체 성적 보기</Text>
        <ChevronRight color="#1884FF" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  // Hero - 평균 점수
  scoreHero: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
  },
  heroLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  heroScore: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1884FF',
    marginBottom: 16,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1884FF',
    borderRadius: 4,
  },
  heroSub: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  // 레벨/뱃지 요약
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  // 최근 시험
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  recentTests: {
    gap: 12,
  },
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  testContent: {
    flex: 1,
    marginLeft: 12,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 4,
  },
  testDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  testScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1884FF',
  },
  // Secondary 버튼 (흰색 테두리)
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    height: 56,
    borderRadius: 16,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#1884FF',
    fontWeight: '600',
  },
});
