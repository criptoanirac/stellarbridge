import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search, Star, Shield, Code, Briefcase } from "lucide-react";
import { useState } from "react";

/**
 * Talent Bank Page - Blind Recruitment Visualization
 * Design: Cyberpunk with skill badges and blind profiles
 * Features: Talent profiles focused on verified skills, filters
 */
export default function TalentBank() {
  const [, setLocation] = useLocation();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Mock talent data with blind profiles
  const talents = [
    {
      id: 1,
      pseudonym: "Talent-X-Stellar",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      level: "Senior",
      sector: "Tecnologia",
      matchScore: 95,
      verified: true,
    },
    {
      id: 2,
      pseudonym: "Talent-Y-Stellar",
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      level: "Mid",
      sector: "IA/ML",
      matchScore: 88,
      verified: true,
    },
    {
      id: 3,
      pseudonym: "Talent-Z-Stellar",
      skills: ["UI Design", "Figma", "Prototyping", "User Research"],
      level: "Senior",
      sector: "Design",
      matchScore: 92,
      verified: true,
    },
    {
      id: 4,
      pseudonym: "Talent-A-Stellar",
      skills: ["Product Management", "Analytics", "Leadership", "Strategy"],
      level: "Senior",
      sector: "Produto",
      matchScore: 85,
      verified: true,
    },
    {
      id: 5,
      pseudonym: "Talent-B-Stellar",
      skills: ["DevOps", "Kubernetes", "AWS", "CI/CD"],
      level: "Mid",
      sector: "Infraestrutura",
      matchScore: 90,
      verified: true,
    },
  ];

  const allSkills = Array.from(new Set(talents.flatMap(t => t.skills)));
  const allLevels = Array.from(new Set(talents.map(t => t.level)));

  const filteredTalents = talents.filter(talent => {
    if (selectedSkill && !talent.skills.includes(selectedSkill)) return false;
    if (selectedLevel && talent.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-4xl font-bold font-mono gradient-cyber-text">
              Banco de Talentos
            </h1>
            <p className="text-gray-400 mt-1">Recrutamento Blind - Foco em Competências Verificadas</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="card-neon mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-cyan-400">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Habilidade
              </label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedSkill === skill
                        ? "badge-stellar-magenta"
                        : "badge-stellar"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Nível de Experiência
              </label>
              <div className="flex flex-wrap gap-2">
                {allLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedLevel === level
                        ? "badge-stellar-magenta"
                        : "badge-stellar"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedSkill(null);
                  setSelectedLevel(null);
                }}
                className="btn-cyber-outline w-full text-sm py-2"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((talent) => (
            <div key={talent.id} className="card-neon flex flex-col">
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-magenta-500/30 flex items-center justify-center">
                      <Star className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400">{talent.pseudonym}</h3>
                      <p className="text-xs text-gray-500">ID Anônimo</p>
                    </div>
                  </div>
                </div>
                {talent.verified && (
                  <Shield className="w-5 h-5 text-magenta-400" />
                )}
              </div>

              {/* Verification Badge */}
              <div className="mb-4 p-3 bg-magenta-500/10 rounded-lg border border-magenta-500/20">
                <p className="text-xs text-magenta-400 font-semibold">
                  ✓ Identidade Verificada por Comunidade Parceira
                </p>
              </div>

              {/* Verified Skills Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Competências Verificadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {talent.skills.map((skill) => (
                    <span key={skill} className="badge-stellar text-xs pulse-glow">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-xs text-gray-400 mb-1">Nível de Experiência</p>
                <p className="text-sm font-semibold text-cyan-400">{talent.level}</p>
              </div>

              {/* Match Score */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Compatibilidade Geral</span>
                <span className="text-lg font-bold gradient-cyber-text">{talent.matchScore}%</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setLocation(`/talent-profile/${talent.id}`)}
                className="btn-cyber w-full text-sm py-2 mt-auto"
              >
                Ver Perfil Completo
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTalents.length === 0 && (
          <div className="card-neon text-center py-12">
            <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum talento encontrado com os filtros selecionados</p>
          </div>
        )}

        {/* Info Section */}
        <div className="card-neon border-magenta-500/30 mt-8">
          <h3 className="text-lg font-semibold text-magenta-400 mb-3">
            🔍 Sobre o Recrutamento Blind
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nesta visualização, você vê apenas as competências técnicas verificadas em blockchain. 
            Os nomes reais dos candidatos são revelados apenas após um match técnico confirmado. 
            Isso garante um processo de recrutamento justo, sem viés de gênero, idade ou origem.
          </p>
        </div>
      </div>
    </div>
  );
}
