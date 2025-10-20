import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <View style={styles.step}>
            <View style={[
              styles.stepCircle,
              index + 1 <= currentStep && styles.stepActive
            ]}>
              <Text style={[
                styles.stepNumber,
                index + 1 <= currentStep && styles.stepNumberActive
              ]}>
                {index + 1}
              </Text>
            </View>
            <Text style={[
              styles.stepLabel,
              index + 1 <= currentStep && styles.stepLabelActive
            ]}>
              {step}
            </Text>
          </View>
          
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              index + 1 < currentStep && styles.stepLineActive
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  
  step: {
    alignItems: 'center',
    flex: 1,
  },
  
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  stepActive: {
    backgroundColor: EVERYTIME_COLORS.primary,
  },
  
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  
  stepNumberActive: {
    color: '#FFFFFF',
  },
  
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  
  stepLabelActive: {
    color: EVERYTIME_COLORS.primary,
    fontWeight: '600',
  },
  
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 24,
  },
  
  stepLineActive: {
    backgroundColor: EVERYTIME_COLORS.primary,
  },
});
