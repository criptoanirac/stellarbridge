import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

/**
 * Talent Signup Page
 * Design: Cyberpunk with multi-step form
 * Features: Personal info, skills, experience, education, portfolio
 */
export default function TalentSignup() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",

    // Professional Info
    currentRole: "",
    yearsExperience: "",
    industry: "",

    // Skills
    skills: [] as string[],
    newSkill: "",

    // Education
    education: [] as Array<{ school: string; degree: string; year: string }>,
    newEducation: { school: "", degree: "", year: "" },

    // Certifications
    certifications: [] as string[],
    newCertification: "",

    // Portfolio
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    if (formData.newEducation.school && formData.newEducation.degree) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, formData.newEducation],
        newEducation: { school: "", degree: "", year: "" },
      }));
    }
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    if (formData.newCertification.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, formData.newCertification.trim()],
        newCertification: "",
      }));
    }
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const { user } = useAuth();
  const createProfileMutation = trpc.talent.createProfile.useMutation();
  const addSkillMutation = trpc.talent.addSkill.useMutation();
  const addEducationMutation = trpc.talent.addEducation.useMutation();
  const addCertificationMutation = trpc.talent.addCertification.useMutation();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Você precisa estar autenticado para criar um perfil");
      return;
    }

    try {
      // Generate pseudonym from first and last name
      const pseudonym = `${formData.firstName}-${formData.lastName}-${Math.floor(Math.random() * 10000)}`;

      // Create talent profile
      const profile = await createProfileMutation.mutateAsync({
        pseudonym,
        bio: formData.bio || undefined,
        currentRole: formData.currentRole || undefined,
        yearsExperience: formData.yearsExperience || undefined,
        industry: formData.industry || undefined,
        location: formData.location || undefined,
        portfolioUrl: formData.portfolioUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
      });

      const talentId = (profile as any).insertId as number;

      // Add skills
      for (const skill of formData.skills) {
        await addSkillMutation.mutateAsync({
          talentId,
          skill,
        });
      }

      // Add education
      for (const edu of formData.education) {
        await addEducationMutation.mutateAsync({
          talentId,
          institution: edu.school,
          course: edu.degree,
          completionYear: edu.year ? parseInt(edu.year) : undefined,
        });
      }

      // Add certifications
      for (const cert of formData.certifications) {
        await addCertificationMutation.mutateAsync({
          talentId,
          certification: cert,
        });
      }

      toast.success("✅ Cadastro realizado com sucesso! Seu perfil foi criado na rede Stellar.");
      setLocation("/");
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      toast.error("Erro ao criar perfil. Tente novamente.");
    }
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.phone;
  const isStep2Valid = formData.currentRole && formData.yearsExperience && formData.skills.length > 0;
  const isStep3Valid = formData.education.length > 0 || formData.certifications.length > 0;

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

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
              Cadastro de Talento
            </h1>
            <p className="text-gray-400 mt-1">Junte-se à rede Stellar e encontre oportunidades</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-cyan-500 to-magenta-500"
                    : "bg-gray-700"
                }`}
              />
              <p className={`text-xs mt-2 ${step <= currentStep ? "text-cyan-400" : "text-gray-500"}`}>
                {step === 1 ? "Dados Pessoais" : step === 2 ? "Profissional" : "Educação"}
              </p>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="card-neon space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Informações Pessoais</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sobrenome *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Seu sobrenome"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Localização</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="São Paulo, SP"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Bio Profissional</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setLocation("/")}
                  className="btn-cyber-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid}
                  className="btn-cyber flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <div className="card-neon space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Informações Profissionais</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cargo Atual *</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    placeholder="Ex: Desenvolvedora Full Stack"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Anos de Experiência *</label>
                  <select
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Selecione</option>
                    <option value="0-1">0-1 ano</option>
                    <option value="1-3">1-3 anos</option>
                    <option value="3-5">3-5 anos</option>
                    <option value="5-10">5-10 anos</option>
                    <option value="10+">10+ anos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Indústria</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Ex: Tecnologia, Fintech, E-commerce"
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Habilidades *</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={formData.newSkill}
                    onChange={(e) => setFormData((prev) => ({ ...prev, newSkill: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Digite uma habilidade"
                    className="flex-1 px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="badge-stellar flex items-center gap-2 px-3 py-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-cyber-outline flex-1"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="btn-cyber flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Education & Portfolio */}
          {currentStep === 3 && (
            <div className="card-neon space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Educação & Certificações</h2>

              {/* Education */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Educação</label>
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={formData.newEducation.school}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newEducation: { ...prev.newEducation, school: e.target.value },
                      }))
                    }
                    placeholder="Instituição"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    value={formData.newEducation.degree}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newEducation: { ...prev.newEducation, degree: e.target.value },
                      }))
                    }
                    placeholder="Curso/Diploma"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    value={formData.newEducation.year}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newEducation: { ...prev.newEducation, year: e.target.value },
                      }))
                    }
                    placeholder="Ano de conclusão"
                    className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={addEducation}
                    className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    + Adicionar Educação
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-start justify-between"
                    >
                      <div>
                        <p className="text-cyan-400 font-semibold">{edu.degree}</p>
                        <p className="text-sm text-gray-400">{edu.school}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                      </div>
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Certificações</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={formData.newCertification}
                    onChange={(e) => setFormData((prev) => ({ ...prev, newCertification: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addCertification()}
                    placeholder="Ex: AWS Certified Solutions Architect"
                    className="flex-1 px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={addCertification}
                    className="px-4 py-2 bg-magenta-500/20 text-magenta-400 rounded-lg hover:bg-magenta-500/30 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="badge-stellar bg-magenta-500/20 text-magenta-400 flex items-center gap-2 px-3 py-1"
                    >
                      {cert}
                      <button
                        onClick={() => removeCertification(index)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Links */}
              <div className="border-t border-cyan-500/20 pt-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Links Profissionais</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Portfolio/Website</label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://seu-portfolio.com"
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">GitHub</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/seu-usuario"
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/seu-perfil"
                      className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-cyber-outline flex-1"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-cyber flex-1"
                >
                  Finalizar Cadastro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto mt-8 card-neon border-magenta-500/30">
          <h3 className="text-lg font-semibold text-magenta-400 mb-3">
            🔐 Seus dados estão seguros
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Todos os seus dados são criptografados e armazenados com segurança. 
            Você controla quem vê suas informações. As empresas veem apenas suas habilidades verificadas, 
            sem acesso a dados pessoais até que você aceite uma oportunidade.
          </p>
        </div>
      </div>
    </div>
  );
}
