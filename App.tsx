import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { BottomNavigation } from './src/components/BottomNavigation';
import { TimetableProvider } from './src/contexts/TimetableContext';
import { SmartHomeScreen } from './src/screens/SmartHomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ReservationManagementScreen } from './src/screens/ReservationManagementScreen';
import { BookingManagementScreen } from './src/screens/BookingManagementScreen';
import { BookingTab } from './src/components/BookingTabNavigation';
import { TimetableScreen } from './src/screens/TimetableScreen';
import { AddReservationScreen } from './src/screens/AddReservationScreen';
import { AllBadgesScreen } from './src/screens/AllBadgesScreen';
import { MessageScreen } from './src/screens/MessageScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { NursingBadgesScreen } from './src/screens/NursingBadgesScreen';
import TodayReservationsScreen from './src/screens/TodayReservationsScreen';
import { NoticeScreen } from './src/screens/NoticeScreen';
import { LearningReportScreen } from './src/screens/LearningReportScreen';
import { BookingScreen } from './src/screens/BookingScreen';

type Screen = 'home' | 'messages' | 'badges' | 'report' | 'reservationManagement' | 'timetable' | 'grade' | 'addReservation' | 'nursingBadges' | 'todayReservations' | 'notice' | 'learningReport' | 'booking';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeBookingTab, setActiveBookingTab] = useState<BookingTab>('myBookings');
  const [reservations, setReservations] = useState([
    {
      id: 1,
      time: '14:00',
      title: '기초 간호 실습',
      location: '실습실 A동 302호',
      icon: '💉',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 2,
      time: '16:30',
      title: '성인간호학 이론',
      location: '강의실 B동 201호',
      icon: '📚',
      date: new Date().toISOString().split('T')[0],
    },
  ]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleNavigateToReservationManagement = () => {
    setCurrentScreen('reservationManagement');
  };

  const handleNavigateToTimetable = () => {
    console.log('시간표로 이동 시도');
    setCurrentScreen('timetable');
  };

  const handleNavigateToGrade = () => {
    setCurrentScreen('grade');
  };

  const handleNavigateToAddReservation = () => {
    setCurrentScreen('addReservation');
  };

  const handleNavigateToBadges = () => {
    setCurrentScreen('learningReport');
  };

  const handleNavigateToMessage = () => {
    setCurrentScreen('messages');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('home'); // 프로필은 홈 화면에서 처리
  };


  const handleNavigateToTodayReservations = () => {
    setCurrentScreen('todayReservations');
  };

  const handleNavigateToNotice = () => {
    setCurrentScreen('notice');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleAddReservation = (newReservation: {
    title: string;
    date: string;
    time: string;
    location: string;
    professor: string;
  }) => {
    const reservation = {
      id: Date.now(), // 간단한 ID 생성
      time: newReservation.time,
      title: newReservation.title,
      location: newReservation.location,
      icon: '📅', // 기본 아이콘
      date: newReservation.date,
    };
    
    setReservations(prev => [...prev, reservation]);
    setCurrentScreen('reservationManagement');
  };

  const renderMainContent = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // 메인 탭 화면들
    switch (currentScreen) {
      case 'messages':
        return <MessageScreen onBack={handleBackToHome} />;
      case 'badges':
        return <LearningReportScreen onBack={handleBackToHome} />;
      case 'report':
        return <LearningReportScreen onBack={handleBackToHome} />;
      case 'timetable':
        return <TimetableScreen onBack={handleBackToHome} />;
      case 'home':
      default:
        return (
          <SmartHomeScreen
            onNavigateToTimetable={handleNavigateToTimetable}
            onNavigateToGrades={handleNavigateToGrade}
            onNavigateToReservationManagement={handleNavigateToReservationManagement}
            onNavigateToMessage={handleNavigateToMessage}
            onNavigateToNotice={handleNavigateToNotice}
          />
        );
    }
  };

  const renderModalContent = () => {
    console.log('renderModalContent 호출됨, currentScreen:', currentScreen);
    // 모달/서브 화면들
    switch (currentScreen) {
      case 'reservationManagement':
        return <BookingManagementScreen 
          onBack={handleBackToHome}
          hideBottomNavigation={shouldHideBottomNavigation}
          onActiveTabChange={setActiveBookingTab}
        />;
      case 'grade':
        return <NursingBadgesScreen onBack={handleBackToHome} />;
      case 'addReservation':
        return <AddReservationScreen 
          onBack={handleBackToHome} 
          onSave={handleAddReservation}
        />;
      case 'nursingBadges':
        return <NursingBadgesScreen onBack={handleBackToHome} />;
      case 'todayReservations':
        return <TodayReservationsScreen navigation={{ goBack: handleBackToHome }} route={{}} />;
      case 'notice':
        return <NoticeScreen onBack={handleBackToHome} />;
      case 'learningReport':
        return <LearningReportScreen onBack={handleBackToHome} />;
      case 'booking':
        return <BookingScreen onBack={handleBackToHome} />;
      default:
        return null;
    }
  };

  const isModalScreen = [
    'reservationManagement', 'grade', 'addReservation', 
    'nursingBadges', 'todayReservations', 'notice', 'learningReport', 'booking'
  ].includes(currentScreen);
  
  // 예약 관리 화면에서는 하단 네비게이션 숨기기
  const shouldHideBottomNavigation = currentScreen === 'reservationManagement';
  
  console.log('isModalScreen:', isModalScreen, 'currentScreen:', currentScreen);

  const handleTabPress = (tabId: string) => {
    console.log('탭 클릭:', tabId);
    switch (tabId) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'messages':
        setCurrentScreen('messages');
        break;
      case 'notice':
        setCurrentScreen('notice');
        break;
      case 'reservationManagement':
        setCurrentScreen('reservationManagement');
        break;
      default:
        setCurrentScreen(tabId as Screen);
    }
  };

  // 표 테스트 함수
  const testTimetable = () => {
    console.log('시간표 테스트');
    setCurrentScreen('timetable');
  };

  console.log('App 렌더링:', { isLoggedIn, currentScreen, isModalScreen });

  return (
    <SafeAreaProvider>
      <TimetableProvider>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {isModalScreen ? (
              renderModalContent()
            ) : (
              renderMainContent()
            )}
          </View>
          {isLoggedIn && !shouldHideBottomNavigation && (
            <BottomNavigation
              activeTab={currentScreen}
              onTabPress={handleTabPress}
            />
          )}
        </View>
      </TimetableProvider>
    </SafeAreaProvider>
  );
};

export default App;