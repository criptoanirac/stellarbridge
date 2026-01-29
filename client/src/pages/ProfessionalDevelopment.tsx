import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { 
  Trophy, Target, BookOpen, Award, TrendingUp, Star, 
  Zap, CheckCircle, Clock, ExternalLink, Sparkles, ArrowLeft 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function ProfessionalDevelopment() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [talentId, setTalentId] = useState<number | null>(null);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [careerFormData, setCareerFormData] = useState({
    targetRole: "",
    targetIndustry: "",
    targetSalary: "",
    deadline: "",
  });

  // Get talent profile
  const { data: profile } = trpc.talent.getProfile.useQuery(undefined, {
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      setTalentId(profile.id);
    }
  }, [profile]);

  // Get dashboard metrics
  const { data: metrics, refetch: refetchMetrics } = trpc.professionalDevelopment.getDashboardMetrics.useQuery(
    { talentId: talentId! },
    { enabled: !!talentId }
  );

  // Get career plan
  const { data: careerPlan, refetch: refetchCareerPlan } = trpc.professionalDevelopment.getCareerPlan.useQuery(
    { talentId: talentId! },
    { enabled: !!talentId }
  );

  // Get achievements
  const { data: achievements } = trpc.professionalDevelopment.getAchievements.useQuery(
    { talentId: talentId! },
    { enabled: !!talentId }
  );

  // Get progress history
  const { data: progressHistory } = trpc.professionalDevelopment.getProgressHistory.useQuery(
    { talentId: talentId!, limit: 10 },
    { enabled: !!talentId }
  );

  // Get course recommendations
  const { data: recommendations, refetch: refetchRecommendations } = trpc.professionalDevelopment.getCourseRecommendations.useQuery(
    { talentId: talentId! },
    { enabled: !!talentId }
  );

  // Mutations
  const saveCareerPlanMutation = trpc.professionalDevelopment.saveCareerPlan.useMutation({
    onSuccess: () => {
      toast.success("Plano de carreira salvo com sucesso!");
      refetchCareerPlan();
      setShowCareerForm(false);
      // Generate recommendations after saving career plan
      generateRecommendationsMutation.mutate({ talentId: talentId! });
    },
  });

  const generateRecommendationsMutation = trpc.professionalDevelopment.generateRecommendations.useMutation({
    onSuccess: () => {
      toast.success("Recomendações de cursos geradas!");
      refetchRecommendations();
    },
  });

  const updateCourseStatusMutation = trpc.professionalDevelopment.updateCourseStatus.useMutation({
    onSuccess: () => {
      refetchRecommendations();
    },
  });

  const addXPMutation = trpc.professionalDevelopment.addXP.useMutation({
    onSuccess: (data) => {
      if (data.leveledUp) {
        toast.success(`🎉 Level Up! Você alcançou o nível ${data.newLevel}!`);
      }
      refetchMetrics();
    },
  });

  // Calculate level progress
  const currentLevelXP = metrics ? metrics.xp % 100 : 0;
  const levelProgress = (currentLevelXP / 100) * 100;

  // Prepare progress chart data
  const progressChartData = progressHistory?.map(p => ({
    date: new Date(p.createdAt).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    xp: p.xpGained,
  })).reverse() || [];

  const handleSaveCareerPlan = () => {
    if (!talentId || !careerFormData.targetRole) return;
    
    saveCareerPlanMutation.mutate({
      talentId,
      ...careerFormData,
    });
  };

  const handleCompleteCourse = (recommendationId: number) => {
    updateCourseStatusMutation.mutate({
      recommendationId,
      status: "completed",
    });
    
    // Award XP
    if (talentId) {
      addXPMutation.mutate({
        talentId,
        xp: 50,
        eventType: "course_completed",
        description: "Curso concluído",
      });
    }
  };

  const handleStartCourse = (recommendationId: number) => {
    updateCourseStatusMutation.mutate({
      recommendationId,
      status: "in_progress",
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center">
        <Card className="p-8 neon-card">
          <p className="text-gray-300 text-center">
            Você precisa criar um perfil de talento primeiro.
          </p>
          <Button
            onClick={() => setLocation("/talent-signup")}
            className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-magenta-500"
          >
            Criar Perfil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-cyan-500/20 bg-[#0a0e27]/90 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setLocation("/talent-dashboard")}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <div>
                  <h1 className="text-3xl font-bold font-space-mono">
                    <span className="text-cyan-400">Desenvolvimento</span>{" "}
                    <span className="text-magenta-400">Profissional</span>
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Acompanhe sua evolução e alcance seus objetivos
                  </p>
                </div>
              </div>
              
              {/* Level Badge */}
              <div className="neon-card p-4 text-center">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">Nível {metrics?.level || 1}</span>
                </div>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{currentLevelXP}/100 XP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="neon-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
                <span className="text-3xl font-bold text-cyan-400">{metrics?.xp || 0}</span>
              </div>
              <h3 className="text-gray-300 font-semibold">Pontos XP</h3>
              <p className="text-gray-500 text-sm">Total acumulado</p>
            </div>

            <div className="neon-card p-6">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <span className="text-3xl font-bold text-purple-400">{metrics?.skillsCount || 0}</span>
              </div>
              <h3 className="text-gray-300 font-semibold">Habilidades</h3>
              <p className="text-gray-500 text-sm">Skills cadastradas</p>
            </div>

            <div className="neon-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-magenta-400" />
                <span className="text-3xl font-bold text-magenta-400">{metrics?.certificationsCount || 0}</span>
              </div>
              <h3 className="text-gray-300 font-semibold">Certificações</h3>
              <p className="text-gray-500 text-sm">Cursos concluídos</p>
            </div>

            <div className="neon-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-green-400" />
                <span className="text-3xl font-bold text-green-400">{metrics?.achievementsCount || 0}</span>
              </div>
              <h3 className="text-gray-300 font-semibold">Conquistas</h3>
              <p className="text-gray-500 text-sm">Badges desbloqueados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Plan */}
              <div className="neon-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">Plano de Carreira</h2>
                  </div>
                  {!showCareerForm && (
                    <Button
                      onClick={() => {
                        if (careerPlan) {
                          setCareerFormData({
                            targetRole: careerPlan.targetRole || "",
                            targetIndustry: careerPlan.targetIndustry || "",
                            targetSalary: careerPlan.targetSalary || "",
                            deadline: careerPlan.deadline ? new Date(careerPlan.deadline).toISOString().split('T')[0] : "",
                          });
                        }
                        setShowCareerForm(true);
                      }}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      {careerPlan ? "Editar Meta" : "Definir Meta"}
                    </Button>
                  )}
                </div>

                {showCareerForm ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="targetRole" className="text-gray-300">Cargo Desejado *</Label>
                      <Input
                        id="targetRole"
                        value={careerFormData.targetRole}
                        onChange={(e) => setCareerFormData({ ...careerFormData, targetRole: e.target.value })}
                        placeholder="Ex: Desenvolvedora Full Stack"
                        className="bg-[#0a0e27]/50 border-cyan-500/30 text-gray-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetIndustry" className="text-gray-300">Área de Atuação</Label>
                      <Input
                        id="targetIndustry"
                        value={careerFormData.targetIndustry}
                        onChange={(e) => setCareerFormData({ ...careerFormData, targetIndustry: e.target.value })}
                        placeholder="Ex: Tecnologia, Fintech"
                        className="bg-[#0a0e27]/50 border-cyan-500/30 text-gray-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetSalary" className="text-gray-300">Salário Pretendido (R$)</Label>
                      <Input
                        id="targetSalary"
                        value={careerFormData.targetSalary}
                        onChange={(e) => setCareerFormData({ ...careerFormData, targetSalary: e.target.value })}
                        placeholder="Ex: 8000"
                        type="number"
                        className="bg-[#0a0e27]/50 border-cyan-500/30 text-gray-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="deadline" className="text-gray-300">Prazo para Alcançar</Label>
                      <Input
                        id="deadline"
                        value={careerFormData.deadline}
                        onChange={(e) => setCareerFormData({ ...careerFormData, deadline: e.target.value })}
                        type="date"
                        className="bg-[#0a0e27]/50 border-cyan-500/30 text-gray-100"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleSaveCareerPlan}
                        className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:opacity-90"
                        disabled={saveCareerPlanMutation.isPending}
                      >
                        {saveCareerPlanMutation.isPending ? "Salvando..." : "Salvar Plano"}
                      </Button>
                      <Button
                        onClick={() => setShowCareerForm(false)}
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : careerPlan ? (
                  <div className="space-y-4">
                    <div className="neon-card p-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-cyan-400 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{careerPlan.targetRole}</h3>
                          {careerPlan.targetIndustry && (
                            <p className="text-gray-400 text-sm mb-2">Área: {careerPlan.targetIndustry}</p>
                          )}
                          {careerPlan.targetSalary && (
                            <p className="text-cyan-400 font-semibold">Salário Pretendido: R$ {parseFloat(careerPlan.targetSalary).toLocaleString('pt-BR')}</p>
                          )}
                          {careerPlan.deadline && (
                            <p className="text-gray-400 text-sm mt-2">
                              Prazo: {new Date(careerPlan.deadline).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Defina sua meta de carreira para receber recomendações personalizadas de cursos!
                    </p>
                  </div>
                )}
              </div>

              {/* Course Recommendations */}
              <div className="neon-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-magenta-400" />
                    <h2 className="text-2xl font-bold text-white">Cursos Recomendados</h2>
                  </div>
                  {talentId && (
                    <Button
                      onClick={() => generateRecommendationsMutation.mutate({ talentId })}
                      variant="outline"
                      className="border-magenta-500/30 text-magenta-400 hover:bg-magenta-500/10"
                      disabled={generateRecommendationsMutation.isPending}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {generateRecommendationsMutation.isPending ? "Gerando..." : "Atualizar"}
                    </Button>
                  )}
                </div>

                {recommendations && recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className={`border rounded-lg p-4 transition-all ${
                          rec.status === "completed"
                            ? "bg-green-500/10 border-green-500/30"
                            : rec.status === "in_progress"
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-gray-800/50 border-gray-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-white">{rec.courseName}</h3>
                              {rec.status === "completed" && (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              )}
                              {rec.status === "in_progress" && (
                                <Clock className="w-5 h-5 text-yellow-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{rec.provider} • {rec.estimatedDuration}</p>
                            {rec.reason && (
                              <p className="text-sm text-gray-300 mb-3 italic">💡 {rec.reason}</p>
                            )}
                            {rec.skillsToGain && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {JSON.parse(rec.skillsToGain).map((skill: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            {rec.courseUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                onClick={() => window.open(rec.courseUrl!, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Ver Curso
                              </Button>
                            )}
                            
                            {rec.status === "recommended" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:opacity-90"
                                onClick={() => handleStartCourse(rec.id)}
                              >
                                Iniciar
                              </Button>
                            )}
                            
                            {rec.status === "in_progress" && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleCompleteCourse(rec.id)}
                              >
                                Concluir
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Nenhuma recomendação ainda. Defina seu plano de carreira para receber sugestões!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Progress Chart */}
              <div className="neon-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Evolução</h2>
                </div>
                
                {progressChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#888" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00d4ff' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="xp" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Comece a ganhar XP para ver sua evolução!</p>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div className="neon-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Conquistas</h2>
                </div>

                {achievements && achievements.length > 0 ? (
                  <div className="space-y-3">
                    {achievements.slice(0, 5).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg"
                      >
                        <span className="text-3xl">{achievement.badgeIcon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{achievement.badgeName}</h3>
                          {achievement.badgeDescription && (
                            <p className="text-xs text-gray-400">{achievement.badgeDescription}</p>
                          )}
                        </div>
                        {achievement.xpAwarded > 0 && (
                          <span className="text-xs text-yellow-400 font-semibold">+{achievement.xpAwarded} XP</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Complete ações para desbloquear conquistas!</p>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="neon-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Atividade Recente</h2>
                </div>

                {progressHistory && progressHistory.length > 0 ? (
                  <div className="space-y-3">
                    {progressHistory.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-700 last:border-0">
                        <Zap className="w-4 h-4 text-cyan-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <span className="text-sm text-cyan-400 font-semibold">+{activity.xpGained} XP</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Nenhuma atividade recente</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
