import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageCharacterProps {
  source: ImageSourcePropType;
  size?: number;
  style?: any;
}

export const ImageCharacter: React.FC<ImageCharacterProps> = ({ 
  source, 
  size = 120, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={source}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
        backgroundColor="transparent"
      />
    </View>
  );
};

// 기본 캐릭터들 (이미지 파일이 있을 때 사용)
export const DefaultCharacter: React.FC<{ size?: number; style?: any }> = ({ 
  size = 120, 
  style 
}) => {
  // 기본 이미지 소스 (require를 사용하여 로컬 이미지 로드)
  // 실제 이미지 파일이 있으면 이 부분을 수정하세요
  const defaultSource = require('../../assets/characters/sun.png');
  
  return (
    <ImageCharacter 
      source={defaultSource} 
      size={size} 
      style={style} 
    />
  );
};

// 여러 캐릭터 옵션들
export const NurseCharacterImage: React.FC<{ size?: number; style?: any }> = ({ 
  size = 120, 
  style 
}) => {
  const source = require('../../assets/characters/sun.png');
  return <ImageCharacter source={source} size={size} style={style} />;
};

export const DoctorCharacterImage: React.FC<{ size?: number; style?: any }> = ({ 
  size = 120, 
  style 
}) => {
  const source = require('../../assets/characters/sun.png');
  return <ImageCharacter source={source} size={size} style={style} />;
};

export const CuteCharacterImage: React.FC<{ size?: number; style?: any }> = ({ 
  size = 120, 
  style 
}) => {
  const source = require('../../assets/characters/sun.png');
  return <ImageCharacter source={source} size={size} style={style} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    backgroundColor: 'transparent',
  },
});
