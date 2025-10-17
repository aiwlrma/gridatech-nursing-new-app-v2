import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { Award, Trophy, Star, TrendingUp, Calendar } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GradesScreen({ navigation }) {
  const userStats = {
    level: 7,
    currentXP: 2450,
    totalXP: 3000,
    averageScore: 92,
    totalBadges: 12,
    unlockedBadges: 8,
    completionRate: 8, // x/10
  };

  const featuredBadge = {
    id: 15,
    icon: '🚑',
    name: '생명 구조대',
    date: '2024.01.10',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 레벨 카드 */}
        <View style={styles.levelCard}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB', '#1D4ED8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.levelGradient}
          >
            {/* 레벨 헤더 */}
            <View style={styles.levelHeader}>
              <View>
                <Text style={styles.levelLabel}>현재 레벨</Text>
                <Text style={styles.levelNumber}>Level {userStats.level}</Text>
              </View>
              <View style={styles.levelBadge}>
                <Award size={32} color="#FCD34D" />
              </View>
            </View>

            {/* XP 프로그레스 */}
            <Text style={styles.xpText}>
              {userStats.currentXP.toLocaleString()} / {userStats.totalXP.toLocaleString()} XP
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  {width: `${(userStats.currentXP / userStats.totalXP) * 100}%`}
                ]} 
              />
            </View>

            {/* 통계 */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <TrendingUp size={18} color="rgba(255, 255, 255, 0.9)" />
                <Text style={styles.statValue}>{userStats.averageScore}점</Text>
                <Text style={styles.statLabel}>평균</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Star size={18} color="rgba(255, 255, 255, 0.9)" />
                <Text style={styles.statValue}>{userStats.unlockedBadges}개</Text>
                <Text style={styles.statLabel}>뱃지</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Trophy size={18} color="rgba(255, 255, 255, 0.9)" />
                <Text style={styles.statValue}>{userStats.completionRate}/10</Text>
                <Text style={styles.statLabel}>완료</Text>
              </View>
            </View>

            {/* 레벨업 예상일 */}
            <View style={styles.levelEta}>
              <Calendar size={14} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.levelEtaText}>
                Level 8까지 약 2일 남음
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* 나의 대표 뱃지 */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>나의 대표 뱃지</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AllBadges')}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.featuredSub}>
            획득한 뱃지가 {userStats.unlockedBadges}개 있어요.{'\n'}
            '활동뱃지'만 대표 뱃지로 설정할 수 있어요.
          </Text>

          {/* 대표 뱃지 카드 */}
          <TouchableOpacity 
            style={styles.featuredBadgeCard}
            onPress={() => navigation.navigate('AllBadges')}
          >
            <View style={styles.featuredBadgeCircle}>
              <Text style={styles.featuredEmoji}>{featuredBadge.icon}</Text>
            </View>
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredName}>{featuredBadge.name}</Text>
              <Text style={styles.featuredDate}>{featuredBadge.date} 획득</Text>
            </View>
          </TouchableOpacity>

          {/* 뱃지 진행률 */}
          <View style={styles.badgeProgress}>
            <Text style={styles.progressText}>
              전체 {userStats.totalBadges}개 중 {userStats.unlockedBadges}개 획득
            </Text>
            <View style={styles.miniProgressBar}>
              <View 
                style={[
                  styles.miniProgressFill, 
                  {width: `${(userStats.unlockedBadges / userStats.totalBadges) * 100}%`}
                ]} 
              />
            </View>
          </View>

          {/* XP 보너스 알림 */}
          {userStats.averageScore >= 90 && (
            <View style={styles.bonusAlert}>
              <Text style={styles.bonusIcon}>⚡</Text>
              <Text style={styles.bonusText}>
                90점 이상 유지 시 +200 XP 보너스!
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  scrollContent: {
    padding: 20,
  },
  
  // 레벨 카드
  levelCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  
  levelGradient: {
    padding: 24,
  },
  
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  
  levelNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // XP 프로그레스
  xpText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  
  // 통계
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
  },
  
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  
  // 레벨업 예상일
  levelEta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  
  levelEtaText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // 대표 뱃지 섹션
  featuredSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1884FF',
  },
  
  featuredSub: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 24,
  },
  
  // 대표 뱃지 카드
  featuredBadgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  featuredBadgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  featuredEmoji: {
    fontSize: 40,
  },
  
  featuredInfo: {
    flex: 1,
  },
  
  featuredName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
  },
  
  featuredDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 뱃지 진행률
  badgeProgress: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  
  miniProgressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  miniProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  
  // XP 보너스 알림
  bonusAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  
  bonusIcon: {
    fontSize: 20,
  },
  
  bonusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    flex: 1,
  },
});
