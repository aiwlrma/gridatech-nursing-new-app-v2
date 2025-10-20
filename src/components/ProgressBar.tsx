import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  value: number;
  max: number;
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  height = 8,
  showPercentage = false,
  color = '#1884FF',
  backgroundColor = '#E5E7EB',
  style,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <View style={[styles.container, { height }, style]}>
      <View style={[styles.track, { backgroundColor, height }]}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${percentage}%`, 
              backgroundColor: color,
              height 
            }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>
          {Math.round(percentage)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
  percentageText: {
    position: 'absolute',
    right: 0,
    top: -20,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
});

