import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SvgIcon } from './SvgIcon';
import { Notice } from '../types';

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

const getCategoryIcon = (category: Notice['category']) => {
  switch (category) {
    case '실습':
      return 'clipboard';
    case '시험':
      return 'award';
    case '일반':
      return 'notifications';
    default:
      return 'notifications';
  }
};

const getCategoryIconColor = (category: Notice['category']) => {
  switch (category) {
    case '실습':
      return '#1884FF';
    case '시험':
      return '#F59E0B';
    case '일반':
      return '#10B981';
    default:
      return '#10B981';
  }
};

const getCategoryIconBg = (category: Notice['category']) => {
  switch (category) {
    case '실습':
      return '#1884FF15';
    case '시험':
      return '#F59E0B15';
    case '일반':
      return '#10B98115';
    default:
      return '#10B98115';
  }
};

const getCategoryChipBg = (category: Notice['category']) => {
  switch (category) {
    case '실습':
      return '#1884FF15';
    case '시험':
      return '#F59E0B15';
    case '일반':
      return '#10B98115';
    default:
      return '#10B98115';
  }
};

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onPress }) => {
  const iconName = getCategoryIcon(notice.category);
  const iconColor = getCategoryIconColor(notice.category);
  const iconBg = getCategoryIconBg(notice.category);
  const chipBg = getCategoryChipBg(notice.category);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(notice)}
      activeOpacity={0.6}
    >
      {/* 작은 아이콘 */}
      <View style={[styles.miniIcon, { backgroundColor: iconBg }]}>
        <SvgIcon name={iconName as any} color={iconColor} size={18} />
      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        {/* 제목 + NEW 뱃지 */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notice.title}
          </Text>
          {notice.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>N</Text>
            </View>
          )}
        </View>

        {/* 카테고리 + 날짜 */}
        <View style={styles.metaRow}>
          <View style={[styles.categoryChip, { backgroundColor: chipBg }]}>
            <Text style={[styles.categoryText, { color: iconColor }]}>
              {notice.category}
            </Text>
          </View>
          <Text style={styles.date}>{notice.date}</Text>
        </View>
      </View>

      {/* 화살표 */}
      <SvgIcon name="chevronRight" color="#D1D5DB" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 공지사항 행 (카카오뱅크 스타일)
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  
  // 작은 아이콘 (36px)
  miniIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  // 컨텐츠
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#191F28',
    lineHeight: 20,
  },
  
  // NEW 뱃지 (작게!)
  newBadge: {
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  newText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // 메타 정보
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
