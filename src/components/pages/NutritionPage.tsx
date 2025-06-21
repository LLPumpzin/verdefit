import React, { useState } from 'react';
import { Utensils, Plus, Search, Calendar, Target, Droplets, Zap, Apple, Coffee, Clock, CheckCircle, Camera, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const NutritionPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');
  const [waterIntake, setWaterIntake] = useState(6);

  // Mock nutrition data
  const dailyGoals = {
    calories: 2200,
    protein: 120,
    carbs: 275,
    fat: 73,
    water: 8,
  };

  const currentIntake = {
    calories: 1650,
    protein: 85,
    carbs: 180,
    fat: 55,
  };

  const meals = {
    breakfast: {
      name: 'Café da Manhã',
      icon: Coffee,
      foods: [
        { name: 'Aveia com frutas', calories: 320, protein: 12, carbs: 58, fat: 6 },
        { name: 'Iogurte natural', calories: 150, protein: 15, carbs: 12, fat: 8 },
        { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0 },
      ],
      totalCalories: 575,
    },
    lunch: {
      name: 'Almoço',
      icon: Utensils,
      foods: [
        { name: 'Frango grelhado (150g)', calories: 250, protein: 46, carbs: 0, fat: 6 },
        { name: 'Arroz integral (1 xícara)', calories: 220, protein: 5, carbs: 45, fat: 2 },
        { name: 'Brócolis refogado', calories: 55, protein: 4, carbs: 11, fat: 1 },
        { name: 'Salada verde', calories: 25, protein: 2, carbs: 5, fat: 0 },
      ],
      totalCalories: 550,
    },
    snack: {
      name: 'Lanche',
      icon: Apple,
      foods: [
        { name: 'Mix de castanhas (30g)', calories: 180, protein: 6, carbs: 6, fat: 15 },
        { name: 'Maçã', calories: 95, protein: 0, carbs: 25, fat: 0 },
      ],
      totalCalories: 275,
    },
    dinner: {
      name: 'Jantar',
      icon: Clock,
      foods: [
        { name: 'Salmão grelhado (120g)', calories: 250, protein: 22, carbs: 0, fat: 18 },
      ],
      totalCalories: 250,
    },
  };

  const nutritionTips = [
    {
      title: 'Hidratação',
      description: 'Beba água antes das refeições para melhorar a saciedade',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Proteína',
      description: 'Inclua proteína em todas as refeições para manter a massa muscular',
      icon: Zap,
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Timing',
      description: 'Coma carboidratos antes do treino para ter mais energia',
      icon: Clock,
      color: 'bg-orange-100 text-orange-800',
    },
  ];

  const weeklyProgress = [
    { day: 'Seg', calories: 2100, target: 2200 },
    { day: 'Ter', calories: 2250, target: 2200 },
    { day: 'Qua', calories: 2180, target: 2200 },
    { day: 'Qui', calories: 2050, target: 2200 },
    { day: 'Sex', calories: 2300, target: 2200 },
    { day: 'Sáb', calories: 2400, target: 2200 },
    { day: 'Dom', calories: 1650, target: 2200 },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Nutrição">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Utensils className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para acessar seu plano nutricional personalizado, precisamos conhecer suas informações.
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
    <Layout showBackButton title="Nutrição e alimentação 🥗">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">Plano Nutricional</h1>
            <p className="text-gray-600">Acompanhe sua alimentação e hidratação</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-[#1B1B1B]">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h2 className="text-xl font-bold text-[#1B1B1B] mb-6">Progresso Diário</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#1DB954"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - getProgressPercentage(currentIntake.calories, dailyGoals.calories) / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#1B1B1B]">
                        {Math.round(getProgressPercentage(currentIntake.calories, dailyGoals.calories))}%
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#1B1B1B]">{currentIntake.calories}</div>
                  <div className="text-sm text-gray-600">de {dailyGoals.calories} kcal</div>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - getProgressPercentage(currentIntake.protein, dailyGoals.protein) / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#1B1B1B]">
                        {Math.round(getProgressPercentage(currentIntake.protein, dailyGoals.protein))}%
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#1B1B1B]">{currentIntake.protein}g</div>
                  <div className="text-sm text-gray-600">de {dailyGoals.protein}g proteína</div>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - getProgressPercentage(currentIntake.carbs, dailyGoals.carbs) / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#1B1B1B]">
                        {Math.round(getProgressPercentage(currentIntake.carbs, dailyGoals.carbs))}%
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#1B1B1B]">{currentIntake.carbs}g</div>
                  <div className="text-sm text-gray-600">de {dailyGoals.carbs}g carbos</div>
                </div>

                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#ef4444"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - getProgressPercentage(currentIntake.fat, dailyGoals.fat) / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#1B1B1B]">
                        {Math.round(getProgressPercentage(currentIntake.fat, dailyGoals.fat))}%
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#1B1B1B]">{currentIntake.fat}g</div>
                  <div className="text-sm text-gray-600">de {dailyGoals.fat}g gordura</div>
                </div>
              </div>

              {/* Water Intake */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-[#1B1B1B]">Hidratação</span>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">
                    {waterIntake}/{dailyGoals.water} copos
                  </span>
                </div>
                
                <div className="flex space-x-2 mb-3">
                  {Array.from({ length: dailyGoals.water }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setWaterIntake(i + 1)}
                      className={`flex-1 h-8 rounded-lg transition-colors ${
                        i < waterIntake ? 'bg-blue-500' : 'bg-blue-200'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    -1 copo
                  </button>
                  <button
                    onClick={() => setWaterIntake(Math.min(dailyGoals.water, waterIntake + 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    +1 copo
                  </button>
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Refeições de Hoje</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>

              {/* Meal Tabs */}
              <div className="flex space-x-2 mb-6 overflow-x-auto">
                {Object.entries(meals).map(([key, meal]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMeal(key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedMeal === key
                        ? 'bg-[#1DB954] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <meal.icon className="w-4 h-4" />
                    <span>{meal.name}</span>
                  </button>
                ))}
              </div>

              {/* Selected Meal Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1B1B1B]">
                    {meals[selectedMeal].name}
                  </h3>
                  <span className="text-sm font-medium text-[#1DB954]">
                    {meals[selectedMeal].totalCalories} kcal
                  </span>
                </div>

                <div className="space-y-3">
                  {meals[selectedMeal].foods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-[#1B1B1B]">{food.name}</div>
                        <div className="text-sm text-gray-600">
                          P: {food.protein}g • C: {food.carbs}g • G: {food.fat}g
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#1B1B1B]">{food.calories} kcal</div>
                        <button className="text-xs text-[#1DB954] hover:text-[#1ed760]">
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#1DB954] hover:text-[#1DB954] transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar alimento</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1B1B1B]">Progresso Semanal</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(day.calories, day.target)}`}
                          style={{ width: `${getProgressPercentage(day.calories, day.target)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#1B1B1B] w-16 text-right">
                      {day.calories}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Dicas Nutricionais</h3>
              
              <div className="space-y-3">
                {nutritionTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${tip.color}`}>
                        <tip.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#1B1B1B] text-sm">{tip.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{tip.description}</div>
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
                <button className="w-full flex items-center space-x-3 p-3 bg-[#DFF5E1] rounded-xl hover:bg-[#1DB954] hover:text-white transition-colors group">
                  <Camera className="w-5 h-5 text-[#1DB954] group-hover:text-white" />
                  <span className="font-medium text-[#1B1B1B] group-hover:text-white">Escanear Alimento</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Buscar Receitas</span>
                </button>
                
                <button
                  onClick={() => setCurrentPage('plan')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Target className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-[#1B1B1B]">Ajustar Metas</span>
                </button>
              </div>
            </div>

            {/* Pro Features */}
            {!isPro && (
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <Utensils className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Planos Nutricionais Pro</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Receitas personalizadas e acompanhamento detalhado
                  </p>
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="w-full bg-white text-orange-600 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
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

export default NutritionPage;