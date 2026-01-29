import { useLocation, useParams } from "wouter";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

/**
 * Matchmaking Page - Bridge Visualization
 * Design: Cyberpunk with side-by-side comparison
 * Features: Job requirements vs talent skills, compatibility score
 */
export default function Matchmaking() {
  const [, setLocation] = useLocation();
  const { talentId } = useParams<{ talentId: string }>();

  // Mock data
  const jobRequirements = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  const talentSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "MongoDB",
  ];

  const matchedSkills = jobRequirements.filter(skill => talentSkills.includes(skill));
  const matchPercentage = Math.round((matchedSkills.length / jobRequirements.length) * 100);

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setLocation("/talent-bank")}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-4xl font-bold font-mono gradient-cyber-text">
              Funcionalidade Bridge
            </h1>
            <p className="text-gray-400 mt-1">Análise de Compatibilidade Talent-Vaga</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8 w-full">
          <img 
            src="/images/matchmaking-flow.png" 
            alt="Matchmaking Flow" 
            className="w-full h-auto rounded-lg neon-glow"
          />
        </div>

        {/* Main Bridge Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Side - Job Requirements */}
          <div className="card-neon">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">
              Requisitos da Vaga
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Desenvolvedor Full Stack - Tecnologia
            </p>
            <div className="space-y-2">
              {jobRequirements.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-cyan-400">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Compatibility Score */}
          <div className="card-neon flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-magenta-400 mb-4">
                Compatibilidade
              </h2>
              
              {/* Circular Progress */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(0, 212, 255, 0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${(matchPercentage / 100) * 440} 440`}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#ff006e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-cyber-text">
                      {matchPercentage}%
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Match</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                {matchedSkills.length} de {jobRequirements.length} habilidades alinhadas
              </p>
            </div>

            {/* Bridge Connection */}
            <div className="w-full h-1 divider-angular mb-6" />

            {/* Status */}
            <div className="text-center">
              <p className="text-sm font-semibold text-cyan-400">
                ✓ Qualificado para Contato
              </p>
            </div>
          </div>

          {/* Right Side - Talent Skills */}
          <div className="card-neon">
            <h2 className="text-xl font-semibold text-magenta-400 mb-4">
              Habilidades do Talento
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Talent-X-Stellar (Verificado)
            </p>
            <div className="space-y-2">
              {talentSkills.map((skill) => {
                const isMatched = jobRequirements.includes(skill);
                return (
                  <div
                    key={skill}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isMatched
                        ? "bg-magenta-500/10 border border-magenta-500/20"
                        : "bg-gray-500/10 border border-gray-500/20"
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 flex-shrink-0 ${
                        isMatched ? "text-magenta-400" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isMatched ? "text-magenta-400" : "text-gray-500"
                      }`}
                    >
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Matched Skills Highlight */}
        <div className="card-neon mb-8 border-cyan-500/30">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">
            Habilidades Alinhadas
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill) => (
              <span key={skill} className="badge-stellar pulse-glow">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Button */}
          <button
            onClick={() => alert("Contato seguro iniciado - Funcionalidade em desenvolvimento")}
            className="btn-cyber py-4 text-lg"
          >
            Iniciar Contato Seguro
          </button>

          {/* Back to Talent Bank */}
          <button
            onClick={() => setLocation("/talent-bank")}
            className="btn-cyber-outline py-4 text-lg"
          >
            Voltar ao Banco de Talentos
          </button>
        </div>

        {/* Info Section */}
        <div className="card-neon border-magenta-500/30 mt-8">
          <h3 className="text-lg font-semibold text-magenta-400 mb-3">
            🌉 Como funciona a Bridge?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            A Bridge visualiza a compatibilidade entre os requisitos da vaga e as habilidades 
            verificadas do talento. O percentual de match é calculado automaticamente baseado 
            nas competências alinhadas.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Quando o match é confirmado, você pode iniciar um contato seguro com o talento. 
            A identidade do candidato é revelada apenas neste momento, garantindo um processo 
            justo e transparente.
          </p>
        </div>
      </div>
    </div>
  );
}
