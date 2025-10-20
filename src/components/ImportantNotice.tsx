import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SvgIcon } from './SvgIcon';
import { Notice } from '../types';

interface ImportantNoticeProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export const ImportantNotice: React.FC<ImportantNoticeProps> = ({
  notice,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pinnedNotice}
        onPress={() => onPress(notice)}
        activeOpacity={0.6}
      >
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {notice.title}
          </Text>
          <Text style={styles.date}>{notice.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // 여백 감소
    paddingVertical: 8, // 여백 감소
    backgroundColor: '#FAFAFA', // 배경색 변경
  },
  pinnedNotice: {
    backgroundColor: '#FEF3C7', // 노란 배경
    borderRadius: 8, // 모서리 둥글게
    padding: 12, // 패딩 감소
    borderWidth: 1, // 테두리 추가
    borderColor: '#FDE68A', // 테두리 색상
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14, // 폰트 크기 감소
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4, // 마진 증가
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
});
