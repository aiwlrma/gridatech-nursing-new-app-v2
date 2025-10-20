import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import { TossText } from './TossText';
import { TOSS_THEME } from '../constants/tossTheme';

interface StatsCardProps {
  reservations: number;
  averageScore: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ reservations, averageScore }) => {
  return (
    <View style={styles.container}>
      {/* 아이콘 */}
      <View style={styles.iconContainer}>
        <Award size={20} color="#FFFFFF" />
      </View>
      
      {/* 메인 콘텐츠 */}
      <View style={styles.contentContainer}>
        {/* 왼쪽 섹션 - 예약 */}
        <View style={styles.statSection}>
          <TossText variant="title" style={styles.statNumber}>
            {reservations}
          </TossText>
          <TossText variant="caption" style={styles.statLabel}>
            예약
          </TossText>
        </View>
        
        {/* 구분선 */}
        <View style={styles.divider} />
        
        {/* 오른쪽 섹션 - 평균 점수 */}
        <View style={styles.statSection}>
          <TossText variant="title" style={styles.statNumber}>
            {averageScore}점
          </TossText>
          <TossText variant="caption" style={styles.statLabel}>
            평균
          </TossText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3377FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    backgroundColor: '#4A8AFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statSection: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
