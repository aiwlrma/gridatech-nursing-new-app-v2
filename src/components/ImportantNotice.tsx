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
        <View style={styles.pinIcon}>
          <SvgIcon name="pin" color="#F59E0B" size={16} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {notice.title}
          </Text>
          <Text style={styles.date}>{notice.date}</Text>
        </View>
        <SvgIcon name="chevronRight" color="#D1D5DB" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pinnedNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  pinIcon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
});
