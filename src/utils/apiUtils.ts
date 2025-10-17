// API 유틸리티 함수들

/**
 * API 응답에서 배열 데이터를 안전하게 추출
 * @param response API 응답 객체
 * @param dataPath 데이터 경로 (예: 'data.items', 'results')
 * @returns 안전한 배열 또는 빈 배열
 */
export const safeArrayFromResponse = <T>(
  response: any,
  dataPath: string = 'data'
): T[] => {
  try {
    // 경로에 따라 데이터 추출
    const pathParts = dataPath.split('.');
    let data = response;
    
    for (const part of pathParts) {
      if (data && typeof data === 'object' && part in data) {
        data = data[part];
      } else {
        console.warn(`API Response: Path "${dataPath}" not found in response:`, response);
        return [];
      }
    }
    
    // 배열인지 확인
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      // 객체인 경우 배열로 변환 시도
      console.warn(`API Response: Expected array but got object at "${dataPath}":`, data);
      return [];
    } else {
      console.warn(`API Response: Invalid data type at "${dataPath}":`, typeof data, data);
      return [];
    }
  } catch (error) {
    console.error('API Response: Error extracting array data:', error);
    return [];
  }
};

/**
 * API 호출을 안전하게 처리하는 래퍼 함수
 * @param apiCall API 호출 함수
 * @param fallbackData 오류 시 반환할 기본 데이터
 * @returns Promise<배열>
 */
export const safeApiCall = async <T>(
  apiCall: () => Promise<any>,
  fallbackData: T[] = []
): Promise<T[]> => {
  try {
    const response = await apiCall();
    return safeArrayFromResponse<T>(response);
  } catch (error) {
    console.error('API Call failed:', error);
    return fallbackData;
  }
};

/**
 * 배열이 유효한지 확인하는 헬퍼 함수
 * @param data 확인할 데이터
 * @param componentName 컴포넌트 이름 (디버깅용)
 * @returns 유효한 배열 또는 빈 배열
 */
export const ensureArray = <T>(
  data: any,
  componentName: string = 'Unknown'
): T[] => {
  if (Array.isArray(data)) {
    return data;
  }
  
  if (data === null || data === undefined) {
    console.warn(`${componentName}: Received null/undefined data, using empty array`);
    return [];
  }
  
  console.warn(`${componentName}: Expected array but got ${typeof data}:`, data);
  return [];
};

/**
 * API 응답 상태를 확인하는 함수
 * @param response API 응답
 * @returns 응답이 유효한지 여부
 */
export const isValidApiResponse = (response: any): boolean => {
  return (
    response &&
    typeof response === 'object' &&
    response.success !== false &&
    response.data !== undefined
  );
};

/**
 * 서버 오류를 처리하는 함수
 * @param error 오류 객체
 * @param context 오류 발생 컨텍스트
 */
export const handleServerError = (error: any, context: string = 'API'): void => {
  console.error(`${context} Error:`, {
    message: error?.message || 'Unknown error',
    status: error?.status || error?.response?.status,
    data: error?.response?.data,
    stack: error?.stack
  });
  
  // 사용자에게 친화적인 오류 메시지
  const userMessage = getErrorMessage(error);
  console.warn(`${context}: ${userMessage}`);
};

/**
 * 오류 코드에 따른 사용자 친화적 메시지 반환
 * @param error 오류 객체
 * @returns 사용자 친화적 메시지
 */
const getErrorMessage = (error: any): string => {
  const status = error?.status || error?.response?.status;
  
  switch (status) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 데이터를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    case 503:
      return '서버가 일시적으로 사용할 수 없습니다.';
    default:
      return '네트워크 오류가 발생했습니다.';
  }
};
