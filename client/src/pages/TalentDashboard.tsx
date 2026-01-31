import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Briefcase, Heart, Settings, LogOut, User, Award, BookOpen, Wallet } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import EditProfileModal from "@/components/EditProfileModal";

/**
 * Talent Dashboard Page
 * Design: Cyberpunk with sidebar navigation
 * Features: Profile view, matches, saved jobs, badges
 */
export default function TalentDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"profile" | "matches" | "saved">("profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, logout } = useAuth();
  
  // Fetch talent profile
  const { data: profile, isLoading } = trpc.talent.getProfile.useQuery();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout realizado com sucesso!");
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Carregando...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vinda à StellarBridge! 💜</h2>
            <p className="text-slate-400">Você está autenticada, mas ainda não possui um perfil cadastrado.</p>
          </div>
          
          <div className="p-8 bg-slate-900/50 border border-magenta-500/20 rounded-lg text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crie seu Perfil</h3>
            <p className="text-slate-400 text-sm mb-6">Complete seu cadastro e comece a receber oportunidades de emprego na área de tecnologia</p>
            <Button 
              onClick={() => setLocation("/talent-signup")} 
              className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600"
            >
              Começar Cadastro
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")} 
              className="text-slate-400 hover:text-white"
            >
              ← Voltar para Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-[#0a0e27]/90 backdrop-blur-xl border-r border-cyan-500/20 p-6">
          {/* User Info */}
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white font-space-mono text-lg mb-1">{profile.socialName || profile.pseudonym}</h3>
            <p className="text-cyan-400 text-sm">{profile.currentRole || "Candidata"}</p>
            {profile.identityVerified && (
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-xs">Verificada</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Meu Perfil</span>
            </button>

            <button
              onClick={() => setActiveTab("matches")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "matches"
                  ? "bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Star className="w-5 h-5" />
              <span>Matches</span>
              <span className="ml-auto px-2 py-1 rounded-full bg-magenta-500/20 text-magenta-400 text-xs">
                0
              </span>
            </button>

            <button
              onClick={() => setLocation("/my-earnings")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Wallet className="w-5 h-5" />
              <span>Meus Ganhos</span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "saved"
                  ? "bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Vagas Salvas</span>
            </button>

            <button
              onClick={() => setLocation("/training-hub")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Capacitação</span>
            </button>

            <button
              onClick={() => setLocation("/professional-development")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Award className="w-5 h-5" />
              <span>Desenvolvimento</span>
            </button>
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2">
            <button
              onClick={() => setLocation("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-space-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  Meu Perfil
                </h1>
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-magenta-500"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Editar Perfil
                </Button>
              </div>

              {/* Bio Card */}
              <div className="neon-card p-6">
                <h2 className="text-xl font-space-mono text-white mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-cyan-400" />
                  Sobre Mim
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {profile.bio || "Nenhuma bio adicionada ainda."}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Experiência</p>
                    <p className="text-white">{profile.yearsExperience || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Indústria</p>
                    <p className="text-white">{profile.industry || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Localização</p>
                    <p className="text-white">{profile.location || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Cargo Atual</p>
                    <p className="text-white">{profile.currentRole || "Não informado"}</p>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="neon-card p-6">
                <h2 className="text-xl font-space-mono text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-cyan-400" />
                  Habilidades Verificadas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-medium neon-glow"
                      >
                        {skill.skill}
                        {skill.verified && <span className="ml-2">✓</span>}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">Nenhuma habilidade adicionada ainda.</p>
                  )}
                </div>
              </div>

              {/* Education Card */}
              <div className="neon-card p-6">
                <h2 className="text-xl font-space-mono text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                  Educação
                </h2>
                <div className="space-y-4">
                  {profile.education && profile.education.length > 0 ? (
                    profile.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-cyan-500/50 pl-4">
                        <h3 className="text-white font-medium">{edu.course}</h3>
                        <p className="text-cyan-400 text-sm">{edu.institution}</p>
                        {edu.completionYear && (
                          <p className="text-gray-400 text-sm">{edu.completionYear}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">Nenhuma educação adicionada ainda.</p>
                  )}
                </div>
              </div>

              {/* Certifications Card */}
              <div className="neon-card p-6">
                <h2 className="text-xl font-space-mono text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-cyan-400" />
                  Certificações
                </h2>
                <div className="space-y-2">
                  {profile.certifications && profile.certifications.length > 0 ? (
                    profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-white">{cert.certification}</span>
                        {cert.issuer && <span className="text-gray-400 text-sm">- {cert.issuer}</span>}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">Nenhuma certificação adicionada ainda.</p>
                  )}
                </div>
              </div>

              {/* Links Card */}
              {(profile.portfolioUrl || profile.githubUrl || profile.linkedinUrl) && (
                <div className="neon-card p-6">
                  <h2 className="text-xl font-space-mono text-white mb-4">Links Profissionais</h2>
                  <div className="space-y-2">
                    {profile.portfolioUrl && (
                      <a
                        href={profile.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        🌐 Portfolio
                      </a>
                    )}
                    {profile.githubUrl && (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        💻 GitHub
                      </a>
                    )}
                    {profile.linkedinUrl && (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        💼 LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matches Tab */}
          {activeTab === "matches" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-space-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-8">
                Meus Matches
              </h1>
              <div className="neon-card p-12 text-center">
                <Star className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Nenhum match ainda</h3>
                <p className="text-gray-400">
                  Quando empresas encontrarem seu perfil compatível com vagas, você verá os matches aqui.
                </p>
              </div>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === "saved" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-space-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-8">
                Vagas Salvas
              </h1>
              <div className="neon-card p-12 text-center">
                <Heart className="w-16 h-16 text-magenta-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Nenhuma vaga salva</h3>
                <p className="text-gray-400">
                  Explore o banco de vagas e salve as oportunidades que mais interessam você.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
