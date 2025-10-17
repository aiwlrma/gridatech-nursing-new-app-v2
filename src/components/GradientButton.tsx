import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BLUE_THEME } from '../constants/blueTheme';

interface GradientButtonProps {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={BLUE_THEME.buttonGradient || ['#1884FF', '#1565C0']}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64, // 56px → 64px
    borderRadius: 18, // 16px → 18px
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: BLUE_THEME.shadow,
    shadowOffset: {
      width: 0,
      height: 2, // 4px → 2px
    },
    shadowOpacity: 0.06, // 0.15 → 0.06
    shadowRadius: 16, // 20px → 16px
    elevation: 2, // 8 → 2
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18, // 16px → 18px
    fontWeight: '800', // bold → 800
    color: '#FFFFFF',
  },
});
