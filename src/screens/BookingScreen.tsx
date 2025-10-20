import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StepIndicator } from '../components/StepIndicator';
import { DateSelectionStep } from '../components/DateSelectionStep';
import { TimeSelectionStep } from '../components/TimeSelectionStep';
import { PracticeSelectionStep } from '../components/PracticeSelectionStep';
import { ConfirmationStep } from '../components/ConfirmationStep';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface BookingScreenProps {
  onBack: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  const steps = ['날짜', '시간', '실습', '확인'];

  // 실습 상세 정보 (실제로는 API에서 가져올 것)
  const practiceDetails = {
    name: '기초 간호 실습',
    location: '실습실 A동 302호',
    professor: '김교수',
    duration: '2시간',
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePracticeSelect = (practiceId: string) => {
    setSelectedPractice(practiceId);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleConfirm = async () => {
    try {
      // 실제로는 API 호출
      console.log('예약 정보:', {
        date: selectedDate,
        time: selectedTime,
        practice: selectedPractice,
      });
      
      Alert.alert(
        '예약 완료',
        '실습 예약이 성공적으로 완료되었습니다.',
        [
          {
            text: '확인',
            onPress: onBack,
          },
        ]
      );
    } catch (error) {
      Alert.alert('오류', '예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateSelectionStep
            onDateSelect={handleDateSelect}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <TimeSelectionStep
            selectedDate={selectedDate!}
            onTimeSelect={handleTimeSelect}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PracticeSelectionStep
            selectedDate={selectedDate!}
            selectedTime={selectedTime!}
            onPracticeSelect={handlePracticeSelect}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            selectedDate={selectedDate!}
            selectedTime={selectedTime!}
            selectedPractice={selectedPractice!}
            practiceDetails={practiceDetails}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={4}
        steps={steps}
      />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.background,
  },
});
