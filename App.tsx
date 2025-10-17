import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SmartHomeScreen } from './src/screens/SmartHomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ReservationManagementScreen } from './src/screens/ReservationManagementScreen';
import { TimetableScreen } from './src/screens/TimetableScreen';
import GradeScreen from './src/screens/GradeScreen';
import { AddReservationScreen } from './src/screens/AddReservationScreen';
import { AllBadgesScreen } from './src/screens/AllBadgesScreen';
import { MessageScreen } from './src/screens/MessageScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

type Screen = 'home' | 'reservationManagement' | 'timetable' | 'grade' | 'addReservation' | 'badges' | 'message' | 'profile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

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

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // 현재 화면에 따라 다른 컴포넌트 렌더링
    switch (currentScreen) {
      case 'reservationManagement':
        return <ReservationManagementScreen onBack={handleBackToHome} />;
      case 'timetable':
        return <TimetableScreen onBack={handleBackToHome} />;
      case 'grade':
        return <GradeScreen onBack={handleBackToHome} />;
      case 'addReservation':
        return <AddReservationScreen onBack={handleBackToHome} />;
      case 'badges':
        return <AllBadgesScreen onBack={handleBackToHome} />;
      case 'message':
        return <MessageScreen onBack={handleBackToHome} />;
      case 'profile':
        return <ProfileScreen onBack={handleBackToHome} />;
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