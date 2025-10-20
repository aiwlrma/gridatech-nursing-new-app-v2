// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 메시지 관련 타입
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderInitial: string;
  message: string;
  timestamp: string;
  category: '교수님' | '동료' | '알림';
  isRead: boolean;
  isImportant: boolean;
  unreadCount: number;
  isOnline?: boolean; // 온라인 상태
  color: string; // 프로필 색상
}

export interface MessageFilter {
  id: string;
  label: string;
  count: number;
  filter: 'all' | 'unread' | 'important';
}

// 공지사항 관련 타입
export interface Notice {
  id: string;
  category: '실습' | '시험' | '일반';
  title: string;
  date: string;
  views: number;
  isNew: boolean;
  isImportant?: boolean;
  content?: string;
}

export interface NoticeFilter {
  id: string;
  label: string;
  filter: 'all' | '실습' | '시험' | '일반';
}

// 예약 관련 타입
export interface Reservation {
  id: string;
  title: string;
  subject?: string; // 과목명 (secondary text)
  location: string;
  time: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  description?: string;
}

// 새로운 예약 시스템 타입
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Booking {
  id: string;
  studentId: string;
  professorId: string;
  date: string; // "2025-10-21"
  startTime: string; // "14:00"
  endTime: string; // "15:00"
  title: string; // "기초 간호 실습"
  location?: string; // "실습실 A동 302호"
  memo?: string;
  status: BookingStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  day: number; // 0-4 (월-금)
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  email?: string;
  avatar?: string;
}

export interface ProfessorSchedule {
  id: string;
  professorId: string;
  type: 'class' | 'meeting' | 'blocked'; // 수업/회의/차단
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  location?: string;
  day: number; // 0-4 (월-금)
}

// VR 실습 예약 타입
export interface VRReservation {
  id: number;
  time: string;
  duration: number;
  title: string;
  type: string;
  level: string;
  booth: string;
  status: '예약완료' | '진행중' | '완료' | '취소';
}

export interface ReservationFilter {
  id: string;
  label: string;
  filter: 'all' | 'scheduled' | 'completed' | 'cancelled';
}

export interface DateOption {
  id: string;
  label: string;
  date: string;
  isToday: boolean;
  isTomorrow: boolean;
}

// 시간표 관련 타입
export interface ClassSchedule {
  id: string;
  day: number; // 0-4 (월-금)
  startTime: string; // "09:00"
  endTime: string; // "11:00"
  name: string;
  professor: string;
  location: string;
  colorIndex: number; // 0-4 (색상 인덱스)
}

// 새로운 일정 타입 (개선된 버전)
export interface Schedule {
  id: string;
  title: string; // 수업명
  professor: string; // 교수명
  location: string; // 장소
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'; // 요일
  startTime: string; // 시작 시간 (예: "12:00")
  endTime: string; // 종료 시간 (예: "13:00")
  color: string; // 블록 색상 (예: "#EF4444")
  week: number; // 주차 (1-12)
  createdAt: string; // 생성 시간
}

export interface WeekData {
  week: number;
  startDate: string;
  endDate: string;
  schedules: ClassSchedule[];
}

// 화면 네비게이션 타입
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Messages: undefined;
  Notice: undefined;
  Reservations: undefined;
  Timetable: undefined;
  TodayReservations: undefined;
};
