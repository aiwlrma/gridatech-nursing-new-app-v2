import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SIZES } from '../constants';

interface TimetableHeaderProps {
  onBack?: () => void;
  onDownload?: () => void;
}

export const TimetableHeader: React.FC<TimetableHeaderProps> = ({ 
  onBack, 
  onDownload 
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>시간표</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.downloadButton} 
        onPress={onDownload}
        activeOpacity={0.7}
      >
        <Text style={styles.downloadIcon}>📥</Text>
        <Text style={styles.downloadText}>다운로드</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.md,
    paddingTop: 8,
    paddingBottom: SIZES.spacing.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: SIZES.spacing.xs,
    marginRight: SIZES.spacing.sm,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  title: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: SIZES.spacing.xs,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius.md,
  },
  downloadIcon: {
    fontSize: 16,
    marginRight: SIZES.spacing.xs,
  },
  downloadText: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
    color: COLORS.surface,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
