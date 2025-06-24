import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, Zap, Clock, Award, Users, Activity, BarChart3, Play, CheckCircle, ArrowRight, Fire, Droplets, Moon, Sun, Wind, Heart, Timer, MapPin, Star, ChevronRight, Plus, Bell, Settings, Dumbbell, Apple, Coffee, Brain, Shield, Smartphone, Camera, Share2, Trophy, Medal, Crown, Gift, Flame, ThumbsUp, MessageCircle, Eye, TrendingDown, AlertCircle, RefreshCw, Download, Edit, MoreHorizontal, ChevronDown, ChevronUp, X, Volume2, Headphones, Wifi, Battery, Signal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const DashboardPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage, workoutSessions, achievements } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('week');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    airQuality: 'Good'
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced mock data
  const todayStats = {
    workoutCompleted: true,
    caloriesBurned: 420,
    caloriesGoal: 500,
    waterIntake: 7,
    waterGoal: 8,
    sleepHours: 7.8,
    sleepGoal: 8,
    steps: 12420,
    stepsGoal: 10000,
    heartRate: 72,
    heartRateZone: 'Resting',
    activeMinutes: 45,
    activeGoal: 60,
    workoutStreak: 15,
    mood: 'Great',
    energy: 85,
    stress: 25,
    recovery: 92
  };

  const weeklyProgress = {
    workoutsCompleted: 5,
    totalWorkouts: 6,
    averageRating: 4.6,
    totalMinutes: 285,
    caloriesBurned: 1850,
    consistency: 83,
    improvement: 12,
    personalRecords: 3
  };

  const weeklyData = [
    { day: 'Seg', calories: 380, duration: 45, completed: true, mood: 4, energy: 80, steps: 8500 },
    { day: 'Ter', calories: 420, duration: 50, completed: true, mood: 5, energy: 90, steps: 12000 },
    { day: 'Qua', calories: 0, duration: 0, completed: false, mood: 3, energy: 60, steps: 5000 },
    { day: 'Qui', calories: 390, duration: 42, completed: true, mood: 4, energy: 85, steps: 9500 },
    { day: 'Sex', calories: 450, duration: 55, completed: true, mood: 5, energy: 95, steps: 15000 },
    { day: 'Sáb', calories: 210, duration: 25, completed: true, mood: 4, energy: 75, steps: 7000 },
    { day: 'Dom', calories: 0, duration: 0, completed: false, mood: 3, energy: 70, steps: 4500 },
  ];

  const nutritionData = [
    { name: 'Proteína', value: 85, target: 120, color: '#1DB954', percentage: 71 },
    { name: 'Carboidratos', value: 180, target: 275, color: '#3b82f6', percentage: 65 },
    { name: 'Gorduras', value: 55, target: 73, color: '#f59e0b', percentage: 75 },
    { name: 'Fibras', value: 18, target: 25, color: '#8b5cf6', percentage: 72 },
  ];

  const bodyMetrics = [
    { name: 'Peso', value: 76.9, change: -1.6, unit: 'kg', trend: 'down', target: 75 },
    { name: 'Gordura', value: 17.0, change: -1.2, unit: '%', trend: 'down', target: 15 },
    { name: 'Músculo', value: 65.2, change: +0.8, unit: 'kg', trend: 'up', target: 67 },
    { name: 'Água', value: 58.5, change: +0.3, unit: '%', trend: 'up', target: 60 },
  ];

  const upcomingWorkouts = [
    {
      id: '1',
      name: 'HIIT Cardio',
      time: '18:30',
      duration: '30min',
      type: 'Cardio',
      difficulty: 'Alto',
      exercises: ['Burpees', 'Jump squats', 'Mountain climbers'],
      estimatedCalories: 350,
      equipment: 'Nenhum',
      focus: 'Queima de gordura'
    },
    {
      id: '2',
      name: 'Treino Superior',
      time: '07:00',
      duration: '45min',
      type: 'Força',
      difficulty: 'Médio',
      exercises: ['Flexão', 'Barra fixa', 'Dips'],
      estimatedCalories: 280,
      equipment: 'Peso corporal',
      focus: 'Força e resistência'
    },
  ];

  const recentAchievements = achievements.filter(a => a.unlockedAt).slice(0, 3);

  const socialFeed = [
    {
      id: '1',
      user: 'Maria Silva',
      action: 'completou',
      target: 'Treino HIIT Intenso',
      time: '2h',
      likes: 12,
      comments: 3,
      avatar: '👩‍💼'
    },
    {
      id: '2',
      user: 'João Santos',
      action: 'atingiu',
      target: '30 dias consecutivos',
      time: '4h',
      likes: 25,
      comments: 8,
      avatar: '👨‍💻'
    },
    {
      id: '3',
      user: 'Ana Costa',
      action: 'perdeu',
      target: '2kg este mês',
      time: '6h',
      likes: 18,
      comments: 5,
      avatar: '👩‍🎓'
    }
  ];

  const quickActions = [
    {
      title: 'Iniciar Treino',
      description: 'Comece agora',
      icon: Play,
      color: 'bg-gradient-to-r from-[#1DB954] to-[#1ed760]',
      action: () => setCurrentPage('workouts'),
    },
    {
      title: 'Registrar Refeição',
      description: 'Adicionar alimento',
      icon: Apple,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      action: () => setCurrentPage('nutrition'),
    },
    {
      title: 'Medir Progresso',
      description: 'Peso e medidas',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => setCurrentPage('progress'),
    },
    {
      title: 'Tirar Foto',
      description: 'Progresso visual',
      icon: Camera,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => setCurrentPage('progress'),
    },
    {
      title: 'Compartilhar',
      description: 'Na comunidade',
      icon: Share2,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      action: () => setCurrentPage('community'),
    },
    {
      title: 'Baixar PDF',
      description: 'Plano completo',
      icon: Download,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      action: () => setCurrentPage('pdf'),
    },
  ];

  const healthMetrics = [
    { name: 'Frequência Cardíaca', value: 72, unit: 'bpm', status: 'normal', icon: Heart, color: 'text-red-500' },
    { name: 'Pressão Arterial', value: '120/80', unit: 'mmHg', status: 'normal', icon: Activity, color: 'text-blue-500' },
    { name: 'Saturação O2', value: 98, unit: '%', status: 'excelente', icon: Wind, color: 'text-green-500' },
    { name: 'Temperatura', value: 36.5, unit: '°C', status: 'normal', icon: Sun, color: 'text-yellow-500' },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Wind className="w-6 h-6 text-gray-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'Great': return '😄';
      case 'Good': return '😊';
      case 'Okay': return '😐';
      case 'Bad': return '😔';
      default: return '😊';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelente': return 'text-green-500';
      case 'normal': return 'text-blue-500';
      case 'atenção': return 'text-yellow-500';
      case 'crítico': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (!userProfile) {
    return (
      <Layout title="Dashboard">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para acessar seu dashboard personalizado, precisamos conhecer suas informações.
            </p>
            <button
              onClick={() => setCurrentPage('profile')}
              className="bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
            >
              Criar Perfil
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${getGreeting()}, ${userProfile.nome}! 👋`}>
      <div className="max-w-8xl mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <div className="flex items-center space-x-2 text-sm">
                {getWeatherIcon()}
                <div>
                  <div className="font-semibold">{weatherData.temperature}°C</div>
                  <div className="text-xs text-green-100">{weatherData.condition}</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="mb-6 lg:mb-0">
                  <h1 className="text-4xl font-bold mb-3">
                    {getGreeting()}, {userProfile.nome}!
                  </h1>
                  <p className="text-green-100 text-xl mb-4">
                    {todayStats.workoutCompleted 
                      ? '🎉 Treino de hoje concluído! Continue assim!' 
                      : 'Pronto para arrasar no treino de hoje?'
                    }
                  </p>
                  <div className="flex items-center space-x-6 text-green-100">
                    <div className="flex items-center space-x-2">
                      <Fire className="w-5 h-5" />
                      <span className="font-medium">{todayStats.workoutStreak} dias consecutivos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getMoodEmoji(todayStats.mood)}</span>
                      <span className="font-medium">Humor: {todayStats.mood}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="text-3xl font-bold mb-1">{weeklyProgress.workoutsCompleted}/{weeklyProgress.totalWorkouts}</div>
                  <div className="text-green-100 mb-2">treinos esta semana</div>
                  <div className="w-full lg:w-32 bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(weeklyProgress.workoutsCompleted / weeklyProgress.totalWorkouts) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-green-100 mt-2">
                    +{weeklyProgress.improvement}% vs semana passada
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Fire className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.caloriesBurned}</div>
                  <div className="text-xs text-green-100">calorias</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${(todayStats.caloriesBurned / todayStats.caloriesGoal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Droplets className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.waterIntake}/{todayStats.waterGoal}</div>
                  <div className="text-xs text-green-100">copos água</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${(todayStats.waterIntake / todayStats.waterGoal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Moon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.sleepHours}h</div>
                  <div className="text-xs text-green-100">sono</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${(todayStats.sleepHours / todayStats.sleepGoal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Activity className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.steps.toLocaleString()}</div>
                  <div className="text-xs text-green-100">passos</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${Math.min((todayStats.steps / todayStats.stepsGoal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Heart className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.heartRate}</div>
                  <div className="text-xs text-green-100">bpm</div>
                  <div className="text-xs text-green-100 mt-1">{todayStats.heartRateZone}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Timer className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.activeMinutes}</div>
                  <div className="text-xs text-green-100">min ativo</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${(todayStats.activeMinutes / todayStats.activeGoal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Brain className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.energy}%</div>
                  <div className="text-xs text-green-100">energia</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${todayStats.energy}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xl font-bold">{todayStats.recovery}%</div>
                  <div className="text-xs text-green-100">recuperação</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${todayStats.recovery}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1B1B1B]">Ações Rápidas</h2>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center space-x-2 text-[#1DB954] hover:text-[#1ed760] font-medium"
            >
              <span>{showQuickActions ? 'Menos' : 'Mais'} opções</span>
              {showQuickActions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${showQuickActions ? '6' : '4'} gap-4 transition-all duration-300`}>
            {quickActions.slice(0, showQuickActions ? 6 : 4).map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#1B1B1B] mb-1 text-left">{action.title}</h3>
                <p className="text-sm text-gray-600 text-left">{action.description}</p>
                <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:text-[#1DB954] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Enhanced Today's Workout */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Próximos Treinos</h2>
                <button
                  onClick={() => setCurrentPage('workouts')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium flex items-center space-x-1"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {upcomingWorkouts.length > 0 ? (
                <div className="space-y-4">
                  {upcomingWorkouts.map((workout) => (
                    <div key={workout.id} className="border border-gray-200 rounded-xl p-5 hover:border-[#1DB954] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-[#1B1B1B] text-lg">{workout.name}</h3>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              workout.type === 'Cardio' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {workout.type}
                            </span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              workout.difficulty === 'Alto' ? 'bg-red-100 text-red-800' : 
                              workout.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {workout.difficulty}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{workout.time} • {workout.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Fire className="w-4 h-4" />
                              <span className="text-sm">~{workout.estimatedCalories} cal</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Dumbbell className="w-4 h-4" />
                              <span className="text-sm">{workout.equipment}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Target className="w-4 h-4" />
                              <span className="text-sm">{workout.focus}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {workout.exercises.map((exercise, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                                {exercise}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentPage('workouts')}
                        className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Iniciar Treino</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nenhum treino agendado para hoje</p>
                  <button
                    onClick={() => setCurrentPage('plan')}
                    className="px-6 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors"
                  >
                    Ver Plano
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced Weekly Progress Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Progresso Semanal</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
                  >
                    <option value="today">Hoje</option>
                    <option value="week">Esta semana</option>
                    <option value="month">Este mês</option>
                    <option value="year">Este ano</option>
                  </select>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1DB954]">{weeklyProgress.consistency}%</div>
                    <div className="text-sm text-gray-600">Consistência</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#DFF5E1] to-[#1DB954]/10 rounded-xl">
                  <div className="text-2xl font-bold text-[#1DB954] mb-1">
                    {weeklyProgress.workoutsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Treinos</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {weeklyProgress.totalMinutes}
                  </div>
                  <div className="text-sm text-gray-600">Minutos</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {weeklyProgress.caloriesBurned}
                  </div>
                  <div className="text-sm text-gray-600">Calorias</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {weeklyProgress.averageRating}
                  </div>
                  <div className="text-sm text-gray-600">Avaliação</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {weeklyProgress.personalRecords}
                  </div>
                  <div className="text-sm text-gray-600">Recordes</div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#1DB954" 
                      fill="url(#colorGradient)"
                      strokeWidth={3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#3b82f6" 
                      fill="url(#energyGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1DB954" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Enhanced Nutrition Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Nutrição de Hoje</h2>
                <button
                  onClick={() => setCurrentPage('nutrition')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium flex items-center space-x-1"
                >
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {nutritionData.map((nutrient, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <CircularProgressbar
                        value={nutrient.percentage}
                        text={`${nutrient.percentage}%`}
                        styles={buildStyles({
                          textSize: '16px',
                          pathColor: nutrient.color,
                          textColor: '#1B1B1B',
                          trailColor: '#e5e7eb',
                          strokeLinecap: 'round',
                        })}
                      />
                    </div>
                    <div className="font-semibold text-[#1B1B1B]">{nutrient.name}</div>
                    <div className="text-sm text-gray-600">{nutrient.value}g de {nutrient.target}g</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {nutrient.value < nutrient.target ? 
                        `Faltam ${nutrient.target - nutrient.value}g` : 
                        'Meta atingida! 🎉'
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#DFF5E1] to-[#1DB954]/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#1B1B1B] mb-1">Calorias Totais</h4>
                    <p className="text-sm text-gray-600">1,850 de 2,200 kcal consumidas</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1DB954]">84%</div>
                    <div className="text-sm text-gray-600">da meta</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-2 rounded-full"
                    style={{ width: '84%' }}
                  />
                </div>
              </div>
            </div>

            {/* Body Metrics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Métricas Corporais</h2>
                <button
                  onClick={() => setCurrentPage('progress')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium flex items-center space-x-1"
                >
                  <span>Ver histórico</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bodyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="font-bold text-[#1B1B1B] text-lg">{metric.value}</span>
                      <span className="text-gray-600 text-sm ml-1">{metric.unit}</span>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{metric.name}</div>
                    <div className={`text-xs font-medium ${
                      metric.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div 
                        className="bg-[#1DB954] h-1 rounded-full"
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Meta: {metric.target}{metric.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Health Metrics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Saúde em Tempo Real</h3>
              
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <div>
                        <div className="font-medium text-[#1B1B1B] text-sm">{metric.name}</div>
                        <div className={`text-xs ${getStatusColor(metric.status)}`}>{metric.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#1B1B1B]">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.unit}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 text-[#1DB954] border border-[#1DB954] rounded-lg hover:bg-[#DFF5E1] transition-colors text-sm">
                Conectar dispositivos
              </button>
            </div>

            {/* Enhanced Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1B1B1B]">Conquistas Recentes</h2>
                <button
                  onClick={() => setCurrentPage('achievements')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium text-sm"
                >
                  Ver todas
                </button>
              </div>

              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#DFF5E1] to-[#1DB954]/10 rounded-xl hover:from-[#1DB954]/10 hover:to-[#DFF5E1] transition-all">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1B1B1B] text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                ))}

                {recentAchievements.length === 0 && (
                  <div className="text-center py-4">
                    <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Continue treinando para desbloquear conquistas!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Feed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1B1B1B]">Comunidade</h3>
                <button
                  onClick={() => setCurrentPage('community')}
                  className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium"
                >
                  Ver mais
                </button>
              </div>
              
              <div className="space-y-3">
                {socialFeed.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-white text-sm">
                      {item.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1B1B1B]">
                        <span className="font-semibold">{item.user}</span> {item.action} <span className="font-medium">{item.target}</span>
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{item.time}</span>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{item.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Calendar Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#1B1B1B]">Calendário</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#1B1B1B]">
                  {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric' })}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                  <div key={index} className="p-2 font-medium text-gray-500">{day}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - date.getDay() + i - 14);
                  const isToday = date.toDateString() === new Date().toDateString();
                  const hasWorkout = Math.random() > 0.7;
                  
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        isToday 
                          ? 'bg-[#1DB954] text-white font-bold' 
                          : hasWorkout 
                            ? 'bg-[#DFF5E1] text-[#1DB954] font-medium hover:bg-[#1DB954] hover:text-white'
                            : 'hover:bg-gray-100'
                      }`}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weather & Environment */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Condições para Treino</h3>
                {getWeatherIcon()}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Temperatura</span>
                  <span className="font-semibold">{weatherData.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Umidade</span>
                  <span className="font-semibold">{weatherData.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Vento</span>
                  <span className="font-semibold">{weatherData.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Índice UV</span>
                  <span className="font-semibold">{weatherData.uvIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span>Qualidade do Ar</span>
                  <span className="font-semibold">{weatherData.airQuality}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/20 rounded-xl">
                <div className="text-sm font-medium mb-1">💡 Dica do clima</div>
                <div className="text-xs text-blue-100">
                  Condições perfeitas para treinar ao ar livre! Não esqueça do protetor solar.
                </div>
              </div>
            </div>

            {/* Pro Upgrade CTA */}
            {!isPro && (
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-2">Upgrade para Pro</h3>
                  <p className="text-yellow-100 text-sm mb-4">
                    Desbloqueie análises avançadas, planos personalizados e muito mais
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-yellow-600 py-3 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
                  >
                    Ver Planos Pro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;