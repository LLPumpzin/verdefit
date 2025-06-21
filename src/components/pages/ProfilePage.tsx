import React, { useState } from 'react';
import { User, Target, Activity, Calendar, Heart, MapPin, Clock, Utensils, Brain, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import Layout from '../Layout';

const ProfilePage: React.FC = () => {
  const { setCurrentPage, setUserProfile } = useApp();
  const [formData, setFormData] = useState<UserProfile>({
    // Informações Básicas
    nome: '',
    idade: 0,
    peso: 0,
    altura: 0,
    genero: 'Masculino',
    
    // Objetivos e Experiência
    objetivo: 'Perder peso',
    nivel: 'Iniciante',
    experienciaAnterior: '',
    
    // Rotina e Disponibilidade
    frequencia: '3-4',
    tempoTreino: '30-45min',
    periodoPreferido: 'Flexível',
    localTreino: 'Casa',
    
    // Saúde e Limitações
    condicoesMedicas: '',
    medicamentos: '',
    lesoes: '',
    restricoes: '',
    
    // Estilo de Vida
    nivelAtividade: 'Sedentário',
    profissao: '',
    horasSono: '7-8h',
    nivelEstresse: 'Moderado',
    
    // Alimentação
    tipoAlimentacao: 'Onívoro',
    alergias: '',
    suplementos: '',
    consumoAgua: '2-3L',
    
    // Motivação e Metas
    motivacaoPrincipal: '',
    metasPrazo: 'Médio prazo (3-6 meses)',
    pesoDesejado: 0,
    medidas: {
      cintura: 0,
      quadril: 0,
      bracos: 0,
      coxas: 0,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const handleInputChange = (field: keyof UserProfile | string, value: string | number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setUserProfile(formData);
      setCurrentPage('plan');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nome.trim() !== '' && formData.idade > 0 && formData.peso > 0 && formData.altura > 0;
      case 2:
        return formData.objetivo && formData.nivel;
      case 3:
        return formData.frequencia && formData.tempoTreino && formData.localTreino;
      case 4:
        return true; // Saúde é opcional mas importante
      case 5:
        return formData.nivelAtividade && formData.horasSono;
      case 6:
        return formData.tipoAlimentacao && formData.consumoAgua;
      case 7:
        return formData.motivacaoPrincipal.trim() !== '';
      case 8:
        return true; // Medidas são opcionais
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Informações Básicas',
      'Objetivos e Experiência',
      'Rotina de Treino',
      'Saúde e Limitações',
      'Estilo de Vida',
      'Hábitos Alimentares',
      'Motivação e Metas',
      'Medidas Corporais'
    ];
    return titles[currentStep - 1];
  };

  const getStepIcon = () => {
    const icons = [User, Target, Activity, Heart, Brain, Utensils, TrendingUp, MapPin];
    return icons[currentStep - 1];
  };

  const renderStep = () => {
    const StepIcon = getStepIcon();
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Vamos nos conhecer</h2>
              <p className="text-gray-600">Conte-nos suas informações básicas para personalizar seu plano</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Idade *
                </label>
                <input
                  type="number"
                  value={formData.idade || ''}
                  onChange={(e) => handleInputChange('idade', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 25"
                  min="12"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Gênero *
                </label>
                <select
                  value={formData.genero}
                  onChange={(e) => handleInputChange('genero', e.target.value as UserProfile['genero'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Peso atual (kg) *
                </label>
                <input
                  type="number"
                  value={formData.peso || ''}
                  onChange={(e) => handleInputChange('peso', parseFloat(e.target.value) || 0)}
                  placeholder="Ex: 70.5"
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Altura (cm) *
                </label>
                <input
                  type="number"
                  value={formData.altura || ''}
                  onChange={(e) => handleInputChange('altura', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 175"
                  min="100"
                  max="250"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {formData.peso > 0 && formData.altura > 0 && (
              <div className="bg-[#DFF5E1] rounded-xl p-4 mt-4">
                <p className="text-sm text-[#1B1B1B]">
                  <strong>IMC calculado:</strong> {((formData.peso / ((formData.altura / 100) ** 2)).toFixed(1))}
                  <span className="ml-2 text-gray-600">
                    ({parseFloat((formData.peso / ((formData.altura / 100) ** 2)).toFixed(1)) < 18.5 ? 'Abaixo do peso' :
                      parseFloat((formData.peso / ((formData.altura / 100) ** 2)).toFixed(1)) < 25 ? 'Peso normal' :
                      parseFloat((formData.peso / ((formData.altura / 100) ** 2)).toFixed(1)) < 30 ? 'Sobrepeso' : 'Obesidade'})
                  </span>
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Seus objetivos</h2>
              <p className="text-gray-600">Defina o que você quer alcançar e sua experiência atual</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Objetivo principal *
                </label>
                <select
                  value={formData.objetivo}
                  onChange={(e) => handleInputChange('objetivo', e.target.value as UserProfile['objetivo'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Perder peso">Perder peso</option>
                  <option value="Ganhar massa">Ganhar massa muscular</option>
                  <option value="Manter forma">Manter forma atual</option>
                  <option value="Melhorar condicionamento">Melhorar condicionamento físico</option>
                  <option value="Reabilitação">Reabilitação/Fisioterapia</option>
                  <option value="Definição muscular">Definição muscular</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Nível de experiência *
                </label>
                <select
                  value={formData.nivel}
                  onChange={(e) => handleInputChange('nivel', e.target.value as UserProfile['nivel'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Iniciante">Iniciante (0-6 meses)</option>
                  <option value="Intermediário">Intermediário (6 meses - 2 anos)</option>
                  <option value="Avançado">Avançado (2+ anos)</option>
                  <option value="Atleta">Atleta/Competidor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Experiência anterior com exercícios
                </label>
                <textarea
                  value={formData.experienciaAnterior}
                  onChange={(e) => handleInputChange('experienciaAnterior', e.target.value)}
                  placeholder="Conte sobre sua experiência: que tipos de exercício já fez, por quanto tempo, o que funcionou ou não funcionou..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Sua rotina de treino</h2>
              <p className="text-gray-600">Vamos personalizar para seu tempo e preferências</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Frequência semanal *
                </label>
                <select
                  value={formData.frequencia}
                  onChange={(e) => handleInputChange('frequencia', e.target.value as UserProfile['frequencia'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="1-2">1-2 dias por semana</option>
                  <option value="3-4">3-4 dias por semana</option>
                  <option value="5-6">5-6 dias por semana</option>
                  <option value="Todos os dias">Todos os dias</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Tempo por treino *
                </label>
                <select
                  value={formData.tempoTreino}
                  onChange={(e) => handleInputChange('tempoTreino', e.target.value as UserProfile['tempoTreino'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="15-30min">15-30 minutos</option>
                  <option value="30-45min">30-45 minutos</option>
                  <option value="45-60min">45-60 minutos</option>
                  <option value="60-90min">60-90 minutos</option>
                  <option value="Mais de 90min">Mais de 90 minutos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Período preferido *
                </label>
                <select
                  value={formData.periodoPreferido}
                  onChange={(e) => handleInputChange('periodoPreferido', e.target.value as UserProfile['periodoPreferido'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Manhã">Manhã (6h-12h)</option>
                  <option value="Tarde">Tarde (12h-18h)</option>
                  <option value="Noite">Noite (18h-22h)</option>
                  <option value="Flexível">Flexível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Local de treino *
                </label>
                <select
                  value={formData.localTreino}
                  onChange={(e) => handleInputChange('localTreino', e.target.value as UserProfile['localTreino'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Casa">Em casa</option>
                  <option value="Academia">Academia</option>
                  <option value="Parque/Ar livre">Parque/Ar livre</option>
                  <option value="Híbrido">Híbrido (casa + academia)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Saúde e limitações</h2>
              <p className="text-gray-600">Informações importantes para sua segurança no treino</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Condições médicas
                </label>
                <textarea
                  value={formData.condicoesMedicas}
                  onChange={(e) => handleInputChange('condicoesMedicas', e.target.value)}
                  placeholder="Diabetes, hipertensão, problemas cardíacos, etc. (deixe em branco se não tiver)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Medicamentos em uso
                </label>
                <textarea
                  value={formData.medicamentos}
                  onChange={(e) => handleInputChange('medicamentos', e.target.value)}
                  placeholder="Liste medicamentos que podem afetar o exercício (deixe em branco se não tomar)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Lesões ou limitações físicas
                </label>
                <textarea
                  value={formData.lesoes}
                  onChange={(e) => handleInputChange('lesoes', e.target.value)}
                  placeholder="Lesões no joelho, ombro, coluna, etc. Qualquer limitação de movimento"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Sempre consulte um médico antes de iniciar qualquer programa de exercícios, especialmente se você tem condições médicas ou toma medicamentos.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Estilo de vida</h2>
              <p className="text-gray-600">Como é seu dia a dia? Isso afeta seu plano de treino</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Nível de atividade diária *
                </label>
                <select
                  value={formData.nivelAtividade}
                  onChange={(e) => handleInputChange('nivelAtividade', e.target.value as UserProfile['nivelAtividade'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Sedentário">Sedentário (trabalho de mesa, pouco movimento)</option>
                  <option value="Levemente ativo">Levemente ativo (caminhadas ocasionais)</option>
                  <option value="Moderadamente ativo">Moderadamente ativo (exercício 1-3x/semana)</option>
                  <option value="Muito ativo">Muito ativo (exercício 4-6x/semana)</option>
                  <option value="Extremamente ativo">Extremamente ativo (exercício diário intenso)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Horas de sono por noite *
                </label>
                <select
                  value={formData.horasSono}
                  onChange={(e) => handleInputChange('horasSono', e.target.value as UserProfile['horasSono'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="4-5h">4-5 horas</option>
                  <option value="5-6h">5-6 horas</option>
                  <option value="6-7h">6-7 horas</option>
                  <option value="7-8h">7-8 horas</option>
                  <option value="8+h">8+ horas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Nível de estresse
                </label>
                <select
                  value={formData.nivelEstresse}
                  onChange={(e) => handleInputChange('nivelEstresse', e.target.value as UserProfile['nivelEstresse'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Baixo">Baixo</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Alto">Alto</option>
                  <option value="Muito alto">Muito alto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Profissão/Ocupação
                </label>
                <input
                  type="text"
                  value={formData.profissao}
                  onChange={(e) => handleInputChange('profissao', e.target.value)}
                  placeholder="Ex: Programador, Professor, Vendedor..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Hábitos alimentares</h2>
              <p className="text-gray-600">Sua alimentação é fundamental para alcançar seus objetivos</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Tipo de alimentação *
                </label>
                <select
                  value={formData.tipoAlimentacao}
                  onChange={(e) => handleInputChange('tipoAlimentacao', e.target.value as UserProfile['tipoAlimentacao'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Onívoro">Onívoro (como de tudo)</option>
                  <option value="Vegetariano">Vegetariano</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Flexitariano">Flexitariano</option>
                  <option value="Cetogênico">Cetogênico</option>
                  <option value="Paleo">Paleo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Consumo de água diário *
                </label>
                <select
                  value={formData.consumoAgua}
                  onChange={(e) => handleInputChange('consumoAgua', e.target.value as UserProfile['consumoAgua'])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                >
                  <option value="Menos de 1L">Menos de 1L</option>
                  <option value="1-2L">1-2 litros</option>
                  <option value="2-3L">2-3 litros</option>
                  <option value="3L+">3+ litros</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Alergias alimentares
                </label>
                <textarea
                  value={formData.alergias}
                  onChange={(e) => handleInputChange('alergias', e.target.value)}
                  placeholder="Lactose, glúten, amendoim, frutos do mar, etc."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Suplementos que usa
                </label>
                <textarea
                  value={formData.suplementos}
                  onChange={(e) => handleInputChange('suplementos', e.target.value)}
                  placeholder="Whey protein, creatina, vitaminas, etc."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Motivação e metas</h2>
              <p className="text-gray-600">O que te motiva? Vamos definir suas metas específicas</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Sua principal motivação *
                </label>
                <textarea
                  value={formData.motivacaoPrincipal}
                  onChange={(e) => handleInputChange('motivacaoPrincipal', e.target.value)}
                  placeholder="O que te motiva a treinar? Ex: Ter mais energia, melhorar autoestima, ser exemplo para os filhos, competir..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Prazo para suas metas
                  </label>
                  <select
                    value={formData.metasPrazo}
                    onChange={(e) => handleInputChange('metasPrazo', e.target.value as UserProfile['metasPrazo'])}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                  >
                    <option value="Curto prazo (1-3 meses)">Curto prazo (1-3 meses)</option>
                    <option value="Médio prazo (3-6 meses)">Médio prazo (3-6 meses)</option>
                    <option value="Longo prazo (6+ meses)">Longo prazo (6+ meses)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Peso desejado (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.pesoDesejado || ''}
                    onChange={(e) => handleInputChange('pesoDesejado', parseFloat(e.target.value) || 0)}
                    placeholder="Ex: 65"
                    min="30"
                    max="300"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#DFF5E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-8 h-8 text-[#1DB954]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Medidas corporais</h2>
              <p className="text-gray-600">Opcional: Para acompanhar melhor seu progresso (você pode pular esta etapa)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Cintura (cm)
                </label>
                <input
                  type="number"
                  value={formData.medidas?.cintura || ''}
                  onChange={(e) => handleInputChange('medidas.cintura', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 80"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Quadril (cm)
                </label>
                <input
                  type="number"
                  value={formData.medidas?.quadril || ''}
                  onChange={(e) => handleInputChange('medidas.quadril', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 95"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Braços (cm)
                </label>
                <input
                  type="number"
                  value={formData.medidas?.bracos || ''}
                  onChange={(e) => handleInputChange('medidas.bracos', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 30"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Coxas (cm)
                </label>
                <input
                  type="number"
                  value={formData.medidas?.coxas || ''}
                  onChange={(e) => handleInputChange('medidas.coxas', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 55"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Dica:</strong> Tire fotos do "antes" para comparar com o progresso. As medidas ajudam a acompanhar mudanças que a balança não mostra!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout showBackButton title="Monte seu perfil fitness">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1B1B1B]">{getStepTitle()}</h1>
              <p className="text-gray-600">Etapa {currentStep} de {totalSteps}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#1DB954]">{Math.round((currentStep / totalSteps) * 100)}%</div>
              <div className="text-sm text-gray-500">Completo</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i + 1 <= currentStep
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-8 py-4 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            ← Voltar
          </button>
          
          <div className="flex space-x-4">
            {currentStep === totalSteps && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-4 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                Revisar
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === totalSteps ? '🎯 Criar Meu Plano' : 'Próximo →'}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500">
          <p>Todas as informações são privadas e usadas apenas para personalizar seu plano</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;