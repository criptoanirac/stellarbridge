import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Award, ExternalLink, Filter, GraduationCap, Users } from "lucide-react";
import { useState } from "react";

/**
 * Training Hub Page
 * Design: Cyberpunk with course cards and partner institutions
 * Features: Course listing, filters, enrollment tracking
 */

interface Course {
  id: number;
  title: string;
  institution: string;
  institutionLogo: string;
  category: string;
  level: string;
  duration: string;
  description: string;
  link: string;
  scholarships: boolean;
  tags: string[];
}

const partnerInstitutions = [
  {
    name: "Mulheres que Codam",
    logo: "👩‍💻",
    description: "Capacitação em programação para mulheres",
    website: "https://www.mulheresquecodam.com.br",
  },
  {
    name: "Sebrae",
    logo: "🏢",
    description: "Cursos de empreendedorismo e gestão",
    website: "https://www.sebrae.com.br",
  },
  {
    name: "Let's Cocreate",
    logo: "🚀",
    description: "Inovação e desenvolvimento de produtos",
    website: "https://letscocreate.com.br",
  },
  {
    name: "Reprograma",
    logo: "💜",
    description: "Programação para mulheres em situação de vulnerabilidade",
    website: "https://reprograma.com.br",
  },
  {
    name: "PrograMaria",
    logo: "🌸",
    description: "Empoderamento feminino através da tecnologia",
    website: "https://programaria.org",
  },
  {
    name: "Laboratória",
    logo: "🔬",
    description: "Bootcamp de desenvolvimento web para mulheres",
    website: "https://www.laboratoria.la/br",
  },
];

const courses: Course[] = [
  {
    id: 1,
    title: "Desenvolvimento Web Full Stack",
    institution: "Mulheres que Codam",
    institutionLogo: "👩‍💻",
    category: "Tecnologia",
    level: "Iniciante",
    duration: "6 meses",
    description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero. Curso completo com projetos práticos e mentoria.",
    link: "https://www.mulheresquecodam.com.br/cursos/fullstack",
    scholarships: true,
    tags: ["React", "Node.js", "JavaScript", "HTML/CSS"],
  },
  {
    id: 2,
    title: "Empreendedorismo Digital",
    institution: "Sebrae",
    institutionLogo: "🏢",
    category: "Negócios",
    level: "Todos os níveis",
    duration: "3 meses",
    description: "Desenvolva seu negócio digital com estratégias de marketing, vendas e gestão financeira.",
    link: "https://www.sebrae.com.br/cursos/empreendedorismo-digital",
    scholarships: false,
    tags: ["Marketing", "Vendas", "Gestão", "Estratégia"],
  },
  {
    id: 3,
    title: "Design Thinking e Inovação",
    institution: "Let's Cocreate",
    institutionLogo: "🚀",
    category: "Inovação",
    level: "Intermediário",
    duration: "2 meses",
    description: "Metodologias ágeis e design thinking para criar produtos inovadores e resolver problemas complexos.",
    link: "https://letscocreate.com.br/cursos/design-thinking",
    scholarships: true,
    tags: ["Design Thinking", "Agile", "UX", "Inovação"],
  },
  {
    id: 4,
    title: "Python para Análise de Dados",
    institution: "Reprograma",
    institutionLogo: "💜",
    category: "Tecnologia",
    level: "Iniciante",
    duration: "4 meses",
    description: "Aprenda Python, Pandas, NumPy e visualização de dados para se tornar uma analista de dados.",
    link: "https://reprograma.com.br/cursos/python-dados",
    scholarships: true,
    tags: ["Python", "Pandas", "Data Science", "Análise"],
  },
  {
    id: 5,
    title: "Liderança Feminina em Tech",
    institution: "PrograMaria",
    institutionLogo: "🌸",
    category: "Carreira",
    level: "Todos os níveis",
    duration: "1 mês",
    description: "Desenvolva habilidades de liderança, comunicação e gestão de equipes em ambientes tecnológicos.",
    link: "https://programaria.org/cursos/lideranca",
    scholarships: false,
    tags: ["Liderança", "Soft Skills", "Carreira", "Gestão"],
  },
  {
    id: 6,
    title: "Bootcamp UX/UI Design",
    institution: "Laboratória",
    institutionLogo: "🔬",
    category: "Design",
    level: "Iniciante",
    duration: "5 meses",
    description: "Bootcamp intensivo de UX/UI Design com projetos reais e preparação para o mercado de trabalho.",
    link: "https://www.laboratoria.la/br/bootcamp-ux",
    scholarships: true,
    tags: ["UX", "UI", "Figma", "Design", "Prototipagem"],
  },
  {
    id: 7,
    title: "Marketing Digital para Iniciantes",
    institution: "Sebrae",
    institutionLogo: "🏢",
    category: "Marketing",
    level: "Iniciante",
    duration: "2 meses",
    description: "Fundamentos de marketing digital, redes sociais, SEO e Google Ads para alavancar seu negócio.",
    link: "https://www.sebrae.com.br/cursos/marketing-digital",
    scholarships: false,
    tags: ["Marketing", "SEO", "Redes Sociais", "Google Ads"],
  },
  {
    id: 8,
    title: "Desenvolvimento Mobile com React Native",
    institution: "Mulheres que Codam",
    institutionLogo: "👩‍💻",
    category: "Tecnologia",
    level: "Intermediário",
    duration: "4 meses",
    description: "Crie aplicativos mobile para iOS e Android usando React Native e JavaScript.",
    link: "https://www.mulheresquecodam.com.br/cursos/mobile",
    scholarships: true,
    tags: ["React Native", "Mobile", "JavaScript", "Apps"],
  },
];

