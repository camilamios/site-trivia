'use client'

import { useState, useEffect } from 'react'
import { 
  Play, Home, Users, Clock, Star, Zap, Shield, ChevronRight, 
  User, CheckCircle, XCircle, Circle
} from 'lucide-react'

// Tipos para o jogo
interface Player {
  id: string
  name: string
  avatar: string
  earnings: number
  rank: number
}

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
}

interface Room {
  id: string
  credits: number
  players: number
  maxPlayers: number
  nextGame: string
}

// Função para formatação consistente de números
const formatCurrency = (amount: number): string => {
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

// Dados mockados
const mockPlayers: Player[] = [
  { id: '1', name: 'João Silva', avatar: '👑', earnings: 2450, rank: 1 },
  { id: '2', name: 'Maria Santos', avatar: '🏆', earnings: 1890, rank: 2 },
  { id: '3', name: 'Pedro Costa', avatar: '⭐', earnings: 1340, rank: 3 },
  { id: '4', name: 'Ana Lima', avatar: '💎', earnings: 980, rank: 4 },
  { id: '5', name: 'Carlos Rocha', avatar: '🎯', earnings: 750, rank: 5 }
]

const mockRooms: Room[] = [
  { id: '1', credits: 1, players: 12, maxPlayers: 16, nextGame: '02:15' },
  { id: '2', credits: 5, players: 8, maxPlayers: 12, nextGame: '01:45' },
  { id: '3', credits: 20, players: 4, maxPlayers: 8, nextGame: '03:30' }
]

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte'],
    correct: 2
  },
  {
    id: '2',
    question: 'Quantos continentes existem no mundo?',
    options: ['5', '6', '7', '8'],
    correct: 2
  },
  {
    id: '3',
    question: 'Qual é o maior planeta do sistema solar?',
    options: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
    correct: 2
  },
  {
    id: '4',
    question: 'Em que ano o homem pisou na Lua pela primeira vez?',
    options: ['1967', '1968', '1969', '1970'],
    correct: 2
  }
]

