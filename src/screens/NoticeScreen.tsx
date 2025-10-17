import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SvgIcon } from '../components/SvgIcon';
import { NoticeCard } from '../components/NoticeCard';
import { NoticeFilterTabs } from '../components/NoticeFilterTabs';
import { ImportantNotice } from '../components/ImportantNotice';
import { Notice, NoticeFilter } from '../types';

// 샘플 데이터
const sampleNotices: Notice[] = [
  {
    id: '1',
    category: '실습',
    title: '다음 주 기초 간호 실습 일정 변경 안내',
    date: '2025.01.15',
    views: 124,
    isNew: true,
  },
  {
    id: '2',
    category: '시험',
    title: '중간고사 시험 범위 및 일정 공지',
    date: '2025.01.14',
    views: 89,
    isNew: false,
  },
  {
    id: '3',
    category: '일반',
    title: '2025-1학기 수강신청 관련 안내사항',
    date: '2025.01.13',
    views: 156,
    isNew: true,
  },
  {
    id: '4',
    category: '실습',
    title: '기본간호학실습실 사용 규칙 안내',
    date: '2025.01.12',
    views: 67,
    isNew: false,
  },
  {
    id: '5',
    category: '시험',
    title: '기말고사 성적 확인 및 이의신청 안내',
    date: '2025.01.11',
    views: 203,
    isNew: false,
  },
  {
    id: '6',
    category: '일반',
    title: '학과 행사 및 동아리 활동 안내',
    date: '2025.01.10',
    views: 45,
    isNew: false,
  },
];

const importantNotice: Notice = {
  id: 'important-1',
  category: '실습',
  title: '2025-1학기 실습 오리엔테이션 필수 참석',
  date: '2025.01.10',
  views: 0,
  isNew: false,
  isImportant: true,
};

const filters: NoticeFilter[] = [
  { id: 'all', label: '전체', filter: 'all' },
  { id: 'practice', label: '실습', filter: '실습' },
  { id: 'exam', label: '시험', filter: '시험' },
  { id: 'general', label: '일반', filter: '일반' },
];

export const NoticeScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotices = useMemo(() => {
    if (activeFilter === 'all') {
      return sampleNotices;
    }
    return sampleNotices.filter(notice => notice.category === activeFilter);
  }, [activeFilter]);

  const handleNoticePress = (notice: Notice) => {
    // 공지사항 상세 페이지로 이동하는 로직
    console.log('Notice pressed:', notice.title);
  };

  const handleBackPress = () => {
    // 뒤로가기 로직
    console.log('Back pressed');
  };

  const handleFilterPress = () => {
    // 필터 모달 열기 로직
    console.log('Filter pressed');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <SvgIcon name="megaphone" color="#BBDEFB" size={64} />
      <Text style={styles.emptyTitle}>공지사항이 없습니다</Text>
      <Text style={styles.emptySub}>새로운 공지사항이 등록되면 알려드릴게요</Text>
    </View>
  );

  const renderNoticeItem = ({ item }: { item: Notice }) => (
    <NoticeCard notice={item} onPress={handleNoticePress} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <SvgIcon name="chevronLeft" color="#191F28" size={24} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>공지사항</Text>
        
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <SvgIcon name="search" color="#191F28" size={24} />
        </TouchableOpacity>
      </View>

      {/* 필터 탭 */}
      <NoticeFilterTabs
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 중요 공지 */}
      <ImportantNotice
        notice={importantNotice}
        onPress={handleNoticePress}
      />

      {/* 공지사항 리스트 */}
      {(filteredNotices?.length || 0) > 0 ? (
        <FlatList
          data={filteredNotices}
          renderItem={renderNoticeItem}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#E5E7EB',
    marginLeft: 68, // 아이콘 너비만큼
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  emptySub: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
});
