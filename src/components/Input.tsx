import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SvgIcon } from './SvgIcon';
import { COLORS, SIZES } from '../constants';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: string; // 이모지 아이콘
  rightIcon?: string; // 이모지 아이콘
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const containerStyle = [
    styles.container,
    style,
  ];

  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.focused,
    error && styles.error,
    disabled && styles.disabled,
  ];

  const textInputStyle = [
    styles.input,
    multiline && styles.multilineInput,
    inputStyle,
  ];

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={inputContainerStyle}>
        {leftIcon && (
          <Text style={styles.leftIcon}>{leftIcon}</Text>
        )}
        
        <TextInput
          style={textInputStyle}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress || (secureTextEntry ? togglePasswordVisibility : undefined)}
          >
            <Text style={styles.rightIconText}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
        
        {secureTextEntry && !rightIcon && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <SvgIcon
              name={isPasswordVisible ? 'eyeOff' : 'eye'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.spacing.md,
  },
  label: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius.md,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.spacing.md,
  },
  input: {
    flex: 1,
    fontSize: SIZES.fontSize.md,
    color: COLORS.text,
    paddingVertical: SIZES.spacing.md,
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: SIZES.spacing.md,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: SIZES.spacing.sm,
  },
  rightIcon: {
    padding: SIZES.spacing.xs,
  },
  rightIconText: {
    fontSize: 20,
  },
  eyeIcon: {
    padding: SIZES.spacing.xs,
  },
  focused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: COLORS.error,
  },
  disabled: {
    backgroundColor: COLORS.background,
    opacity: 0.6,
  },
  errorText: {
    fontSize: SIZES.fontSize.xs,
    color: COLORS.error,
    marginTop: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
});
