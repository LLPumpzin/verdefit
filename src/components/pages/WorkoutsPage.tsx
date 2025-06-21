import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Target, Zap, Calendar, Plus, Filter, Search, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const WorkoutsPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage, workoutSessions, setWorkoutSessions } = useApp();
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutFilter, setWorkoutFilter] = useState<'all' | 'today' | 'week' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock workout data
  const workoutPlans = [
    {
      id: '1',
      name: 'Treino A - Superior',
      duration: '45min',
      difficulty: 'Intermediário',
      exercises: [
        { id: '1', name: 'Flexão de braço', sets: 3, reps: 12, rest: 60, completed: false },
        { id: '2', name: 'Barra fixa assistida', sets: 3, reps: 8, rest: 90, completed: false },
        { id: '3', name: 'Dips', sets: 3, reps: 10, rest: 60, completed: false },
        { id: '4', name: 'Prancha', sets: 3, reps: 30, rest: 45, completed: false },
      ],
      category: 'Força',
      rating: 4.5,
      completed: false,
    },
    {
      id: '2',
      name: 'HIIT Cardio',
      duration: '30min',
      difficulty: 'Avançado',
      exercises: [
        { id: '1', name: 'Burpees', sets: 4, reps: 10, rest: 30, completed: false },
        { id: '2', name: 'Jump Squats', sets: 4, reps: 15, rest: 30, completed: false },
        { id: '3', name: 'Mountain Climbers', sets: 4, reps: 20, rest: 30, completed: false },
        { id: '4', name: 'High Knees', sets: 4, reps: 30, rest: 60, completed: false },
      ],
      category: 'Cardio',
      rating: 4.8,
      completed: false,
    },
    {
      id: '3',
      name: 'Treino B - Inferior',
      duration: '50min',
      difficulty: 'Intermediário',
      exercises: [
        { id: '1', name: 'Agachamento', sets: 4, reps: 15, rest: 90, completed: false },
        { id: '2', name: 'Afundo', sets: 3, reps: 12, rest: 60, completed: false },
        { id: '3', name: 'Elevação pélvica', sets: 3, reps: 15, rest: 45, completed: false },
        { id: '4', name: 'Panturrilha', sets: 3, reps: 20, rest: 30, completed: false },
      ],
      category: 'Força',
      rating: 4.3,
      completed: true,
    },
  ];

  const recentWorkouts = [
    { date: '2024-02-05', name: 'Treino A - Superior', duration: 42, rating: 5 },
    { date: '2024-02-03', name: 'HIIT Cardio', duration: 28, rating: 4 },
    { date: '2024-02-01', name: 'Treino B - Inferior', duration: 48, rating: 5 },
  ];

  const startWorkout = (workoutId: string) => {
    setActiveWorkout(workoutId);
    setCurrentExercise(0);
    setTimer(0);
    setIsTimerRunning(true);
  };

  const completeExercise = () => {
    const workout = workoutPlans.find(w => w.id === activeWorkout);
    if (workout && currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimer(0);
    } else {
      // Workout completed
      setActiveWorkout(null);
      setCurrentExercise(0);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Força': return 'bg-blue-100 text-blue-800';
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Flexibilidade': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredWorkouts = workoutPlans.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = workoutFilter === 'all' || 
      (workoutFilter === 'completed' && workout.completed) ||
      (workoutFilter === 'today') || // Add logic for today's workouts
      (workoutFilter === 'week'); // Add logic for this week's workouts
    
    return matchesSearch && matchesFilter;
  });

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

  // Active Workout View
  if (activeWorkout) {
    const workout = workoutPlans.find(w => w.id === activeWorkout);
    const exercise = workout?.exercises[currentExercise];

    return (
      <Layout title="Treino em Andamento">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
            {/* Workout Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">{workout?.name}</h1>
              <div className="flex items-center justify-center space-x-4 text-gray-600">
                <span>Exercício {currentExercise + 1} de {workout?.exercises.length}</span>
                <span>•</span>
                <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentExercise + 1) / (workout?.exercises.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Exercise */}
            {exercise && (
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-[#DFF5E1] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-12 h-12 text-[#1DB954]" />
                </div>
                
                <h2 className="text-3xl font-bold text-[#1B1B1B] mb-4">{exercise.name}</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#1DB954]">{exercise.sets}</div>
                    <div className="text-sm text-gray-600">Séries</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#1DB954]">{exercise.reps}</div>
                    <div className="text-sm text-gray-600">Repetições</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#1DB954]">{exercise.rest}s</div>
                    <div className="text-sm text-gray-600">Descanso</div>
                  </div>
                </div>
              </div>
            )}

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex items-center space-x-2 bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isTimerRunning ? 'Pausar' : 'Continuar'}</span>
              </button>
              
              <button
                onClick={() => setTimer(0)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Complete Exercise Button */}
            <button
              onClick={completeExercise}
              className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-6 h-6" />
              <span>
                {currentExercise === (workout?.exercises.length || 1) - 1 
                  ? 'Finalizar Treino' 
                  : 'Próximo Exercício'
                }
              </span>
            </button>

            {/* Exit Workout */}
            <button
              onClick={() => {
                setActiveWorkout(null);
                setIsTimerRunning(false);
                setTimer(0);
              }}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Sair do treino
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton title="Seus treinos 💪">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">Seus Treinos</h1>
            <p className="text-gray-600">Escolha um treino e comece agora mesmo</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar treinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
              />
            </div>
            
            <select
              value={workoutFilter}
              onChange={(e) => setWorkoutFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
            >
              <option value="all">Todos</option>
              <option value="today">Hoje</option>
              <option value="week">Esta semana</option>
              <option value="completed">Concluídos</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workout Plans */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1B1B1B]">{workout.name}</h3>
                        {workout.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{workout.duration}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(workout.category)}`}>
                          {workout.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 mb-4">
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
                    </div>
                  </div>

                  {/* Exercise List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1B1B1B] mb-3">Exercícios:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#1DB954] rounded-full"></div>
                          <span>{exercise.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => startWorkout(workout.id)}
                      disabled={workout.completed}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-colors ${
                        workout.completed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#1DB954] text-white hover:bg-[#1ed760]'
                      }`}
                    >
                      <Play className="w-5 h-5" />
                      <span>{workout.completed ? 'Concluído' : 'Iniciar Treino'}</span>
                    </button>
                    
                    <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <Target className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredWorkouts.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum treino encontrado</h3>
                <p className="text-gray-500">Tente ajustar os filtros ou criar um novo plano</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Estatísticas de Hoje</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Treinos concluídos</span>
                  <span className="font-semibold text-[#1DB954]">1/1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tempo total</span>
                  <span className="font-semibold text-[#1B1B1B]">42min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Calorias queimadas</span>
                  <span className="font-semibold text-[#1B1B1B]">320 kcal</span>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Treinos Recentes</h3>
              
              <div className="space-y-3">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
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
                  className="w-full flex items-center space-x-3 p-3 bg-[#DFF5E1] rounded-xl hover:bg-[#1DB954] hover:text-white transition-colors group"
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
                  <Target className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Ver Progresso</span>
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
                    Crie treinos únicos com nossa IA avançada
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
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