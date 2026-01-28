import { Button } from "@/components/ui/button";
import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

export default function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    currentRole: profile?.currentRole || "",
    yearsExperience: profile?.yearsExperience || "",
    industry: profile?.industry || "",
    location: profile?.location || "",
    portfolioUrl: profile?.portfolioUrl || "",
    githubUrl: profile?.githubUrl || "",
    linkedinUrl: profile?.linkedinUrl || "",
  });

  const [skills, setSkills] = useState<string[]>(
    profile?.skills?.map((s: any) => s.skill) || []
  );
  const [newSkill, setNewSkill] = useState("");

  const [education, setEducation] = useState<Array<{
    institution: string;
    course: string;
    completionYear: string;
  }>>(profile?.education || []);

  const [certifications, setCertifications] = useState<string[]>(
    profile?.certifications?.map((c: any) => c.certification) || []
  );
  const [newCertification, setNewCertification] = useState("");

  const utils = trpc.useUtils();
  const updateProfile = trpc.talent.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("✅ Perfil atualizado com sucesso!");
      utils.talent.getProfile.invalidate();
      onClose();
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar perfil: " + error.message);
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        currentRole: profile.currentRole || "",
        yearsExperience: profile.yearsExperience || "",
        industry: profile.industry || "",
        location: profile.location || "",
        portfolioUrl: profile.portfolioUrl || "",
        githubUrl: profile.githubUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
      });
      setSkills(profile.skills?.map((s: any) => s.skill) || []);
      setEducation(profile.education || []);
      setCertifications(profile.certifications?.map((c: any) => c.certification) || []);
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateProfile.mutateAsync({
      ...formData,
      skills,
      education,
      certifications,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addEducation = () => {
    setEducation([...education, { institution: "", course: "", completionYear: "" }]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      setCertifications([...certifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setCertifications(certifications.filter(c => c !== cert));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0e27] border border-cyan-500/30 rounded-lg p-8 neon-glow">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-space-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            Editar Perfil
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xl text-cyan-400 font-space-mono">Informações Básicas</h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                rows={4}
                placeholder="Conte um pouco sobre você..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cargo Atual</label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Ex: Desenvolvedora Full Stack"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Anos de Experiência</label>
                <input
                  type="text"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Ex: 5 anos"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Indústria</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Ex: Tecnologia"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Localização</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-xl text-cyan-400 font-space-mono">Habilidades</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Adicionar habilidade..."
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50 text-cyan-400"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-cyan-400 font-space-mono">Educação</h3>
              <Button
                type="button"
                onClick={addEducation}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar
              </Button>
            </div>

            {education.map((edu, index) => (
              <div key={index} className="p-4 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-white font-medium">Educação {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Instituição"
                />

                <input
                  type="text"
                  value={edu.course}
                  onChange={(e) => updateEducation(index, 'course', e.target.value)}
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Curso"
                />

                <input
                  type="text"
                  value={edu.completionYear}
                  onChange={(e) => updateEducation(index, 'completionYear', e.target.value)}
                  className="w-full px-4 py-2 bg-[#0a0e27] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Ano de Conclusão"
                />
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-xl text-cyan-400 font-space-mono">Certificações</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Adicionar certificação..."
              />
              <Button
                type="button"
                onClick={addCertification}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg"
                >
                  <span className="text-white">{cert}</span>
                  <button
                    type="button"
                    onClick={() => removeCertification(cert)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl text-cyan-400 font-space-mono">Links Profissionais</h3>
            
            <div className="space-y-3">
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                placeholder="🌐 Portfolio URL"
              />

              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                placeholder="💻 GitHub URL"
              />

              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1f3a] border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                placeholder="💼 LinkedIn URL"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateProfile.isPending}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-magenta-500"
            >
              {updateProfile.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
