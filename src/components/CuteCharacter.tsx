import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CuteCharacterProps {
  size?: number;
  style?: any;
}

export const CuteCharacter: React.FC<CuteCharacterProps> = ({ 
  size = 80, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* 캐릭터 몸통 (구름 모양) */}
      <View style={[styles.body, { width: size * 0.8, height: size * 0.6 }]}>
        {/* 눈 */}
        <View style={styles.eyes}>
          <Text style={[styles.eye, { fontSize: size * 0.08 }]}>👀</Text>
        </View>
        
        {/* 입 */}
        <Text style={[styles.mouth, { fontSize: size * 0.1 }]}>😊</Text>
        
        {/* 볼 홍조 */}
        <View style={styles.cheeks}>
          <Text style={[styles.cheek, { fontSize: size * 0.06 }]}>🌸</Text>
          <Text style={[styles.cheek, { fontSize: size * 0.06 }]}>🌸</Text>
        </View>
      </View>
      
      {/* 머리 위 장식 */}
      <View style={[styles.hat, { width: size * 0.3, height: size * 0.15 }]}>
        <Text style={[styles.hatText, { fontSize: size * 0.08 }]}>💊</Text>
      </View>
      
      {/* 하단 받침 */}
      <View style={[styles.base, { width: size * 0.9, height: size * 0.2 }]}>
        <Text style={[styles.baseText, { fontSize: size * 0.05 }]}>🏥</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  body: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  eyes: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  eye: {
    marginHorizontal: 2,
  },
  mouth: {
    marginBottom: 4,
  },
  cheeks: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: '60%',
    paddingHorizontal: 8,
  },
  cheek: {
    opacity: 0.7,
  },
  hat: {
    position: 'absolute',
    top: -8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  hatText: {
    opacity: 0.8,
  },
  base: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  baseText: {
    opacity: 0.6,
  },
});