export default function TriviaGame() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userCredits, setUserCredits] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [gameState, setGameState] = useState({
    round: 1,
    question: 0,
    timeLeft: 10,
    score: 0,
    isPlaying: false,
    selectedAnswer: null as number | null,
    showResult: false,
    isDemo: false
  })

  // Garantir que o componente só renderize após a hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer para o jogo
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.isPlaying && gameState.timeLeft > 0 && !gameState.showResult) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    } else if (gameState.timeLeft === 0 && !gameState.showResult) {
      handleTimeUp()
    }
    return () => clearTimeout(timer)
  }, [gameState.timeLeft, gameState.isPlaying, gameState.showResult])

  const handleTimeUp = () => {
    setGameState(prev => ({ ...prev, showResult: true }))
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showResult) return
    
    setGameState(prev => ({ 
      ...prev, 
      selectedAnswer: answerIndex,
      showResult: true 
    }))

    const isCorrect = answerIndex === sampleQuestions[gameState.question].correct
    if (isCorrect) {
      setGameState(prev => ({ ...prev, score: prev.score + 1 }))
    }

    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = () => {
    if (gameState.question < 3) {
      setGameState(prev => ({
        ...prev,
        question: prev.question + 1,
        timeLeft: 10,
        selectedAnswer: null,
        showResult: false
      }))
    } else if (gameState.round < 4) {
      setGameState(prev => ({
        ...prev,
        round: prev.round + 1,
        question: 0,
        timeLeft: 10,
        selectedAnswer: null,
        showResult: false
      }))
    } else {
      // Fim do jogo
      setGameState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const startGame = (isDemo = false) => {
    setGameState({
      round: 1,
      question: 0,
      timeLeft: 10,
      score: 0,
      isPlaying: true,
      selectedAnswer: null,
      showResult: false,
      isDemo
    })
    setCurrentPage('game')
  }

  const buyCredits = (amount: number) => {
    setUserCredits(prev => prev + amount)
    alert(`Você comprou ${amount} crédito(s)! Total: ${userCredits + amount}`)
  }

  // Não renderizar até que o componente esteja montado (evita hidratação)
  if (!mounted) {
    return null
  }

  // Componente Header
  const Header = () => (
    <header className="bg-[#002395] text-white shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-[#002395]" />
            </div>
            <h1 className="text-2xl font-bold">Trivia Milhão</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'home' ? 'bg-[#FFD700] text-[#002395]' : 'hover:bg-blue-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setCurrentPage('rooms')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'rooms' ? 'bg-[#FFD700] text-[#002395]' : 'hover:bg-blue-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Salas</span>
            </button>
            <button 
              onClick={() => setCurrentPage('ranking')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'ranking' ? 'bg-[#FFD700] text-[#002395]' : 'hover:bg-blue-700'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Ranking</span>
            </button>
            <button 
              onClick={() => setCurrentPage('compliance')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'compliance' ? 'bg-[#FFD700] text-[#002395]' : 'hover:bg-blue-700'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Compliance</span>
            </button>
            <button 
              onClick={() => setCurrentPage('profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'profile' ? 'bg-[#FFD700] text-[#002395]' : 'hover:bg-blue-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="bg-[#FFD700] text-[#002395] px-4 py-2 rounded-lg font-bold">
              {userCredits} créditos
            </div>
            {!isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="bg-[#FFD700] text-[#002395] px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all"
              >
                Login
              </button>
            ) : (
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#002395]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  // Página Home
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002395] to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Circle className="w-12 h-12 text-[#002395]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Trivia <span className="text-[#FFD700]">Milhão</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Teste seus conhecimentos e ganhe dinheiro real! 
              Elimine seus oponentes e leve o prêmio para casa.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => startGame(true)}
              className="bg-[#FFD700] text-[#002395] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>Jogar Demo Grátis</span>
            </button>
            <button 
              onClick={() => setCurrentPage('credits')}
              className="border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:text-[#002395] transition-all transform hover:scale-105"
            >
              Comprar Créditos
            </button>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#002395]">
            🏆 Ranking dos Campeões
          </h2>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {mockPlayers.map((player, index) => (
              <div 
                key={player.id}
                className={`bg-white rounded-2xl p-6 shadow-xl border-2 transition-all hover:scale-105 ${
                  index === 0 ? 'border-[#FFD700] bg-gradient-to-r from-yellow-50 to-yellow-100' :
                  index === 1 ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100' :
                  index === 2 ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      index === 0 ? 'bg-[#FFD700]' :
                      index === 1 ? 'bg-gray-300' :
                      index === 2 ? 'bg-orange-300' :
                      'bg-blue-100'
                    }`}>
                      {player.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#002395]">{player.name}</h3>
                      <p className="text-gray-600">#{player.rank} no ranking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#FFD700]">
                      {formatCurrency(player.earnings)}
                    </p>
                    <p className="text-gray-600">ganhos totais</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#002395] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Competir?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em uma sala, responda as perguntas e elimine seus oponentes. 
            O último que sobrar leva tudo!
          </p>
          <button 
            onClick={() => setCurrentPage('rooms')}
            className="bg-[#FFD700] text-[#002395] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Users className="w-6 h-6" />
            <span>Ver Salas Disponíveis</span>
          </button>
        </div>
      </section>
    </div>
  )

  // Página de Compra de Créditos
  const CreditsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002395] mb-4">Comprar Créditos</h1>
          <p className="text-xl text-gray-600">1 crédito = $1 USD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 5, 10, 20].map((amount) => (
            <div 
              key={amount}
              className="bg-gradient-to-br from-[#FFD700] to-yellow-500 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
              onClick={() => buyCredits(amount)}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Circle className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-3xl font-bold text-[#002395] mb-2">{amount}</h3>
              <p className="text-[#002395] mb-4">crédito{amount > 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold text-[#002395] mb-6">${amount}</p>
              <button className="w-full bg-[#002395] text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all">
                Comprar Agora
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Métodos de pagamento aceitos:</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>PIX</span>
            <span>PayPal</span>
            <span>Cartão de Crédito</span>
            <span>Transferência</span>
            <span>USDT/USDC (acima de $1.000)</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Página de Salas
  const RoomsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002395] mb-4">Salas Disponíveis</h1>
          <p className="text-xl text-gray-600">Escolha sua sala e entre na competição!</p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {mockRooms.map((room) => (
            <div 
              key={room.id}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 hover:border-[#FFD700] transition-all"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Circle className="w-8 h-8 text-[#002395]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#002395]">
                      Sala de {room.credits} crédito{room.credits > 1 ? 's' : ''}
                    </h3>
                    <p className="text-gray-600">
                      {room.players}/{room.maxPlayers} jogadores
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-2 text-[#002395] mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">{room.nextGame}</span>
                    </div>
                    <p className="text-sm text-gray-600">próxima partida</p>
                  </div>

                  <button 
                    onClick={() => startGame(false)}
                    disabled={userCredits < room.credits}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${
                      userCredits >= room.credits
                        ? 'bg-[#002395] text-white hover:bg-blue-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userCredits >= room.credits ? 'Entrar' : 'Sem créditos'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => startGame(true)}
            className="bg-[#FFD700] text-[#002395] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Play className="w-6 h-6" />
            <span>Jogar Modo Demo (Grátis)</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Página do Jogo
  const GamePage = () => {
    const currentQuestion = sampleQuestions[gameState.question]
    const isCorrect = gameState.selectedAnswer === currentQuestion.correct
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002395] to-blue-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-[#FFD700] font-bold">RODADA</p>
                <p className="text-3xl font-bold">{gameState.round}/4</p>
              </div>
              <div className="text-center">
                <p className="text-[#FFD700] font-bold">PERGUNTA</p>
                <p className="text-3xl font-bold">{gameState.question + 1}/4</p>
              </div>
            </div>

            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
                gameState.timeLeft <= 3 ? 'bg-red-500 animate-pulse' : 'bg-[#FFD700] text-[#002395]'
              }`}>
                {gameState.timeLeft}
              </div>
              <p className="text-sm mt-2">segundos</p>
            </div>
          </div>

          {gameState.isDemo && (
            <div className="bg-yellow-500 text-black p-4 rounded-xl mb-6 text-center font-bold">
              🎭 MODO DEMO - Você está jogando como fantasma
            </div>
          )}

          {/* Question */}
          <div className="bg-white text-[#002395] rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 "
                
                if (gameState.showResult) {
                  if (index === currentQuestion.correct) {
                    buttonClass += "bg-green-500 text-white"
                  } else if (index === gameState.selectedAnswer) {
                    buttonClass += "bg-red-500 text-white"
                  } else {
                    buttonClass += "bg-gray-300 text-gray-600"
                  }
                } else {
                  buttonClass += "bg-[#FFD700] text-[#002395] hover:bg-yellow-400"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={gameState.showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-3">
                      {gameState.showResult && index === currentQuestion.correct && (
                        <CheckCircle className="w-6 h-6" />
                      )}
                      {gameState.showResult && index === gameState.selectedAnswer && index !== currentQuestion.correct && (
                        <XCircle className="w-6 h-6" />
                      )}
                      <span>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Game Stats */}
          <div className="text-center">
            <p className="text-xl">
              Pontuação: <span className="text-[#FFD700] font-bold">{gameState.score}/{gameState.question + (gameState.showResult ? 1 : 0)}</span>
            </p>
          </div>

          {/* End Game */}
          {!gameState.isPlaying && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white text-[#002395] rounded-2xl p-8 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Circle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {gameState.isDemo ? 'Demo Finalizada!' : 'Jogo Finalizado!'}
                </h2>
                <p className="text-xl mb-6">
                  Você acertou {gameState.score} de 16 perguntas
                </p>
                
                {gameState.isDemo && (
                  <div className="bg-[#FFD700] p-4 rounded-xl mb-6">
                    <p className="font-bold">
                      Você teria ganhado ${gameState.score * 10} se estivesse na sala real!
                    </p>
                    <p className="text-sm mt-2">
                      Quer entrar na próxima rodada valendo de verdade?
                    </p>
                  </div>
                )}

                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => setCurrentPage('rooms')}
                    className="bg-[#002395] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
                  >
                    {gameState.isDemo ? 'Entrar em Sala Real' : 'Jogar Novamente'}
                  </button>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="border-2 border-[#002395] text-[#002395] px-6 py-3 rounded-xl font-bold hover:bg-[#002395] hover:text-white transition-all"
                  >
                    Voltar ao Início
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Página de Ranking
  const RankingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002395] mb-4">🏆 Ranking Global</h1>
          <p className="text-xl text-gray-600">Os maiores campeões da plataforma</p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {mockPlayers.map((player, index) => (
            <div 
              key={player.id}
              className={`bg-white rounded-2xl p-6 shadow-xl border-2 transition-all hover:scale-105 ${
                index === 0 ? 'border-[#FFD700] bg-gradient-to-r from-yellow-50 to-yellow-100' :
                index === 1 ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100' :
                index === 2 ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100' :
                'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    index === 0 ? 'bg-[#FFD700] text-[#002395]' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-300 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    #{player.rank}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002395]">{player.name}</h3>
                    <p className="text-gray-600 flex items-center space-x-2">
                      <span>{player.avatar}</span>
                      <span>Campeão</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#FFD700]">
                    {formatCurrency(player.earnings)}
                  </p>
                  <p className="text-gray-600">ganhos totais</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Página de Compliance
  const CompliancePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002395] mb-4">📋 Compliance e Regras</h1>
          <p className="text-xl text-gray-600">Leia atentamente antes de jogar</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl space-y-8">
          {/* Acesso à Plataforma */}
          <section>
            <h2 className="text-2xl font-bold text-[#002395] mb-4 flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Acesso à Plataforma</span>
            </h2>
            <div className="bg-blue-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Apenas via login social (Apple ID ou Google)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Todas as contas devem ter 2FA TOTP (Google Authenticator/Authy) ativado para jogar</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Pagamentos */}
          <section>
            <h2 className="text-2xl font-bold text-[#002395] mb-4 flex items-center space-x-2">
              <Circle className="w-6 h-6" />
              <span>Pagamentos</span>
            </h2>
            <div className="bg-green-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Até US$1.000:</strong> via métodos tradicionais (PIX, PayPal, cartão, transferência)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Acima de US$1.000:</strong> pagos exclusivamente em criptomoedas (USDT/USDC)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Uso de Bots/IA */}
          <section>
            <h2 className="text-2xl font-bold text-[#002395] mb-4 flex items-center space-x-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <span>Uso de Bots/IA</span>
            </h2>
            <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Proibido uso de bots, scripts ou IA para responder perguntas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Contas suspeitas serão banidas imediatamente</span>
                </li>
                <li className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>O dinheiro ganho será bloqueado e não pago</span>
                </li>
                <li className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>O jogador receberá apenas a devolução do valor investido, sem direito ao prêmio</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Política de Créditos */}
          <section>
            <h2 className="text-2xl font-bold text-[#002395] mb-4 flex items-center space-x-2">
              <Circle className="w-6 h-6" />
              <span>Política de Créditos</span>
            </h2>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <Circle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Créditos comprados não são reembolsáveis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Circle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>São pessoais, intransferíveis e válidos apenas dentro da plataforma</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Responsabilidade */}
          <section>
            <h2 className="text-2xl font-bold text-[#002395] mb-4 flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Responsabilidade</span>
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span>O jogador deve garantir conexão estável e uso legítimo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span>A plataforma não se responsabiliza por perdas de internet, falhas de dispositivo ou uso indevido da conta</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Ao jogar, você concorda com todos os termos acima.</p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-[#002395] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
          >
            Entendi e Concordo
          </button>
        </div>
      </div>
    </div>
  )

  // Página de Perfil
  const ProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#002395] mb-4">👤 Meu Perfil</h1>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-[#002395]" />
            </div>
            <h2 className="text-2xl font-bold text-[#002395]">Jogador Demo</h2>
            <p className="text-gray-600">Membro desde hoje</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-bold text-[#002395] mb-2">Créditos</h3>
              <p className="text-3xl font-bold text-[#FFD700]">{userCredits}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-bold text-[#002395] mb-2">Ganhos Totais</h3>
              <p className="text-3xl font-bold text-green-600">$0</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#002395]">Configurações de Segurança</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-[#002395]">Login Social</p>
                <p className="text-sm text-gray-600">Google conectado</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div>
                <p className="font-bold text-[#002395]">2FA TOTP</p>
                <p className="text-sm text-gray-600">Necessário para jogar</p>
              </div>
              <button className="bg-[#FFD700] text-[#002395] px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                Configurar
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-[#002395] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
            >
              Voltar ao Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Renderização principal
  return (
    <div className="min-h-screen">
      <Header />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'credits' && <CreditsPage />}
      {currentPage === 'rooms' && <RoomsPage />}
      {currentPage === 'game' && <GamePage />}
      {currentPage === 'ranking' && <RankingPage />}
      {currentPage === 'compliance' && <CompliancePage />}
      {currentPage === 'profile' && <ProfilePage />}
    </div>
  )
}