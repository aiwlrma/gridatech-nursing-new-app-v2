import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff, Lock, User } from 'lucide-react-native';
import { TossButton, TossText, TossCard } from '../components';
import { TOSS_THEME, TOSS_MESSAGES } from '../constants/tossTheme';

interface TossLoginScreenProps {
  onLoginSuccess?: () => void;
}

export const TossLoginScreen: React.FC<TossLoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 입력해주세요');
      return;
    }

    setIsLoading(true);
    
    // 로그인 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* 상단 여백 */}
          <View style={styles.topSpacing} />
          
          {/* 메인 타이틀 */}
          <View style={styles.titleContainer}>
            <TossText variant="display" style={styles.title}>
              안녕하세요,{'\n'}
              간호학습입니다 👋
            </TossText>
            <TossText variant="body" color="secondary" style={styles.subtitle}>
              간호학과 학생들을 위한{'\n'}
              스마트 학습 플랫폼
            </TossText>
          </View>

          {/* 입력 폼 */}
          <View style={styles.formContainer}>
            {/* 이메일 입력 */}
            <View style={styles.inputContainer}>
              <TossText variant="caption" color="secondary" style={styles.inputLabel}>
                이메일
              </TossText>
              <View style={styles.inputWrapper}>
                <User size={20} color={TOSS_THEME.colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="이메일을 입력해주세요"
                  placeholderTextColor={TOSS_THEME.colors.text.tertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputContainer}>
              <TossText variant="caption" color="secondary" style={styles.inputLabel}>
                비밀번호
              </TossText>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={TOSS_THEME.colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호를 입력해주세요"
                  placeholderTextColor={TOSS_THEME.colors.text.tertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          {/* 로그인 버튼 */}
          <View style={styles.buttonContainer}>
            <TossButton
              title={isLoading ? "로그인 중..." : "로그인"}
              onPress={handleLogin}
              disabled={isLoading}
              size="large"
            />
          </View>

          {/* 하단 링크 */}
          <View style={styles.linkContainer}>
            <TouchableOpacity style={styles.linkButton}>
              <TossText variant="caption" color="primary">
                비밀번호를 잊으셨나요?
              </TossText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <TossText variant="caption" color="secondary">
                회원가입
              </TossText>
            </TouchableOpacity>
          </View>

          {/* 하단 여백 */}
          <View style={styles.bottomSpacing} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TOSS_THEME.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: TOSS_THEME.containerPadding,
  },
  topSpacing: {
    height: 80,
  },
  titleContainer: {
    marginBottom: TOSS_THEME.sectionGap,
  },
  title: {
    marginBottom: TOSS_THEME.spacing.md,
  },
  subtitle: {
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: TOSS_THEME.sectionGap,
  },
  inputContainer: {
    marginBottom: TOSS_THEME.spacing.xl,
  },
  inputLabel: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOSS_THEME.colors.card,
    borderRadius: TOSS_THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: TOSS_THEME.colors.border,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
    ...TOSS_THEME.shadow.small,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: TOSS_THEME.colors.text.primary,
    fontFamily: 'Pretendard',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    padding: 4,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: TOSS_THEME.spacing.xl,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkButton: {
    padding: TOSS_THEME.spacing.sm,
  },
  bottomSpacing: {
    height: 40,
  },
});
