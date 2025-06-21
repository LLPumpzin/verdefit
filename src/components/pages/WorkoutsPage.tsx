import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Target, Zap, Calendar, Plus, Filter, Search, Star, Timer, Heart, Dumbbell, TrendingUp, Award, BarChart3, Volume2, VolumeX, SkipForward, RefreshCw, MapPin, Users, Flame, Trophy, ChevronRight, ChevronDown, ChevronUp, X, Settings, Camera, Share2 } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const WorkoutsPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage, workoutSessions, setWorkoutSessions } = useApp();
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [timer, setTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRestMode, setIsRestMode] = useState(false);
  const [workoutFilter, setWorkoutFilter] = useState<'all' | 'today' | 'week' | 'completed' | 'favorites'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'strength' | 'cardio' | 'flexibility' | 'hiit'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [showWorkoutDetails, setShowWorkoutDetails] = useState<string | null>(null);

  // Enhanced workout data with more details
  const workoutPlans = [
    {
      id: '1',
      name: 'Treino A - Superior',
      duration: '45min',
      difficulty: 'Intermediário',
      category: 'strength',
      estimatedCalories: 320,
      equipment: ['Nenhum'],
      targetMuscles: ['Peito', 'Ombros', 'Tríceps'],
      exercises: [
        { 
          id: '1', 
          name: 'Flexão de braço', 
          sets: 3, 
          reps: 12, 
          rest: 60, 
          completed: false,
          instructions: 'Mantenha o corpo reto, desça até o peito quase tocar o chão',
          tips: 'Se for difícil, apoie os joelhos no chão',
          muscleGroups: ['Peito', 'Tríceps']
        },
        { 
          id: '2', 
          name: 'Barra fixa assistida', 
          sets: 3, 
          reps: 8, 
          rest: 90, 
          completed: false,
          instructions: 'Use uma banda elástica ou apoio para assistir o movimento',
          tips: 'Foque na descida controlada',
          muscleGroups: ['Costas', 'Bíceps']
        },
        { 
          id: '3', 
          name: 'Dips', 
          sets: 3, 
          reps: 10, 
          rest: 60, 
          completed: false,
          instructions: 'Use duas cadeiras ou paralelas, desça controladamente',
          tips: 'Mantenha os cotovelos próximos ao corpo',
          muscleGroups: ['Tríceps', 'Peito']
        },
        { 
          id: '4', 
          name: 'Prancha', 
          sets: 3, 
          reps: 30, 
          rest: 45, 
          completed: false,
          instructions: 'Mantenha o corpo reto como uma prancha',
          tips: 'Contraia o abdômen e respire normalmente',
          muscleGroups: ['Core']
        },
      ],
      rating: 4.5,
      completed: false,
      isFavorite: true,
      lastCompleted: '2024-02-03',
      totalCompletions: 12,
      averageRating: 4.6,
      description: 'Treino focado no fortalecimento da parte superior do corpo usando apenas o peso corporal.'
    },
    {
      id: '2',
      name: 'HIIT Cardio Intenso',
      duration: '30min',
      difficulty: 'Avançado',
      category: 'hiit',
      estimatedCalories: 450,
      equipment: ['Nenhum'],
      targetMuscles: ['Corpo todo'],
      exercises: [
        { 
          id: '1', 
          name: 'Burpees', 
          sets: 4, 
          reps: 10, 
          rest: 30, 
          completed: false,
          instructions: 'Agachamento, prancha, flexão, salto',
          tips: 'Mantenha o ritmo constante',
          muscleGroups: ['Corpo todo']
        },
        { 
          id: '2', 
          name: 'Jump Squats', 
          sets: 4, 
          reps: 15, 
          rest: 30, 
          completed: false,
          instructions: 'Agachamento explosivo com salto',
          tips: 'Aterrisse suavemente',
          muscleGroups: ['Pernas', 'Glúteos']
        },
        { 
          id: '3', 
          name: 'Mountain Climbers', 
          sets: 4, 
          reps: 20, 
          rest: 30, 
          completed: false,
          instructions: 'Posição de prancha, alterne as pernas rapidamente',
          tips: 'Mantenha o core contraído',
          muscleGroups: ['Core', 'Pernas']
        },
        { 
          id: '4', 
          name: 'High Knees', 
          sets: 4, 
          reps: 30, 
          rest: 60, 
          completed: false,
          instructions: 'Corra no lugar elevando os joelhos',
          tips: 'Mantenha o tronco ereto',
          muscleGroups: ['Pernas', 'Core']
        },
      ],
      rating: 4.8,
      completed: false,
      isFavorite: false,
      lastCompleted: null,
      totalCompletions: 8,
      averageRating: 4.7,
      description: 'Treino de alta intensidade para queimar calorias e melhorar o condicionamento cardiovascular.'
    },
    {
      id: '3',
      name: 'Treino B - Inferior',
      duration: '50min',
      difficulty: 'Intermediário',
      category: 'strength',
      estimatedCalories: 280,
      equipment: ['Nenhum'],
      targetMuscles: ['Pernas', 'Glúteos'],
      exercises: [
        { 
          id: '1', 
          name: 'Agachamento', 
          sets: 4, 
          reps: 15, 
          rest: 90, 
          completed: false,
          instructions: 'Desça como se fosse sentar, mantenha o peso nos calcanhares',
          tips: 'Joelhos alinhados com os pés',
          muscleGroups: ['Quadríceps', 'Glúteos']
        },
        { 
          id: '2', 
          name: 'Afundo', 
          sets: 3, 
          reps: 12, 
          rest: 60, 
          completed: false,
          instructions: 'Passo à frente, desça o joelho traseiro',
          tips: 'Mantenha o tronco ereto',
          muscleGroups: ['Quadríceps', 'Glúteos']
        },
        { 
          id: '3', 
          name: 'Elevação pélvica', 
          sets: 3, 
          reps: 15, 
          rest: 45, 
          completed: false,
          instructions: 'Deitado, eleve o quadril contraindo os glúteos',
          tips: 'Pause no topo do movimento',
          muscleGroups: ['Glúteos', 'Posterior']
        },
        { 
          id: '4', 
          name: 'Panturrilha', 
          sets: 3, 
          reps: 20, 
          rest: 30, 
          completed: false,
          instructions: 'Eleve-se na ponta dos pés',
          tips: 'Controle a descida',
          muscleGroups: ['Panturrilha']
        },
      ],
      rating: 4.3,
      completed: true,
      isFavorite: true,
      lastCompleted: '2024-02-05',
      totalCompletions: 15,
      averageRating: 4.4,
      description: 'Treino completo para fortalecimento das pernas e glúteos.'
    },
    {
      id: '4',
      name: 'Yoga Flow Matinal',
      duration: '25min',
      difficulty: 'Iniciante',
      category: 'flexibility',
      estimatedCalories: 120,
      equipment: ['Tapete'],
      targetMuscles: ['Corpo todo'],
      exercises: [
        { 
          id: '1', 
          name: 'Saudação ao Sol', 
          sets: 3, 
          reps: 5, 
          rest: 30, 
          completed: false,
          instructions: 'Sequência fluida de movimentos',
          tips: 'Respire profundamente',
          muscleGroups: ['Corpo todo']
        },
        { 
          id: '2', 
          name: 'Guerreiro I', 
          sets: 2, 
          reps: 8, 
          rest: 20, 
          completed: false,
          instructions: 'Postura de força e equilíbrio',
          tips: 'Mantenha o quadril alinhado',
          muscleGroups: ['Pernas', 'Core']
        },
        { 
          id: '3', 
          name: 'Cachorro olhando para baixo', 
          sets: 3, 
          reps: 10, 
          rest: 30, 
          completed: false,
          instructions: 'Forma um V invertido com o corpo',
          tips: 'Distribua o peso entre mãos e pés',
          muscleGroups: ['Ombros', 'Posterior']
        },
      ],
      rating: 4.9,
      completed: false,
      isFavorite: true,
      lastCompleted: '2024-02-04',
      totalCompletions: 20,
      averageRating: 4.8,
      description: 'Sequência suave de yoga para começar o dia com energia e flexibilidade.'
    },
  ];

  const recentWorkouts = [
    { date: '2024-02-05', name: 'Treino B - Inferior', duration: 48, rating: 5, calories: 280 },
    { date: '2024-02-04', name: 'Yoga Flow Matinal', duration: 25, rating: 5, calories: 120 },
    { date: '2024-02-03', name: 'Treino A - Superior', duration: 42, rating: 4, calories: 320 },
    { date: '2024-02-01', name: 'HIIT Cardio Intenso', duration: 28, rating: 5, calories: 450 },
  ];

  const workoutStats = {
    totalWorkouts: 45,
    totalMinutes: 1890,
    totalCalories: 12450,
    averageRating: 4.6,
    currentStreak: 15,
    longestStreak: 28,
    favoriteCategory: 'Força',
    weeklyGoal: 5,
    weeklyCompleted: 4
  };

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isRestMode) {
      interval = setInterval(() => setTimer(timer + 1), 1000);
    } else if (isTimerRunning && isRestMode) {
      interval = setInterval(() => {
        if (restTimer > 0) {
          setRestTimer(restTimer - 1);
        } else {
          setIsRestMode(false);
          setIsTimerRunning(false);
          if (soundEnabled) {
            // Play sound notification
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, restTimer, isRestMode, soundEnabled]);

  const startWorkout = (workoutId: string) => {
    setActiveWorkout(workoutId);
    setCurrentExercise(0);
    setCurrentSet(0);
    setTimer(0);
    setRestTimer(0);
    setIsTimerRunning(true);
    setIsRestMode(false);
  };

  const completeSet = () => {
    const workout = workoutPlans.find(w => w.id === activeWorkout);
    const exercise = workout?.exercises[currentExercise];
    
    if (exercise && currentSet < exercise.sets - 1) {
      // Move to next set
      setCurrentSet(currentSet + 1);
      setRestTimer(exercise.rest);
      setIsRestMode(true);
      setIsTimerRunning(true);
    } else if (workout && currentExercise < workout.exercises.length - 1) {
      // Move to next exercise
      setCurrentExercise(currentExercise + 1);
      setCurrentSet(0);
      setTimer(0);
      setIsRestMode(false);
    } else {
      // Workout completed
      completeWorkout();
    }
  };

  const completeWorkout = () => {
    setActiveWorkout(null);
    setCurrentExercise(0);
    setCurrentSet(0);
    setTimer(0);
    setRestTimer(0);
    setIsTimerRunning(false);
    setIsRestMode(false);
    // Show completion modal or redirect
  };

  const skipRest = () => {
    setRestTimer(0);
    setIsRestMode(false);
    setIsTimerRunning(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cardio': return 'bg-red-100 text-red-800 border-red-200';
      case 'hiit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'flexibility': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'strength': return 'Força';
      case 'cardio': return 'Cardio';
      case 'hiit': return 'HIIT';
      case 'flexibility': return 'Flexibilidade';
      default: return 'Geral';
    }
  };

  const filteredWorkouts = workoutPlans.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
    const matchesFilter = workoutFilter === 'all' || 
      (workoutFilter === 'completed' && workout.completed) ||
      (workoutFilter === 'favorites' && workout.isFavorite) ||
      (workoutFilter === 'today') || 
      (workoutFilter === 'week');
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Treinos">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para acessar seus treinos personalizados, precisamos conhecer suas informações.
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

  // Enhanced Active Workout View
  if (activeWorkout) {
    const workout = workoutPlans.find(w => w.id === activeWorkout);
    const exercise = workout?.exercises[currentExercise];
    const totalSets = exercise?.sets || 0;
    const progressPercentage = workout ? ((currentExercise * totalSets + currentSet + 1) / (workout.exercises.reduce((acc, ex) => acc + ex.sets, 0))) * 100 : 0;

    return (
      <Layout title="Treino em Andamento">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-50">
            {/* Enhanced Workout Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    setActiveWorkout(null);
                    setIsTimerRunning(false);
                    setTimer(0);
                    setRestTimer(0);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5 text-gray-600" /> : <VolumeX className="w-5 h-5 text-gray-600" />}
                  </button>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1DB954]">{formatTime(timer)}</div>
                    <div className="text-sm text-gray-600">Tempo total</div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">{workout?.name}</h1>
              <div className="flex items-center justify-center space-x-4 text-gray-600 mb-4">
                <span>Exercício {currentExercise + 1} de {workout?.exercises.length}</span>
                <span>•</span>
                <span>Série {currentSet + 1} de {totalSets}</span>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progresso do treino</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <Flame className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rest Mode Display */}
            {isRestMode ? (
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6">
                  <CircularProgressbar
                    value={((exercise?.rest || 0) - restTimer) / (exercise?.rest || 1) * 100}
                    text={formatTime(restTimer)}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: '#1DB954',
                      textColor: '#1B1B1B',
                      trailColor: '#e5e7eb',
                    })}
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Descanso</h2>
                <p className="text-gray-600 mb-6">Prepare-se para a próxima série</p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={skipRest}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                    <span>Pular Descanso</span>
                  </button>
                  
                  <button
                    onClick={() => setRestTimer(restTimer + 30)}
                    className="flex items-center space-x-2 bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>+30s</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Current Exercise Display */
              exercise && (
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#DFF5E1] to-[#1DB954]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Dumbbell className="w-12 h-12 text-[#1DB954]" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-[#1B1B1B] mb-4">{exercise.name}</h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-[#DFF5E1] to-[#1DB954]/10 rounded-xl p-4">
                      <div className="text-2xl font-bold text-[#1DB954]">{currentSet + 1}/{exercise.sets}</div>
                      <div className="text-sm text-gray-600">Série</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">{exercise.reps}</div>
                      <div className="text-sm text-gray-600">Repetições</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                      <div className="text-2xl font-bold text-orange-600">{exercise.rest}s</div>
                      <div className="text-sm text-gray-600">Descanso</div>
                    </div>
                  </div>

                  {/* Exercise Instructions */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                    <h4 className="font-semibold text-[#1B1B1B] mb-2">📋 Instruções</h4>
                    <p className="text-gray-700 text-sm mb-3">{exercise.instructions}</p>
                    <div className="bg-[#DFF5E1] rounded-lg p-3">
                      <h5 className="font-medium text-[#1DB954] mb-1">💡 Dica</h5>
                      <p className="text-[#1B1B1B] text-sm">{exercise.tips}</p>
                    </div>
                  </div>

                  {/* Muscle Groups */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {exercise.muscleGroups.map((muscle, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#1DB954] text-white rounded-full text-sm font-medium">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Enhanced Timer Controls */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex items-center space-x-2 bg-[#1DB954] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors shadow-lg"
              >
                {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span>{isTimerRunning ? 'Pausar' : 'Continuar'}</span>
              </button>
              
              <button
                onClick={() => setTimer(0)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Complete Set/Exercise Button */}
            {!isRestMode && (
              <button
                onClick={completeSet}
                className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span>
                  {currentSet === totalSets - 1 && currentExercise === (workout?.exercises.length || 1) - 1
                    ? 'Finalizar Treino' 
                    : currentSet === totalSets - 1
                      ? 'Próximo Exercício'
                      : 'Completar Série'
                  }
                </span>
              </button>
            )}

            {/* Workout Notes */}
            <div className="mt-6">
              <textarea
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                placeholder="Adicione suas observações sobre o treino..."
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
                rows={3}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton title="Seus treinos 💪">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1B1B1B] mb-2">Seus Treinos</h1>
              <p className="text-gray-600">Escolha um treino e comece agora mesmo</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1DB954]">{workoutStats.currentStreak}</div>
                <div className="text-xs text-gray-600">dias consecutivos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1DB954]">{workoutStats.weeklyCompleted}/{workoutStats.weeklyGoal}</div>
                <div className="text-xs text-gray-600">meta semanal</div>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#DFF5E1] to-[#1DB954]/10 rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 text-[#1DB954] mx-auto mb-2" />
              <div className="text-xl font-bold text-[#1B1B1B]">{workoutStats.totalWorkouts}</div>
              <div className="text-sm text-gray-600">Treinos</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-[#1B1B1B]">{Math.round(workoutStats.totalMinutes / 60)}h</div>
              <div className="text-sm text-gray-600">Tempo total</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-[#1B1B1B]">{(workoutStats.totalCalories / 1000).toFixed(1)}k</div>
              <div className="text-sm text-gray-600">Calorias</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
              <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-[#1B1B1B]">{workoutStats.averageRating}</div>
              <div className="text-sm text-gray-600">Avaliação</div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar treinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
              >
                <option value="all">Todas categorias</option>
                <option value="strength">Força</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="flexibility">Flexibilidade</option>
              </select>
              
              <select
                value={workoutFilter}
                onChange={(e) => setWorkoutFilter(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
              >
                <option value="all">Todos</option>
                <option value="favorites">Favoritos</option>
                <option value="today">Hoje</option>
                <option value="week">Esta semana</option>
                <option value="completed">Concluídos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Workout Plans */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-[#1B1B1B]">{workout.name}</h3>
                        {workout.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {workout.isFavorite && (
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{workout.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{workout.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Flame className="w-4 h-4" />
                          <span className="text-sm">~{workout.estimatedCalories} cal</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{workout.totalCompletions} vezes</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(workout.category)}`}>
                          {getCategoryName(workout.category)}
                        </span>
                        {workout.equipment.map((eq, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                            {eq}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(workout.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({workout.rating})</span>
                        </div>
                        
                        {workout.lastCompleted && (
                          <span className="text-xs text-gray-500">
                            Último: {new Date(workout.lastCompleted).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>

                      {/* Target Muscles */}
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Músculos trabalhados:</div>
                        <div className="flex flex-wrap gap-1">
                          {workout.targetMuscles.map((muscle, idx) => (
                            <span key={idx} className="px-2 py-1 bg-[#DFF5E1] text-[#1DB954] rounded-lg text-xs font-medium">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Preview */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowWorkoutDetails(showWorkoutDetails === workout.id ? null : workout.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h4 className="font-semibold text-[#1B1B1B] mb-2">
                        Exercícios ({workout.exercises.length})
                      </h4>
                      {showWorkoutDetails === workout.id ? 
                        <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    
                    {showWorkoutDetails === workout.id ? (
                      <div className="space-y-3 mt-3">
                        {workout.exercises.map((exercise, index) => (
                          <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex-1">
                              <div className="font-medium text-[#1B1B1B]">{exercise.name}</div>
                              <div className="text-sm text-gray-600">
                                {exercise.sets} séries × {exercise.reps} reps • {exercise.rest}s descanso
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {exercise.muscleGroups.map((muscle, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white text-gray-600 rounded text-xs">
                                  {muscle}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {workout.exercises.slice(0, 4).map((exercise, index) => (
                          <div key={exercise.id} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-[#1DB954] rounded-full"></div>
                            <span>{exercise.name}</span>
                          </div>
                        ))}
                        {workout.exercises.length > 4 && (
                          <div className="text-sm text-gray-500">+{workout.exercises.length - 4} mais</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => startWorkout(workout.id)}
                      disabled={workout.completed}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all ${
                        workout.completed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white hover:shadow-lg transform hover:-translate-y-0.5'
                      }`}
                    >
                      <Play className="w-5 h-5" />
                      <span>{workout.completed ? 'Concluído' : 'Iniciar Treino'}</span>
                    </button>
                    
                    <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <Heart className={`w-5 h-5 ${workout.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    
                    <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredWorkouts.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum treino encontrado</h3>
                <p className="text-gray-500 mb-6">Tente ajustar os filtros ou criar um novo plano</p>
                <button
                  onClick={() => setCurrentPage('plan')}
                  className="bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
                >
                  Criar Novo Plano
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Progresso de Hoje</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Meta semanal</span>
                  <span className="font-semibold text-[#1DB954]">{workoutStats.weeklyCompleted}/{workoutStats.weeklyGoal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(workoutStats.weeklyCompleted / workoutStats.weeklyGoal) * 100}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-[#DFF5E1] rounded-xl">
                    <div className="text-lg font-bold text-[#1DB954]">{workoutStats.currentStreak}</div>
                    <div className="text-xs text-gray-600">Dias consecutivos</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-600">{workoutStats.longestStreak}</div>
                    <div className="text-xs text-gray-600">Recorde</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1B1B1B]">Treinos Recentes</h3>
                <button
                  onClick={() => setCurrentPage('progress')}
                  className="text-[#1DB954] hover:text-[#1ed760] text-sm font-medium"
                >
                  Ver histórico
                </button>
              </div>
              
              <div className="space-y-3">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-[#1B1B1B] text-sm">{workout.name}</div>
                      <div className="text-xs text-gray-600">{workout.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#1B1B1B]">{workout.duration}min</div>
                      <div className="flex items-center space-x-1">
                        {[...Array(workout.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Ações Rápidas</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage('plan')}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-[#DFF5E1] to-[#1DB954]/10 rounded-xl hover:from-[#1DB954] hover:to-[#1ed760] hover:text-white transition-all group"
                >
                  <Plus className="w-5 h-5 text-[#1DB954] group-hover:text-white" />
                  <span className="font-medium text-[#1B1B1B] group-hover:text-white">Criar Novo Plano</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Agendar Treino</span>
                </button>
                
                <button
                  onClick={() => setCurrentPage('progress')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Ver Progresso</span>
                </button>
                
                <button
                  onClick={() => setCurrentPage('community')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Pro Features */}
            {!isPro && (
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Treinos Personalizados</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    Crie treinos únicos com nossa IA avançada e tenha acesso a exercícios exclusivos
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Upgrade para Pro
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

export default WorkoutsPage;