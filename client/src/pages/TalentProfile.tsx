import { useLocation, useParams } from "wouter";
import { ArrowLeft, Eye, EyeOff, Award, BookOpen, Shield, Lock } from "lucide-react";
import { useState } from "react";

/**
 * Talent Profile Page - Blind Recruitment Mode
 * Design: Cyberpunk with anonymous identity protection
 * Features: Verified skills, badges, identity reveal button (disabled until match)
 */
export default function TalentProfile() {
  const [, setLocation] = useLocation();
  const { talentId } = useParams<{ talentId: string }>();
  const [identityRevealed, setIdentityRevealed] = useState(false);

  // Mock talent data
  const talent = {
    id: talentId,
    pseudonym: "Talent-X-Stellar",
    realName: "Maria Silva",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    certifications: [
      {
        name: "React Advanced Patterns",
        issuer: "Udemy",
        date: "2024",
      },
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon",
        date: "2023",
      },
      {
        name: "TypeScript Masterclass",
        issuer: "Coursera",
        date: "2024",
      },
    ],
    experience: "5+ anos em desenvolvimento full-stack",
    sector: "Tecnologia",
    level: "Senior",
    verified: true,
    matchScore: 95,
  };

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

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
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-mono gradient-cyber-text">
              Perfil do Talento
            </h1>
            <p className="text-gray-400 mt-1">Modo Blind - Recrutamento Justo e Transparente</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Match Score</p>
            <p className="text-3xl font-bold gradient-cyber-text">{talent.matchScore}%</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 card-neon">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-magenta-500/30 flex items-center justify-center neon-glow">
                <Shield className="w-12 h-12 text-cyan-400" />
              </div>
            </div>

            {/* Pseudonym */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                {talent.pseudonym}
              </h2>
              <p className="text-xs text-gray-500">ID Anônimo Verificado</p>
            </div>

            {/* Identity Reveal Section */}
            <div className="mb-6 p-4 bg-magenta-500/10 rounded-lg border border-magenta-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-magenta-400" />
                <p className="text-sm font-semibold text-magenta-400">Identidade Protegida</p>
              </div>
              <button
                disabled
                className="w-full py-2 px-4 rounded-lg bg-gray-500/20 text-gray-400 text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <EyeOff className="w-4 h-4" />
                Revelar Identidade (Desabilitado)
              </button>
              <p className="text-xs text-gray-500 mt-3">
                A identidade será revelada após confirmação de match técnico
              </p>
            </div>

            {/* Verification Badge */}
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
              <p className="text-xs text-cyan-400 font-semibold">
                ✓ Identidade Verificada por Comunidade Parceira
              </p>
            </div>
          </div>

          {/* Verified Skills Section */}
          <div className="lg:col-span-2 card-neon">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400">
                Competências Verificadas
              </h2>
            </div>

            <p className="text-gray-400 mb-6">
              Todas as habilidades abaixo foram validadas em blockchain e comprovadas através de certificações
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {talent.skills.map((skill) => (
                <div
                  key={skill}
                  className="badge-stellar pulse-glow text-center py-2 justify-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="card-neon mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-magenta-400" />
            <h2 className="text-2xl font-bold text-magenta-400">
              Cursos e Certificações
            </h2>
          </div>

          <div className="space-y-3">
            {talent.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-magenta-500/10 border border-magenta-500/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-magenta-400">{cert.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <span className="badge-stellar-magenta text-xs">Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-neon">
            <p className="text-sm text-gray-400 mb-2">Nível de Experiência</p>
            <p className="text-2xl font-bold gradient-cyber-text">{talent.level}</p>
          </div>

          <div className="card-neon">
            <p className="text-sm text-gray-400 mb-2">Setor</p>
            <p className="text-2xl font-bold gradient-cyber-text">{talent.sector}</p>
          </div>

          <div className="card-neon">
            <p className="text-sm text-gray-400 mb-2">Status de Verificação</p>
            <p className="text-2xl font-bold text-cyan-400">✓ Verificado</p>
          </div>
        </div>

        {/* Experience Description */}
        <div className="card-neon mb-8 border-cyan-500/30">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Resumo Profissional</h3>
          <p className="text-gray-400 leading-relaxed">
            {talent.experience}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setLocation(`/matchmaking/${talent.id}`)}
            className="btn-cyber py-4 text-lg"
          >
            Ver Análise de Compatibilidade
          </button>

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
            🔐 Proteção de Dados e Privacidade
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Todos os dados deste perfil são protegidos por blockchain e criptografia de ponta a ponta. 
            A identidade real do talento é revelada apenas após um match técnico confirmado e consentimento explícito.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Este modelo garante um processo de recrutamento justo, sem viés de gênero, idade, origem ou 
            aparência. Você avalia apenas as competências técnicas verificadas.
          </p>
        </div>
      </div>
    </div>
  );
}
