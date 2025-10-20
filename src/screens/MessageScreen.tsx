import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { 
  Edit3, 
  Search, 
  Check, 
  MessageCircle, 
  ArrowLeft
} from 'lucide-react-native';
import { Message, MessageFilter } from '../types';

// 예시 메시지 데이터
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'prof1',
    senderName: '김교수',
    senderInitial: '김',
    message: '내일 실습 준비물 확인해주세요',
    timestamp: '10분 전',
    category: '교수님',
    isRead: false,
    isImportant: false,
    unreadCount: 4,
    isOnline: false,
    color: '#1884FF',
  },
  {
    id: '2',
    senderId: 'student1',
    senderName: '이수미',
    senderInitial: '이',
    message: '같이 스터디할래?',
    timestamp: '1시간 전',
    category: '동료',
    isRead: false,
    isImportant: false,
    unreadCount: 2,
    isOnline: true,
    color: '#10B981',
  },
  {
    id: '3',
    senderId: 'system',
    senderName: '시스템',
    senderInitial: '시',
    message: '예약이 확정되었습니다',
    timestamp: '2시간 전',
    category: '알림',
    isRead: true,
    isImportant: true,
    unreadCount: 0,
    isOnline: false,
    color: '#F59E0B',
  },
  {
    id: '4',
    senderId: 'prof2',
    senderName: '박교수',
    senderInitial: '박',
    message: '과제 제출 마감일 연장 안내',
    timestamp: '3시간 전',
    category: '교수님',
    isRead: true,
    isImportant: false,
    unreadCount: 0,
    isOnline: false,
    color: '#8B5CF6',
  },
  {
    id: '5',
    senderId: 'student2',
    senderName: '최민수',
    senderInitial: '최',
    message: '실습실 예약 도와주세요',
    timestamp: '5시간 전',
    category: '동료',
    isRead: true,
    isImportant: false,
    unreadCount: 0,
    isOnline: true,
    color: '#EF4444',
  },
  {
    id: '7',
    senderId: 'prof3',
    senderName: '최교수',
    senderInitial: '최',
    message: '중간고사 일정 변경 안내',
    timestamp: '1일 전',
    category: '교수님',
    isRead: true,
    isImportant: true,
    unreadCount: 0,
    isOnline: false,
    color: '#F97316',
  },
  {
    id: '9',
    senderId: 'prof4',
    senderName: '강교수',
    senderInitial: '강',
    message: '기말고사 범위 안내드립니다',
    timestamp: '3일 전',
    category: '교수님',
    isRead: false,
    isImportant: true,
    unreadCount: 1,
    isOnline: false,
    color: '#EC4899',
  },
  {
    id: '10',
    senderId: 'student5',
    senderName: '윤서연',
    senderInitial: '윤',
    message: '프로젝트 발표 시간 조정 가능한가요?',
    timestamp: '4일 전',
    category: '동료',
    isRead: true,
    isImportant: false,
    unreadCount: 0,
    isOnline: true,
    color: '#8B5CF6',
  },
  {
    id: '11',
    senderId: 'system2',
    senderName: '시스템',
    senderInitial: '시',
    message: '새로운 공지사항이 등록되었습니다',
    timestamp: '5일 전',
    category: '알림',
    isRead: false,
    isImportant: false,
    unreadCount: 2,
    isOnline: false,
    color: '#F59E0B',
  },
];

interface MessageScreenProps {
  onNavigateToChat?: (contact: Message) => void;
  onBack?: () => void;
}

export const MessageScreen: React.FC<MessageScreenProps> = ({ onNavigateToChat, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링된 메시지
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockMessages;
    }
    return mockMessages.filter(msg => 
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleMessagePress = (message: Message) => {
    // 메시지 클릭 시 채팅 화면으로 이동
    if (onNavigateToChat) {
      onNavigateToChat(message);
    }
  };

  const handleEditPress = () => {
    // 편집 모드
    console.log('Edit pressed');
  };

  const handleComposePress = () => {
    // 새 메시지 작성
    console.log('Compose pressed');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      style={[
        styles.messageRow,
        !item.isRead && styles.unreadRow
      ]}
      onPress={() => handleMessagePress(item)}
      activeOpacity={0.6}
    >
      {/* 아바타 (작게) */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, {backgroundColor: item.color + '20'}]}>
          <Text style={[styles.initial, {color: item.color}]}>
            {item.senderInitial}
          </Text>
        </View>
        {item.isOnline && <View style={styles.onlineBadge} />}
      </View>
      
      {/* 메시지 컨텐츠 */}
      <View style={styles.messageContent}>
        {/* 첫째 줄: 이름 + 시간 */}
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.senderName}</Text>
          <View style={styles.rightInfo}>
            {item.isRead && (
              <View style={styles.readStatus}>
                <Check size={16} color="#1884FF" />
                <Check size={16} color="#1884FF" style={styles.doubleCheck} />
              </View>
            )}
            <Text style={styles.time}>{item.timestamp}</Text>
          </View>
        </View>
        
        {/* 둘째 줄: 메시지 + 뱃지 */}
        <View style={styles.bottomRow}>
          <Text 
            style={[
              styles.message,
              !item.isRead && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
          {!item.isRead && item.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )}
          {item.isRead && (
            <Text style={styles.readIcon}>✓✓</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MessageCircle color="#BBDEFB" size={64} />
      <Text style={styles.emptyTitle}>메시지가 없습니다</Text>
      <Text style={styles.emptySubtitle}>
        새로운 메시지가 도착하면 여기에 표시됩니다
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* 헤더 (단순화) */}
        <View style={styles.header}>
          <Text style={styles.title}>메시지</Text>
        </View>

        {/* 검색창 (작게) */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="메시지 검색"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* 메시지 리스트 */}
        <FlatList
          data={filteredMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  
  safeArea: {
    flex: 1,
  },
  
  // 헤더 (단순화)
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
  },
  
  // 검색창 (작게)
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#191F28',
  },
  
  // 메시지 리스트
  messageList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  messageListContent: {
    flexGrow: 1,
    paddingBottom: 80, // 하단 네비게이션 바 높이만큼 여백 추가
  },
  
  // 메시지 행 (타이트하게)
  messageRow: {
    flexDirection: 'row',
    paddingVertical: 10, // 12 → 10 (타이트하게)
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  unreadRow: {
    backgroundColor: '#F9FAFB', // 읽지않음 배경
  },
  
  // 아바타 (작게)
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44, // 52 → 44
    height: 44,
    borderRadius: 22, // 26 → 22
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 16, // 18 → 16
    fontWeight: '700',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12, // 14 → 12
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  // 메시지 컨텐츠
  messageContent: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3, // 4 → 3
  },
  name: {
    fontSize: 14, // 16 → 14
    fontWeight: '600',
    color: '#191F28',
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readStatus: {
    flexDirection: 'row',
  },
  doubleCheck: {
    marginLeft: -8,
  },
  time: {
    fontSize: 11, // 12 → 11
    fontWeight: '400',
    color: '#9CA3AF',
  },
  
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 13, // 14 → 13
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: 18,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#191F28',
  },
  
  // 읽지않음 뱃지 (작게)
  badge: {
    backgroundColor: '#1884FF',
    minWidth: 18, // 20 → 18
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5, // 6 → 5
    marginLeft: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10, // 11 → 10
    fontWeight: '700',
  },
  readIcon: {
    fontSize: 12,
    color: '#1884FF',
    marginLeft: 4,
  },
  
  // 구분선
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6', // 구분선 색상 변경
    marginHorizontal: 16, // 좌우 여백 추가
  },
  
  
  // 빈 상태
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});
