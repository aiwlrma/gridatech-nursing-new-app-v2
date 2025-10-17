import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLUE_THEME } from '../constants/blueTheme';

interface GradeData {
  id: string;
  name: string;
  score: number;
  date: string;
}

interface SimpleBarChartProps {
  data: GradeData[];
  maxHeight?: number;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  maxHeight = 120,
}) => {
  const maxScore = Math.max(...data.map(item => item.score));
  const minScore = Math.min(...data.map(item => item.score));

  const getBarHeight = (score: number) => {
    const range = maxScore - minScore;
    if (range === 0) return 20; // Minimum height
    return ((score - minScore) / range) * (maxHeight - 40) + 20;
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 80) return '#3B82F6'; // Blue
    if (score >= 70) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>최근 성적</Text>
      
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          <Text style={styles.yLabel}>{maxScore}</Text>
          <Text style={styles.yLabel}>{Math.round((maxScore + minScore) / 2)}</Text>
          <Text style={styles.yLabel}>{minScore}</Text>
        </View>

        {/* Chart area */}
        <View style={styles.chartArea}>
          {/* Grid lines */}
          <View style={styles.gridLines}>
            <View style={[styles.gridLine, { top: 0 }]} />
            <View style={[styles.gridLine, { top: '50%' }]} />
            <View style={[styles.gridLine, { bottom: 0 }]} />
          </View>

          {/* Bars */}
          <View style={styles.barsContainer}>
            {data.map((item, index) => (
              <View key={item.id} style={styles.barGroup}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: getBarHeight(item.score),
                        backgroundColor: getBarColor(item.score),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{formatDate(item.date)}</Text>
                <Text style={styles.barScore}>{item.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: BLUE_THEME.text,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 160,
  },
  yAxis: {
    width: 30,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  yLabel: {
    fontSize: 12,
    color: BLUE_THEME.textSecondary,
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    marginLeft: 8,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 40,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 24,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    color: BLUE_THEME.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  barScore: {
    fontSize: 12,
    fontWeight: '600',
    color: BLUE_THEME.text,
    marginTop: 4,
    textAlign: 'center',
  },
});
