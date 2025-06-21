import React, { useState } from 'react';
import { Play, Zap, Target, Users, Star, ArrowRight, CheckCircle, TrendingUp, Crown, X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const WelcomePage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const features = [
    {
      icon: Zap,
      title: 'IA Personalizada',
      description: 'Algoritmos avançados criam planos únicos baseados no seu DNA fitness',
      highlight: 'Tecnologia exclusiva',
    },
    {
      icon: Target,
      title: 'Resultados Garantidos',
      description: 'Metodologia comprovada com 95% de taxa de sucesso dos usuários',
      highlight: '95% de sucesso',
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Junte-se a mais de 50.000 pessoas transformando suas vidas',
      highlight: '+50k usuários',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Perdeu 15kg em 4 meses',
      content: 'O VerdeFit mudou completamente minha relação com exercícios. Nunca pensei que seria tão fácil!',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'João Santos',
      role: 'Ganhou 8kg de massa magra',
      content: 'Planos super detalhados e personalizados. Finalmente consegui os resultados que sempre quis.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Ana Costa',
      role: 'Mantém forma há 2 anos',
      content: 'A consistência que o app me trouxe é incrível. Treino virou hábito natural na minha vida.',
      rating: 5,
      image: '👩‍🎓'
    },
    {
      name: 'Carlos Mendes',
      role: 'Perdeu 22kg em 6 meses',
      content: 'Depois de tentar várias dietas, o VerdeFit foi o único que realmente funcionou para mim.',
      rating: 5,
      image: '👨‍🔧'
    },
    {
      name: 'Fernanda Lima',
      role: 'Ganhou confiança e saúde',
      content: 'Não é só sobre o corpo, é sobre como me sinto. O VerdeFit transformou minha autoestima.',
      rating: 5,
      image: '👩‍🏫'
    },
    {
      name: 'Roberto Alves',
      role: 'Voltou a treinar aos 45',
      content: 'Achei que era tarde demais, mas o VerdeFit me mostrou que nunca é tarde para começar.',
      rating: 5,
      image: '👨‍⚕️'
    }
  ];

  const benefits = [
    'Plano personalizado em menos de 2 minutos',
    'Acompanhamento nutricional completo',
    'Exercícios adaptados ao seu nível',
    'Motivação diária com dicas exclusivas',
    'Resultados visíveis em 30 dias',
    'Suporte especializado 24/7',
  ];

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
        'Suporte por email'
      ],
      limitations: [
        'Sem download de PDF',
        'Planos básicos',
        'Dicas limitadas'
      ],
      buttonText: 'Começar Grátis',
      buttonStyle: 'bg-white border-2 border-[#1DB954] text-[#1DB954] hover:bg-[#DFF5E1]',
      icon: Zap,
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 19,90',
      period: 'por mês',
      description: 'Para quem quer resultados máximos',
      features: [
        'Plano fitness + alimentação detalhado',
        'Download de plano em PDF profissional',
        'Dicas motivacionais ilimitadas',
        'Evolução do plano com IA avançada',
        'Planos avançados e personalizados',
        'Suporte prioritário via WhatsApp',
        'Atualizações mensais automáticas',
        'Acesso antecipado a novos recursos'
      ],
      limitations: [],
      buttonText: 'Começar Pro',
      buttonStyle: 'bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white hover:shadow-xl',
      icon: Crown,
      popular: true
    }
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setShowAuthModal(false);
    setCurrentPage('profile');
  };

  const handleStartPlan = (planType: 'free' | 'pro') => {
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FDF9] to-[#DFF5E1] overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1DB954]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1DB954]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-3xl">💪</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6 mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-[#1B1B1B] leading-tight">
                  Transforme seu
                  <span className="block bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent">
                    corpo com IA
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  O primeiro consultor fitness com inteligência artificial do Brasil. 
                  <span className="font-semibold text-[#1DB954]"> Planos personalizados em segundos</span>, 
                  resultados reais em semanas.
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-[#1DB954] rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-[#1ed760] rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-[#22c55e] rounded-full border-2 border-white"></div>
                  </div>
                  <span className="font-medium">+50.000 usuários ativos</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">4.9/5 (2.847 avaliações)</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <button
                  onClick={() => handleStartPlan('free')}
                  className="group bg-gradient-to-r from-[#1DB954] to-[#1ed760] hover:from-[#1ed760] hover:to-[#22c55e] text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                >
                  <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  <span>Criar meu plano grátis</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-sm text-gray-500">
                  ✨ Sem cartão de crédito • Resultados em 2 minutos • Cancelamento gratuito
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B1B1B] mb-6">
              Por que escolher o <span className="text-[#1DB954]">VerdeFit</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia de ponta encontra expertise fitness para criar a experiência mais personalizada do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-50 hover:border-[#1DB954]/20 transform hover:-translate-y-2"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#DFF5E1] to-[#1DB954]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-[#1DB954]" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[#1DB954] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {feature.highlight}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#1B1B1B] mb-4 group-hover:text-[#1DB954] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-[#1B1B1B] mb-6">
                Escolha seu <span className="text-[#1DB954]">plano ideal</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comece grátis e faça upgrade quando quiser mais recursos personalizados
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'border-[#1DB954] shadow-2xl'
                      : 'border-gray-100 hover:border-gray-200 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        🔥 Mais Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      plan.popular ? 'bg-gradient-to-br from-[#1DB954] to-[#1ed760]' : 'bg-gray-100'
                    }`}>
                      <plan.icon className={`w-8 h-8 ${
                        plan.popular ? 'text-white' : 'text-gray-600'
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
                          <CheckCircle className="w-5 h-5 text-[#1DB954] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Limitações:</h5>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start">
                              <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0">
                                <div className="w-1 h-3 bg-gray-300 rounded-full mx-auto"></div>
                              </div>
                              <span className="text-gray-400 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleStartPlan(plan.name === 'Pro' ? 'pro' : 'free')}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-3xl p-12 text-white mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Tudo que você precisa em um só lugar
              </h3>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Não perca mais tempo com apps complicados. O VerdeFit simplifica sua jornada fitness.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle className="w-6 h-6 text-green-200 flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-[#1B1B1B] mb-4">
                Histórias de <span className="text-[#1DB954]">transformação</span>
              </h3>
              <p className="text-xl text-gray-600">
                Veja como o VerdeFit está mudando vidas reais todos os dias
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-white text-xl mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1B1B1B]">{testimonial.name}</div>
                      <div className="text-sm text-[#1DB954] font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-50">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[#1B1B1B] mb-4">
                Números que impressionam
              </h3>
              <p className="text-lg text-gray-600">
                Resultados comprovados por milhares de usuários satisfeitos
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#1DB954] mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Planos criados</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#1DB954] mb-2">95%</div>
                <div className="text-gray-600 font-medium">Taxa de sucesso</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#1DB954] mb-2">2min</div>
                <div className="text-gray-600 font-medium">Para criar plano</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#1DB954] mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Suporte ativo</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-[#1B1B1B] to-[#2D2D2D] rounded-3xl p-12 text-white">
              <h3 className="text-4xl font-bold mb-6">
                Pronto para transformar sua vida?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já descobriram o poder da IA aplicada ao fitness. 
                Seu novo corpo está a apenas alguns cliques de distância.
              </p>
              
              <button
                onClick={() => handleStartPlan('free')}
                className="group bg-gradient-to-r from-[#1DB954] to-[#1ed760] hover:from-[#1ed760] hover:to-[#22c55e] text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
              >
                <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <span>Começar transformação agora</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-sm text-gray-400 mt-4">
                Comece grátis hoje • Sem compromisso • Resultados garantidos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#1B1B1B]">
                {authMode === 'login' ? 'Entrar na sua conta' : 'Criar conta grátis'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Digite seu nome"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Sua senha"
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {authMode === 'login' ? 'Entrar' : 'Criar conta e começar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {authMode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-[#1DB954] font-semibold ml-1 hover:underline"
                >
                  {authMode === 'login' ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>

            {authMode === 'register' && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;