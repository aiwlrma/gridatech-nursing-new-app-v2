import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ProfessorSelector } from '../components/ProfessorSelector';
import { WeeklyTimelineGrid } from '../components/WeeklyTimelineGrid';
import { Professor, ProfessorSchedule, Booking } from '../types';

interface ProfessorScheduleScreenProps {
  onTimeSlotClick: (day: number, time: string, professor: Professor) => void;
}

export const ProfessorScheduleScreen: React.FC<ProfessorScheduleScreenProps> = ({
  onTimeSlotClick,
}) => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [professorSchedules, setProfessorSchedules] = useState<ProfessorSchedule[]>([]);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);

  // 교수 목록 로드
  useEffect(() => {
    const mockProfessors: Professor[] = [
      {
        id: '1',
        name: '김민수 교수',
        department: '기초 간호학',
        email: 'kim@university.edu',
      },
      {
        id: '2',
        name: '이영희 교수',
        department: '성인 간호학',
        email: 'lee@university.edu',
      },
      {
        id: '3',
        name: '박철수 교수',
        department: '정신 간호학',
        email: 'park@university.edu',
      },
    ];
    setProfessors(mockProfessors);
  }, []);

  // 선택된 교수의 일정 로드
  useEffect(() => {
    if (selectedProfessor) {
      // 교수 일정 데이터 (목업)
      const mockSchedules: ProfessorSchedule[] = [
        {
          id: '1',
          professorId: selectedProfessor.id,
          type: 'class',
          date: '2025-10-21',
          startTime: '09:00',
          endTime: '11:00',
          title: '기초간호학',
          location: 'A동 302호',
          day: 2, // 수요일
        },
        {
          id: '2',
          professorId: selectedProfessor.id,
          type: 'meeting',
          date: '2025-10-21',
          startTime: '14:00',
          endTime: '15:00',
          title: '학과 회의',
          day: 2, // 수요일
        },
        {
          id: '3',
          professorId: selectedProfessor.id,
          type: 'class',
          date: '2025-10-23',
          startTime: '10:00',
          endTime: '12:00',
          title: '성인간호학',
          location: 'B동 201호',
          day: 4, // 금요일
        },
      ];
      setProfessorSchedules(mockSchedules);

      // 기존 예약 데이터 (목업)
      const mockBookings: Booking[] = [
        {
          id: '1',
          studentId: 'student1',
          professorId: selectedProfessor.id,
          date: '2025-10-21',
          startTime: '11:00',
          endTime: '12:00',
          title: '기초 간호 실습',
          status: 'approved',
          createdAt: '2025-10-20T09:00:00Z',
          updatedAt: '2025-10-20T09:00:00Z',
          day: 2, // 수요일
        },
      ];
      setExistingBookings(mockBookings);
    }
  }, [selectedProfessor]);

  const handleTimeSlotClick = (day: number, time: string) => {
    if (selectedProfessor) {
      onTimeSlotClick(day, time, selectedProfessor);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>교수 일정 보기</Text>
          <Text style={styles.subtitle}>
            교수님의 일정을 확인하고 예약 가능한 시간을 선택하세요
          </Text>

          <ProfessorSelector
            professors={professors}
            selectedProfessor={selectedProfessor}
            onSelectProfessor={setSelectedProfessor}
          />

          {selectedProfessor && (
            <View style={styles.scheduleContainer}>
              <Text style={styles.scheduleTitle}>
                {selectedProfessor.name} 일정
              </Text>
              <Text style={styles.scheduleSubtitle}>
                {selectedProfessor.department}
              </Text>

              <WeeklyTimelineGrid
                professorSchedules={professorSchedules}
                existingBookings={existingBookings}
                onTimeSlotClick={handleTimeSlotClick}
              />
            </View>
          )}

          {!selectedProfessor && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👨‍🏫</Text>
              <Text style={styles.emptyTitle}>교수를 선택해주세요</Text>
              <Text style={styles.emptySubtitle}>
                위에서 교수를 선택하면 일정을 확인할 수 있습니다
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  scheduleContainer: {
    marginTop: 8,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
