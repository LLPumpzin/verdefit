export interface UserProfile {
  // Informações Básicas
  nome: string;
  idade: number;
  peso: number;
  altura: number;
  genero: 'Masculino' | 'Feminino' | 'Outro';
  
  // Objetivos e Experiência
  objetivo: 'Perder peso' | 'Ganhar massa' | 'Manter forma' | 'Melhorar condicionamento' | 'Reabilitação' | 'Definição muscular';
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Atleta';
  experienciaAnterior: string;
  
  // Rotina e Disponibilidade
  frequencia: '1-2' | '3-4' | '5-6' | 'Todos os dias';
  tempoTreino: '15-30min' | '30-45min' | '45-60min' | '60-90min' | 'Mais de 90min';
  periodoPreferido: 'Manhã' | 'Tarde' | 'Noite' | 'Flexível';
  localTreino: 'Casa' | 'Academia' | 'Parque/Ar livre' | 'Híbrido';
  
  // Saúde e Limitações
  condicoesMedicas: string;
  medicamentos: string;
  lesoes: string;
  restricoes: string;
  
  // Estilo de Vida
  nivelAtividade: 'Sedentário' | 'Levemente ativo' | 'Moderadamente ativo' | 'Muito ativo' | 'Extremamente ativo';
  profissao: string;
  horasSono: '4-5h' | '5-6h' | '6-7h' | '7-8h' | '8+h';
  nivelEstresse: 'Baixo' | 'Moderado' | 'Alto' | 'Muito alto';
  
  // Alimentação
  tipoAlimentacao: 'Onívoro' | 'Vegetariano' | 'Vegano' | 'Flexitariano' | 'Cetogênico' | 'Paleo';
  alergias: string;
  suplementos: string;
  consumoAgua: 'Menos de 1L' | '1-2L' | '2-3L' | '3L+';
  
  // Motivação e Metas
  motivacaoPrincipal: string;
  metasPrazo: 'Curto prazo (1-3 meses)' | 'Médio prazo (3-6 meses)' | 'Longo prazo (6+ meses)';
  pesoDesejado?: number;
  medidas?: {
    cintura?: number;
    quadril?: number;
    bracos?: number;
    coxas?: number;
  };
}

export interface WorkoutSession {
  id: string;
  date: string;
  duration: number;
  exercises: Exercise[];
  completed: boolean;
  notes?: string;
  rating?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
}

export interface ProgressData {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  isPopular?: boolean;
}

export type PageType = 'welcome' | 'profile' | 'plan' | 'tips' | 'pdf' | 'pricing' | 'dashboard' | 'progress' | 'workouts' | 'nutrition' | 'community' | 'achievements';

export interface UserSettings {
  notifications: {
    workoutReminders: boolean;
    progressUpdates: boolean;
    motivationalTips: boolean;
    communityUpdates: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    shareProgress: boolean;
    shareWorkouts: boolean;
  };
  preferences: {
    units: 'metric' | 'imperial';
    language: 'pt-BR' | 'en-US';
    theme: 'light' | 'dark' | 'auto';
    startOfWeek: 'monday' | 'sunday';
  };
}