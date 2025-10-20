import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface ScoreChartProps {
  scores: number[];
  maxScore?: number;
  showLabels?: boolean;
  color?: string;
  backgroundColor?: string;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({
  scores,
  maxScore = 100,
  showLabels = true,
  color = '#1884FF',
  backgroundColor = '#F3F4F6',
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = width - 80; // 패딩 고려
  const barWidth = chartWidth / scores.length - 8; // 간격 고려
  const maxHeight = 80;

  const getBarHeight = (score: number) => {
    return (score / maxScore) * maxHeight;
  };

  const getBarColor = (score: number, index: number) => {
    if (index === scores.length - 1) {
      return '#10B981'; // 마지막 점수는 초록색
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {scores.map((score, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height: getBarHeight(score),
                    backgroundColor: getBarColor(score, index),
                    width: barWidth,
                  },
                ]}
              />
            </View>
            {showLabels && (
              <Text style={styles.scoreLabel}>{score}</Text>
            )}
          </View>
        ))}
      </View>
      
      {showLabels && (
        <View style={styles.xAxis}>
          {scores.map((_, index) => (
            <Text key={index} style={styles.attemptLabel}>
              {index + 1}회
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 8,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  barWrapper: {
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    borderRadius: 4,
    minHeight: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  attemptLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});

