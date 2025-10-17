import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgIcon } from './SvgIcon';
import { BLUE_THEME } from '../constants/blueTheme';

interface HeroCardProps {
  progress?: number;
  completed?: number;
  total?: number;
  reservations?: number;
  completedActivities?: number;
  level?: number;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  progress = 75,
  completed = 2,
  total = 3,
  reservations = 5,
  completedActivities = 12,
  level = 7,
}) => {
  return (
    <View style={styles.summaryCard}>
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#1D4ED8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.cardGradient}
      >
        {/* 레벨 뱃지 (좌상단) */}
        <View style={styles.levelBadge}>
          <SvgIcon name="awardNew" size={14} color="#FFFFFF" />
          <Text style={styles.levelText}>Lv.{level}</Text>
        </View>
        
        {/* 메인 콘텐츠 */}
        <View style={styles.cardContent}>
          {/* 진행률 */}
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>오늘의 학습</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: `${progress}%`}]} />
            </View>
          </View>
          
          {/* 하단 요약 박스 */}
          <View style={styles.statsBox}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{reservations}</Text>
              <Text style={styles.statLabel}>예약</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedActivities}개</Text>
              <Text style={styles.statLabel}>완료 ✓</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  // 카드 컨테이너
  summaryCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  
  // 그라데이션 배경
  cardGradient: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  // 레벨 뱃지 (좌상단)
  levelBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    zIndex: 10,
  },
  
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  
  // 메인 콘텐츠
  cardContent: {
    marginTop: 36,
  },
  
  // 진행률 섹션
  progressSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  
  progressValue: {
    fontSize: 56,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 56,
    marginBottom: 12,
  },
  
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  
  // 하단 통계 박스
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
  },
});
