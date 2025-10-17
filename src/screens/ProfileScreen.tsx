import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Input, SvgIcon } from '../components';
import { COLORS, SIZES } from '../constants';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

interface ProfileScreenProps {
  onBack?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    bio: 'React Native 개발자입니다. 새로운 기술을 배우는 것을 좋아합니다.',
  });

  const [formData, setFormData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    Alert.alert('성공', '프로필이 업데이트되었습니다.');
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const menuItems = [
    { icon: 'settings', title: '설정', onPress: () => console.log('설정') },
    { icon: 'notifications', title: '알림', onPress: () => console.log('알림') },
    { icon: 'help', title: '도움말', onPress: () => console.log('도움말') },
    { icon: 'info', title: '정보', onPress: () => console.log('정보') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 프로필 헤더 */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <SvgIcon name="person" size={40} color={COLORS.primary} />
            </View>
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.email}>{profileData.email}</Text>
          </View>

          {!isEditing && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <SvgIcon name="edit" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* 프로필 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>프로필 정보</Text>
          
          {isEditing ? (
            <View style={styles.form}>
              <Input
                label="이름"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="이름을 입력하세요"
              />
              
              <Input
                label="이메일"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Input
                label="전화번호"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="전화번호를 입력하세요"
                keyboardType="phone-pad"
              />
              
              <Input
                label="소개"
                value={formData.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                placeholder="자기소개를 입력하세요"
                multiline
                numberOfLines={4}
              />

              <View style={styles.buttonRow}>
                <Button
                  title="취소"
                  onPress={handleCancel}
                  variant="outline"
                  style={styles.button}
                />
                <Button
                  title="저장"
                  onPress={handleSave}
                  variant="primary"
                  style={styles.button}
                />
              </View>
            </View>
          ) : (
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <SvgIcon name="person" size={20} color={COLORS.primary} />
                <Text style={styles.infoLabel}>이름</Text>
                <Text style={styles.infoValue}>{profileData.name}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <SvgIcon name="email" size={20} color={COLORS.primary} />
                <Text style={styles.infoLabel}>이메일</Text>
                <Text style={styles.infoValue}>{profileData.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <SvgIcon name="phone" size={20} color={COLORS.primary} />
                <Text style={styles.infoLabel}>전화번호</Text>
                <Text style={styles.infoValue}>{profileData.phone}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <SvgIcon name="books" size={20} color={COLORS.primary} />
                <Text style={styles.infoLabel}>소개</Text>
                <Text style={styles.infoValue}>{profileData.bio}</Text>
              </View>
            </View>
          )}
        </View>

        {/* 메뉴 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>메뉴</Text>
          {menuItems?.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <SvgIcon name={item.icon as any} size={20} color={COLORS.primary} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <SvgIcon name="arrowForward" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.borderRadius.lg,
    marginBottom: SIZES.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarContainer: {
    marginRight: SIZES.spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
  },
  email: {
    fontSize: SIZES.fontSize.sm,
    color: COLORS.textSecondary,
  },
  editButton: {
    padding: SIZES.spacing.sm,
  },
  section: {
    marginBottom: SIZES.spacing.xl,
  },
  sectionTitle: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  form: {
    backgroundColor: COLORS.surface,
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: SIZES.spacing.xs,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  infoLabel: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SIZES.spacing.sm,
    width: 80,
  },
  infoValue: {
    fontSize: SIZES.fontSize.sm,
    color: COLORS.textSecondary,
    flex: 1,
    marginLeft: SIZES.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SIZES.spacing.md,
    borderRadius: SIZES.borderRadius.md,
    marginBottom: SIZES.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: SIZES.fontSize.md,
    color: COLORS.text,
    marginLeft: SIZES.spacing.sm,
  },
});
