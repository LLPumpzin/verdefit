import React, { useState, useEffect } from 'react';
import { Target, Clock, Calendar, Star, Download, Edit, Zap, CheckCircle, Crown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const PlanPage: React.FC = () => {
  const { userProfile, setCurrentPage, isPro } = useApp();
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (userProfile) {
      generatePlan();
    }
  }, [userProfile]);

  const generatePlan = () => {
    setIsLoading(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const generatedPlan = createPersonalizedPlan(userProfile!);
      setPlan(generatedPlan);
      setIsLoading(false);
    }, 2000);
  };

  const createPersonalizedPlan = (profile: typeof userProfile) => {
    if (!profile) return '';

    const { nome, objetivo, nivel, frequencia, peso, altura, idade, genero, restricoes } = profile;
    
    const imc = (peso / ((altura / 100) ** 2)).toFixed(1);
    
    let planoTreino = '';
    let alimentacao = '';
    let habitos = '';

    // Plano de treino baseado no nível e frequência
    if (nivel === 'Iniciante') {
      planoTreino = `
**PLANO DE TREINO SEMANAL**

**Segunda-feira: Corpo Inteiro**
• Aquecimento: 10min caminhada
• Agachamento livre: 3x12
• Flexão (joelhos): 3x8
• Prancha: 3x30seg
• Alongamento: 10min

**Quarta-feira: Cardio + Core**
• Corrida leve: 20min
• Abdominais: 3x15
• Elevação de pernas: 3x10
• Mountain climbers: 3x20
• Relaxamento: 5min

**Sexta-feira: Força Básica**
• Aquecimento: 5min
• Agachamento com salto: 3x8
• Flexão de braço: 3x10
• Afundo: 3x10 cada perna
• Alongamento: 10min
      `;
    } else if (nivel === 'Intermediário') {
      planoTreino = `
**PLANO DE TREINO SEMANAL**

**Segunda: Superior**
• Aquecimento: 10min
• Flexão de braço: 4x12
• Barra fixa (assistida): 4x8
• Dips: 3x10
• Rosca direta: 3x12
• Alongamento: 10min

**Terça: Inferior**
• Aquecimento: 10min
• Agachamento: 4x15
• Afundo: 4x12 cada
• Elevação pélvica: 4x15
• Panturrilha: 3x20
• Alongamento: 10min

**Quinta: HIIT**
• Aquecimento: 5min
• Burpees: 5x5
• Jump squat: 5x10
• Mountain climbers: 5x20
• Descanso 1min entre séries
• Cool down: 10min

**Sábado: Core + Cardio**
• Corrida: 25min
• Prancha: 4x45seg
• Russian twist: 4x20
• Bike: 15min
      `;
    } else {
      planoTreino = `
**PLANO DE TREINO SEMANAL**

**Segunda: Push**
• Aquecimento dinâmico: 10min
• Flexão diamante: 5x15
• Handstand push-up: 4x5
• Dips: 4x15
• Pike push-up: 4x12
• Alongamento: 15min

**Terça: Pull**
• Aquecimento: 10min
• Barra fixa: 5x10
• Muscle-up progressão: 4x5
• Remada invertida: 4x15
• Face pulls: 4x12
• Mobilidade: 15min

**Quarta: Legs**
• Aquecimento: 15min
• Pistol squat: 4x8 cada
• Bulgarian split squat: 4x12
• Single leg deadlift: 4x10
• Jump squats: 4x15
• Alongamento: 15min

**Quinta: Cardio HIIT**
• Aquecimento: 10min
• Tabata: 20min
• Sprints: 8x30seg
• Descanso: 90seg
• Recovery: 15min

**Sexta: Upper Body**
• Aquecimento: 10min
• Archer push-ups: 4x8
• One arm row: 4x10
• L-sit: 4x20seg
• Handstand hold: 4x30seg
• Mobilidade: 15min

**Sábado: Condicionamento**
• Corrida: 35min
• Functional training: 20min
• Yoga/Pilates: 15min
      `;
    }

    // Alimentação baseada no objetivo
    if (objetivo === 'Perder peso') {
      alimentacao = `
**RECOMENDAÇÕES ALIMENTARES**

**Café da manhã (7h-8h):**
• Aveia (40g) com frutas vermelhas
• Iogurte natural desnatado (150g)
• Chá verde ou café sem açúcar

**Lanche manhã (10h):**
• 1 fruta + 10 castanhas

**Almoço (12h-13h):**
• Salada verde abundante
• Proteína magra: frango (120g) ou peixe (150g)
• Carboidrato: batata doce (100g) ou arroz integral (3 col)
• Vegetais cozidos à vontade

**Lanche tarde (15h-16h):**
• Iogurte com chia ou
• Vitamina verde (couve, maçã, água)

**Jantar (19h-20h):**
• Salada variada
• Proteína grelhada (100g)
• Vegetais refogados
• Evitar carboidratos complexos

**Dicas importantes:**
• Beba 2-3L de água/dia
• Evite açúcar refinado e processados
• Faça 5-6 refeições pequenas
• Mastigue devagar
• Pare de comer 3h antes de dormir
      `;
    } else if (objetivo === 'Ganhar massa') {
      alimentacao = `
**RECOMENDAÇÕES ALIMENTARES**

**Café da manhã (7h):**
• Aveia (60g) com banana e pasta de amendoim (1 col)
• Ovos mexidos (2-3 unidades)
• Vitamina: leite + whey + frutas

**Lanche manhã (10h):**
• Sanduíche integral com peito de peru
• Suco natural

**Almoço (12h30):**
• Arroz integral (5 col)
• Frango grelhado (150g)
• Feijão (1 concha)
• Salada com azeite
• Legumes refogados

**Lanche pré-treino (15h):**
• Banana com aveia
• Café preto (opcional)

**Pós-treino (imediato):**
• Whey protein (30g) com água
• Batata doce cozida (150g) ou banana

**Jantar (19h30):**
• Salmão grelhado (150g) ou carne vermelha magra
• Quinoa (4 col) ou batata doce
• Brócolis refogado
• Salada verde

**Ceia (21h30):**
• Iogurte natural com granola
• Castanhas (20g)

**Dicas importantes:**
• 2g proteína/kg peso corporal
• Carboidratos pré/pós treino
• Gorduras boas: abacate, oleaginosas, azeite
• Hidratação extra nos dias de treino
• Suplementação conforme orientação
      `;
    } else {
      alimentacao = `
**RECOMENDAÇÕES ALIMENTARES EQUILIBRADAS**

**Estrutura das refeições:**
• 50% vegetais e frutas
• 25% proteínas magras
• 25% carboidratos integrais

**Café da manhã:**
• Base proteica + carboidrato + fruta
• Ex: Omelete com aveia e frutas

**Almoço:**
• Proteína + carboidrato + vegetais + salada
• Porções moderadas e equilibradas

**Lanche:**
• Combinação proteína + carboidrato
• Ex: Iogurte com frutas, sanduíche natural

**Jantar:**
• Similar ao almoço, porções menores
• Priorizar vegetais

**Princípios gerais:**
• Proteínas: 1.5g/kg peso
• Carboidratos: moderados, preferencialmente integrais
• Gorduras: 20-30% das calorias totais
• Hidratação: 35ml água/kg peso
• Regularidade: mesmos horários
• Qualidade: alimentos minimamente processados
      `;
    }

    habitos = `
**HÁBITOS SAUDÁVEIS DIÁRIOS**

**Rotina Matinal:**
• Acordar no mesmo horário
• Beber 500ml água ao acordar
• 10min de alongamento ou meditação
• Café da manhã nutritivo

**Durante o dia:**
• Movimentar-se a cada hora
• Preferir escadas ao elevador
• Pausas para respiração profunda
• Manter postura correta

**Pré-treino:**
• Alimentação adequada 1-2h antes
• Hidratação
• Aquecimento sempre
• Mentalização positiva

**Pós-treino:**
• Alongamento obrigatório
• Hidratação imediata
• Alimentação em até 1h
• Registro do treino

**Noturno:**
• Jantar 3h antes de dormir
• Desligar telas 1h antes do sono
• Ambiente escuro e fresco
• 7-9h de sono

**Semanais:**
• 1 dia de descanso completo
• Preparação de refeições
• Avaliação do progresso
• Atividade de lazer

**Mensais:**
• Medidas corporais
• Fotos de progresso
• Revisão de objetivos
• Ajustes no plano
    `;

    return `
Olá, ${nome}! 👋

Seu plano fitness personalizado está pronto! Com base no seu perfil detalhado:

**📊 RESUMO DO SEU PERFIL:**
• Idade: ${idade} anos | Peso: ${peso}kg | Altura: ${altura}cm
• IMC: ${imc} | Objetivo: ${objetivo} | Nível: ${nivel}
• Frequência: ${frequencia} dias/semana
• Local: ${profile.localTreino} | Tempo: ${profile.tempoTreino}

${restricoes ? `**⚠️ Observações especiais:** ${restricoes}` : ''}

${planoTreino}

${alimentacao}

${habitos}

**🎯 METAS E ACOMPANHAMENTO**

**Primeiras 2 semanas:**
• Foque na consistência, não na intensidade
• Aprenda os movimentos corretamente
• Estabeleça a rotina

**Mês 1:**
• Aumente gradualmente a intensidade
• Monitore como seu corpo responde
• Ajuste alimentação conforme necessário

**Mês 2-3:**
• Progressão nos exercícios
• Refinamento da técnica
• Primeiros resultados visíveis

**💪 MOTIVAÇÃO DIÁRIA**
Lembre-se: a transformação acontece um dia de cada vez. Seja consistente, seja paciente, seja forte. Cada treino é um investimento no seu futuro!

**🚀 PRÓXIMOS PASSOS:**
1. Comece devagar e aumente gradualmente
2. Tire fotos do "antes" para comparação
3. Anote suas medidas iniciais
4. Celebre cada pequena conquista
5. Mantenha-se hidratado sempre

Você está no caminho certo, ${nome}! Vamos juntos nessa jornada! 💚

---
*Plano gerado pela IA do VerdeFit em ${new Date().toLocaleDateString('pt-BR')}*
    `;
  };

  const EditPlanModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1B1B1B]">Editar Plano</h2>
            <button
              onClick={() => setShowEditModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">Recurso exclusivo para usuários Pro</p>
        </div>

        <div className="p-6">
          {!isPro ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                Upgrade para Pro
              </h3>
              
              <p className="text-gray-600 mb-6">
                Edite seu plano quantas vezes quiser com nossa IA avançada
              </p>

              <div className="bg-[#DFF5E1] rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-[#1B1B1B] mb-2">Com o Pro você pode:</h4>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>• Editar plano ilimitadamente</li>
                  <li>• Ajustar exercícios específicos</li>
                  <li>• Modificar alimentação</li>
                  <li>• Personalizar horários</li>
                  <li>• Adicionar preferências</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowEditModal(false);
                  setCurrentPage('pricing');
                }}
                className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Fazer Upgrade - R$ 19,90/mês
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#DFF5E1] rounded-xl p-4">
                <h3 className="font-semibold text-[#1B1B1B] mb-2">✨ Edição Inteligente</h3>
                <p className="text-sm text-gray-700">
                  Nossa IA pode ajustar seu plano baseado em suas preferências e feedback.
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="font-medium text-[#1B1B1B]">Ajustar intensidade</div>
                  <div className="text-sm text-gray-500">Tornar mais fácil ou mais difícil</div>
                </button>

                <button className="w-full p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="font-medium text-[#1B1B1B]">Modificar exercícios</div>
                  <div className="text-sm text-gray-500">Substituir por exercícios preferidos</div>
                </button>

                <button className="w-full p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="font-medium text-[#1B1B1B]">Alterar alimentação</div>
                  <div className="text-sm text-gray-500">Adaptar às suas preferências</div>
                </button>

                <button className="w-full p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="font-medium text-[#1B1B1B]">Personalizar horários</div>
                  <div className="text-sm text-gray-500">Ajustar para sua rotina</div>
                </button>
              </div>

              <button
                onClick={() => {
                  setShowEditModal(false);
                  // In a real app, this would open the edit interface
                  alert('🎉 Funcionalidade de edição em desenvolvimento!');
                }}
                className="w-full bg-[#1DB954] text-white py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
              >
                Começar Edição
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!userProfile) {
    return (
      <Layout showBackButton title="Seu Plano">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para gerar seu plano personalizado, precisamos conhecer suas informações.
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
    <>
      <Layout showBackButton title="Seu plano está pronto! 🎯">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
                Criando seu plano personalizado...
              </h2>
              <p className="text-gray-600 mb-6">
                Nossa IA está analisando seu perfil detalhado e criando o plano perfeito para você
              </p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
                <div className="h-2 bg-[#1DB954] rounded-full animate-pulse w-3/4"></div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Considerando suas 8 etapas de perfil...
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header Card */}
              <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Seu Plano Personalizado</h1>
                      <p className="text-green-100">Criado especialmente para {userProfile.nome}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{userProfile.frequencia}</div>
                      <div className="text-green-100">dias/semana</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-semibold">{userProfile.tempoTreino}</div>
                      <div className="text-xs text-green-100">por treino</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-semibold">{userProfile.frequencia}</div>
                      <div className="text-xs text-green-100">dias/semana</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <Target className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-semibold text-sm">{userProfile.objetivo}</div>
                      <div className="text-xs text-green-100">objetivo</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <Star className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-semibold">{userProfile.nivel}</div>
                      <div className="text-xs text-green-100">nível</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowEditModal(true)}
                  className={`flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all ${
                    isPro
                      ? 'bg-white border-2 border-[#1DB954] text-[#1DB954] hover:bg-[#DFF5E1]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Edit className="w-5 h-5" />
                  <span>{isPro ? 'Editar Plano' : 'Editar (Pro)'}</span>
                  {!isPro && <Crown className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setCurrentPage('pdf')}
                  className={`flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all ${
                    isPro
                      ? 'bg-[#1DB954] text-white hover:bg-[#1ed760] shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                  disabled={!isPro}
                >
                  <Download className="w-5 h-5" />
                  <span>{isPro ? 'Baixar PDF' : 'PDF (Pro)'}</span>
                  {!isPro && <Crown className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setCurrentPage('tips')}
                  className="bg-white border-2 border-[#1DB954] text-[#1DB954] py-4 px-6 rounded-xl font-semibold hover:bg-[#DFF5E1] transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Ver Dicas</span>
                </button>
              </div>

              {/* Plan Content */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="whitespace-pre-line text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: plan.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1B1B1B] font-semibold">$1</strong>')
                        .replace(/•/g, '<span class="text-[#1DB954]">•</span>')
                        .replace(/📊|🎯|💪|🚀|⚠️/g, '<span class="text-xl">$&</span>')
                    }}
                  />
                </div>
              </div>

              {/* Upgrade CTA for Free Users */}
              {!isPro && (
                <div className="bg-gradient-to-r from-[#1B1B1B] to-[#2D2D2D] rounded-2xl p-8 text-white text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">
                    Desbloqueie todo o potencial do seu plano
                  </h3>
                  
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Com o VerdeFit Pro, você pode editar seu plano quantas vezes quiser, 
                    baixar em PDF e ter acesso a recursos exclusivos.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 rounded-xl p-4">
                      <Edit className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Edição Ilimitada</div>
                      <div className="text-sm text-gray-300">Ajuste seu plano sempre que quiser</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <Download className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Download PDF</div>
                      <div className="text-sm text-gray-300">Leve seu plano para qualquer lugar</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <Zap className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">IA Avançada</div>
                      <div className="text-sm text-gray-300">Planos mais detalhados e precisos</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage('pricing')}
                    className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Upgrade para Pro - R$ 19,90/mês
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>

      {/* Edit Modal */}
      {showEditModal && <EditPlanModal />}
    </>
  );
};

export default PlanPage;