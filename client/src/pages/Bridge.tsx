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
import { Search, MapPin, Briefcase, Star, Heart, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

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
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
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
                    className="flex-1 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                    onClick={() =>
                      handleInterest(talent.id, talent.pseudonym || "")
                    }
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Demonstrar Interesse
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
    </div>
  );
}
