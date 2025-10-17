import React from 'react';
import { Text, TextProps, Platform } from 'react-native';

interface DefaultTextProps extends TextProps {
  children: React.ReactNode;
}

const defaultFontFamily = Platform.select({
  ios: 'Pretendard',
  android: 'Pretendard-Regular',
});

export const DefaultText: React.FC<DefaultTextProps> = ({ style, ...props }) => {
  return (
    <Text
      style={[
        { fontFamily: defaultFontFamily },
        style,
      ]}
      {...props}
    />
  );
};
