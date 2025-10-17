import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SimpleCharacterProps {
  size?: number;
  style?: any;
}

export const SimpleCharacter: React.FC<SimpleCharacterProps> = ({ 
  size = 80, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* 간호사 캐릭터 */}
      <Text style={[styles.character, { fontSize: size }]}>👩‍⚕️</Text>
    </View>
  );
};

export const CloudCharacter: React.FC<SimpleCharacterProps> = ({ 
  size = 80, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* 구름 캐릭터 */}
      <Text style={[styles.character, { fontSize: size }]}>☁️</Text>
    </View>
  );
};

export const NurseCharacter: React.FC<SimpleCharacterProps> = ({ 
  size = 80, 
  style 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* 간호사 캐릭터 */}
      <Text style={[styles.character, { fontSize: size }]}>🧑‍⚕️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    textAlign: 'center',
  },
});
