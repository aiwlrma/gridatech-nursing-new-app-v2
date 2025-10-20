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
