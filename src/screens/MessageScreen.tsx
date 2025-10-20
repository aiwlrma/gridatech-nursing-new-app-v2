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
  User, 
  Phone, 
  MessageCircle, 
  Settings,
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
    id: '6',
    senderId: 'student3',
    senderName: '정하늘',
    senderInitial: '정',
    message: '프로젝트 발표 자료 공유해주세요',
    timestamp: '6시간 전',
    category: '동료',
    isRead: false,
    isImportant: false,
    unreadCount: 1,
    isOnline: false,
    color: '#06B6D4',
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
    id: '8',
    senderId: 'student4',
    senderName: '한지민',
    senderInitial: '한',
    message: '스터디 그룹 모집합니다',
    timestamp: '2일 전',
    category: '동료',
    isRead: true,
    isImportant: false,
    unreadCount: 0,
    isOnline: true,
    color: '#84CC16',
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
      {/* 프로필 + 온라인 상태 */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, {backgroundColor: item.color + '20'}]}>
          <Text style={[styles.initial, {color: item.color}]}>
            {item.senderInitial}
          </Text>
        </View>
        {item.isOnline && (
          <View style={styles.onlineBadge} />
        )}
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
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#191F28" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditPress}>
            <Text style={styles.editButton}>편집</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>메시지</Text>
        
        <TouchableOpacity style={styles.composeButton} onPress={handleComposePress}>
          <Edit3 size={24} color="#1884FF" />
        </TouchableOpacity>
      </View>

      {/* 검색 바 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            placeholder="메시지 검색"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>계정</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Phone size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>통화</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <MessageCircle size={24} color="#1884FF" />
          <Text style={styles.navLabelActive}>메시지</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Settings size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>설정</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  editButton: {
    fontSize: 17,
    color: '#1884FF',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  composeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  
  // 검색
  searchContainer: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#191F28',
  },
  
  // 메시지 리스트
  messageList: {
    flexGrow: 1,
    paddingBottom: 100, // 하단 네비게이션 공간
  },
  
  // 메시지 행 (핵심!)
  messageRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  unreadRow: {
    backgroundColor: '#F9FAFB', // 읽지않음 배경
  },
  
  // 프로필
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 18,
    fontWeight: '700',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  // 메시지 컨텐츠
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  name: {
    fontSize: 16,
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
    fontSize: 13,
    color: '#9CA3AF',
  },
  
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#191F28',
  },
  
  // 읽지않음 뱃지
  badge: {
    backgroundColor: '#1884FF',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  
  // 구분선
  separator: {
    height: 0.5,
    backgroundColor: '#E5E7EB',
    marginLeft: 80, // 프로필 너비만큼
  },
  
  // 하단 네비게이션
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 11,
    color: '#1884FF',
    marginTop: 4,
    fontWeight: '600',
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
