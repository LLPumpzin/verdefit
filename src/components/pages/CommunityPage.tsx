import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Plus, Search, Filter, Trophy, Camera, MapPin, Calendar, Star, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';

const CommunityPage: React.FC = () => {
  const { userProfile, isPro, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'challenges' | 'leaderboard'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');

  // Mock community data
  const posts = [
    {
      id: '1',
      user: {
        name: 'Maria Silva',
        avatar: '👩‍💼',
        level: 'Pro',
        location: 'São Paulo, SP',
      },
      content: 'Acabei de completar meu primeiro mês de treino! 🎉 Perdi 3kg e me sinto muito mais disposta. Obrigada VerdeFit pela motivação diária!',
      image: null,
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2h',
      liked: false,
    },
    {
      id: '2',
      user: {
        name: 'João Santos',
        avatar: '👨‍💻',
        level: 'Iniciante',
        location: 'Rio de Janeiro, RJ',
      },
      content: 'Dica para quem está começando: não desistam nos primeiros dias! A terceira semana é quando tudo fica mais fácil. Persistam! 💪',
      image: null,
      likes: 45,
      comments: 12,
      shares: 7,
      timestamp: '4h',
      liked: true,
    },
    {
      id: '3',
      user: {
        name: 'Ana Costa',
        avatar: '👩‍🎓',
        level: 'Pro',
        location: 'Belo Horizonte, MG',
      },
      content: 'Receita fit do dia: Panqueca de aveia com banana! Super fácil e deliciosa. Quem quer a receita? 🥞',
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 67,
      comments: 23,
      shares: 15,
      timestamp: '6h',
      liked: false,
    },
  ];

  const groups = [
    {
      id: '1',
      name: 'Mães Fitness',
      description: 'Grupo para mães que querem manter a forma',
      members: 1247,
      image: '👶',
      category: 'Lifestyle',
      joined: true,
    },
    {
      id: '2',
      name: 'Treino em Casa',
      description: 'Dicas e motivação para treinar em casa',
      members: 3456,
      image: '🏠',
      category: 'Treino',
      joined: false,
    },
    {
      id: '3',
      name: 'Receitas Fit',
      description: 'Compartilhe e descubra receitas saudáveis',
      members: 2189,
      image: '🥗',
      category: 'Nutrição',
      joined: true,
    },
  ];

  const challenges = [
    {
      id: '1',
      name: 'Desafio 30 Dias',
      description: 'Complete 30 dias consecutivos de treino',
      participants: 892,
      daysLeft: 15,
      progress: 50,
      reward: '🏆 Medalha de Consistência',
      joined: true,
    },
    {
      id: '2',
      name: 'Hidratação Total',
      description: 'Beba 8 copos de água por 7 dias',
      participants: 1456,
      daysLeft: 3,
      progress: 85,
      reward: '💧 Badge Hidratação',
      joined: true,
    },
    {
      id: '3',
      name: 'Flexibilidade Plus',
      description: 'Faça alongamento todos os dias por 2 semanas',
      participants: 567,
      daysLeft: 8,
      progress: 0,
      reward: '🧘‍♀️ Certificado Zen',
      joined: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Carlos Mendes', points: 2450, avatar: '👨‍🔧', streak: 45 },
    { rank: 2, name: 'Ana Costa', points: 2380, avatar: '👩‍🎓', streak: 38 },
    { rank: 3, name: 'Maria Silva', points: 2210, avatar: '👩‍💼', streak: 32 },
    { rank: 4, name: 'João Santos', points: 2150, avatar: '👨‍💻', streak: 28 },
    { rank: 5, name: 'Fernanda Lima', points: 2090, avatar: '👩‍🏫', streak: 25 },
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Add post logic here
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const handleLike = (postId: string) => {
    // Like logic here
  };

  if (!userProfile) {
    return (
      <Layout showBackButton title="Comunidade">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-4">
              Complete seu perfil primeiro
            </h2>
            <p className="text-gray-600 mb-8">
              Para participar da comunidade, precisamos conhecer suas informações.
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
    <Layout showBackButton title="Comunidade VerdeFit 👥">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">Comunidade</h1>
            <p className="text-gray-600">Conecte-se, inspire-se e alcance seus objetivos juntos</p>
          </div>
          
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex items-center space-x-2 bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1ed760] transition-colors mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>Criar Post</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {[
            { key: 'feed', label: 'Feed', icon: MessageCircle },
            { key: 'groups', label: 'Grupos', icon: Users },
            { key: 'challenges', label: 'Desafios', icon: Trophy },
            { key: 'leaderboard', label: 'Ranking', icon: Star },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-[#1DB954] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-white text-xl">
                      {post.user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-[#1B1B1B]">{post.user.name}</h3>
                        {post.user.level === 'Pro' && (
                          <span className="px-2 py-1 bg-[#DFF5E1] text-[#1DB954] text-xs font-medium rounded-full">
                            Pro
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{post.user.location}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-[#1DB954] transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-[#1DB954] transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Seu Perfil</h3>
                
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl">
                    {userProfile.nome.charAt(0).toUpperCase()}
                  </div>
                  <h4 className="font-semibold text-[#1B1B1B]">{userProfile.nome}</h4>
                  <p className="text-sm text-gray-600">{isPro ? 'Membro Pro' : 'Membro Gratuito'}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-[#1DB954]">156</div>
                    <div className="text-xs text-gray-600">Seguidores</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#1DB954]">89</div>
                    <div className="text-xs text-gray-600">Seguindo</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#1DB954]">23</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                </div>
              </div>

              {/* Trending Groups */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Grupos em Alta</h3>
                
                <div className="space-y-3">
                  {groups.slice(0, 3).map((group) => (
                    <div key={group.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {group.image}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#1B1B1B] text-sm">{group.name}</div>
                        <div className="text-xs text-gray-600">{group.members.toLocaleString()} membros</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('groups')}
                  className="w-full mt-4 px-4 py-2 text-[#1DB954] border border-[#1DB954] rounded-lg hover:bg-[#DFF5E1] transition-colors"
                >
                  Ver Todos os Grupos
                </button>
              </div>

              {/* Active Challenges */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Desafios Ativos</h3>
                
                <div className="space-y-3">
                  {challenges.filter(c => c.joined).map((challenge) => (
                    <div key={challenge.id} className="p-3 bg-[#DFF5E1] rounded-xl">
                      <div className="font-medium text-[#1B1B1B] text-sm mb-1">{challenge.name}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{challenge.daysLeft} dias restantes</span>
                        <span className="text-[#1DB954] font-medium">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-1.5 mt-2">
                        <div
                          className="bg-[#1DB954] h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('challenges')}
                  className="w-full mt-4 px-4 py-2 text-[#1DB954] border border-[#1DB954] rounded-lg hover:bg-[#DFF5E1] transition-colors"
                >
                  Ver Todos os Desafios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                    {group.image}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>{group.members.toLocaleString()} membros</span>
                    <span>•</span>
                    <span>{group.category}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    group.joined
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-[#1DB954] text-white hover:bg-[#1ed760]'
                  }`}
                >
                  {group.joined ? 'Participando' : 'Participar'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">{challenge.name}</h3>
                    <p className="text-gray-600 mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{challenge.participants} participantes</span>
                      <span>•</span>
                      <span>{challenge.daysLeft} dias restantes</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium text-[#1DB954]">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1DB954] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Trophy className="w-4 h-4" />
                      <span>Recompensa: {challenge.reward}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    challenge.joined
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-[#1DB954] text-white hover:bg-[#1ed760]'
                  }`}
                >
                  {challenge.joined ? 'Participando' : 'Participar'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <h2 className="text-xl font-bold text-[#1B1B1B] mb-6">Ranking Mensal</h2>
            
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    user.rank === 1 ? 'bg-yellow-500 text-white' :
                    user.rank === 2 ? 'bg-gray-400 text-white' :
                    user.rank === 3 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {user.rank}
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-white text-xl">
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-[#1B1B1B]">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.streak} dias consecutivos</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#1DB954]">{user.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">pontos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#1B1B1B]">Criar Post</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-500 rotate-45" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-white">
                    {userProfile.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1B1B1B]">{userProfile.nome}</div>
                    <div className="text-sm text-gray-600">Público</div>
                  </div>
                </div>

                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Compartilhe sua jornada fitness..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent outline-none"
                />

                <div className="flex items-center space-x-4 mt-4 mb-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#1DB954] transition-colors">
                    <Camera className="w-5 h-5" />
                    <span>Foto</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#1DB954] transition-colors">
                    <MapPin className="w-5 h-5" />
                    <span>Local</span>
                  </button>
                </div>

                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    newPost.trim()
                      ? 'bg-[#1DB954] text-white hover:bg-[#1ed760]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CommunityPage;