import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Post Job Page - Interactive Job Posting Form
 * Design: Cyberpunk with form sections and skill selection
 * Features: Dynamic form, skill tags, level selection, real-time preview
 */
export default function PostJob() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sector: "",
    level: "",
    salary: "",
    location: "",
    skills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const availableSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Vue.js",
    "Angular",
    "Java",
    "C#",
    "Go",
    "Rust",
    "Machine Learning",
    "Data Science",
    "UI Design",
    "Product Management",
  ];

  const sectors = [
    "Tecnologia",
    "IA/ML",
    "Design",
    "Produto",
    "Infraestrutura",
    "Dados",
    "Segurança",
    "Outro",
  ];

  const levels = ["Junior", "Mid", "Senior", "Lead"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addCustomSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const createJob = trpc.job.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.description &&
      formData.sector &&
      formData.level &&
      formData.skills.length > 0
    ) {
      try {
        await createJob.mutateAsync({
          title: formData.title,
          description: formData.description,
          sector: formData.sector,
          experienceLevel: formData.level.toLowerCase() as "junior" | "mid" | "senior" | "lead",
          location: formData.location || undefined,
          requiredSkills: formData.skills,
        });
        
        setSubmitted(true);
        toast.success("✅ Vaga publicada com sucesso!");
        setTimeout(() => {
          setLocation("/employer-dashboard");
        }, 2000);
      } catch (error) {
        console.error("Erro ao publicar vaga:", error);
        toast.error("Erro ao publicar vaga. Tente novamente.");
      }
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.sector &&
    formData.level &&
    formData.skills.length > 0;

  if (submitted) {
    return (
      <div className="min-h-screen grid-bg relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 card-neon max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-magenta-500/30 flex items-center justify-center neon-glow">
              <Check className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">Vaga Publicada!</h2>
          <p className="text-gray-400 mb-6">
            Sua vaga foi publicada com sucesso. Você receberá matches automáticos em breve.
          </p>
          <div className="animate-pulse text-sm text-magenta-400">
            Redirecionando para o painel...
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setLocation("/employer-dashboard")}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-cyan-400" />
          </button>
          <div>
            <h1 className="text-4xl font-bold font-mono gradient-cyber-text">
              Publicar Nova Vaga
            </h1>
            <p className="text-gray-400 mt-1">
              Preencha os detalhes e receba matches automáticos de talentos verificados
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information Section */}
          <div className="card-neon">
            <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Informações Básicas
            </h2>

            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Título da Vaga *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Desenvolvedor Full Stack Senior"
                  className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Descrição da Vaga *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva os detalhes, responsabilidades e o que você procura..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              {/* Grid: Sector, Level, Salary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Setor *
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  >
                    <option value="">Selecione um setor</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nível de Experiência *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  >
                    <option value="">Selecione um nível</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Faixa Salarial (opcional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="Ex: R$ 8k - R$ 15k"
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Localização (opcional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: São Paulo, SP / Remoto"
                  className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="card-neon">
            <h2 className="text-xl font-semibold text-magenta-400 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Habilidades Requeridas *
            </h2>

            {/* Selected Skills */}
            {formData.skills.length > 0 && (
              <div className="mb-6 p-4 bg-magenta-500/10 rounded-lg border border-magenta-500/20">
                <p className="text-sm text-gray-400 mb-3">Habilidades selecionadas:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="badge-stellar-magenta flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Predefined Skills */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-300 mb-3">
                Selecione habilidades da lista:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    disabled={formData.skills.includes(skill)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      formData.skills.includes(skill)
                        ? "badge-stellar-magenta cursor-not-allowed opacity-50"
                        : "badge-stellar hover:border-cyan-300 hover:bg-cyan-500/20"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-3">
                Ou adicione uma habilidade customizada:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSkill();
                    }
                  }}
                  placeholder="Digite uma habilidade e pressione Enter"
                  className="flex-1 px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                <button
                  type="button"
                  onClick={addCustomSkill}
                  className="btn-cyber px-6 py-3"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {isFormValid && (
            <div className="card-neon border-cyan-500/30">
              <h2 className="text-lg font-semibold text-cyan-400 mb-4">
                Pré-visualização da Vaga
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Título</p>
                  <p className="text-cyan-400 font-semibold">{formData.title}</p>
                </div>
                <div>
                  <p className="text-gray-400">Setor • Nível</p>
                  <p className="text-cyan-400 font-semibold">
                    {formData.sector} • {formData.level}
                  </p>
                </div>
                {formData.salary && (
                  <div>
                    <p className="text-gray-400">Faixa Salarial</p>
                    <p className="text-cyan-400 font-semibold">{formData.salary}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400">Habilidades Requeridas</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="badge-stellar text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-4 text-lg font-semibold rounded-lg transition-all ${
                isFormValid
                  ? "btn-cyber"
                  : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
              }`}
            >
              Publicar Vaga
            </button>
            <button
              type="button"
              onClick={() => setLocation("/employer-dashboard")}
              className="btn-cyber-outline flex-1 py-4 text-lg"
            >
              Cancelar
            </button>
          </div>

          {/* Validation Message */}
          {!isFormValid && (
            <div className="card-neon border-magenta-500/30">
              <p className="text-sm text-magenta-400">
                ⚠️ Preencha todos os campos obrigatórios (*) e selecione pelo menos uma habilidade
                para publicar a vaga.
              </p>
            </div>
          )}
        </form>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-8 card-neon border-cyan-500/30">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">
            💡 Como funciona a publicação?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Ao publicar uma vaga, nosso sistema de Bridge automaticamente encontrará talentos 
            verificados com as habilidades que você procura. Você receberá notificações de matches 
            em tempo real e poderá iniciar contato seguro com os candidatos.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Todas as habilidades selecionadas serão usadas para o matching automático. Quanto mais 
            específico for, melhores serão os matches encontrados.
          </p>
        </div>
      </div>
    </div>
  );
}
