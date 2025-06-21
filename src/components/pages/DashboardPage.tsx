import React, { useState } from 'react';
import { Calendar, TrendingUp, Target, Zap, Clock, Award, Users, Activity, BarChart3, Play, CheckCircle, ArrowRight, Siren as Fire, Droplets, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const DashboardPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage, workoutSessions, achievements } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data for dashboard
  const todayStats = {
    workoutCompleted: true,
    caloriesBurned: 320,
    waterIntake: 6,
    sleepHours: 7.5,
    steps: 8420,
  };

  const weeklyProgress = {
    workoutsCompleted: 4,
    totalWorkouts: 5,
    averageRating: 4.2,
    totalMinutes: 180,
  };

  const upcomingWorkouts = [
    {
      id: '1',
      name: 'Treino A - Superior',
      time: '18:00',
      duration: '45min',
      exercises: ['Flexão', 'Barra fixa', 'Dips'],
    },
    {
      id: '2',
      name: 'Cardio HIIT',
      time: '07:00',
      duration: '30min',
      exercises: ['Burpees', 'Jump squats', 'Mountain climbers'],
    },
  ];

  const recentAchievements = achievements.filter(a => a.unlockedAt).slice(0, 3);

  const quickActions = [
    {
      title: 'Iniciar Treino',
      description: 'Comece seu treino de hoje',
      icon: Play,
      color: 'bg-[#1DB954]',
      action: () => setCurrentPage('workouts'),
    },
    {
      title: 'Ver Progresso',
      description: 'Acompanhe sua evolução',
      icon: BarChart3,
      color: 'bg-blue-500',
      action: () => setCurrentPage('progress'),
    },
    {
      title: 'Plano Nutricional',
      description: 'Veja suas refeições',
      icon: Target,
      color: 'bg-orange-500',
      action: () => setCurrentPage('nutrition'),
    },
    {
      title: 'Comunidade',
      description: 'Conecte-se com outros',
      icon: Users,
      color: 'bg-purple-500',
      action: () => setCurrentPage('community'),
    },
  ];

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
    <Layout title={`Olá, ${userProfile.nome}! 👋`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite'}, {userProfile.nome}!
                  </h1>
                  <p className="text-green-100 text-lg">
                    {todayStats.workoutCompleted 
                      ? '🎉 Treino de hoje concluído! Parabéns!' 
                      : 'Pronto para arrasar no treino de hoje?'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{weeklyProgress.workoutsCompleted}/{weeklyProgress.totalWorkouts}</div>
                  <div className="text-green-100">treinos esta semana</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Fire className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold">{todayStats.caloriesBurned}</div>
                  <div className="text-xs text-green-100">calorias</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Droplets className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold">{todayStats.waterIntake}/8</div>
                  <div className="text-xs text-green-100">copos água</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Moon className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold">{todayStats.sleepHours}h</div>
                  <div className="text-xs text-green-100">sono</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Activity className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-semibold">{todayStats.steps.toLocaleString()}</div>
                  <div className="text-xs text-green-100">passos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#1B1B1B] mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Workout */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Treino de Hoje</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todayStats.workoutCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {todayStats.workoutCompleted ? 'Concluído' : 'Pendente'}
                </span>
              </div>

              {upcomingWorkouts.length > 0 ? (
                <div className="space-y-4">
                  {upcomingWorkouts.slice(0, 1).map((workout) => (
                    <div key={workout.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-[#1B1B1B]">{workout.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{workout.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workout.exercises.map((exercise, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-sm text-gray-700">
                            {exercise}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage('workouts')}
                        className="w-full bg-[#1DB954] text-white py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors flex items-center justify-center space-x-2"
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

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Progresso Semanal</h2>
                <button
                  onClick={() => setCurrentPage('progress')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium flex items-center space-x-1"
                >
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1DB954] mb-1">
                    {weeklyProgress.workoutsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Treinos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1DB954] mb-1">
                    {weeklyProgress.totalMinutes}
                  </div>
                  <div className="text-sm text-gray-600">Minutos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1DB954] mb-1">
                    {weeklyProgress.averageRating}
                  </div>
                  <div className="text-sm text-gray-600">Avaliação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1DB954] mb-1">
                    {Math.round((weeklyProgress.workoutsCompleted / weeklyProgress.totalWorkouts) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Conclusão</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Meta semanal</span>
                  <span>{weeklyProgress.workoutsCompleted}/{weeklyProgress.totalWorkouts}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(weeklyProgress.workoutsCompleted / weeklyProgress.totalWorkouts) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1B1B1B]">Conquistas</h2>
                <button
                  onClick={() => setCurrentPage('achievements')}
                  className="text-[#1DB954] hover:text-[#1ed760] font-medium"
                >
                  Ver todas
                </button>
              </div>

              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-[#DFF5E1] rounded-xl">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1B1B1B] text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
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

            {/* Upcoming Workouts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1B1B1B]">Próximos Treinos</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                {upcomingWorkouts.slice(1).map((workout) => (
                  <div key={workout.id} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#1B1B1B] text-sm">{workout.name}</h3>
                      <span className="text-xs text-gray-500">{workout.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{workout.duration}</span>
                    </div>
                  </div>
                ))}

                {upcomingWorkouts.length <= 1 && (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Nenhum treino agendado</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pro Upgrade CTA */}
            {!isPro && (
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-2">Upgrade para Pro</h3>
                  <p className="text-yellow-100 text-sm mb-4">
                    Desbloqueie recursos avançados e acelere seus resultados
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-yellow-600 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                  >
                    Ver Planos
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