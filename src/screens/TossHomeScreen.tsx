import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { TOSS_THEME } from '../constants/tossTheme';
import { TossCard } from '../components/TossCard';
import { TossText } from '../components/TossText';
import { TossButton } from '../components/TossButton';
import { TossNumberCard } from '../components/TossNumberCard';

interface TossHomeScreenProps {
  onNavigateToGrade?: () => void;
}

export const TossHomeScreen: React.FC<TossHomeScreenProps> = ({ onNavigateToGrade }) => {
  // 오늘의 예약 데이터
  const todayAppointments = [
    {
      id: '1',
      time: '14:00',
      title: '기초 간호 실습',
      location: '실습실 A동 302호',
    },
    {
      id: '2',
      time: '16:30',
      title: '성인간호학 이론',
      location: '강의실 B동 201호',
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 인사 */}
        <View style={styles.greeting}>
          <TossText variant="caption" style={styles.greetingCaption}>안녕하세요</TossText>
          <TossText variant="title" style={styles.greetingTitle}>김수미님 👋</TossText>
        </View>

        {/* 메인 활동 카드 */}
        <TossCard style={styles.heroCard}>
          <TossText variant="caption" style={styles.heroLabel}>이번 주 완료한 활동</TossText>
          <View style={styles.scoreRow}>
            <TossText variant="hero" style={styles.heroNumber}>12</TossText>
            <TossText variant="display" style={styles.heroUnit}>개</TossText>
          </View>
          <TossText variant="caption" style={styles.heroSubtitle}>목표 달성률 80%예요</TossText>
        </TossCard>

        {/* 오늘의 예약 섹션 */}
        <View style={styles.section}>
          <TossText variant="title" style={styles.sectionTitle}>오늘의 예약</TossText>
          
          {todayAppointments.map((appointment, index) => (
            <TossCard key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentContent}>
                <View style={styles.timeContainer}>
                  <TossText variant="title" style={styles.appointmentTime}>{appointment.time}</TossText>
                </View>
                <View style={styles.appointmentDetails}>
                  <TossText variant="body" style={styles.appointmentTitle}>{appointment.title}</TossText>
                  <TossText variant="caption" style={styles.appointmentLocation}>{appointment.location}</TossText>
                </View>
                <ChevronRight size={20} color={TOSS_THEME.colors.text.tertiary} />
              </View>
            </TossCard>
          ))}
        </View>


        {/* 하단 여백 */}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16, // SafeArea 이후 추가 여백
  },
  greeting: {
    paddingHorizontal: TOSS_THEME.spacing.lg,
    paddingTop: 8, // 인사말 상단에 추가 여백
    marginBottom: TOSS_THEME.spacing.xxl,
  },
  greetingCaption: {
    color: TOSS_THEME.colors.text.secondary,
    marginBottom: TOSS_THEME.spacing.xs,
  },
  greetingTitle: {
    color: TOSS_THEME.colors.text.primary,
  },
  heroCard: {
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.xxl,
    alignItems: 'center',
    paddingVertical: TOSS_THEME.spacing.xxl,
  },
  heroLabel: {
    color: TOSS_THEME.colors.text.secondary,
    marginBottom: TOSS_THEME.spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: TOSS_THEME.spacing.sm,
  },
  heroNumber: {
    color: TOSS_THEME.colors.text.primary,
    marginRight: TOSS_THEME.spacing.xs,
  },
  heroUnit: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: TOSS_THEME.colors.text.secondary,
  },
  section: {
    marginBottom: TOSS_THEME.spacing.xxl,
  },
  sectionTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginTop: 3,
    marginBottom: TOSS_THEME.spacing.md,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  appointmentCard: {
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.sm,
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 80,
    alignItems: 'center',
  },
  appointmentTime: {
    color: TOSS_THEME.colors.primary,
    fontWeight: '700',
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: TOSS_THEME.spacing.md,
  },
  appointmentTitle: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '600',
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  appointmentLocation: {
    color: TOSS_THEME.colors.text.secondary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: TOSS_THEME.spacing.lg,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: TOSS_THEME.colors.card,
    borderRadius: TOSS_THEME.borderRadius.md,
    padding: TOSS_THEME.spacing.lg,
    alignItems: 'center',
    marginBottom: TOSS_THEME.spacing.md,
    ...TOSS_THEME.shadow,
  },
  quickActionIcon: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  quickActionTitle: {
    color: TOSS_THEME.colors.text.primary,
    fontWeight: '600',
    marginBottom: TOSS_THEME.spacing.xs,
    textAlign: 'center',
  },
  quickActionCount: {
    color: TOSS_THEME.colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  gradeButton: {
    marginHorizontal: TOSS_THEME.spacing.lg,
    marginBottom: TOSS_THEME.spacing.xxl,
  },
  gradeCard: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FCD34D',
    borderWidth: 1,
  },
  gradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeIcon: {
    marginRight: TOSS_THEME.spacing.md,
  },
  gradeText: {
    flex: 1,
  },
  gradeTitle: {
    color: TOSS_THEME.colors.text.primary,
    marginBottom: TOSS_THEME.spacing.xs / 2,
  },
  gradeSubtitle: {
    color: TOSS_THEME.colors.text.secondary,
  },
  bottomSpacing: {
    height: 100, // 하단 네비게이션을 위한 여백
  },
});
