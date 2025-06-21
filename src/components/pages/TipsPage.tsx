import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Share2, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const TipsPage: React.FC = () => {
  const { userProfile } = useApp();
  const [currentTip, setCurrentTip] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tipHistory, setTipHistory] = useState<string[]>([]);

  const motivationalTips = [
    "💪 Lembre-se: cada gota de suor é um passo mais próximo do seu objetivo!",
    "🔥 A disciplina é escolher entre o que você quer agora e o que você quer mais.",
    "⚡ Seu único limite é você mesmo. Supere-se hoje!",
    "🎯 Pequenos progressos diários levam a grandes resultados.",
    "💚 Seu corpo pode fazer isso. É sua mente que você precisa convencer.",
    "🚀 Não se compare com outros. Compare-se com quem você era ontem.",
    "💎 Transformação não acontece no conforto. Saia da zona de conforto!",
    "🌟 Cada treino é uma vitória. Celebre suas conquistas diárias!",
    "⭐ A motivação te faz começar. O hábito te faz continuar.",
    "🏆 Você não precisa ser perfeito, apenas consistente.",
  ];

  const specificTips = {
    'Perder peso': [
      "🔥 Beba água antes das refeições para aumentar a saciedade.",
      "⏰ Crie um déficit calórico sustentável, não radical.",
      "🥗 Comece as refeições sempre pela salada.",
      "🚶‍♂️ Caminhe após as refeições para melhor digestão.",
      "😴 Durma bem - o sono ruim aumenta hormônios da fome."
    ],
    'Ganhar massa': [
      "💪 Consuma proteína em todas as refeições.",
      "⚡ Hidrate-se extra nos dias de treino.",
      "🍌 Carboidratos pré-treino = energia para treinar pesado.",
      "😴 Músculo cresce no descanso. Priorize o sono.",
      "📈 Aumente gradualmente pesos e intensidade."
    ],
    'Manter forma': [
      "⚖️ Consistência supera perfeição sempre.",
      "🎯 Varie os treinos para manter a motivação.",
      "🥗 80% da dieta equilibrada, 20% flexibilidade.",
      "🏃‍♂️ Mantenha-se ativo mesmo nos dias de descanso.",
      "📊 Monitore regularmente para manter o curso."
    ]
  };

  const levelTips = {
    'Iniciante': [
      "🌱 Comece devagar. Progressão gradual evita lesões.",
      "📝 Anote seus treinos para acompanhar evolução.",
      "🎯 Foque na técnica antes de aumentar intensidade.",
      "⏰ 20-30min de exercício já fazem diferença.",
      "🤝 Procure orientação quando tiver dúvidas."
    ],
    'Intermediário': [
      "📈 Varie estímulos para quebrar platôs.",
      "⚡ Inclua treinos de alta intensidade (HIIT).",
      "🎯 Defina metas específicas e mensuráveis.",
      "💤 Recovery ativo nos dias de descanso.",
      "📊 Monitore progresso além da balança."
    ],
    'Avançado': [
      "🔬 Periodize seu treino para máximos resultados.",
      "⚡ Use técnicas avançadas (drop sets, supersets).",
      "🧠 Trabalhe também aspectos mentais/mindfulness.",
      "📈 Microcargas e ajustes finos fazem diferença.",
      "🏆 Seja exemplo e inspire outros na jornada."
    ]
  };

  const generateTip = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let availableTips = [...motivationalTips];
      
      if (userProfile) {
        availableTips.push(...specificTips[userProfile.objetivo]);
        availableTips.push(...levelTips[userProfile.nivel]);
      }
      
      // Filter out recently shown tips
      const newTips = availableTips.filter(tip => !tipHistory.includes(tip));
      const tipsToUse = newTips.length > 0 ? newTips : availableTips;
      
      const randomTip = tipsToUse[Math.floor(Math.random() * tipsToUse.length)];
      setCurrentTip(randomTip);
      
      // Update history
      setTipHistory(prev => [...prev.slice(-4), randomTip]);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    generateTip();
  }, []);

  const shareTip = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Dica VerdeFit',
        text: currentTip,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(currentTip);
      // You could show a toast notification here
    }
  };

  return (
    <Layout showBackButton title="Sua dica do dia 💡">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Main Tip Card */}
        <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse w-1/2 mx-auto"></div>
              </div>
            ) : (
              <div className="text-xl md:text-2xl font-medium leading-relaxed">
                {currentTip}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={generateTip}
            disabled={isLoading}
            className={`flex items-center justify-center space-x-2 bg-white border-2 border-[#1DB954] text-[#1DB954] py-4 px-6 rounded-xl font-semibold transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#DFF5E1] active:scale-95'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Nova Dica</span>
          </button>
          
          <button
            onClick={shareTip}
            className="flex items-center justify-center space-x-2 bg-[#1DB954] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#1ed760] transition-all active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartilhar</span>
          </button>
        </div>

        {/* Daily Motivation Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <h3 className="text-xl font-bold text-[#1B1B1B] mb-4 flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            Motivação Diária
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-[#DFF5E1] rounded-xl">
              <p className="text-[#1B1B1B] font-medium mb-2">💪 Mantra do Dia</p>
              <p className="text-gray-700">"Cada dia é uma nova oportunidade de ser a melhor versão de mim mesmo."</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-[#1DB954]">
                  {Math.floor(Math.random() * 10000) + 5000}
                </div>
                <div className="text-sm text-gray-600">Pessoas treinando agora</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-[#1DB954]">
                  {Math.floor(Math.random() * 50) + 20}°C
                </div>
                <div className="text-sm text-gray-600">Perfeito para treinar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tip History */}
        {tipHistory.length > 1 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-[#1B1B1B] mb-4">Dicas Recentes</h4>
            <div className="space-y-3">
              {tipHistory.slice(-3, -1).reverse().map((tip, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl text-gray-600">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TipsPage;