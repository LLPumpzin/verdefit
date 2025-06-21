import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, PageType, UserSettings, WorkoutSession, ProgressData, Notification, Achievement } from '../types';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  isPro: boolean;
  setIsPro: (isPro: boolean) => void;
  userSettings: UserSettings;
  setUserSettings: (settings: UserSettings) => void;
  workoutSessions: WorkoutSession[];
  setWorkoutSessions: (sessions: WorkoutSession[]) => void;
  progressData: ProgressData[];
  setProgressData: (data: ProgressData[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isPro, setIsPro] = useState(false);
  
  const [userSettings, setUserSettings] = useState<UserSettings>({
    notifications: {
      workoutReminders: true,
      progressUpdates: true,
      motivationalTips: true,
      communityUpdates: false,
      emailNotifications: true,
      pushNotifications: true,
    },
    privacy: {
      profileVisibility: 'friends',
      shareProgress: true,
      shareWorkouts: false,
    },
    preferences: {
      units: 'metric',
      language: 'pt-BR',
      theme: 'light',
      startOfWeek: 'monday',
    },
  });

  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Hora do treino!',
      message: 'Seu treino de hoje está esperando por você.',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Parabéns! 🎉',
      message: 'Você completou 7 dias consecutivos de treino!',
      type: 'success',
      read: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primeiro Treino',
      description: 'Complete seu primeiro treino',
      icon: '🏃‍♂️',
      unlockedAt: new Date().toISOString(),
      progress: 1,
      target: 1,
    },
    {
      id: '2',
      title: 'Semana Completa',
      description: 'Complete 7 dias consecutivos',
      icon: '🔥',
      progress: 5,
      target: 7,
    },
    {
      id: '3',
      title: 'Mestre da Consistência',
      description: 'Complete 30 treinos',
      icon: '👑',
      progress: 12,
      target: 30,
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        userProfile,
        setUserProfile,
        isPro,
        setIsPro,
        userSettings,
        setUserSettings,
        workoutSessions,
        setWorkoutSessions,
        progressData,
        setProgressData,
        notifications,
        setNotifications,
        achievements,
        setAchievements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};