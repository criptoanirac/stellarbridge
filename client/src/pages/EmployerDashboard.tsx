import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Plus, Zap } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

/**
 * Employer Dashboard Page
 * Design: Cyberpunk with card-based layout
 * Features: Talent bank access, recent matches, job posting, notification testing with filters
 */
export default function EmployerDashboard() {
  const [, setLocation] = useLocation();
  const { addNotification } = useNotifications();

  const triggerTestNotification = () => {
    const jobTalentPairs = [
      {
        job: "Desenvolvedor Full Stack Senior",
        talent: { name: "Talent-X-Stellar", skills: ["React", "TypeScript", "Node.js"], match: 95 },
      },
      {
        job: "Cientista de Dados",
        talent: { name: "Talent-Y-Stellar", skills: ["Python", "Machine Learning", "Data Science"], match: 88 },
      },
      {
        job: "Designer UI/UX",
        talent: { name: "Talent-Z-Stellar", skills: ["UI Design", "Figma", "Prototyping"], match: 92 },
      },
      {
        job: "Desenvolvedor Backend",
        talent: { name: "Talent-A-Stellar", skills: ["Node.js", "PostgreSQL", "Docker"], match: 87 },
      },
      {
        job: "Product Manager",
        talent: { name: "Talent-B-Stellar", skills: ["Product Strategy", "Analytics", "Leadership"], match: 91 },
      },
    ];
    const randomPair = jobTalentPairs[Math.floor(Math.random() * jobTalentPairs.length)];

    addNotification({
      type: "match",
      title: "Novo Match Encontrado!",
      message: "Encontramos um talento verificado com as habilidades que você procura",
      talentName: randomPair.talent.name,
      talentSkills: randomPair.talent.skills,
      matchPercentage: randomPair.talent.match,
      jobTitle: randomPair.job,
    });
  };

  // Mock data for recent matches
  const recentMatches = [
    {
      id: 1,
      title: "Encontramos 3 candidatas com Badge de Desenvolvedora para sua vaga de TI",
      matchPercentage: 95,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "2 candidatas com experiência em Product Management disponíveis",
      matchPercentage: 88,
      skills: ["Product Strategy", "Analytics", "Leadership"],
    },
    {
      id: 3,
      title: "5 designers com Badge Stellar em UI/UX para projeto web",
      matchPercentage: 92,
      skills: ["UI Design", "Figma", "Prototyping"],
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-cyan-400" />
            </button>
            <div>
              <h1 className="text-4xl font-bold font-mono gradient-cyber-text">
                Área da Empresa
              </h1>
              <p className="text-gray-400 mt-1">Gerencie suas vagas e encontre talentos verificados</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Action Card */}
          <div className="lg:col-span-1 card-neon">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyan-400">Banco de Talentos</h2>
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Acesse perfis de candidatas com habilidades verificadas em blockchain
            </p>
            <button
              onClick={() => setLocation("/talent-bank")}
              className="btn-cyber w-full"
            >
              Ver Banco de Talentos Verificados
            </button>
          </div>

          {/* Post Job Card */}
          <div className="lg:col-span-1 card-neon">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-magenta-400">Nova Vaga</h2>
              <Plus className="w-5 h-5 text-magenta-400" />
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Publique uma nova oportunidade e receba matches automáticos
            </p>
            <div className="flex gap-2">
              <button
                className="btn-cyber-outline flex-1"
                onClick={() => setLocation("/post-job")}
              >
                Publicar
              </button>
              <button
                className="btn-cyber-outline flex-1"
                onClick={() => setLocation("/manage-jobs")}
              >
                Gerenciar
              </button>
            </div>
          </div>

          {/* Test Notifications Card */}
          <div className="lg:col-span-1 card-neon">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyan-400">Notificações</h2>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Teste o sistema com filtros avançados
            </p>
            <button
              className="btn-cyber w-full"
              onClick={triggerTestNotification}
            >
              Gerar Notificação
            </button>
          </div>
        </div>

        {/* Bridge Functionality Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold font-mono gradient-cyber-text">
              Funcionalidade Bridge
            </h2>
            <div className="flex-1 h-1 divider-angular" />
          </div>
          <p className="text-gray-400 mb-6">
            Feed inteligente mostrando matches automáticos entre suas vagas e talentos verificados
          </p>

          {/* Matches Feed */}
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div key={match.id} className="card-neon group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                      {match.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge-stellar text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-3xl font-bold gradient-cyber-text">
                      {match.matchPercentage}%
                    </div>
                    <p className="text-xs text-gray-400">Match</p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="btn-cyber-outline w-full text-sm py-2"
                  onClick={() => setLocation("/bridge")}
                >
                  Ver Candidatas
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="card-neon border-magenta-500/30">
          <h3 className="text-lg font-semibold text-magenta-400 mb-3">
            💡 Como funciona a Bridge?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A Bridge conecta automaticamente suas vagas aos talentos verificados em nossa rede. 
            Cada candidato possui Badges Stellar que comprovam suas habilidades através de blockchain. 
            Você visualiza apenas as competências técnicas, garantindo um recrutamento justo e sem viés.
          </p>
        </div>
      </div>
    </div>
  );
}
