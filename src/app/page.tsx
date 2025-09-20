'use client'

import { useState } from 'react'
import { Trophy, Medal, Crown, Star, Users, Clock, CreditCard, Play, Shield, User, Home, Gamepad2, Award, FileText, Search, Bell, Menu } from 'lucide-react'

export default function TriviaGame() {
  const [currentPage, setCurrentPage] = useState('home')
  const [gameState, setGameState] = useState({
    round: 1,
    question: 1,
    timeLeft: 10,
    score: 0,
    credits: 25,
    isDemo: false
  })

  // Mock data
  const topPlayers = [
    { id: 1, name: 'Alex Silva', avatar: '👑', earnings: 2450, position: 1 },
    { id: 2, name: 'Maria Santos', avatar: '🏆', earnings: 1890, position: 2 },
    { id: 3, name: 'João Costa', avatar: '⭐', earnings: 1650, position: 3 },
    { id: 4, name: 'Ana Lima', avatar: '💎', earnings: 1200, position: 4 },
    { id: 5, name: 'Pedro Rocha', avatar: '🎯', earnings: 980, position: 5 }
  ]

  const rooms = [
    { id: 1, credits: 1, players: 12, maxPlayers: 16, nextGame: '02:15' },
    { id: 2, credits: 5, players: 8, maxPlayers: 12, nextGame: '01:45' },
    { id: 3, credits: 20, players: 4, maxPlayers: 8, nextGame: '03:30' }
  ]

  const currentQuestion = {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correct: 2
  }

  const renderHeader = (title: string) => (
    <div className="bg-gradient-to-r from-[#002395] to-blue-600 p-4 flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Search className="w-6 h-6" />
        <Bell className="w-6 h-6" />
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </div>
    </div>
  )

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'rooms', icon: Gamepad2, label: 'Salas' },
          { id: 'ranking', icon: Award, label: 'Ranking' },
          { id: 'compliance', icon: FileText, label: 'Regras' },
          { id: 'profile', icon: User, label: 'Perfil' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentPage === id 
                ? 'text-[#002395] bg-blue-50' 
                : 'text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Trivia Milhão')}
      
      {/* Hero Section */}
      <div className="p-6 text-center text-white">
        <div className="mb-6">
          <Trophy className="w-20 h-20 mx-auto mb-4 text-[#FFD700] animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">Show do Milhão</h2>
          <p className="text-blue-100 text-lg">Teste seus conhecimentos e ganhe prêmios incríveis!</p>
        </div>
        
        <div className="flex gap-3 mb-8">
          <button 
            onClick={() => setCurrentPage('credits')}
            className="flex-1 bg-[#FFD700] text-[#002395] py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-colors"
          >
            <CreditCard className="w-6 h-6 inline mr-2" />
            Comprar Créditos
          </button>
          <button 
            onClick={() => setCurrentPage('rooms')}
            className="flex-1 bg-white/20 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-colors"
          >
            <Play className="w-6 h-6 inline mr-2" />
            Entrar em Sala
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span>Seus Créditos</span>
            <span className="text-[#FFD700] font-bold text-xl">{gameState.credits}</span>
          </div>
        </div>
      </div>

      {/* Top Players */}
      <div className="px-6">
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          <Crown className="w-6 h-6 text-[#FFD700]" />
          Top Jogadores
        </h3>
        
        {/* Podium */}
        <div className="flex justify-center items-end gap-2 mb-6">
          {topPlayers.slice(0, 3).map((player, index) => (
            <div key={player.id} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                index === 0 ? 'from-yellow-400 to-yellow-600' :
                index === 1 ? 'from-gray-300 to-gray-500' :
                'from-orange-400 to-orange-600'
              } flex items-center justify-center text-2xl mb-2`}>
                {player.avatar}
              </div>
              <div className={`bg-white/20 backdrop-blur-sm rounded-t-lg px-3 py-2 ${
                index === 0 ? 'h-20' : index === 1 ? 'h-16' : 'h-12'
              } flex flex-col justify-end`}>
                <p className="text-white text-xs font-bold">{player.name}</p>
                <p className="text-[#FFD700] text-xs">${player.earnings}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Other Players */}
        <div className="space-y-2">
          {topPlayers.slice(3).map((player) => (
            <div key={player.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg">
                  {player.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{player.name}</p>
                  <p className="text-blue-200 text-sm">#{player.position}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#FFD700] font-bold">${player.earnings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCreditsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Comprar Créditos')}
      
      <div className="p-6">
        <div className="text-center text-white mb-8">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-[#FFD700]" />
          <h2 className="text-2xl font-bold mb-2">Compre Créditos</h2>
          <p className="text-blue-100">1 Crédito = $1 USD</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[1, 5, 10, 20].map((amount) => (
            <div key={amount} className="bg-gradient-to-br from-[#FFD700] to-yellow-500 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-[#002395] font-bold text-2xl mb-2">{amount}</div>
              <div className="text-[#002395] text-sm mb-3">Crédito{amount > 1 ? 's' : ''}</div>
              <div className="text-[#002395] font-bold text-xl">${amount}</div>
              <button className="w-full bg-[#002395] text-white py-2 px-4 rounded-xl font-semibold mt-4 hover:bg-blue-800 transition-colors">
                Comprar
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Métodos de Pagamento</h3>
          <div className="space-y-3 text-blue-100 text-sm">
            <p>• Até $1.000: PIX, PayPal, Cartão, Transferência</p>
            <p>• Acima de $1.000: Criptomoedas (USDT/USDC)</p>
            <p>• Créditos não são reembolsáveis</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRoomsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Salas de Jogo')}
      
      <div className="p-6">
        <div className="text-center text-white mb-8">
          <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-[#FFD700]" />
          <h2 className="text-2xl font-bold mb-2">Escolha sua Sala</h2>
          <p className="text-blue-100">Entre em uma sala e teste seus conhecimentos!</p>
        </div>

        <div className="space-y-4 mb-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-bold text-xl">Sala de {room.credits} Crédito{room.credits > 1 ? 's' : ''}</h3>
                  <p className="text-blue-200">Entrada: {room.credits} crédito{room.credits > 1 ? 's' : ''}</p>
                </div>
                <div className="text-[#FFD700] font-bold text-2xl">${room.credits}</div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-blue-200">
                  <Users className="w-4 h-4" />
                  <span>{room.players}/{room.maxPlayers} jogadores</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Clock className="w-4 h-4" />
                  <span>Próxima: {room.nextGame}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setGameState({...gameState, isDemo: false})
                    setCurrentPage('game')
                  }}
                  className="flex-1 bg-[#FFD700] text-[#002395] py-3 px-6 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
                >
                  Entrar ({room.credits} créditos)
                </button>
                <button 
                  onClick={() => {
                    setGameState({...gameState, isDemo: true})
                    setCurrentPage('game')
                  }}
                  className="bg-white/20 text-white py-3 px-6 rounded-xl font-bold hover:bg-white/30 transition-colors"
                >
                  Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <h3 className="text-white font-bold mb-2">Como Funciona</h3>
          <div className="text-blue-100 text-sm space-y-1">
            <p>• 4 rodadas com 4 perguntas cada</p>
            <p>• 10 segundos por pergunta</p>
            <p>• Eliminação progressiva a cada rodada</p>
            <p>• Último jogador leva tudo!</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGamePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader(gameState.isDemo ? 'Modo Demo' : 'Jogo ao Vivo')}
      
      <div className="p-6">
        {/* Game Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              <span className="text-sm">Rodada {gameState.round}/4</span>
              <span className="mx-2">•</span>
              <span className="text-sm">Pergunta {gameState.question}/4</span>
            </div>
            <div className="text-[#FFD700] font-bold">
              {gameState.isDemo ? 'DEMO' : 'AO VIVO'}
            </div>
          </div>
          
          {/* Timer */}
          <div className="bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-[#FFD700] h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(gameState.timeLeft / 10) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-white font-bold text-2xl">{gameState.timeLeft}s</div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <h3 className="text-white text-xl font-bold mb-6 text-center">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="w-full bg-white/20 hover:bg-white/30 text-white p-4 rounded-xl text-left font-semibold transition-colors"
              >
                <span className="inline-block w-8 h-8 bg-[#FFD700] text-[#002395] rounded-full text-center font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Players Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <Users className="w-5 h-5 inline mr-2" />
              <span>8 jogadores restantes</span>
            </div>
            <div className="text-[#FFD700] font-bold">
              Prêmio: $40
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRankingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Ranking')}
      
      <div className="p-6">
        {/* Tabs */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 mb-6">
          {['Local', 'Global', 'Amigos'].map((tab) => (
            <button
              key={tab}
              className="flex-1 py-3 px-4 rounded-xl font-semibold transition-colors text-white bg-white/20"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-2 mb-6">
          {topPlayers.slice(0, 3).map((player, index) => (
            <div key={player.id} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                index === 0 ? 'from-yellow-400 to-yellow-600' :
                index === 1 ? 'from-gray-300 to-gray-500' :
                'from-orange-400 to-orange-600'
              } flex items-center justify-center text-2xl mb-2`}>
                {index === 0 ? <Crown className="w-8 h-8 text-white" /> :
                 index === 1 ? <Medal className="w-8 h-8 text-white" /> :
                 <Star className="w-8 h-8 text-white" />}
              </div>
              <div className={`bg-white/20 backdrop-blur-sm rounded-t-lg px-3 py-2 ${
                index === 0 ? 'h-20' : index === 1 ? 'h-16' : 'h-12'
              } flex flex-col justify-end`}>
                <p className="text-white text-xs font-bold">{player.name}</p>
                <p className="text-[#FFD700] text-xs">${player.earnings}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rankings List */}
        <div className="space-y-2">
          {topPlayers.map((player) => (
            <div key={player.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFD700] text-[#002395] rounded-full flex items-center justify-center font-bold">
                  {player.position}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg">
                  {player.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{player.name}</p>
                  <p className="text-blue-200 text-sm">Jogador Ativo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#FFD700] font-bold">${player.earnings}</p>
                <p className="text-blue-200 text-sm">Total ganho</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCompliancePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Regras e Compliance')}
      
      <div className="p-6 space-y-6">
        <div className="text-center text-white mb-6">
          <Shield className="w-16 h-16 mx-auto mb-4 text-[#FFD700]" />
          <h2 className="text-2xl font-bold">Regras da Plataforma</h2>
        </div>

        {/* Acesso */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-[#FFD700] font-bold text-lg mb-4">🔐 Acesso à Plataforma</h3>
          <div className="text-white space-y-2 text-sm">
            <p>• Login apenas via Apple ID ou Google</p>
            <p>• 2FA TOTP obrigatório (Google Authenticator/Authy)</p>
            <p>• Todas as contas devem ter autenticação ativada</p>
          </div>
        </div>

        {/* Pagamentos */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-[#FFD700] font-bold text-lg mb-4">💳 Pagamentos</h3>
          <div className="text-white space-y-2 text-sm">
            <p>• Até US$1.000: PIX, PayPal, cartão, transferência</p>
            <p>• Acima de US$1.000: apenas criptomoedas (USDT/USDC)</p>
            <p>• Créditos não são reembolsáveis</p>
            <p>• Créditos são pessoais e intransferíveis</p>
          </div>
        </div>

        {/* Bots/IA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-[#FFD700] font-bold text-lg mb-4">🤖 Uso de Bots/IA</h3>
          <div className="text-white space-y-2 text-sm">
            <p>• Proibido uso de bots, scripts ou IA</p>
            <p>• Contas suspeitas serão banidas imediatamente</p>
            <p>• Dinheiro ganho será bloqueado</p>
            <p>• Apenas devolução do valor investido</p>
          </div>
        </div>

        {/* Responsabilidade */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-[#FFD700] font-bold text-lg mb-4">⚠️ Responsabilidade</h3>
          <div className="text-white space-y-2 text-sm">
            <p>• Jogador deve garantir conexão estável</p>
            <p>• Uso legítimo da conta é obrigatório</p>
            <p>• Plataforma não se responsabiliza por:</p>
            <p className="ml-4">- Perdas de internet</p>
            <p className="ml-4">- Falhas de dispositivo</p>
            <p className="ml-4">- Uso indevido da conta</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#002395] via-blue-600 to-blue-800 pb-20">
      {renderHeader('Meu Perfil')}
      
      <div className="p-6">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-yellow-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            👑
          </div>
          <h2 className="text-white text-2xl font-bold">Alex Silva</h2>
          <p className="text-blue-200">Jogador Premium</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">📊 Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[#FFD700] text-2xl font-bold">156</div>
                <div className="text-blue-200 text-sm">Jogos</div>
              </div>
              <div className="text-center">
                <div className="text-[#FFD700] text-2xl font-bold">23</div>
                <div className="text-blue-200 text-sm">Vitórias</div>
              </div>
              <div className="text-center">
                <div className="text-[#FFD700] text-2xl font-bold">$2,450</div>
                <div className="text-blue-200 text-sm">Total Ganho</div>
              </div>
              <div className="text-center">
                <div className="text-[#FFD700] text-2xl font-bold">{gameState.credits}</div>
                <div className="text-blue-200 text-sm">Créditos</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">🏆 Conquistas</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#FFD700]" />
                <div>
                  <p className="text-white font-semibold">Primeira Vitória</p>
                  <p className="text-blue-200 text-sm">Ganhe seu primeiro jogo</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Medal className="w-8 h-8 text-[#FFD700]" />
                <div>
                  <p className="text-white font-semibold">Sequência de 5</p>
                  <p className="text-blue-200 text-sm">Vença 5 jogos seguidos</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl font-bold transition-colors">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return renderHomePage()
      case 'credits': return renderCreditsPage()
      case 'rooms': return renderRoomsPage()
      case 'game': return renderGamePage()
      case 'ranking': return renderRankingPage()
      case 'compliance': return renderCompliancePage()
      case 'profile': return renderProfilePage()
      default: return renderHomePage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {renderCurrentPage()}
      {renderBottomNav()}
    </div>
  )
}