export default function TrainingHub() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedLevel, setSelectedLevel] = useState<string>("Todos");
  const [selectedInstitution, setSelectedInstitution] = useState<string>("Todos");
  const [showScholarshipsOnly, setShowScholarshipsOnly] = useState(false);

  const categories = ["Todos", "Tecnologia", "Negócios", "Inovação", "Carreira", "Design", "Marketing"];
  const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];
  const institutions = ["Todos", ...partnerInstitutions.map(i => i.name)];

  const filteredCourses = courses.filter(course => {
    if (selectedCategory !== "Todos" && course.category !== selectedCategory) return false;
    if (selectedLevel !== "Todos" && course.level !== selectedLevel) return false;
    if (selectedInstitution !== "Todos" && course.institution !== selectedInstitution) return false;
    if (showScholarshipsOnly && !course.scholarships) return false;
    return true;
  });

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-space-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Hub de Capacitação
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <GraduationCap className="w-20 h-20 text-cyan-400 mx-auto animate-pulse" />
          </div>
          <h2 className="text-5xl font-space-mono font-bold text-white mb-4">
            Capacitação e Desenvolvimento
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acesse cursos gratuitos e bolsas de estudo das melhores instituições parceiras.
            Desenvolva novas habilidades e impulsione sua carreira.
          </p>
        </div>

        {/* Partner Institutions */}
        <div className="mb-16">
          <h3 className="text-3xl font-space-mono font-bold text-white mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-magenta-400" />
            Instituições Parceiras
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerInstitutions.map((institution, index) => (
              <div key={index} className="neon-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{institution.logo}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-space-mono text-white mb-2">{institution.name}</h4>
                    <p className="text-gray-400 text-sm mb-4">{institution.description}</p>
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2"
                    >
                      Visitar site <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="neon-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-space-mono text-white">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-card border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nível</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-dark-card border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Instituição</label>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full bg-dark-card border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {institutions.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showScholarshipsOnly}
                  onChange={(e) => setShowScholarshipsOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-cyan-500/30 bg-dark-card text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-white">Apenas com bolsas</span>
              </label>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-space-mono font-bold text-white flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-cyan-400" />
              Cursos Disponíveis
            </h3>
            <span className="text-gray-400">{filteredCourses.length} cursos encontrados</span>
          </div>
          
          {filteredCourses.length === 0 ? (
            <div className="neon-card p-12 text-center">
              <p className="text-gray-400 text-lg">Nenhum curso encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="neon-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{course.institutionLogo}</div>
                      <div>
                        <h4 className="text-xl font-space-mono text-white">{course.title}</h4>
                        <p className="text-cyan-400 text-sm">{course.institution}</p>
                      </div>
                    </div>
                    {course.scholarships && (
                      <div className="bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 rounded-full px-3 py-1">
                        <Award className="w-4 h-4 text-cyan-400 inline mr-1" />
                        <span className="text-cyan-400 text-xs font-bold">Bolsas</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Categoria</p>
                      <p className="text-white text-sm font-bold">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Nível</p>
                      <p className="text-white text-sm font-bold">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Duração</p>
                      <p className="text-white text-sm font-bold">{course.duration}</p>
                    </div>
                  </div>
                  
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600">
                      Acessar Curso <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
