import React, { useState } from 'react';
import { Award, Trophy, Star, Target, Zap, Calendar, Users, TrendingUp, Lock, CheckCircle, Crown, Medal, Gift } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const AchievementsPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage, achievements } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fitness' | 'nutrition' | 'social' | 'milestones'>('all');

  // Mock achievements data
  const allAchievements = [
    // Fitness Achievements
    {
      id: '1',
      title: 'Primeiro Treino',
      description: 'Complete seu primeiro treino',
      icon: '🏃‍♂️',
      category: 'fitness',
      difficulty: 'bronze',
      points: 50,
      unlockedAt: new Date().toISOString(),
      progress: 1,
      target: 1,
      reward: 'Badge Iniciante',
    },
    {
      id: '2',
      title: 'Semana Completa',
      description: 'Complete 7 dias consecutivos de treino',
      icon: '🔥',
      category: 'fitness',
      difficulty: 'silver',
      points: 150,
      progress: 5,
      target: 7,
      reward: '100 pontos XP',
    },
    {
      id: '3',
      title: 'Mestre da Consistência',
      description: 'Complete 30 treinos',
      icon: '👑',
      category: 'fitness',
      difficulty: 'gold',
      points: 500,
      progress: 12,
      target: 30,
      reward: 'Título Especial',
    },
    {
      id: '4',
      title: 'Força Máxima',
      description: 'Aumente sua força em 50%',
      icon: '💪',
      category: 'fitness',
      difficulty: 'platinum',
      points: 1000,
      progress: 25,
      target: 50,
      reward: 'Avatar Exclusivo',
    },

    // Nutrition Achievements
    {
      id: '5',
      title: 'Hidratação Perfeita',
      description: 'Beba 8 copos de água por 7 dias',
      icon: '💧',
      category: 'nutrition',
      difficulty: 'bronze',
      points: 100,
      unlockedAt: new Date(Date.now() - 86400000).toISOString(),
      progress: 8,
      target: 8,
      reward: 'Badge Hidratação',
    },
    {
      id: '6',
      title: 'Chef Saudável',
      description: 'Registre 50 refeições saudáveis',
      icon: '👨‍🍳',
      category: 'nutrition',
      difficulty: 'silver',
      points: 250,
      progress: 23,
      target: 50,
      reward: 'Receitas Exclusivas',
    },
    {
      id: '7',
      title: 'Nutricionista Expert',
      description: 'Atinja suas metas nutricionais por 30 dias',
      icon: '🥗',
      category: 'nutrition',
      difficulty: 'gold',
      points: 750,
      progress: 8,
      target: 30,
      reward: 'Plano Nutricional Pro',
    },

    // Social Achievements
    {
      id: '8',
      title: 'Primeiro Post',
      description: 'Compartilhe seu primeiro post na comunidade',
      icon: '📝',
      category: 'social',
      difficulty: 'bronze',
      points: 25,
      progress: 0,
      target: 1,
      reward: 'Badge Comunicador',
    },
    {
      id: '9',
      title: 'Influenciador',
      description: 'Receba 100 curtidas em seus posts',
      icon: '❤️',
      category: 'social',
      difficulty: 'silver',
      points: 200,
      progress: 45,
      target: 100,
      reward: 'Destaque no Feed',
    },
    {
      id: '10',
      title: 'Mentor da Comunidade',
      description: 'Ajude 10 pessoas com comentários úteis',
      icon: '🤝',
      category: 'social',
      difficulty: 'gold',
      points: 400,
      progress: 3,
      target: 10,
      reward: 'Badge Mentor',
    },

    // Milestone Achievements
    {
      id: '11',
      title: 'Primeira Meta',
      description: 'Alcance sua primeira meta de peso',
      icon: '🎯',
      category: 'milestones',
      difficulty: 'silver',
      points: 300,
      progress: 75,
      target: 100,
      reward: 'Certificado de Conquista',
    },
    {
      id: '12',
      title: 'Transformação Total',
      description: 'Complete 6 meses de jornada',
      icon: '🦋',
      category: 'milestones',
      difficulty: 'platinum',
      points: 2000,
      progress: 2,
      target: 6,
      reward: 'Acesso VIP',
    },
  ];

  const categories = [
    { key: 'all', label: 'Todas', icon: Award },
    { key: 'fitness', label: 'Fitness', icon: Zap },
    { key: 'nutrition', label: 'Nutrição', icon: Target },
    { key: 'social', label: 'Social', icon: Users },
    { key: 'milestones', label: 'Marcos', icon: Trophy },
  ];

  const difficultyColors = {
    bronze: 'bg-orange-100 text-orange-800 border-orange-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const difficultyIcons = {
    bronze: Medal,
    silver: Award,
    gold: Trophy,
    platinum: Crown,
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? allAchievements 
    : allAchievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedAchievements = allAchievements.filter(a => a.unlockedAt);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);
  const completionRate = Math.round((unlockedAchievements.length / allAchievements.length) * 100);

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Conquistas">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para desbloquear conquistas, precisamos conhecer suas informações.
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
    <Layout showBackButton title="Suas conquistas 🏆">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl p-8 text-white mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Suas Conquistas</h1>
            <p className="text-green-100">Continue progredindo para desbloquear mais recompensas!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
              <div className="text-sm text-green-100">Desbloqueadas</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
              <div className="text-sm text-green-100">Pontos XP</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-sm text-green-100">Completude</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-green-100">Dias de Streak</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.key
                  ? 'bg-[#1DB954] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Achievements Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAchievements.map((achievement) => {
                const DifficultyIcon = difficultyIcons[achievement.difficulty as keyof typeof difficultyIcons];
                const isUnlocked = !!achievement.unlockedAt;
                const progressPercentage = getProgressPercentage(achievement.progress, achievement.target);

                return (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${
                      isUnlocked 
                        ? 'border-[#1DB954] bg-gradient-to-br from-white to-[#DFF5E1]' 
                        : 'border-gray-100'
                    }`}
                  >
                    {/* Achievement Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                        isUnlocked ? 'bg-[#DFF5E1]' : 'bg-gray-100'
                      }`}>
                        {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-gray-400" />}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          difficultyColors[achievement.difficulty as keyof typeof difficultyColors]
                        }`}>
                          <DifficultyIcon className="w-3 h-3 inline mr-1" />
                          {achievement.difficulty}
                        </span>
                        
                        {isUnlocked && (
                          <CheckCircle className="w-6 h-6 text-[#1DB954]" />
                        )}
                      </div>
                    </div>

                    {/* Achievement Info */}
                    <div className="mb-4">
                      <h3 className={`text-lg font-bold mb-2 ${
                        isUnlocked ? 'text-[#1B1B1B]' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isUnlocked ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    {!isUnlocked && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progresso</span>
                          <span className="font-medium text-[#1DB954]">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1DB954] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Reward */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gift className={`w-4 h-4 ${isUnlocked ? 'text-[#1DB954]' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${
                          isUnlocked ? 'text-[#1B1B1B]' : 'text-gray-500'
                        }`}>
                          {achievement.reward}
                        </span>
                      </div>
                      
                      <div className={`text-sm font-bold ${
                        isUnlocked ? 'text-[#1DB954]' : 'text-gray-400'
                      }`}>
                        +{achievement.points} XP
                      </div>
                    </div>

                    {/* Unlock Date */}
                    {isUnlocked && achievement.unlockedAt && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <div className="text-xs text-[#1DB954] font-medium">
                          Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Recentes</h3>
              
              <div className="space-y-3">
                {unlockedAchievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-[#DFF5E1] rounded-xl">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1B1B1B] text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">+{achievement.points} XP</div>
                    </div>
                  </div>
                ))}
              </div>

              {unlockedAchievements.length === 0 && (
                <div className="text-center py-4">
                  <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Continue treinando para desbloquear conquistas!</p>
                </div>
              )}
            </div>

            {/* Progress to Next Level */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Próximo Nível</h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[#1DB954] mb-1">Nível 5</div>
                <div className="text-sm text-gray-600">Fitness Enthusiast</div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-medium text-[#1DB954]">2,450 / 3,000 XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500"
                    style={{ width: '82%' }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Faltam apenas 550 XP!</div>
                <div className="text-xs text-gray-500">
                  Complete mais treinos para subir de nível
                </div>
              </div>
            </div>

            {/* Achievement Categories Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Por Categoria</h3>
              
              <div className="space-y-3">
                {categories.slice(1).map((category) => {
                  const categoryAchievements = allAchievements.filter(a => a.category === category.key);
                  const unlockedInCategory = categoryAchievements.filter(a => a.unlockedAt);
                  const percentage = Math.round((unlockedInCategory.length / categoryAchievements.length) * 100);

                  return (
                    <div key={category.key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-5 h-5 text-[#1DB954]" />
                        <span className="font-medium text-[#1B1B1B]">{category.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#1B1B1B]">
                          {unlockedInCategory.length}/{categoryAchievements.length}
                        </div>
                        <div className="text-xs text-gray-600">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pro Features */}
            {!isPro && (
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <Crown className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Conquistas Exclusivas</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    Desbloqueie conquistas especiais e recompensas únicas
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

export default AchievementsPage;