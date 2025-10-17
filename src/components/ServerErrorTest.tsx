import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SmartQuickGrid } from './SmartQuickGrid';
import { AppointmentCard } from './AppointmentCard';
import { ensureArray, handleServerError } from '../utils/apiUtils';

// 서버 오류 시뮬레이션을 위한 테스트 컴포넌트
export const ServerErrorTest: React.FC = () => {
  const [testData, setTestData] = useState<any>(null);
  const [errorType, setErrorType] = useState<string>('');

  // 다양한 서버 오류 상황 시뮬레이션
  const simulateServerErrors = () => {
    const errorTypes = [
      { name: '정상 데이터', data: [{ id: '1', title: '정상', count: '1' }] },
      { name: 'null 응답', data: null },
      { name: 'undefined 응답', data: undefined },
      { name: '빈 객체', data: {} },
      { name: '문자열', data: 'invalid data' },
      { name: '숫자', data: 123 },
      { name: '잘못된 배열 구조', data: [{ invalid: 'structure' }] },
    ];

    const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    setTestData(randomError.data);
    setErrorType(randomError.name);
    
    console.log(`🧪 서버 오류 시뮬레이션: ${randomError.name}`, randomError.data);
  };

  // API 호출 시뮬레이션
  const simulateApiCall = async () => {
    try {
      // 랜덤하게 오류 발생
      if (Math.random() < 0.3) {
        throw new Error('Network Error: 서버 연결 실패');
      }
      
      // 랜덤하게 잘못된 데이터 반환
      if (Math.random() < 0.4) {
        return { data: null }; // 서버에서 null 반환
      }
      
      return { data: [{ id: '1', title: 'API 데이터', count: '1' }] };
    } catch (error) {
      handleServerError(error, 'Test API');
      throw error;
    }
  };

  const testApiCall = async () => {
    try {
      const response = await simulateApiCall();
      const safeData = ensureArray(response.data, 'API Test');
      setTestData(safeData);
      setErrorType('API 호출 성공');
    } catch (error) {
      setTestData([]);
      setErrorType('API 호출 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 서버 오류 테스트</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={simulateServerErrors}>
          <Text style={styles.buttonText}>서버 오류 시뮬레이션</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={testApiCall}>
          <Text style={styles.buttonText}>API 호출 테스트</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusText}>
        현재 상태: {errorType}
      </Text>

      <View style={styles.testContainer}>
        <Text style={styles.testTitle}>SmartQuickGrid 테스트:</Text>
        <SmartQuickGrid actions={testData} />
      </View>

      <View style={styles.testContainer}>
        <Text style={styles.testTitle}>AppointmentCard 테스트:</Text>
        <AppointmentCard appointments={testData} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>💡 테스트 설명:</Text>
        <Text style={styles.infoText}>
          • 서버에서 null, undefined, 잘못된 데이터가 올 때 앱이 크래시되지 않는지 확인
        </Text>
        <Text style={styles.infoText}>
          • 콘솔에서 경고 메시지 확인
        </Text>
        <Text style={styles.infoText}>
          • 모든 경우에 빈 배열로 안전하게 처리되는지 확인
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  testContainer: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976D2',
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4,
    lineHeight: 20,
  },
});
