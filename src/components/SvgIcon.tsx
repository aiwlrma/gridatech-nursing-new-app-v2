import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SVG_ICONS, SvgIconName, getSafeIcon, isValidIconName } from '../assets/icons';

interface SvgIconProps {
  name?: SvgIconName;
  xml?: string;
  size?: number;
  color?: string;
  fallback?: string; // 폴백용 이모지
  style?: any;
}

// SVG XML 유효성 검사 함수
const isValidSvgXml = (xml: string): boolean => {
  if (!xml || typeof xml !== 'string' || xml.trim() === '') {
    return false;
  }
  
  // 기본적인 SVG 구조 확인
  const hasSvgTag = xml.includes('<svg') && xml.includes('</svg>');
  const hasViewBox = xml.includes('viewBox');
  
  return hasSvgTag && hasViewBox;
};

// 색상 처리 함수
const processSvgColor = (xml: string, color: string): string => {
  try {
    let processedXml = xml;
    
    // currentColor를 실제 색상으로 변경
    processedXml = processedXml.replace(/currentColor/g, color);
    
    // fill 속성을 none으로 설정 (아웃라인만 표시)
    processedXml = processedXml.replace(/fill="[^"]*"/g, 'fill="none"');
    
    // stroke 속성도 변경 (기존 stroke가 있는 경우)
    processedXml = processedXml.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
    
    return processedXml;
  } catch (error) {
    console.warn('SvgIcon: Error processing color:', error);
    return xml; // 원본 반환
  }
};

export const SvgIcon: React.FC<SvgIconProps> = ({ 
  name,
  xml, 
  size = 24, 
  color = '#9CA3AF', // 기본 색상을 회색으로 변경
  fallback = '❓',
  style 
}) => {
  // 메모이제이션을 사용하여 성능 최적화
  const processedSvgXml = useMemo(() => {
    // name이 제공된 경우 안전하게 아이콘 가져오기
    let svgXml = xml;
    if (name) {
      if (isValidIconName(name)) {
        svgXml = SVG_ICONS[name];
      } else {
        const safeIcon = getSafeIcon(name);
        if (safeIcon) {
          svgXml = safeIcon;
        } else {
          console.warn(`SvgIcon: Icon "${name}" not found, using fallback`);
          return null;
        }
      }
    }

    // SVG XML이 유효한지 확인
    if (!isValidSvgXml(svgXml)) {
      console.warn(`SvgIcon: Invalid XML for icon "${name}", using fallback`);
      return null;
    }

    // 색상 처리
    if (color && color !== '#000000') {
      return processSvgColor(svgXml, color);
    }

    return svgXml;
  }, [name, xml, color]);

  // SVG XML이 유효하지 않은 경우 폴백 표시
  if (!processedSvgXml) {
    return (
      <View style={[{ 
        width: size, 
        height: size, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }, style]}>
        <Text style={{ 
          fontSize: size * 0.6, 
          color: color,
          textAlign: 'center'
        }}>
          {fallback}
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgXml 
        xml={processedSvgXml} 
        width={size} 
        height={size}
        onError={(error) => {
          console.warn(`SvgIcon: SVG rendering error for icon "${name}":`, error);
        }}
      />
    </View>
  );
};

export default SvgIcon;
