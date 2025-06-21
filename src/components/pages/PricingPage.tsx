import React from 'react';
import { Check, Crown, Zap, Edit, Download, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const PricingPage: React.FC = () => {
  const { isPro, setIsPro } = useApp();

  const plans = [
    {
      name: 'Grátis',
      price: 'R$ 0',
      period: 'para sempre',
      description: 'Perfeito para começar sua jornada fitness',
      features: [
        'Plano fitness semanal personalizado',
        '1 dica motivacional por dia',
        'Perfil personalizado completo',
        'Suporte por email',
        'Acesso à comunidade'
      ],
      limitations: [
        'Sem edição do plano',
        'Sem download de PDF',
        'Planos básicos',
        'Dicas limitadas'
      ],
      buttonText: isPro ? 'Plano Atual' : 'Plano Atual',
      buttonStyle: 'bg-gray-100 text-gray-600 cursor-not-allowed',
      icon: Zap,
      isCurrentPlan: !isPro
    },
    {
      name: 'Pro',
      price: 'R$ 19,90',
      period: 'por mês',
      description: 'Para quem quer resultados máximos e controle total',
      features: [
        'Plano fitness + alimentação ultra detalhado',
        '✨ Edição ilimitada do plano com IA',
        'Download de plano em PDF profissional',
        'Dicas motivacionais ilimitadas',
        'Evolução automática do plano',
        'Planos avançados e personalizados',
        'Suporte prioritário via WhatsApp',
        'Atualizações mensais automáticas',
        'Acesso antecipado a novos recursos',
        'Análise de progresso detalhada'
      ],
      limitations: [],
      buttonText: isPro ? 'Plano Atual' : 'Upgrade para Pro',
      buttonStyle: isPro 
        ? 'bg-[#1DB954] text-white cursor-not-allowed'
        : 'bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white hover:shadow-xl',
      icon: Crown,
      isCurrentPlan: isPro,
      isPopular: true
    }
  ];

  const handleUpgrade = () => {
    if (!isPro) {
      // In a real app, this would open a payment modal
      setIsPro(true);
      alert('🎉 Parabéns! Você agora é um usuário Pro! (Esta é uma demonstração)');
    }
  };

  return (
    <Layout showBackButton title="Planos 💳">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-4">
            Escolha seu plano
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando quiser mais recursos personalizados e controle total
          </p>
        </div>

        {/* Pro Features Highlight */}
        <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-bold">Novidade: Edição Inteligente de Planos</h3>
          </div>
          <p className="text-center text-green-100">
            Agora usuários Pro podem editar seus planos quantas vezes quiserem com nossa IA avançada!
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${
                plan.isPopular
                  ? 'border-[#1DB954] shadow-lg scale-105'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white px-6 py-2 rounded-full text-sm font-bold">
                    🔥 Mais Popular
                  </span>
                </div>
              )}

              {plan.isCurrentPlan && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#DFF5E1] text-[#1DB954] px-3 py-1 rounded-full text-sm font-medium">
                    Atual
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  plan.isPopular ? 'bg-gradient-to-br from-[#1DB954] to-[#1ed760]' : 'bg-gray-100'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.isPopular ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <h3 className="text-2xl font-bold text-[#1B1B1B] mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#1B1B1B]">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-[#1B1B1B]">✨ Incluído:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#1DB954] mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`${
                        feature.includes('✨') ? 'font-semibold text-[#1DB954]' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Limitações:</h5>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start">
                          <X className="w-4 h-4 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={plan.name === 'Pro' ? handleUpgrade : undefined}
                disabled={plan.isCurrentPlan}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50 mb-12">
          <h3 className="text-2xl font-bold text-[#1B1B1B] mb-6 text-center">
            Comparação Detalhada
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-semibold text-[#1B1B1B]">Recursos</th>
                  <th className="text-center py-4 font-semibold text-gray-600">Grátis</th>
                  <th className="text-center py-4 font-semibold text-[#1DB954]">Pro</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Plano personalizado</td>
                  <td className="text-center py-4"><Check className="w-5 h-5 text-[#1DB954] mx-auto" /></td>
                  <td className="text-center py-4"><Check className="w-5 h-5 text-[#1DB954] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Dicas motivacionais</td>
                  <td className="text-center py-4 text-gray-500">1/dia</td>
                  <td className="text-center py-4 text-[#1DB954] font-semibold">Ilimitadas</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700 flex items-center">
                    <Edit className="w-4 h-4 mr-2 text-[#1DB954]" />
                    Editar plano
                  </td>
                  <td className="text-center py-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="text-center py-4"><Check className="w-5 h-5 text-[#1DB954] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700 flex items-center">
                    <Download className="w-4 h-4 mr-2 text-[#1DB954]" />
                    Download PDF
                  </td>
                  <td className="text-center py-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="text-center py-4"><Check className="w-5 h-5 text-[#1DB954] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Suporte</td>
                  <td className="text-center py-4 text-gray-500">Email</td>
                  <td className="text-center py-4 text-[#1DB954] font-semibold">WhatsApp</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Atualizações do plano</td>
                  <td className="text-center py-4 text-gray-500">Manual</td>
                  <td className="text-center py-4 text-[#1DB954] font-semibold">Automática</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-[#1B1B1B] mb-6 text-center">
            Perguntas Frequentes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#1B1B1B] mb-2">
                Como funciona a edição do plano?
              </h4>
              <p className="text-gray-600 text-sm">
                Com o Pro, você pode pedir para nossa IA ajustar exercícios, intensidade, alimentação e horários quantas vezes quiser.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B1B1B] mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-gray-600 text-sm">
                Sim! Você pode cancelar sua assinatura Pro a qualquer momento sem multas ou taxas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B1B1B] mb-2">
                O que acontece se eu cancelar o Pro?
              </h4>
              <p className="text-gray-600 text-sm">
                Você volta ao plano grátis automaticamente, mantendo acesso aos recursos básicos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B1B1B] mb-2">
                O PDF é realmente detalhado?
              </h4>
              <p className="text-gray-600 text-sm">
                Sim! O PDF Pro inclui plano completo, alimentação, hábitos, checklist e espaço para anotações.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-[#1B1B1B] mb-8">
            O que nossos usuários Pro dizem
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#DFF5E1] rounded-2xl p-6">
              <p className="text-[#1B1B1B] mb-4 italic">
                "Poder editar meu plano foi um divisor de águas! Adapto conforme minha evolução."
              </p>
              <div className="font-semibold text-[#1DB954]">Maria S.</div>
              <div className="text-sm text-gray-600">Usuária Pro há 6 meses</div>
            </div>
            
            <div className="bg-[#DFF5E1] rounded-2xl p-6">
              <p className="text-[#1B1B1B] mb-4 italic">
                "O PDF é perfeito! Levo para a academia e anoto meu progresso."
              </p>
              <div className="font-semibold text-[#1DB954]">João P.</div>
              <div className="text-sm text-gray-600">Usuário Pro há 3 meses</div>
            </div>
            
            <div className="bg-[#DFF5E1] rounded-2xl p-6">
              <p className="text-[#1B1B1B] mb-4 italic">
                "A IA entende exatamente o que preciso. Cada ajuste é certeiro!"
              </p>
              <div className="font-semibold text-[#1DB954]">Ana L.</div>
              <div className="text-sm text-gray-600">Usuária Pro há 1 ano</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;