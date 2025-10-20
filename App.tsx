import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SmartHomeScreen } from './src/screens/SmartHomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ReservationManagementScreen } from './src/screens/ReservationManagementScreen';
import { TimetableScreen } from './src/screens/TimetableScreen';
import { TossGradeScreen } from './src/screens/TossGradeScreen';
import { AddReservationScreen } from './src/screens/AddReservationScreen';
import { AllBadgesScreen } from './src/screens/AllBadgesScreen';
import { MessageScreen } from './src/screens/MessageScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { NursingBadgesScreen } from './src/screens/NursingBadgesScreen';
import TodayReservationsScreen from './src/screens/TodayReservationsScreen';
import { NoticeScreen } from './src/screens/NoticeScreen';

type Screen = 'home' | 'reservationManagement' | 'timetable' | 'grade' | 'addReservation' | 'badges' | 'message' | 'profile' | 'nursingBadges' | 'todayReservations' | 'notice';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
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
    setCurrentScreen('timetable');
  };

  const handleNavigateToGrade = () => {
    setCurrentScreen('grade');
  };

  const handleNavigateToAddReservation = () => {
    setCurrentScreen('addReservation');
  };

  const handleNavigateToBadges = () => {
    setCurrentScreen('badges');
  };

  const handleNavigateToMessage = () => {
    setCurrentScreen('message');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleNavigateToNursingBadges = () => {
    setCurrentScreen('nursingBadges');
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

  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // 현재 화면에 따라 다른 컴포넌트 렌더링
    switch (currentScreen) {
      case 'reservationManagement':
        return <ReservationManagementScreen 
          onBack={handleBackToHome} 
          onNavigateToAddReservation={handleNavigateToAddReservation}
          reservations={reservations}
        />;
      case 'timetable':
        return <TimetableScreen onBack={handleBackToHome} />;
      case 'grade':
        return <TossGradeScreen onBack={handleBackToHome} />;
      case 'addReservation':
        return <AddReservationScreen 
          onBack={handleBackToHome} 
          onSave={handleAddReservation}
        />;
      case 'badges':
        return <AllBadgesScreen onBack={handleBackToHome} />;
      case 'message':
        return <MessageScreen onBack={handleBackToHome} />;
      case 'profile':
        return <ProfileScreen onBack={handleBackToHome} />;
      case 'nursingBadges':
        return <NursingBadgesScreen onBack={handleBackToHome} />;
      case 'todayReservations':
        return <TodayReservationsScreen navigation={{ goBack: handleBackToHome }} route={{}} />;
      case 'notice':
        return <NoticeScreen onBack={handleBackToHome} />;
      default:
        return (
          <SmartHomeScreen 
            onNavigateToReservationManagement={handleNavigateToReservationManagement}
            onNavigateToTimetable={handleNavigateToTimetable}
            onNavigateToGrade={handleNavigateToGrade}
            onNavigateToAddReservation={handleNavigateToAddReservation}
            onNavigateToBadges={handleNavigateToBadges}
            onNavigateToMessage={handleNavigateToMessage}
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToNursingBadges={handleNavigateToNursingBadges}
            onNavigateToTodayReservations={handleNavigateToTodayReservations}
            onNavigateToNotice={handleNavigateToNotice}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      {renderContent()}
    </SafeAreaProvider>
  );
};

export default App;