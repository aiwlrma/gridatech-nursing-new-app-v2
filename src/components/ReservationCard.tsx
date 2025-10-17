import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MapPin } from 'lucide-react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { Reservation } from '../types';
import { StatusChip } from './StatusChip';

interface ReservationCardProps {
  reservation: Reservation;
  onPress?: (reservation: Reservation) => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(reservation)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* 시간 박스 */}
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{reservation.time}</Text>
        </View>

        {/* 예약 정보 */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {reservation.title}
          </Text>
          
          {reservation.subject && (
            <Text style={styles.subject} numberOfLines={1}>
              {reservation.subject}
            </Text>
          )}
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={BLUE_THEME.textSecondary} />
            <Text style={styles.location} numberOfLines={1}>
              {reservation.location}
            </Text>
          </View>

          <View style={styles.statusContainer}>
            <StatusChip status={reservation.status} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE_THEME.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: BLUE_THEME.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  timeBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: BLUE_THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 64,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: BLUE_THEME.text,
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    fontWeight: '500',
    color: BLUE_THEME.textSecondary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: BLUE_THEME.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
});