import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Award, Clock, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

/**
 * MVP Simplificado - Meus Ganhos
 * Mostra saldo XLM fictício e cursos disponíveis
 */

// Dados fictícios para demonstração
const MOCK_WALLET = {
  totalEarned: 125.50,
  available: 85.50,
  locked: 40.00,
};

const MOCK_COURSES = [
  {
    id: 1,
    title: "Introdução ao Web3",
    category: "Web3",
    difficulty: "Básico",
    totalReward: 100,
    durationHours: 40,
    provider: "Mulheres que Codam",
    enrolled: true,
    progress: 50,
    modules: [
      { id: 1, title: "O que é Blockchain", reward: 20, completed: true },
      { id: 2, title: "Rede Stellar", reward: 20, completed: true },
      { id: 3, title: "Smart Contracts Básicos", reward: 30, completed: false },
      { id: 4, title: "Projeto Final", reward: 30, completed: false },
    ],
  },
  {
    id: 2,
    title: "Desenvolvimento React Avançado",
    category: "Programação",
    difficulty: "Intermediário",
    totalReward: 250,
    durationHours: 80,
    provider: "Mulheres que Codam",
    enrolled: true,
    progress: 25,
    modules: [
      { id: 5, title: "React Hooks Avançados", reward: 50, completed: true },
      { id: 6, title: "Context API", reward: 50, completed: false },
      { id: 7, title: "Performance Optimization", reward: 75, completed: false },
      { id: 8, title: "Testing com Vitest", reward: 75, completed: false },
    ],
  },
  {
    id: 3,
    title: "IA Generativa na Prática",
    category: "IA",
    difficulty: "Avançado",
    totalReward: 500,
    durationHours: 120,
    provider: "Let's Cocreate",
    enrolled: false,
    progress: 0,
    modules: [],
  },
];

const MOCK_TRANSACTIONS = [
  { id: 1, type: "earn", amount: 50, description: "Módulo concluído: React Hooks Avançados", date: "2026-01-28" },
  { id: 2, type: "earn", amount: 20, description: "Módulo concluído: Rede Stellar", date: "2026-01-27" },
  { id: 3, type: "earn", amount: 20, description: "Módulo concluído: O que é Blockchain", date: "2026-01-26" },
  { id: 4, type: "bonus", amount: 15.50, description: "Bônus de streak - 7 dias consecutivos", date: "2026-01-25" },
];

export default function MyEarnings() {
  const [wallet, setWallet] = useState(MOCK_WALLET);
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const handleCompleteModule = (courseId: number, moduleId: number, reward: number) => {
    // Simular conclusão de módulo
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(m => 
          m.id === moduleId ? { ...m, completed: true } : m
        );
        const completedCount = updatedModules.filter(m => m.completed).length;
        const progress = (completedCount / updatedModules.length) * 100;
        
        return { ...course, modules: updatedModules, progress };
      }
      return course;
    }));

    // Atualizar carteira
    setWallet(prev => ({
      totalEarned: prev.totalEarned + reward,
      available: prev.available + reward,
      locked: prev.locked - reward,
    }));

    // Adicionar transação
    const newTransaction = {
      id: transactions.length + 1,
      type: "earn" as const,
      amount: reward,
      description: `Módulo concluído: ${courses.find(c => c.id === courseId)?.modules.find(m => m.id === moduleId)?.title}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleEnrollCourse = (courseId: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    
    // Travar XLM do curso
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setWallet(prev => ({
        ...prev,
        locked: prev.locked + course.totalReward,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Meus Ganhos
          </h1>
          <p className="text-slate-400">Acompanhe seus ganhos em XLM e progresso nos cursos</p>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Ganho</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{wallet.totalEarned.toFixed(2)} XLM</div>
              <p className="text-xs text-slate-500 mt-1">≈ ${(wallet.totalEarned * 0.12).toFixed(2)} USD</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Disponível</CardTitle>
              <Wallet className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{wallet.available.toFixed(2)} XLM</div>
              <p className="text-xs text-slate-500 mt-1">Pronto para saque</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Travado</CardTitle>
              <Lock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{wallet.locked.toFixed(2)} XLM</div>
              <p className="text-xs text-slate-500 mt-1">Aguardando conclusão</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cursos */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Meus Cursos</h2>
            
            {courses.map(course => (
              <Card key={course.id} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="border-magenta-500/50 text-magenta-400">
                          {course.difficulty}
                        </Badge>
                        <span className="text-slate-500">• {course.durationHours}h</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{course.totalReward} XLM</div>
                      <p className="text-xs text-slate-500">{course.provider}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {course.enrolled ? (
                    <>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Progresso</span>
                          <span className="text-cyan-400 font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        {course.modules.map(module => (
                          <div key={module.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-3">
                              {module.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                              ) : (
                                <Clock className="h-5 w-5 text-slate-500" />
                              )}
                              <div>
                                <p className={module.completed ? "text-slate-400 line-through" : "text-white"}>
                                  {module.title}
                                </p>
                                <p className="text-xs text-cyan-400">{module.reward} XLM</p>
                              </div>
                            </div>
                            {!module.completed && (
                              <Button
                                size="sm"
                                onClick={() => handleCompleteModule(course.id, module.id, module.reward)}
                                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600"
                              >
                                Concluir
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleEnrollCourse(course.id)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600"
                    >
                      Inscrever-se Agora
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Histórico de Transações */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Histórico</h2>
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-800">
                  {transactions.map(tx => (
                    <div key={tx.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm font-medium">{tx.description}</span>
                        </div>
                        <span className="text-green-400 font-bold">+{tx.amount} XLM</span>
                      </div>
                      <p className="text-xs text-slate-500 ml-6">{tx.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
