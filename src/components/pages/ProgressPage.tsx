import React, { useState } from 'react';
import { TrendingUp, Calendar, Camera, Scale, Ruler, Target, Award, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const ProgressPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'measurements' | 'performance'>('weight');

  // Mock progress data
  const weightData = [
    { date: '01/01', weight: 78.5, bodyFat: 18.2 },
    { date: '08/01', weight: 78.1, bodyFat: 18.0 },
    { date: '15/01', weight: 77.8, bodyFat: 17.8 },
    { date: '22/01', weight: 77.5, bodyFat: 17.5 },
    { date: '29/01', weight: 77.2, bodyFat: 17.3 },
    { date: '05/02', weight: 76.9, bodyFat: 17.0 },
  ];

  const measurementsData = [
    { date: '01/01', chest: 98, waist: 85, hips: 95, arms: 32, thighs: 58 },
    { date: '15/01', chest: 99, waist: 84, hips: 94, arms: 32.5, thighs: 58.5 },
    { date: '01/02', chest: 100, waist: 83, hips: 93, arms: 33, thighs: 59 },
  ];

  const performanceData = [
    { exercise: 'Flexão', week1: 15, week2: 18, week3: 20, week4: 22 },
    { exercise: 'Agachamento', week1: 25, week2: 28, week3: 30, week4: 32 },
    { exercise: 'Prancha (seg)', week1: 45, week2: 50, week3: 55, week4: 60 },
  ];

  const currentStats = {
    weight: 76.9,
    weightChange: -1.6,
    bodyFat: 17.0,
    bodyFatChange: -1.2,
    muscleMass: 65.2,
    muscleMassChange: +0.8,
    bmi: 22.1,
    bmiChange: -0.5,
  };

  const achievements = [
    { title: 'Perdeu 1kg', icon: '🎯', date: '15/01/2024' },
    { title: '30 dias consecutivos', icon: '🔥', date: '30/01/2024' },
    { title: 'Meta de água atingida', icon: '💧', date: '05/02/2024' },
  ];

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getChangeColor = (change: number, isPositiveGood: boolean = true) => {
    if (change === 0) return 'text-gray-500';
    const isGood = isPositiveGood ? change > 0 : change < 0;
    return isGood ? 'text-green-500' : 'text-red-500';
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Progresso">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para acompanhar seu progresso, precisamos conhecer suas informações.
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
    <Layout showBackButton title="Acompanhe seu progresso 📈">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Period Selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">Seu Progresso</h1>
            <p className="text-gray-600">Acompanhe sua evolução e conquistas</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Scale className="w-5 h-5 text-[#1DB954]" />
              {getChangeIcon(currentStats.weightChange)}
            </div>
            <div className="text-2xl font-bold text-[#1B1B1B] mb-1">
              {currentStats.weight}kg
            </div>
            <div className="text-sm text-gray-600">Peso</div>
            <div className={`text-xs font-medium ${getChangeColor(currentStats.weightChange, false)}`}>
              {currentStats.weightChange > 0 ? '+' : ''}{currentStats.weightChange}kg
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-blue-500" />
              {getChangeIcon(currentStats.bodyFatChange)}
            </div>
            <div className="text-2xl font-bold text-[#1B1B1B] mb-1">
              {currentStats.bodyFat}%
            </div>
            <div className="text-sm text-gray-600">Gordura</div>
            <div className={`text-xs font-medium ${getChangeColor(currentStats.bodyFatChange, false)}`}>
              {currentStats.bodyFatChange > 0 ? '+' : ''}{currentStats.bodyFatChange}%
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              {getChangeIcon(currentStats.muscleMassChange)}
            </div>
            <div className="text-2xl font-bold text-[#1B1B1B] mb-1">
              {currentStats.muscleMass}kg
            </div>
            <div className="text-sm text-gray-600">Músculo</div>
            <div className={`text-xs font-medium ${getChangeColor(currentStats.muscleMassChange)}`}>
              {currentStats.muscleMassChange > 0 ? '+' : ''}{currentStats.muscleMassChange}kg
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Ruler className="w-5 h-5 text-purple-500" />
              {getChangeIcon(currentStats.bmiChange)}
            </div>
            <div className="text-2xl font-bold text-[#1B1B1B] mb-1">
              {currentStats.bmi}
            </div>
            <div className="text-sm text-gray-600">IMC</div>
            <div className={`text-xs font-medium ${getChangeColor(currentStats.bmiChange, false)}`}>
              {currentStats.bmiChange > 0 ? '+' : ''}{currentStats.bmiChange}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Metric Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center space-x-4 mb-6">
                {[
                  { key: 'weight', label: 'Peso', icon: Scale },
                  { key: 'measurements', label: 'Medidas', icon: Ruler },
                  { key: 'performance', label: 'Performance', icon: TrendingUp },
                ].map((metric) => (
                  <button
                    key={metric.key}
                    onClick={() => setSelectedMetric(metric.key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMetric === metric.key
                        ? 'bg-[#1DB954] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <metric.icon className="w-4 h-4" />
                    <span>{metric.label}</span>
                  </button>
                ))}
              </div>

              {/* Weight Chart */}
              {selectedMetric === 'weight' && (
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Evolução do Peso</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#1DB954" 
                          strokeWidth={3}
                          dot={{ fill: '#1DB954', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="bodyFat" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Measurements Chart */}
              {selectedMetric === 'measurements' && (
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Medidas Corporais</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={measurementsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="chest" fill="#1DB954" name="Peito" />
                        <Bar dataKey="waist" fill="#3b82f6" name="Cintura" />
                        <Bar dataKey="arms" fill="#f59e0b" name="Braços" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Performance Chart */}
              {selectedMetric === 'performance' && (
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Performance nos Exercícios</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="exercise" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="week1" fill="#e5e7eb" name="Semana 1" />
                        <Bar dataKey="week2" fill="#9ca3af" name="Semana 2" />
                        <Bar dataKey="week3" fill="#6b7280" name="Semana 3" />
                        <Bar dataKey="week4" fill="#1DB954" name="Semana 4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Photos */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1B1B1B]">Fotos do Progresso</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Adicionar Foto</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Foto {i}</p>
                      <p className="text-xs text-gray-400">01/0{i}/2024</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1B1B1B]">Conquistas Recentes</h3>
                <Award className="w-5 h-5 text-[#1DB954]" />
              </div>

              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-[#DFF5E1] rounded-xl">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1B1B1B] text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage('achievements')}
                className="w-full mt-4 px-4 py-2 text-[#1DB954] border border-[#1DB954] rounded-lg hover:bg-[#DFF5E1] transition-colors"
              >
                Ver Todas as Conquistas
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Ações Rápidas</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Scale className="w-5 h-5 text-[#1DB954]" />
                  <span className="font-medium text-[#1B1B1B]">Registrar Peso</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Ruler className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-[#1B1B1B]">Atualizar Medidas</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Camera className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-[#1B1B1B]">Tirar Foto</span>
                </button>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Metas</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Peso Meta</span>
                    <span className="font-medium">{userProfile.pesoDesejado || 75}kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#1DB954] h-2 rounded-full" 
                      style={{ width: '75%' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">75% concluído</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Treinos/Semana</span>
                    <span className="font-medium">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: '80%' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">80% concluído</div>
                </div>
              </div>
            </div>

            {/* Pro Features */}
            {!isPro && (
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Análises Avançadas</h3>
                  <p className="text-yellow-100 text-sm mb-4">
                    Desbloqueie relatórios detalhados e comparações avançadas
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-yellow-600 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
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

export default ProgressPage;