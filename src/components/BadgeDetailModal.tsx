import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Share,
} from 'react-native';
import { NursingBadge } from '../data/nursingBadges';
import { CircularProgress } from './CircularProgress';
import { ProgressBar } from './ProgressBar';
import { ScoreChart } from './ScoreChart';

interface BadgeDetailModalProps {
  visible: boolean;
  badge: NursingBadge | null;
  onClose: () => void;
  onStartPractice: (badge: NursingBadge) => void;
  onRetryPractice: (badge: NursingBadge) => void;
}

const { height } = Dimensions.get('window');

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  visible,
  badge,
  onClose,
  onStartPractice,
  onRetryPractice,
}) => {
  if (!badge) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎉 ${badge.name} 뱃지를 획득했어요! ${badge.currentScore}점`,
        url: `myapp://badge/${badge.id}`,
      });
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  const renderLockedContent = () => (
    <View style={styles.modalContent}>
      {/* 뱃지 */}
      <View style={styles.lockedBadge}>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>
      
      {/* 정보 */}
      <Text style={styles.modalTitle}>{badge.name}</Text>
      <Text style={styles.modalSub}>{badge.description}</Text>
      
      {/* 점수 */}
      <View style={styles.scoreSection}>
        <Text style={styles.currentScore}>{badge.currentScore}점</Text>
        <Text style={styles.requiredScore}>/ {badge.requiredScore}점 필요</Text>
      </View>
      
      {/* 프로그레스 */}
      <CircularProgress
        value={badge.currentScore}
        max={badge.requiredScore}
        size={100}
        color="#FF9800"
        backgroundColor="#F3F4F6"
      >
        <Text style={styles.progressText}>
          {Math.round((badge.currentScore / badge.requiredScore) * 100)}%
        </Text>
      </CircularProgress>
      
      <Text style={styles.motivate}>
        {badge.requiredScore - badge.currentScore}점만 더 있으면 도전할 수 있어요!
      </Text>
      
      {/* 버튼 */}
      <TouchableOpacity style={styles.practiceBtn}>
        <Text style={styles.practiceBtnText}>📚 연습 모드로 가기</Text>
      </TouchableOpacity>
    </View>
  );

  const renderActiveContent = () => (
    <View style={styles.modalContent}>
      {/* 뱃지 */}
      <View style={[styles.activeBadge, { backgroundColor: badge.color }]}>
        <Text style={styles.badgeIcon}>{badge.icon}</Text>
      </View>
      
      {/* 정보 */}
      <Text style={styles.modalTitle}>{badge.name}</Text>
      <Text style={styles.modalSub}>{badge.description}</Text>
      
      {/* 점수 */}
      <View style={styles.scoreSection}>
        <Text style={styles.currentScore}>{badge.currentScore}점</Text>
        <Text style={styles.goalScore}>→ {badge.passingScore}점 통과</Text>
      </View>
      
      {/* 진행률 */}
      <ProgressBar
        value={badge.currentScore}
        max={badge.passingScore}
        height={12}
        color="#1884FF"
        backgroundColor="#E5E7EB"
        style={styles.progressBar}
      />
      
      <Text style={styles.motivate}>
        🔥 {badge.passingScore - badge.currentScore}점만 더! 거의 다 왔어요!
      </Text>
      
      {/* 최근 기록 */}
      <View style={styles.recentScores}>
        <Text style={styles.sectionTitle}>최근 기록</Text>
        <View style={styles.scoreHistory}>
          {badge.scoreHistory.slice(-3).map((score, index) => (
            <Text 
              key={index}
              style={[
                styles.scoreItem,
                index === badge.scoreHistory.length - 1 && styles.latestScore
              ]}
            >
              {score}점{index === badge.scoreHistory.length - 1 ? ' ⬆️' : ''}
            </Text>
          ))}
        </View>
      </View>
      
      {/* 버튼 */}
      <TouchableOpacity 
        style={styles.startBtn}
        onPress={() => onStartPractice(badge)}
      >
        <Text style={styles.startBtnText}>VR 실습 시작하기</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCompletedContent = () => (
    <View style={styles.modalContent}>
      {/* 뱃지 */}
      <View style={styles.completedBadge}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>
      
      {/* 정보 */}
      <Text style={styles.modalTitle}>{badge.name}</Text>
      <Text style={styles.modalSub}>{badge.description}</Text>
      
      {/* 완료 정보 */}
      <View style={styles.completedInfo}>
        <Text style={styles.completedIcon}>🎉</Text>
        <Text style={styles.completedText}>통과 완료!</Text>
        <Text style={styles.completedDate}>{badge.completedDate}</Text>
      </View>
      
      {/* 최종 점수 */}
      <View style={styles.finalScore}>
        <Text style={styles.score}>{badge.currentScore}점</Text>
        <Text style={styles.attempts}>{badge.attempts}회 시도</Text>
      </View>
      
      {/* 성장 그래프 */}
      <View style={styles.growthChart}>
        <Text style={styles.sectionTitle}>성장 과정</Text>
        <ScoreChart
          scores={badge.scoreHistory}
          maxScore={100}
          color="#1884FF"
        />
      </View>
      
      {/* 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>🔗 공유하기</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.retryBtn}
          onPress={() => onRetryPractice(badge)}
        >
          <Text style={styles.retryBtnText}>🔄 다시 도전</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (badge.status) {
      case 'pending':
        return renderLockedContent();
      case 'active':
        return renderActiveContent();
      case 'completed':
        return renderCompletedContent();
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 콘텐츠 */}
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 10,
  },
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  closeIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  // 스크롤
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 40,
  },
  
  // 모달 콘텐츠
  modalContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  
  // 뱃지
  lockedBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    opacity: 0.6,
  },
  
  activeBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  completedBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  lockIcon: {
    fontSize: 32,
  },
  
  badgeIcon: {
    fontSize: 32,
  },
  
  checkIcon: {
    fontSize: 32,
    color: '#10B981',
  },
  
  // 텍스트
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#191F28',
    textAlign: 'center',
    marginBottom: 6,
  },
  
  modalSub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // 점수 섹션
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  
  currentScore: {
    fontSize: 36,
    fontWeight: '800',
    color: '#191F28',
  },
  
  requiredScore: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 8,
  },
  
  goalScore: {
    fontSize: 18,
    color: '#1884FF',
    marginLeft: 8,
  },
  
  // 프로그레스
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
  },
  
  progressBar: {
    width: '100%',
    marginBottom: 16,
  },
  
  // 동기부여 텍스트
  motivate: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
  },
  
  // 최근 기록
  recentScores: {
    width: '100%',
    marginBottom: 32,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  scoreHistory: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  scoreItem: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  
  latestScore: {
    color: '#1884FF',
    fontWeight: '700',
  },
  
  // 완료 정보
  completedInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  completedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  
  completedText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  
  completedDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 최종 점수
  finalScore: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  score: {
    fontSize: 48,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 4,
  },
  
  attempts: {
    fontSize: 16,
    color: '#6B7280',
  },
  
  // 성장 그래프
  growthChart: {
    width: '100%',
    marginBottom: 32,
  },
  
  // 버튼
  practiceBtn: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  practiceBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  startBtn: {
    width: '100%',
    backgroundColor: '#1884FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  startBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  
  shareBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  shareBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  retryBtn: {
    flex: 1,
    backgroundColor: '#1884FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  retryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
