import React from 'react';
import { SvgIcon } from './SvgIcon';
import { SvgIconName } from '../assets/icons';

// 아이콘 타입 정의 - 기존 호환성 유지
export type IconName = 
  | 'home' 
  | 'user' 
  | 'search' 
  | 'heart' 
  | 'star' 
  | 'settings'
  | 'person'
  | 'menu'
  | 'notifications'
  | 'bookmark'
  | 'share'
  | 'edit'
  | 'delete'
  | 'add'
  | 'close'
  | 'check'
  | 'arrow-back'
  | 'arrow-forward'
  | 'camera'
  | 'image'
  | 'mail'
  | 'phone'
  | 'location'
  | 'time'
  | 'calendar';

// 기존 IconName을 SvgIconName으로 매핑
const iconNameMapping: Record<IconName, SvgIconName> = {
  home: 'home',
  user: 'user',
  search: 'search',
  heart: 'heart',
  star: 'star',
  settings: 'settings',
  person: 'person',
  menu: 'menu',
  notifications: 'notifications',
  bookmark: 'bookmark',
  share: 'share',
  edit: 'edit',
  delete: 'delete',
  add: 'add',
  close: 'close',
  check: 'check',
  'arrow-back': 'arrowBack',
  'arrow-forward': 'arrowForward',
  camera: 'camera',
  image: 'image',
  mail: 'mail',
  phone: 'phone',
  location: 'location',
  time: 'time',
  calendar: 'calendar',
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000' 
}) => {
  const svgIconName = iconNameMapping[name];
  
  if (!svgIconName) {
    console.warn(`Icon "${name}" not found in mapping`);
    return null;
  }

  return (
    <SvgIcon 
      name={svgIconName}
      size={size} 
      color={color} 
    />
  );
};

export default Icon;
