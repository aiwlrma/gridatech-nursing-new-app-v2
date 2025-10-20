import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Notice } from '../types';

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(notice)}
      activeOpacity={0.6}
    >
      {/* 컨텐츠 */}
      <View style={styles.content}>
        {/* 제목 + 배지 */}
        <View style={styles.titleRow}>
          {notice.isImportant && (
            <View style={styles.importantBadge}>
              <Text style={styles.importantText}>중요</Text>
            </View>
          )}
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
          <Text style={styles.categoryText}>{notice.category}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.date}>{notice.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 공지사항 행 (에브리타임 스타일)
  row: {
    paddingVertical: 12, // 여백 감소
    paddingHorizontal: 16, // 여백 감소
    backgroundColor: '#FFFFFF',
  },
  
  // 컨텐츠
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // 간격 감소
  },
  title: {
    flex: 1,
    fontSize: 14, // 폰트 크기 감소
    fontWeight: '500',
    color: '#191F28',
    lineHeight: 18,
  },
  
  // 중요 배지 (축소)
  importantBadge: {
    backgroundColor: '#1884FF',
    paddingHorizontal: 4, // 패딩 축소
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  importantText: {
    fontSize: 9, // 폰트 크기 축소
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // NEW 뱃지 (축소)
  newBadge: {
    backgroundColor: '#EF4444',
    width: 14, // 크기 축소
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  newText: {
    fontSize: 9, // 폰트 크기 축소
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // 메타 정보
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12, // 폰트 크기 감소
    color: '#6B7280',
  },
  separator: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 4,
  },
  date: {
    fontSize: 12, // 폰트 크기 감소
    color: '#6B7280',
  },
});
