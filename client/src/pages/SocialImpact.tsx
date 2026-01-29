import { trpc } from "@/lib/trpc";
import { Users, Briefcase, TrendingUp, DollarSign, Award, Building2, MapPin, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SocialImpact() {
  const { data: metrics, isLoading: metricsLoading } = trpc.socialImpact.getMetrics.useQuery();
  const { data: geoData, isLoading: geoLoading } = trpc.socialImpact.getGeographicDistribution.useQuery();
  const { data: growthData, isLoading: growthLoading } = trpc.socialImpact.getGrowthTrend.useQuery();
  const { data: stories, isLoading: storiesLoading } = trpc.socialImpact.getSuccessStories.useQuery();
  const { data: topCerts, isLoading: certsLoading } = trpc.socialImpact.getTopCertifications.useQuery();
  const { data: activeCompanies, isLoading: companiesLoading } = trpc.socialImpact.getActiveCompaniesCount.useQuery();

  const isLoading = metricsLoading || geoLoading || growthLoading || storiesLoading || certsLoading || companiesLoading;

  // Cores para gráficos
  const COLORS = ['#00d4ff', '#ff006e', '#9d4edd', '#06ffa5', '#ffbe0b'];

  // Preparar dados de crescimento
  const prepareGrowthData = () => {
    if (!growthData) return [];
    const months = new Set([
      ...growthData.talents.map(t => t.month),
      ...growthData.jobs.map(j => j.month),
      ...growthData.matches.map(m => m.month),
    ]);
    
    return Array.from(months).sort().map(month => ({
      month,
      talentos: growthData.talents.find(t => t.month === month)?.count || 0,
      vagas: growthData.jobs.find(j => j.month === month)?.count || 0,
      matches: growthData.matches.find(m => m.month === month)?.count || 0,
    }));
  };

  // Preparar dados geográficos
  const prepareGeoData = () => {
    if (!geoData) return [];
    const locations = new Set([
      ...geoData.talents.map(t => t.location),
      ...geoData.jobs.map(j => j.location),
    ]);
    
    return Array.from(locations).map(location => ({
      location: location || 'Não especificado',
      talentos: geoData.talents.find(t => t.location === location)?.count || 0,
      vagas: geoData.jobs.find(j => j.location === location)?.count || 0,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando métricas de impacto...</p>
        </div>
      </div>
    );
  }

  const growthChartData = prepareGrowthData();
  const geoChartData = prepareGeoData();

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan/20 to-magenta/20 border-b border-cyan/30">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold font-space-mono mb-4">
            <span className="text-cyan">Impacto</span>{" "}
            <span className="text-magenta">Social</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Transformando vidas através da tecnologia e inclusão. Acompanhe as métricas que mostram como o StellarBridge está construindo pontes para a liberdade profissional.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-cyan/10 to-cyan/5 border border-cyan/30 rounded-lg p-6 hover:border-cyan transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan" />
              <div className="text-3xl font-bold text-cyan">{metrics?.trainedTalents || 0}</div>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Mulheres Capacitadas</h3>
            <p className="text-gray-500 text-sm">Com certificações verificadas</p>
          </div>

          <div className="bg-gradient-to-br from-magenta/10 to-magenta/5 border border-magenta/30 rounded-lg p-6 hover:border-magenta transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-8 h-8 text-magenta" />
              <div className="text-3xl font-bold text-magenta">{metrics?.jobsFilled || 0}</div>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Vagas Preenchidas</h3>
            <p className="text-gray-500 text-sm">Matches que viraram contratações</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div className="text-3xl font-bold text-purple-400">{metrics?.employabilityRate.toFixed(1) || 0}%</div>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Taxa de Empregabilidade</h3>
            <p className="text-gray-500 text-sm">Candidatas com matches</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div className="text-3xl font-bold text-green-400">
                R$ {metrics?.avgSalary.toLocaleString('pt-BR') || 0}
              </div>
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">Salário Médio</h3>
            <p className="text-gray-500 text-sm">Das vagas preenchidas</p>
          </div>
        </div>

        {/* Crescimento da Plataforma */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan/20 rounded-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-cyan" />
            <h2 className="text-2xl font-bold font-space-mono text-white">Crescimento da Plataforma</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #00d4ff',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#00d4ff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="talentos" stroke="#00d4ff" strokeWidth={2} name="Talentos" />
              <Line type="monotone" dataKey="vagas" stroke="#ff006e" strokeWidth={2} name="Vagas" />
              <Line type="monotone" dataKey="matches" stroke="#9d4edd" strokeWidth={2} name="Matches" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição Geográfica e Certificações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Distribuição Geográfica */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-magenta/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-magenta" />
              <h2 className="text-2xl font-bold font-space-mono text-white">Distribuição Regional</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="location" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #ff006e',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="talentos" fill="#00d4ff" name="Talentos" />
                <Bar dataKey="vagas" fill="#ff006e" name="Vagas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Certificações */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-purple-500/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold font-space-mono text-white">Certificações Mais Valorizadas</h2>
            </div>
            <div className="space-y-4">
              {topCerts?.slice(0, 8).map((cert, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">{cert.certification}</span>
                      <span className="text-cyan font-semibold">{cert.count}</span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${(Number(cert.count) / Number(topCerts[0].count)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parceiros */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-green-500/20 rounded-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold font-space-mono text-white">Ecossistema de Parceiros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-cyan/5 border border-cyan/20 rounded-lg">
              <div className="text-4xl font-bold text-cyan mb-2">6</div>
              <p className="text-gray-300 font-semibold">Instituições de Capacitação</p>
              <p className="text-gray-500 text-sm mt-1">Oferecendo cursos gratuitos</p>
            </div>
            <div className="text-center p-6 bg-magenta/5 border border-magenta/20 rounded-lg">
              <div className="text-4xl font-bold text-magenta mb-2">{activeCompanies || 0}</div>
              <p className="text-gray-300 font-semibold">Empresas Contratando</p>
              <p className="text-gray-500 text-sm mt-1">Com vagas ativas na plataforma</p>
            </div>
            <div className="text-center p-6 bg-purple-500/5 border border-purple-500/20 rounded-lg">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                R$ {((metrics?.avgSalary || 0) * (metrics?.jobsFilled || 0) * 12).toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-300 font-semibold">Impacto Econômico Anual</p>
              <p className="text-gray-500 text-sm mt-1">Valor gerado em salários</p>
            </div>
          </div>
        </div>

        {/* Histórias de Sucesso */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold font-space-mono text-white mb-6">
            <span className="text-cyan">Histórias</span> de <span className="text-magenta">Sucesso</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories?.map((story) => (
              <div
                key={story.id}
                className="bg-gradient-to-br from-cyan/5 to-magenta/5 border border-cyan/20 rounded-lg p-6 hover:border-cyan transition-all hover:shadow-lg hover:shadow-cyan/20"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan font-semibold">{story.talentPseudonym}</span>
                    <span className="text-green-400 text-sm font-bold">+{story.salaryIncrease}%</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <span className="line-through">{story.beforeRole}</span>
                    <span className="mx-2">→</span>
                    <span className="text-magenta font-semibold">{story.afterRole}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{story.companyName}</div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{story.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
