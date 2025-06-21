import React, { useState } from 'react';
import { ArrowLeft, User, Target, TrendingUp, FileText, CreditCard, Settings, LogOut, Edit, Bell, Shield, HelpCircle, X, Home, Activity, Utensils, Users, Award, BarChart3, Calendar, Moon, Sun, Globe, Smartphone, Mail, Eye, EyeOff, Save, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false, title }) => {
  const { currentPage, setCurrentPage, isPro, setIsPro, userProfile, userSettings, setUserSettings, notifications } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'account' | 'notifications' | 'privacy' | 'preferences'>('account');

  const navigationItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' as PageType },
    { icon: Target, label: 'Plano', page: 'plan' as PageType },
    { icon: Activity, label: 'Treinos', page: 'workouts' as PageType },
    { icon: BarChart3, label: 'Progresso', page: 'progress' as PageType },
    { icon: Utensils, label: 'Nutrição', page: 'nutrition' as PageType },
    { icon: Users, label: 'Comunidade', page: 'community' as PageType },
    { icon: Award, label: 'Conquistas', page: 'achievements' as PageType },
    { icon: TrendingUp, label: 'Dicas', page: 'tips' as PageType },
  ];

  const handleBack = () => {
    if (currentPage === 'profile') {
      setCurrentPage('welcome');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentPage('welcome');
    setShowSettings(false);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const updateSettings = (section: keyof typeof userSettings, key: string, value: any) => {
    setUserSettings({
      ...userSettings,
      [section]: {
        ...userSettings[section],
        [key]: value
      }
    });
  };

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Settings Sidebar */}
          <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1B1B1B]">Configurações</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'account', label: 'Conta', icon: User },
                { id: 'notifications', label: 'Notificações', icon: Bell },
                { id: 'privacy', label: 'Privacidade', icon: Shield },
                { id: 'preferences', label: 'Preferências', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors text-left ${
                    settingsTab === tab.id
                      ? 'bg-[#1DB954] text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[90vh]">
            {settingsTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Informações da Conta</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {userProfile?.nome?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#1B1B1B]">{userProfile?.nome || 'Usuário'}</div>
                        <div className="text-gray-500">usuario@email.com</div>
                        <div className="text-sm text-[#1DB954] font-medium">
                          {isPro ? 'Membro Pro' : 'Membro Gratuito'}
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors">
                        Editar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                        <input
                          type="text"
                          value={userProfile?.nome || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value="usuario@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Alterar Senha</h4>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Senha atual"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Nova senha"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Confirmar nova senha"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Assinatura</h4>
                      <div className="bg-[#DFF5E1] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-[#1B1B1B]">
                              {isPro ? 'Plano Pro' : 'Plano Gratuito'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {isPro ? 'R$ 19,90/mês • Próxima cobrança: 15/02/2025' : 'Upgrade para desbloquear recursos premium'}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setShowSettings(false);
                              setCurrentPage('pricing');
                            }}
                            className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors"
                          >
                            {isPro ? 'Gerenciar' : 'Upgrade'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {settingsTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Notificações</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Lembretes de Treino</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'workoutReminders', label: 'Lembrar de treinar', desc: 'Receba notificações nos horários dos seus treinos' },
                          { key: 'progressUpdates', label: 'Atualizações de progresso', desc: 'Notificações sobre seu progresso semanal' },
                          { key: 'motivationalTips', label: 'Dicas motivacionais', desc: 'Receba dicas diárias para manter a motivação' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-[#1B1B1B]">{item.label}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={userSettings.notifications[item.key as keyof typeof userSettings.notifications]}
                                onChange={(e) => updateSettings('notifications', item.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Canais de Notificação</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'emailNotifications', label: 'Email', desc: 'Receber notificações por email', icon: Mail },
                          { key: 'pushNotifications', label: 'Push', desc: 'Notificações no dispositivo', icon: Smartphone },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5 text-gray-600" />
                              <div>
                                <div className="font-medium text-[#1B1B1B]">{item.label}</div>
                                <div className="text-sm text-gray-600">{item.desc}</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={userSettings.notifications[item.key as keyof typeof userSettings.notifications]}
                                onChange={(e) => updateSettings('notifications', item.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {settingsTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Privacidade e Segurança</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Visibilidade do Perfil</h4>
                      <select
                        value={userSettings.privacy.profileVisibility}
                        onChange={(e) => updateSettings('privacy', 'profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                      >
                        <option value="public">Público</option>
                        <option value="friends">Apenas amigos</option>
                        <option value="private">Privado</option>
                      </select>
                      <p className="text-sm text-gray-600 mt-2">
                        Controle quem pode ver seu perfil e informações
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Compartilhamento</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'shareProgress', label: 'Compartilhar progresso', desc: 'Permitir que outros vejam seu progresso' },
                          { key: 'shareWorkouts', label: 'Compartilhar treinos', desc: 'Permitir que outros vejam seus treinos' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-[#1B1B1B]">{item.label}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={userSettings.privacy[item.key as keyof typeof userSettings.privacy]}
                                onChange={(e) => updateSettings('privacy', item.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DB954]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DB954]"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-medium text-red-800 mb-3">Zona de Perigo</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Excluir Conta
                        </button>
                        <p className="text-sm text-red-600">
                          Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {settingsTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Preferências</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Aparência</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 'light', label: 'Claro', icon: Sun },
                              { value: 'dark', label: 'Escuro', icon: Moon },
                              { value: 'auto', label: 'Auto', icon: Settings },
                            ].map((theme) => (
                              <button
                                key={theme.value}
                                onClick={() => updateSettings('preferences', 'theme', theme.value)}
                                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                                  userSettings.preferences.theme === theme.value
                                    ? 'border-[#1DB954] bg-[#DFF5E1]'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <theme.icon className="w-5 h-5 mb-1" />
                                <span className="text-sm font-medium">{theme.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Unidades e Formato</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sistema de medidas</label>
                          <select
                            value={userSettings.preferences.units}
                            onChange={(e) => updateSettings('preferences', 'units', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                          >
                            <option value="metric">Métrico (kg, cm)</option>
                            <option value="imperial">Imperial (lb, ft)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Início da semana</label>
                          <select
                            value={userSettings.preferences.startOfWeek}
                            onChange={(e) => updateSettings('preferences', 'startOfWeek', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                          >
                            <option value="monday">Segunda-feira</option>
                            <option value="sunday">Domingo</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-[#1B1B1B] mb-3">Idioma</h4>
                      <select
                        value={userSettings.preferences.language}
                        onChange={(e) => updateSettings('preferences', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da conta</span>
                </button>
                
                <button className="flex items-center space-x-2 px-6 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Salvar alterações</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1B1B1B]">Notificações</h2>
          <button
            onClick={() => setShowNotifications(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors ${
                  notification.read
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1B1B1B] mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <button className="w-full px-4 py-2 text-[#1DB954] hover:bg-[#DFF5E1] rounded-lg transition-colors">
            Marcar todas como lidas
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {showBackButton && (
                  <button
                    onClick={handleBack}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <span className="text-xl font-bold text-[#1B1B1B]">VerdeFit</span>
                </div>
                {title && (
                  <>
                    <div className="hidden md:block text-gray-400">
                      <span>•</span>
                    </div>
                    <h1 className="hidden md:block text-lg font-semibold text-[#1B1B1B]">
                      {title}
                    </h1>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {isPro && (
                  <span className="px-3 py-1 bg-[#DFF5E1] text-[#1DB954] text-sm font-medium rounded-full">
                    Pro
                  </span>
                )}
                
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <nav className="w-64 bg-white border-r border-gray-100 min-h-screen p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors text-left ${
                    currentPage === item.page
                      ? 'bg-[#1DB954] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* User Profile in Sidebar */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userProfile?.nome?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#1B1B1B] truncate">
                    {userProfile?.nome || 'Usuário'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isPro ? 'Membro Pro' : 'Membro Gratuito'}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <main className="pb-20">
            {children}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2">
            <div className="flex items-center justify-around">
              {navigationItems.slice(0, 5).map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'text-[#1DB954]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal />}
      {showNotifications && <NotificationsModal />}
    </>
  );
};

export default Layout;