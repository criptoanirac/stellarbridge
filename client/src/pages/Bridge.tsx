import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Search, MapPin, Briefcase, Star, Heart, ArrowLeft, Eye, GraduationCap, Award, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Bridge Page - Conexão entre Empresas e Talentos
 * Design: Cyberpunk com cards de candidatas
 * Features: Listagem, filtros, match/interesse
 */
export default function Bridge() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [selectedTalent, setSelectedTalent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch talents with filters
  const { data: talents, isLoading } = trpc.talent.list.useQuery({
    location: locationFilter && locationFilter !== "all" ? locationFilter : undefined,
    minExperience: experienceFilter && experienceFilter !== "all" ? experienceFilter : undefined,
    industry: industryFilter && industryFilter !== "all" ? industryFilter : undefined,
    limit: 50,
  });

  // Filter by search term (client-side)
  const filteredTalents = talents?.filter((talent) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      talent.pseudonym?.toLowerCase().includes(search) ||
      talent.bio?.toLowerCase().includes(search) ||
      talent.currentRole?.toLowerCase().includes(search) ||
      talent.skills?.some((s) => s.toLowerCase().includes(search))
    );
  });

  const handleInterest = (talentId: number, pseudonym: string) => {
    toast.success(`Interesse demonstrado em ${pseudonym}!`, {
      description: "A candidata será notificada sobre seu interesse.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">
                <span className="text-cyan-400">Stellar</span>
                <span className="text-magenta-400">Bridge</span>
              </h1>
              <span className="text-sm text-slate-400">
                Conectando talentos e oportunidades
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <Card className="p-6 mb-8 bg-slate-900/50 border-cyan-500/20">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Buscar Talentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as localizações</SelectItem>
                <SelectItem value="São Paulo">São Paulo</SelectItem>
                <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                <SelectItem value="Porto Alegre">Porto Alegre</SelectItem>
                <SelectItem value="Curitiba">Curitiba</SelectItem>
              </SelectContent>
            </Select>

            {/* Experience Filter */}
            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer experiência</SelectItem>
                <SelectItem value="0-1">0-1 anos</SelectItem>
                <SelectItem value="1-3">1-3 anos</SelectItem>
                <SelectItem value="3-5">3-5 anos</SelectItem>
                <SelectItem value="5+">5+ anos</SelectItem>
              </SelectContent>
            </Select>

            {/* Industry Filter */}
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Indústria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as indústrias</SelectItem>
                <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                <SelectItem value="Finanças">Finanças</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Varejo">Varejo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredTalents && (
            <p className="mt-4 text-sm text-slate-400">
              {filteredTalents.length} candidata(s) encontrada(s)
            </p>
          )}
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            <p className="mt-4 text-slate-400">Carregando talentos...</p>
          </div>
        )}

        {/* Talents Grid */}
        {!isLoading && filteredTalents && filteredTalents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent) => (
              <Card
                key={talent.id}
                className="p-6 bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-1">
                      {talent.pseudonym}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {talent.currentRole}
                    </p>
                  </div>
                  {talent.level && (
                    <div className="flex items-center gap-1 bg-magenta-500/20 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-magenta-400" />
                      <span className="text-xs text-magenta-400">
                        Nível {talent.level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {talent.bio && (
                  <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                    {talent.bio}
                  </p>
                )}

                {/* Info */}
                <div className="space-y-2 mb-4">
                  {talent.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {talent.location}
                    </div>
                  )}
                  {talent.yearsExperience && (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      {talent.yearsExperience} anos de experiência
                    </div>
                  )}
                </div>

                {/* Skills */}
                {talent.skills && talent.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.slice(0, 5).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 5 && (
                        <span className="px-2 py-1 text-xs text-slate-400">
                          +{talent.skills.length - 5} mais
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-magenta-500/30 hover:bg-magenta-500/10 hover:border-magenta-500/50"
                    onClick={() => {
                      setSelectedTalent(talent);
                      setIsModalOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Candidata
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                    onClick={() =>
                      handleInterest(talent.id, talent.pseudonym || "")
                    }
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Links */}
                {(talent.portfolioUrl ||
                  talent.githubUrl ||
                  talent.linkedinUrl) && (
                  <div className="mt-4 pt-4 border-t border-slate-700 flex gap-2">
                    {talent.portfolioUrl && (
                      <a
                        href={talent.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        🌐 Portfolio
                      </a>
                    )}
                    {talent.githubUrl && (
                      <a
                        href={talent.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        💻 GitHub
                      </a>
                    )}
                    {talent.linkedinUrl && (
                      <a
                        href={talent.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        💼 LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredTalents && filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              Nenhuma candidata encontrada com os filtros selecionados.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Tente ajustar os filtros para ver mais resultados.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes da Candidata */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-cyan-500/30">
          {selectedTalent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-cyan-400">
                  {selectedTalent.pseudonym}
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-base">
                  {selectedTalent.currentRole}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Bio */}
                {selectedTalent.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-magenta-400 mb-2">Sobre</h3>
                    <p className="text-slate-300">{selectedTalent.bio}</p>
                  </div>
                )}

                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedTalent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-xs text-slate-400">Localização</p>
                        <p className="text-slate-200">{selectedTalent.location}</p>
                      </div>
                    </div>
                  )}
                  {selectedTalent.yearsExperience && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-xs text-slate-400">Experiência</p>
                        <p className="text-slate-200">{selectedTalent.yearsExperience} anos</p>
                      </div>
                    </div>
                  )}
                  {selectedTalent.industry && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-xs text-slate-400">Indústria</p>
                        <p className="text-slate-200">{selectedTalent.industry}</p>
                      </div>
                    </div>
                  )}
                  {selectedTalent.level && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-magenta-400" />
                      <div>
                        <p className="text-xs text-slate-400">Nível</p>
                        <p className="text-slate-200">Nível {selectedTalent.level} ({selectedTalent.xp || 0} XP)</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {selectedTalent.skills && selectedTalent.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-magenta-400 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Habilidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTalent.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educação (Fictícia) */}
                <div>
                  <h3 className="text-lg font-semibold text-magenta-400 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Educação
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="font-semibold text-slate-200">Bacharelado em Ciência da Computação</p>
                      <p className="text-sm text-slate-400">Universidade Federal - 2018</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="font-semibold text-slate-200">Técnico em Informática</p>
                      <p className="text-sm text-slate-400">ETEC - 2014</p>
                    </div>
                  </div>
                </div>

                {/* Certificações (Fictícias) */}
                <div>
                  <h3 className="text-lg font-semibold text-magenta-400 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certificações
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="text-slate-200">AWS Certified Solutions Architect</p>
                        <p className="text-xs text-slate-400">Amazon Web Services - 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="text-slate-200">Professional Scrum Master I</p>
                        <p className="text-xs text-slate-400">Scrum.org - 2022</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="text-slate-200">Google Cloud Professional Data Engineer</p>
                        <p className="text-xs text-slate-400">Google Cloud - 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experiência Profissional (Fictícia) */}
                <div>
                  <h3 className="text-lg font-semibold text-magenta-400 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Experiência Profissional
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="font-semibold text-slate-200">{selectedTalent.currentRole}</p>
                      <p className="text-sm text-cyan-400">Tech Solutions Inc.</p>
                      <p className="text-xs text-slate-400 mb-2">2021 - Presente</p>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                        <li>Liderou equipe de 5 desenvolvedores em projetos de alta complexidade</li>
                        <li>Implementou arquitetura de microserviços reduzindo custos em 30%</li>
                        <li>Desenvolveu APIs REST consumidas por 100k+ usuários diários</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="font-semibold text-slate-200">Desenvolvedora Pleno</p>
                      <p className="text-sm text-cyan-400">Startup Inovadora Ltda.</p>
                      <p className="text-xs text-slate-400 mb-2">2019 - 2021</p>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                        <li>Desenvolveu features para plataforma SaaS com 50k usuários</li>
                        <li>Participou de code reviews e mentorou desenvolvedores juniores</li>
                        <li>Implementou testes automatizados aumentando cobertura para 85%</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(selectedTalent.portfolioUrl || selectedTalent.githubUrl || selectedTalent.linkedinUrl) && (
                  <div>
                    <h3 className="text-lg font-semibold text-magenta-400 mb-3">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedTalent.portfolioUrl && (
                        <a
                          href={selectedTalent.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                        >
                          🌐 Portfólio
                        </a>
                      )}
                      {selectedTalent.githubUrl && (
                        <a
                          href={selectedTalent.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                        >
                          💻 GitHub
                        </a>
                      )}
                      {selectedTalent.linkedinUrl && (
                        <a
                          href={selectedTalent.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                        >
                          💼 LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-700">
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600"
                    onClick={() => {
                      handleInterest(selectedTalent.id, selectedTalent.pseudonym || "");
                      setIsModalOpen(false);
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Demonstrar Interesse
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
