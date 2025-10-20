import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, SIZES } from '../constants';
import { NurseCharacter, CloudCharacter, ImageCharacter, SvgIcon, WebScrollView } from '../components';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  navigation?: any;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 애니메이션을 위한 ref
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    // 실제 로그인 로직 구현
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('성공', '로그인되었습니다!');
      onLoginSuccess?.();
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('비밀번호 찾기', '비밀번호 찾기 기능을 구현해주세요.');
  };

  const handleSignUp = () => {
    Alert.alert('회원가입', '회원가입 화면으로 이동합니다.');
    // navigation?.navigate('SignUp');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 펄스 애니메이션 효과
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [pulseAnim]);

  // Wave 배경 컴포넌트
  const WaveBackground = () => (
    <View style={styles.waveContainer}>
      <View style={styles.wave} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Wave 배경 */}
        <WaveBackground />
        
        <WebScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Animated.View 
              style={[
                styles.logoContainer,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              {/* 순솜이 캐릭터 사용 */}
              <ImageCharacter 
                source={require('../../assets/characters/sun.png')} 
                size={140} 
              />
            </Animated.View>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.appTitle}>순솜이</Text>
              <Text style={styles.appSubtitle}>AI 기반 실습 플랫폼</Text>
            </View>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <SvgIcon name="email" size={18} color="#9CA3AF" fallback="📧" style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.textInput}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor={COLORS.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <SvgIcon name="lock" size={18} color="#9CA3AF" fallback="🔒" style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.textInput}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor={COLORS.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>아직 계정이 없으신가요? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </WebScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  // Wave 배경 스타일
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  wave: {
    flex: 1,
    backgroundColor: '#1884FF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.spacing.lg,
    zIndex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 2,
  },
  logoContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
    // 그림자 효과 제거
  },
  titleSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 6,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  appSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  // inputIcon 스타일 제거됨 - SVG 아이콘으로 대체
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#191F28',
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
  eyeButton: {
    padding: SIZES.spacing.xs,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  // eyeIcon 스타일 제거됨 - SVG 아이콘으로 대체
  loginButton: {
    backgroundColor: '#1884FF',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#1884FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 0,
  },
  forgotPasswordText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  signUpText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  signUpLink: {
    color: '#1884FF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
