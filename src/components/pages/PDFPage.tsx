import React, { useState } from 'react';
import { FileText, Download, Lock, Crown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const PDFPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    if (!isPro) {
      setCurrentPage('pricing');
      return;
    }

    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, this would generate and download a PDF
      const pdfContent = createPDFContent();
      downloadPDF(pdfContent);
      setIsGenerating(false);
    }, 3000);
  };

  const createPDFContent = () => {
    if (!userProfile) return '';

    return `
VERDEFIT - SEU PLANO FITNESS PERSONALIZADO

═══════════════════════════════════════════════════

PERFIL DO USUÁRIO
Nome: ${userProfile.nome}
Idade: ${userProfile.idade} anos
Peso: ${userProfile.peso}kg
Altura: ${userProfile.altura}cm
Gênero: ${userProfile.genero}
Objetivo: ${userProfile.objetivo}
Nível: ${userProfile.nivel}
Frequência: ${userProfile.frequencia} dias/semana

═══════════════════════════════════════════════════

PLANO DE TREINO SEMANAL

Segunda-feira: TREINO A
• Aquecimento: 10 minutos
• Exercício 1: 3x12
• Exercício 2: 3x10
• Exercício 3: 3x15
• Alongamento: 10 minutos

Terça-feira: CARDIO
• Caminhada/corrida: 30 minutos
• Intensidade moderada
• Monitorar frequência cardíaca

Quarta-feira: TREINO B
• Aquecimento: 10 minutos
• Exercício 1: 4x10
• Exercício 2: 3x12
• Exercício 3: 3x15
• Alongamento: 10 minutos

Quinta-feira: DESCANSO ATIVO
• Caminhada leve: 20 minutos
• Alongamento: 15 minutos
• Yoga/meditação: 10 minutos

Sexta-feira: TREINO C
• Aquecimento: 10 minutos
• Exercício 1: 3x15
• Exercício 2: 4x8
• Exercício 3: 3x12
• Alongamento: 10 minutos

═══════════════════════════════════════════════════

RECOMENDAÇÕES ALIMENTARES

CAFÉ DA MANHÃ:
• Opção 1: Aveia com frutas
• Opção 2: Ovos mexidos com torrada integral
• Opção 3: Vitamina com whey protein

ALMOÇO:
• Proteína magra (150g)
• Carboidrato complexo (1 porção)
• Vegetais à vontade
• Salada verde

LANCHE:
• Frutas + oleaginosas
• Iogurte natural
• Vitamina de frutas

JANTAR:
• Proteína magra (120g)
• Vegetais refogados
• Salada
• Carboidrato (se necessário)

═══════════════════════════════════════════════════

HÁBITOS SAUDÁVEIS

DIÁRIOS:
□ Beber 2-3L de água
□ Dormir 7-9 horas
□ Fazer refeições regulares
□ Movimentar-se a cada hora

SEMANAIS:
□ Preparar refeições
□ Fazer compras saudáveis
□ Avaliar progresso
□ Planejar próxima semana

MENSAIS:
□ Tirar medidas corporais
□ Atualizar fotos do progresso
□ Revisar objetivos
□ Ajustar plano se necessário

═══════════════════════════════════════════════════

FRASES MOTIVACIONAIS

"A disciplina é a ponte entre objetivos e conquistas."

"Seu corpo pode fazer isso. É sua mente que você precisa convencer."

"Não se trata de ser perfeito, se trata de ser melhor que ontem."

"Cada treino é um investimento no seu futuro eu."

═══════════════════════════════════════════════════

Gerado por VerdeFit
Data: ${new Date().toLocaleDateString('pt-BR')}
    `;
  };

  const downloadPDF = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verdefit-plano-${userProfile?.nome?.toLowerCase().replace(/\s+/g, '-') || 'usuario'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Baixe seu plano 📄">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
            Complete seu perfil primeiro
          </h2>
          <p className="text-gray-600 mb-8">
            Para gerar seu PDF personalizado, precisamos conhecer suas informações.
          </p>
          <button
            onClick={() => setCurrentPage('profile')}
            className="bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors"
          >
            Criar Perfil
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton title="Baixe seu plano 📄">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {!isPro ? (
          // Free User - Upgrade Required
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-[#1B1B1B] mb-4">
              Recurso Premium
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              O download do seu plano em PDF está disponível apenas para usuários Pro.
            </p>

            <div className="bg-white border-2 border-[#1DB954] rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-[#1B1B1B] mb-4">
                O que você ganha com o Pro:
              </h3>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3"></div>
                  <span>Download do plano completo em PDF</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3"></div>
                  <span>Planos mais detalhados e personalizados</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3"></div>
                  <span>Dicas motivacionais ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3"></div>
                  <span>Atualizações do plano com IA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentPage('pricing')}
              className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Upgrade para Pro - R$ 19,90/mês
            </button>
          </div>
        ) : (
          // Pro User - Generate PDF
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-6">
              {isGenerating ? (
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FileText className="w-8 h-8 text-white" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              {isGenerating ? 'Gerando seu PDF...' : 'Seu PDF está pronto!'}
            </h2>
            
            <p className="text-gray-600 mb-8">
              {isGenerating 
                ? 'Aguarde enquanto criamos seu plano completo em PDF'
                : 'Baixe seu plano fitness completo e formatado para impressão'
              }
            </p>

            {isGenerating ? (
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Coletando informações do perfil</span>
                    <div className="w-4 h-4 bg-[#1DB954] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gerando plano de treino</span>
                    <div className="w-4 h-4 bg-[#1DB954] rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Criando recomendações alimentares</span>
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Formatando documento</span>
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Preview Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-left">
                  <h3 className="font-semibold text-[#1B1B1B] mb-4">Seu PDF incluirá:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>✓ Perfil completo</div>
                    <div>✓ Recomendações alimentares</div>
                    <div>✓ Plano de treino semanal</div>
                    <div>✓ Checklist de hábitos</div>
                    <div>✓ Dicas motivacionais</div>
                    <div>✓ Espaço para anotações</div>
                  </div>
                </div>

                <button
                  onClick={generatePDF}
                  className="bg-[#1DB954] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 mx-auto"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar PDF Completo</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PDFPage;