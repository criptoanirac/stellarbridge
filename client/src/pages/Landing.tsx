import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Shield,
  Users,
  TrendingUp,
  Award,
  Heart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Globe,
  BarChart3,
} from "lucide-react";
import { Link } from "wouter";

/**
 * Landing Page - Página de apresentação do projeto StellarBridge
 * Design: Cyberpunk moderno com foco em conversão
 * Seções: Hero, Problema/Solução, Funcionalidades, Impacto, Depoimentos, CTA
 */
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-magenta-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-magenta-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-magenta-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="text-cyan-400">Stellar</span>
                <span className="text-magenta-400">Bridge</span>
              </h1>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sua Ponte para a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                Liberdade Profissional
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              Conectamos talentos femininos verificados a empresas comprometidas
              com diversidade através de recrutamento blind, capacitação
              profissional e validação blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-6 text-lg group"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/impacto-social">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-magenta-500 text-magenta-400 hover:bg-magenta-500/10 px-8 py-6 text-lg"
                >
                  Ver Impacto Social
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">8+</div>
                <div className="text-sm text-slate-400">
                  Talentos Capacitados
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-magenta-400 mb-2">
                  87.5%
                </div>
                <div className="text-sm text-slate-400">
                  Taxa de Empregabilidade
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">4+</div>
                <div className="text-sm text-slate-400">Empresas Parceiras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-magenta-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-slate-400">
                  Recrutamento Justo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema/Solução Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                O Desafio da Inclusão no Mercado
              </h2>
              <p className="text-xl text-slate-300">
                Vieses inconscientes ainda impedem talentos qualificados de
                alcançarem oportunidades merecidas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problema */}
              <Card className="p-8 bg-red-500/10 border-red-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      O Problema
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Processos seletivos enviesados por gênero, idade ou
                      aparência
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Falta de validação transparente de competências técnicas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Dificuldade de acesso a capacitação profissional de
                      qualidade
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>
                      Desconexão entre talentos qualificados e oportunidades
                      reais
                    </span>
                  </li>
                </ul>
              </Card>

              {/* Solução */}
              <Card className="p-8 bg-cyan-500/10 border-cyan-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Nossa Solução
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Recrutamento blind com perfis pseudonimizados até o match
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Certificações verificadas em blockchain imutável
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Parcerias com instituições de capacitação renomadas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Matchmaking inteligente baseado em competências técnicas
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Funcionalidades que Transformam
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Uma plataforma completa para capacitação, validação e conexão de
              talentos com oportunidades reais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="p-6 bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Recrutamento Blind
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Perfis pseudonimizados garantem avaliação baseada puramente em
                competências técnicas, eliminando vieses inconscientes.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 bg-slate-900/50 border-magenta-500/20 hover:border-magenta-500/50 transition-all hover:shadow-lg hover:shadow-magenta-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta-500/20 to-magenta-600/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-magenta-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Validação Blockchain
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Certificações e habilidades verificadas em blockchain público,
                garantindo autenticidade e transparência imutável.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Capacitação Profissional
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Cursos gratuitos de instituições parceiras como Mulheres que
                Codam, Sebrae e Let's Cocreate.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 bg-slate-900/50 border-magenta-500/20 hover:border-magenta-500/50 transition-all hover:shadow-lg hover:shadow-magenta-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta-500/20 to-magenta-600/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-magenta-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Matchmaking Inteligente
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Algoritmo analisa compatibilidade entre vagas e talentos,
                gerando matches automáticos com scores percentuais.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gamificação e XP
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Sistema de níveis, badges e conquistas motiva desenvolvimento
                contínuo e engaja talentos em suas jornadas.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 bg-slate-900/50 border-magenta-500/20 hover:border-magenta-500/50 transition-all hover:shadow-lg hover:shadow-magenta-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta-500/20 to-magenta-600/20 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-magenta-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Dashboard de Impacto
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Métricas transparentes de impacto social: mulheres capacitadas,
                taxa de empregabilidade e histórias de sucesso.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impacto Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-500/5 to-magenta-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
              <Heart className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">
                Impacto Social Real
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transformando Vidas Através da Tecnologia
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Cada match, cada certificação, cada contratação representa uma
              vida transformada e uma ponte construída para a liberdade
              profissional.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-8 bg-slate-900/50 border-cyan-500/20">
                <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">5+</div>
                <div className="text-slate-300">Cidades Alcançadas</div>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-magenta-500/20">
                <Users className="w-12 h-12 text-magenta-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">8+</div>
                <div className="text-slate-300">Talentos Capacitados</div>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-cyan-500/20">
                <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">87.5%</div>
                <div className="text-slate-300">Taxa de Empregabilidade</div>
              </Card>
            </div>

            <Link href="/impacto-social">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                Ver Dashboard Completo de Impacto
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Conheça algumas das mulheres que transformaram suas carreiras
              através da StellarBridge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Depoimento 1 */}
            <Card className="p-6 bg-slate-900/50 border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AS</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Ana Silva</div>
                  <div className="text-sm text-slate-400">
                    Desenvolvedora Full Stack
                  </div>
                </div>
              </div>
              <p className="text-slate-300 italic leading-relaxed">
                "A StellarBridge me deu a oportunidade de ser avaliada pelas
                minhas habilidades técnicas, não pela minha aparência. Consegui
                minha primeira vaga como desenvolvedora senior!"
              </p>
            </Card>

            {/* Depoimento 2 */}
            <Card className="p-6 bg-slate-900/50 border-magenta-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-magenta-400 to-magenta-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BS</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Beatriz Santos</div>
                  <div className="text-sm text-slate-400">Designer UI/UX</div>
                </div>
              </div>
              <p className="text-slate-300 italic leading-relaxed">
                "Os cursos de capacitação me prepararam perfeitamente para o
                mercado. Em 3 meses, já estava trabalhando em uma empresa
                incrível com salário justo."
              </p>
            </Card>

            {/* Depoimento 3 */}
            <Card className="p-6 bg-slate-900/50 border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CO</span>
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Carla Oliveira
                  </div>
                  <div className="text-sm text-slate-400">
                    Analista de Dados
                  </div>
                </div>
              </div>
              <p className="text-slate-300 italic leading-relaxed">
                "O sistema de gamificação me motivou a continuar estudando. Cada
                badge conquistado era uma vitória. Hoje sou analista de dados
                senior!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pronta para Transformar Sua Carreira?
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Junte-se a centenas de talentos que já estão construindo suas
              pontes para a liberdade profissional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white px-12 py-6 text-lg group"
                >
                  Começar Minha Jornada
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-8">
              100% gratuito • Sem cartão de crédito • Comece em 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-cyan-400">Stellar</span>
              <span className="text-2xl font-bold text-magenta-400">
                Bridge
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Construindo pontes para a liberdade profissional
            </p>
            <div className="flex gap-6 justify-center text-sm text-slate-400">
              <Link href="/">
                <a className="hover:text-cyan-400 transition-colors">Início</a>
              </Link>
              <Link href="/impacto-social">
                <a className="hover:text-cyan-400 transition-colors">
                  Impacto Social
                </a>
              </Link>
              <a
                href="https://github.com/yanirac/stellarbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-8">
              © 2026 StellarBridge. Construído com 💜 para promover inclusão.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
