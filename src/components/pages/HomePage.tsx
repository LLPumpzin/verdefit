import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Dumbbell, Activity, Calendar, User } from 'lucide-react';

const HomePage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [showSettings, setShowSettings] = useState(false);

  const handleGeneratePlan = () => {
    setCurrentPage('plan');
  };

  const settingsOptions = [
    { icon: <User className="w-5 h-5" />, label: 'Dados Pessoais', action: () => setCurrentPage('profile') },
    { icon: <Activity className="w-5 h-5" />, label: 'Metas e Objetivos', action: () => {} },
    { icon: <Calendar className="w-5 h-5" />, label: 'Preferências de Treino', action: () => {} },
    { icon: <Dumbbell className="w-5 h-5" />, label: 'Equipamentos Disponíveis', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">VerdeFit</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {/* Settings Menu */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Configurações</h3>
          <div className="space-y-2">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                {option.icon}
                <span className="text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Seu Progresso</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Peso Atual</p>
              <p className="text-2xl font-bold text-green-700">75 kg</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Meta</p>
              <p className="text-2xl font-bold text-green-700">70 kg</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="space-y-4">
            <button
              onClick={handleGeneratePlan}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Dumbbell className="w-5 h-5" />
              <span>Gerar Plano Personalizado</span>
            </button>
            <button
              onClick={() => setCurrentPage('tips')}
              className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-md hover:bg-green-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Activity className="w-5 h-5" />
              <span>Ver Dicas de Treino</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage; 