import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MessageCircle, Search, Filter, ChevronRight, ArrowLeft } from 'lucide-react-native';
import { TOSS_THEME } from '../constants/tossTheme';
import { TossCard } from '../components/TossCard';
import { TossText } from '../components/TossText';
import { TossButton } from '../components/TossButton';
import { StatsCard } from '../components/StatsCard';
import { Message } from '../types';

interface TossMessage {
  id: string;
  sender: string;
  senderInitial: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'professor' | 'student' | 'system';
}

interface TossMessageScreenProps {
  onBack?: () => void;
  onNavigateToChat?: (contact: Message) => void;
}

export const TossMessageScreen: React.FC<TossMessageScreenProps> = ({ onBack, onNavigateToChat }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  // 메시지 데이터
  const messages: TossMessage[] = [
    {
      id: '1',
      sender: '김교수',
      senderInitial: '김',
      message: '내일 실습 준비물 확인해주세요',
      time: '10분 전',
      unread: true,
      type: 'professor',
    },
    {
      id: '2',
      sender: '이수미',
      senderInitial: '이',
      message: '과제 제출 마감일이 언제인가요?',
      time: '1시간 전',
      unread: true,
      type: 'student',
    },
    {
      id: '3',
      sender: '시스템',
      senderInitial: '시',
      message: '새로운 공지사항이 등록되었습니다',
      time: '2시간 전',
      unread: false,
      type: 'system',
    },
    {
      id: '4',
      sender: '박교수',
      senderInitial: '박',
      message: '실습 평가 결과를 확인해주세요',
      time: '1일 전',
      unread: false,
      type: 'professor',
    },
    {
      id: '5',
      sender: '정민수',
      senderInitial: '정',
      message: '다음 주 그룹 스터디 참여하시나요?',
      time: '2일 전',
      unread: false,
      type: 'student',
    },
  ];

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'unread', label: '읽지 않음' },
    { id: 'professor', label: '교수님' },
    { id: 'student', label: '학생' },
  ];

  const filteredMessages = messages.filter(message => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return message.unread;
    return message.type === activeFilter;
  });

  const unreadCount = messages.filter(message => message.unread).length;

  const handleMessagePress = (message: TossMessage) => {
    if (onNavigateToChat) {
      // TossMessage를 Message 타입으로 변환
      const contact: Message = {
        id: message.id,
        senderId: message.id,
        senderName: message.sender,
        senderInitial: message.senderInitial,
        message: message.message,
        timestamp: message.time,
        category: message.type === 'professor' ? '교수님' : message.type === 'student' ? '동료' : '알림',
        isRead: !message.unread,
        isImportant: false,
        unreadCount: message.unread ? 1 : 0,
        isOnline: false,
        color: getSenderColor(message.type),
      };
      onNavigateToChat(contact);
    }
  };

  const getSenderColor = (type: string) => {
    switch (type) {
      case 'professor':
        return TOSS_THEME.colors.primary;
      case 'student':
        return TOSS_THEME.colors.success;
      case 'system':
        return TOSS_THEME.colors.warning;
      default:
        return TOSS_THEME.colors.text.secondary;
    }
  };

  const getSenderBackground = (type: string) => {
    switch (type) {
      case 'professor':
        return '#E3F2FD';
      case 'student':
        return '#E8F5E8';
      case 'system':
        return '#FFF3E0';
      default:
        return TOSS_THEME.colors.background;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={24} color={TOSS_THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>메시지</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <TossText variant="small" style={styles.unreadBadgeText}>{unreadCount}</TossText>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={24} color={TOSS_THEME.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={24} color={TOSS_THEME.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 필터 탭 */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterTabs}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterTab,
                  activeFilter === filter.id && styles.activeFilterTab,
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <TossText
                  variant="caption"
                  style={[
                    styles.filterTabText,
                    activeFilter === filter.id && styles.activeFilterTabText,
                  ] as any}
                >
                  {filter.label}
                </TossText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 통계 카드 */}
      <StatsCard reservations={5} averageScore={92} />

      {/* 메시지 목록 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredMessages.length === 0 ? (
          <TossCard style={styles.emptyCard}>
            <View style={styles.emptyContent}>
              <MessageCircle size={48} color={TOSS_THEME.colors.text.tertiary} />
              <TossText variant="body" style={styles.emptyTitle}>메시지가 없어요</TossText>
              <TossText variant="caption" style={styles.emptySubtitle}>
                {activeFilter === 'unread' ? '읽지 않은 메시지가 없습니다' : '새로운 메시지가 없습니다'}
              </TossText>
            </View>
          </TossCard>
        ) : (
          filteredMessages.map((message) => (
            <TouchableOpacity
              key={message.id}
              style={styles.messageCard}
              activeOpacity={0.8}
              onPress={() => handleMessagePress(message)}
            >
              <TossCard style={[
                styles.messageCardContent,
                message.unread && styles.unreadMessageCard,
              ] as any}>
                <View style={styles.messageContent}>
                  {/* 아바타 */}
                  <View style={[
                    styles.avatar,
                    { backgroundColor: getSenderBackground(message.type) }
                  ]}>
                    <TossText
                      variant="caption"
                      style={[
                        styles.avatarText,
                        { color: getSenderColor(message.type) }
                      ] as any}
                    >
                      {message.senderInitial}
                    </TossText>
                  </View>

                  {/* 메시지 정보 */}
                  <View style={styles.messageInfo}>
                    <View style={styles.messageHeader}>
                      <TossText variant="body" style={styles.senderName}>
                        {message.sender}
                      </TossText>
                      <TossText variant="small" style={styles.messageTime}>
                        {message.time}
                      </TossText>
                    </View>
                    <TossText
                      variant="caption"
                      style={[
                        styles.messageText,
                        message.unread && styles.unreadMessageText,
                      ] as any}
                      numberOfLines={2}
                    >
                      {message.message}
                    </TossText>
                  </View>

                  {/* 읽지 않음 표시 */}
                  {message.unread && (
                    <View style={styles.unreadDot} />
                  )}

                  {/* 화살표 */}
                  <ChevronRight size={20} color={TOSS_THEME.colors.text.tertiary} />
                </View>
              </TossCard>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TOSS_THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingTop: TOSS_THEME.spacing.lg,
    paddingBottom: TOSS_THEME.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: TOSS_THEME.spacing.sm,
    padding: TOSS_THEME.spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  unreadBadge: {
    backgroundColor: TOSS_THEME.colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: TOSS_THEME.spacing.sm,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: TOSS_THEME.spacing.sm,
    marginLeft: TOSS_THEME.spacing.xs,
  },
  filterContainer: {
    paddingHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.md,
  },
  filterTabs: {
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: TOSS_THEME.spacing.md,
    paddingVertical: TOSS_THEME.spacing.sm,
    marginRight: TOSS_THEME.spacing.sm,
    borderRadius: TOSS_THEME.borderRadius.sm,
    backgroundColor: TOSS_THEME.colors.background,
  },
  activeFilterTab: {
    backgroundColor: TOSS_THEME.colors.primary,
  },
  filterTabText: {
    color: TOSS_THEME.colors.text.secondary,
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  messageCard: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  messageCardContent: {
    padding: TOSS_THEME.spacing.md,
  },
  unreadMessageCard: {
    borderLeftWidth: 4,
    borderLeftColor: TOSS_THEME.colors.primary,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: TOSS_THEME.spacing.md,
  },
  avatarText: {
    fontWeight: '700',
    fontSize: 16,
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  senderName: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '600',
  },
  messageTime: {
    color: TOSS_THEME.colors.text.tertiary,
  },
  messageText: {
    color: TOSS_THEME.colors.text.secondary,
    lineHeight: 20,
  },
  unreadMessageText: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TOSS_THEME.colors.primary,
    marginRight: TOSS_THEME.spacing.sm,
  },
  emptyCard: {
    marginTop: TOSS_THEME.spacing.xxl,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: TOSS_THEME.spacing.xxl,
  },
  emptyTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginTop: TOSS_THEME.spacing.md,
    marginBottom: TOSS_THEME.spacing.xs,
  },
  emptySubtitle: {
    color: TOSS_THEME.colors.text.secondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
