import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Plus, X, Sparkles } from "lucide-react";
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
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }));
      // Clear skills error when adding a skill
      if (errors.skills) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
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
        education: [...prev.education, prev.newEducation],
        newEducation: { school: "", degree: "", year: "" },
      }));
      // Clear education error when adding education
      if (errors.education) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.education;
          return newErrors;
        });
      }
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
        certifications: [...prev.certifications, prev.newCertification.trim()],
        newCertification: "",
      }));
      // Clear certifications error when adding certification
      if (errors.certifications) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.certifications;
          return newErrors;
        });
      }
    }
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Auto-fill with fictional data
  const autoFillData = () => {
    const sampleData = {
      firstName: "Ana",
      lastName: "Silva",
      email: "ana.silva@email.com",
      phone: "(11) 98765-4321",
      location: "São Paulo, SP",
      bio: "Desenvolvedora Full Stack apaixonada por criar soluções inovadoras que impactam positivamente a vida das pessoas.",
      currentRole: "Desenvolvedora Full Stack",
      yearsExperience: "3-5",
      industry: "Tecnologia",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      education: [
        {
          school: "Universidade de São Paulo",
          degree: "Bacharelado em Ciência da Computação",
          year: "2020",
        },
      ],
      certifications: ["AWS Certified Solutions Architect"],
      portfolioUrl: "https://anasilva.dev",
      githubUrl: "https://github.com/anasilva",
      linkedinUrl: "https://linkedin.com/in/anasilva",
      newSkill: "",
      newEducation: { school: "", degree: "", year: "" },
      newCertification: "",
    };
    setFormData(sampleData);
    setErrors({});
    toast.success("✨ Dados fictícios preenchidos automaticamente!");
  };

  const { user } = useAuth();
  const createProfileMutation = trpc.talent.createProfile.useMutation();
  const addSkillMutation = trpc.talent.addSkill.useMutation();
  const addEducationMutation = trpc.talent.addEducation.useMutation();
  const addCertificationMutation = trpc.talent.addCertification.useMutation();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nome é obrigatório";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.currentRole.trim()) {
      newErrors.currentRole = "Cargo atual é obrigatório";
    }
    if (!formData.yearsExperience) {
      newErrors.yearsExperience = "Anos de experiência é obrigatório";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "Adicione pelo menos uma habilidade";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.education.length === 0 && formData.certifications.length === 0) {
      newErrors.education = "Adicione pelo menos uma formação ou certificação";
      newErrors.certifications = "Adicione pelo menos uma formação ou certificação";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      toast.error("Por favor, adicione pelo menos uma formação ou certificação");
      return;
    }

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
      setLocation("/talent-dashboard");
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      toast.error("Erro ao criar perfil. Tente novamente.");
    }
  };

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
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
          
          {/* Auto-fill button */}
          <Button
            onClick={autoFillData}
            variant="outline"
            className="gap-2 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Preencher com Dados Fictícios
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step ? "bg-gradient-to-r from-cyan-500 to-magenta-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Dados Pessoais</span>
            <span>Informações Profissionais</span>
            <span>Educação & Certificações</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="card-cyber p-8 max-w-3xl mx-auto">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Dados Pessoais</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Ex: Maria"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sobrenome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.lastName ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Ex: Silva"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                  placeholder="seu.email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                  placeholder="(11) 98765-4321"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Localização</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="São Paulo, SP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio Profissional</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white resize-none"
                  placeholder="Conte um pouco sobre você e sua trajetória profissional..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Informações Profissionais</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cargo Atual <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.currentRole ? "border-red-500" : "border-gray-700"
                  } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                  placeholder="Ex: Desenvolvedora Full Stack"
                />
                {errors.currentRole && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Anos de Experiência <span className="text-red-500">*</span>
                </label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.yearsExperience ? "border-red-500" : "border-gray-700"
                  } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                >
                  <option value="">Selecione...</option>
                  <option value="0-1">0-1 anos</option>
                  <option value="1-3">1-3 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="5-10">5-10 anos</option>
                  <option value="10+">10+ anos</option>
                </select>
                {errors.yearsExperience && (
                  <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Indústria</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  placeholder="Ex: Tecnologia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Habilidades <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    name="newSkill"
                    value={formData.newSkill}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    className={`flex-1 px-4 py-3 bg-gray-800/50 border ${
                      errors.skills ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Ex: React, Node.js, Python..."
                  />
                  <Button
                    onClick={addSkill}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm mb-2">{errors.skills}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="hover:text-cyan-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Education & Certifications */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Educação & Certificações</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Educação <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3 mb-3">
                  <input
                    type="text"
                    value={formData.newEducation.school}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newEducation: { ...prev.newEducation, school: e.target.value },
                      }))
                    }
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.education ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Instituição"
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.education ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Curso"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.newEducation.year}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          newEducation: { ...prev.newEducation, year: e.target.value },
                        }))
                      }
                      className={`flex-1 px-4 py-3 bg-gray-800/50 border ${
                        errors.education ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                      placeholder="Ano de conclusão"
                    />
                    <Button
                      onClick={addEducation}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                {errors.education && (
                  <p className="text-red-500 text-sm mb-2">{errors.education}</p>
                )}
                <div className="space-y-2">
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{edu.degree}</p>
                        <p className="text-gray-400 text-sm">
                          {edu.school} {edu.year && `• ${edu.year}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificações <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    name="newCertification"
                    value={formData.newCertification}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                    className={`flex-1 px-4 py-3 bg-gray-800/50 border ${
                      errors.certifications ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:border-cyan-500 text-white`}
                    placeholder="Ex: AWS Certified Solutions Architect"
                  />
                  <Button
                    onClick={addCertification}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                {errors.certifications && (
                  <p className="text-red-500 text-sm mb-2">{errors.certifications}</p>
                )}
                <div className="space-y-2">
                  {formData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 rounded-lg"
                    >
                      <p className="text-white">{cert}</p>
                      <button
                        onClick={() => removeCertification(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400">Links Profissionais</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="https://seuportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="https://github.com/seuperfil"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    placeholder="https://linkedin.com/in/seuperfil"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button
                onClick={handlePreviousStep}
                variant="outline"
                className="border-gray-700 hover:border-gray-600"
              >
                Voltar
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                onClick={handleNextStep}
                className="ml-auto bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white"
              >
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={createProfileMutation.isPending}
                className="ml-auto bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white"
              >
                {createProfileMutation.isPending ? "Criando perfil..." : "Finalizar Cadastro"}
              </Button>
            )}
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl mx-auto">
          <p>
            🔒 Seus dados estão protegidos. Sua identidade permanecerá anônima até que você aceite um match.
          </p>
        </div>
      </div>
    </div>
  );
}
