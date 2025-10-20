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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>시간표</Text>
          <Text style={styles.subtitle}>2024년 1학기</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.downloadButton} 
        onPress={onDownload}
        activeOpacity={0.7}
      >
        <Text style={styles.downloadIcon}>📥</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.lg,
    paddingTop: 8,
    paddingBottom: SIZES.spacing.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: SIZES.spacing.sm,
    marginRight: SIZES.spacing.sm,
    borderRadius: SIZES.borderRadius.sm,
    backgroundColor: COLORS.background,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.fontSize.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  subtitle: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadIcon: {
    fontSize: 20,
    color: COLORS.surface,
  },
});
