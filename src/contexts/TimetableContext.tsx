import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeekData, ClassSchedule } from '../types';

// Context State 타입
interface TimetableState {
  weekData: WeekData[];
  currentWeek: number;
  isLoading: boolean;
}

// Context Actions 타입
interface TimetableActions {
  loadWeekData: () => Promise<void>;
  addSchedule: (week: number, schedule: ClassSchedule) => void;
  deleteSchedule: (week: number, scheduleId: string) => void;
  setCurrentWeek: (week: number) => void;
}

// Context 타입
type TimetableContextType = TimetableState & TimetableActions;

// 초기 상태
const initialState: TimetableState = {
  weekData: [],
  currentWeek: 1,
  isLoading: true,
};

// Action 타입
type TimetableAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_WEEK_DATA'; payload: WeekData[] }
  | { type: 'SET_CURRENT_WEEK'; payload: number }
  | { type: 'ADD_SCHEDULE'; payload: { week: number; schedule: ClassSchedule } }
  | { type: 'DELETE_SCHEDULE'; payload: { week: number; scheduleId: string } };

// Reducer
const timetableReducer = (state: TimetableState, action: TimetableAction): TimetableState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_WEEK_DATA':
      return { ...state, weekData: action.payload, isLoading: false };
    
    case 'SET_CURRENT_WEEK':
      return { ...state, currentWeek: action.payload };
    
    case 'ADD_SCHEDULE':
      const { week, schedule } = action.payload;
      return {
        ...state,
        weekData: state.weekData.map(w => 
          w.week === week 
            ? { ...w, schedules: [...w.schedules, schedule] }
            : w
        ),
      };
    
    case 'DELETE_SCHEDULE':
      const { week: deleteWeek, scheduleId } = action.payload;
      console.log('🗑️ Reducer DELETE_SCHEDULE:', { deleteWeek, scheduleId });
      console.log('🗑️ 삭제 전 weekData:', state.weekData);
      
      const updatedWeekData = state.weekData.map(w => {
        if (w.week === deleteWeek) {
          const filteredSchedules = w.schedules.filter(s => s.id !== scheduleId);
          console.log('🗑️ 해당 주차 일정 필터링:', { before: w.schedules, after: filteredSchedules });
          return { ...w, schedules: filteredSchedules };
        }
        return w;
      });
      
      console.log('🗑️ 삭제 후 weekData:', updatedWeekData);
      return {
        ...state,
        weekData: updatedWeekData,
      };
    
    default:
      return state;
  }
};

// Context 생성
const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

// Provider 컴포넌트
export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timetableReducer, initialState);

  // 데이터 로드
  const loadWeekData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const savedData = await AsyncStorage.getItem('timetable_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'SET_WEEK_DATA', payload: parsedData });
      } else {
        // 기본 데이터 설정
        const mockWeekData = [
          {
            week: 1,
            startDate: '2024-03-04',
            endDate: '2024-03-10',
            schedules: [
              {
                id: '1',
                day: 0,
                startTime: '09:00',
                endTime: '11:00',
                name: '기초간호학',
                professor: '김교수',
                location: 'A동 302호',
                colorIndex: 0,
              },
              {
                id: '2',
                day: 1,
                startTime: '13:00',
                endTime: '14:30',
                name: '성인간호학',
                professor: '박교수',
                location: 'B동 201호',
                colorIndex: 1,
              },
            ],
          },
        ];
        dispatch({ type: 'SET_WEEK_DATA', payload: mockWeekData });
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      dispatch({ type: 'SET_WEEK_DATA', payload: [] });
    }
  }, []);

  // 일정 추가
  const addSchedule = useCallback((week: number, schedule: ClassSchedule) => {
    dispatch({ type: 'ADD_SCHEDULE', payload: { week, schedule } });
  }, []);

  // 일정 삭제
  const deleteSchedule = useCallback((week: number, scheduleId: string) => {
    console.log('🗑️ Context deleteSchedule 호출됨:', { week, scheduleId });
    dispatch({ type: 'DELETE_SCHEDULE', payload: { week, scheduleId } });
    console.log('🗑️ Context deleteSchedule dispatch 완료');
  }, []);

  // 현재 주차 설정
  const setCurrentWeek = useCallback((week: number) => {
    dispatch({ type: 'SET_CURRENT_WEEK', payload: week });
  }, []);

  // weekData 변경 시 AsyncStorage에 저장
  useEffect(() => {
    if (!state.isLoading && state.weekData.length > 0) {
      AsyncStorage.setItem('timetable_data', JSON.stringify(state.weekData))
        .catch(error => console.error('데이터 저장 실패:', error));
    }
  }, [state.weekData, state.isLoading]);

  const contextValue: TimetableContextType = {
    ...state,
    loadWeekData,
    addSchedule,
    deleteSchedule,
    setCurrentWeek,
  };

  return (
    <TimetableContext.Provider value={contextValue}>
      {children}
    </TimetableContext.Provider>
  );
};

// Hook
export const useTimetable = (): TimetableContextType => {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};