import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Pause,
  Play,
  Archive,
  Trash2,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  sector: string;
  level: string;
  skills: string[];
  status: "active" | "paused" | "archived";
  views: number;
  matches: number;
  salary: string;
  createdAt: string;
  description: string;
}

/**
 * Manage Jobs Page - Job Management Dashboard
 * Design: Cyberpunk with job cards, status indicators, and action buttons
 * Features: Edit, pause, archive, delete jobs; real-time statistics
 */
export default function ManageJobs() {
  const [, setLocation] = useLocation();
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Desenvolvedor Full Stack Senior - React & Node.js",
      sector: "Tecnologia",
      level: "Senior",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      status: "active",
      views: 342,
      matches: 12,
      salary: "R$ 12k - R$ 20k",
      createdAt: "2026-01-28",
      description: "Buscamos um desenvolvedor full stack senior com experiência sólida...",
    },
    {
      id: "2",
      title: "Designer UI/UX - Produto Digital",
      sector: "Design",
      level: "Mid",
      skills: ["Figma", "UI Design", "Prototyping", "User Research"],
      status: "active",
      views: 218,
      matches: 8,
      salary: "R$ 8k - R$ 14k",
      createdAt: "2026-01-27",
      description: "Procuramos um designer criativo para trabalhar em produtos digitais...",
    },
    {
      id: "3",
      title: "Cientista de Dados - Machine Learning",
      sector: "IA/ML",
      level: "Senior",
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      status: "paused",
      views: 156,
      matches: 5,
      salary: "R$ 15k - R$ 25k",
      createdAt: "2026-01-25",
      description: "Estamos procurando um cientista de dados experiente em ML...",
    },
    {
      id: "4",
      title: "Gerente de Produto - SaaS",
      sector: "Produto",
      level: "Senior",
      skills: ["Product Management", "Analytics", "Leadership", "Strategy"],
      status: "archived",
      views: 89,
      matches: 3,
      salary: "R$ 10k - R$ 18k",
      createdAt: "2026-01-20",
      description: "Buscamos um gerente de produto experiente em SaaS...",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);

  const toggleJobStatus = (jobId: string, newStatus: "active" | "paused") => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const archiveJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: "archived" } : job
      )
    );
  };

  const deleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const openEditModal = (job: Job) => {
    setEditedJob({ ...job });
    setShowEditModal(true);
  };

  const saveEditedJob = () => {
    if (editedJob) {
      setJobs(
        jobs.map((job) => (job.id === editedJob.id ? editedJob : job))
      );
      setShowEditModal(false);
      setEditedJob(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "paused":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "archived":
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "paused":
        return "Pausada";
      case "archived":
        return "Arquivada";
      default:
        return "Desconhecido";
    }
  };

  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const pausedJobs = jobs.filter((j) => j.status === "paused").length;
  const archivedJobs = jobs.filter((j) => j.status === "archived").length;
  const totalMatches = jobs.reduce((sum, j) => sum + j.matches, 0);

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
              Gerenciar Vagas
            </h1>
            <p className="text-gray-400 mt-1">
              Edite, pause ou arquive suas vagas publicadas
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Active Jobs */}
          <div className="card-neon">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Ativas</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">
                  {activeJobs}
                </p>
              </div>
              <Play className="w-8 h-8 text-cyan-400/30" />
            </div>
          </div>

          {/* Paused Jobs */}
          <div className="card-neon">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Pausadas</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">
                  {pausedJobs}
                </p>
              </div>
              <Pause className="w-8 h-8 text-yellow-400/30" />
            </div>
          </div>

          {/* Archived Jobs */}
          <div className="card-neon">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Arquivadas</p>
                <p className="text-3xl font-bold text-gray-400 mt-2">
                  {archivedJobs}
                </p>
              </div>
              <Archive className="w-8 h-8 text-gray-400/30" />
            </div>
          </div>

          {/* Total Matches */}
          <div className="card-neon">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Matches Totais</p>
                <p className="text-3xl font-bold text-magenta-400 mt-2">
                  {totalMatches}
                </p>
              </div>
              <Users className="w-8 h-8 text-magenta-400/30" />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="card-neon text-center py-12">
              <p className="text-gray-400 mb-4">Nenhuma vaga publicada ainda</p>
              <button
                onClick={() => setLocation("/post-job")}
                className="btn-cyber px-6 py-2"
              >
                Publicar Primeira Vaga
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="card-neon">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {job.sector} • {job.level}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {getStatusLabel(job.status)}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill) => (
                        <span key={skill} className="badge-stellar text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span>{job.views} visualizações</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4 text-magenta-400" />
                        <span>{job.matches} matches</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span>Publicada em {job.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 md:flex-col md:gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(job)}
                      className="btn-cyber-outline px-3 py-2 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>

                    {/* Pause/Resume Button */}
                    {job.status === "active" ? (
                      <button
                        onClick={() => toggleJobStatus(job.id, "paused")}
                        className="btn-cyber-outline px-3 py-2 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center hover:border-yellow-400 hover:text-yellow-400"
                      >
                        <Pause className="w-4 h-4" />
                        Pausar
                      </button>
                    ) : job.status === "paused" ? (
                      <button
                        onClick={() => toggleJobStatus(job.id, "active")}
                        className="btn-cyber-outline px-3 py-2 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center hover:border-cyan-400 hover:text-cyan-400"
                      >
                        <Play className="w-4 h-4" />
                        Reativar
                      </button>
                    ) : null}

                    {/* Archive Button */}
                    {job.status !== "archived" && (
                      <button
                        onClick={() => archiveJob(job.id)}
                        className="btn-cyber-outline px-3 py-2 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center hover:border-gray-400 hover:text-gray-400"
                      >
                        <Archive className="w-4 h-4" />
                        Arquivar
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="btn-cyber-outline px-3 py-2 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && editedJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card-nemo max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Editar Vaga</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Título da Vaga
                  </label>
                  <input
                    type="text"
                    value={editedJob.title}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={editedJob.description}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Faixa Salarial
                  </label>
                  <input
                    type="text"
                    value={editedJob.salary}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, salary: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Habilidades
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    {editedJob.skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge-stellar flex items-center gap-2 text-sm"
                      >
                        {skill}
                        <button
                          onClick={() =>
                            setEditedJob({
                              ...editedJob,
                              skills: editedJob.skills.filter((s) => s !== skill),
                            })
                          }
                          className="hover:text-white transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4">
                <button
                  onClick={saveEditedJob}
                  className="flex-1 btn-cyber py-3 text-lg"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 btn-cyber-outline py-3 text-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 card-neon border-cyan-500/30">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">
            💡 Dicas de Gerenciamento
          </h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              • <strong>Ativa:</strong> Vaga está recebendo matches e candidatos podem se candidatar
            </li>
            <li>
              • <strong>Pausada:</strong> Vaga não recebe novos matches, mas pode ser reativada a qualquer momento
            </li>
            <li>
              • <strong>Arquivada:</strong> Vaga foi fechada e não recebe mais matches
            </li>
            <li>
              • <strong>Deletar:</strong> Remove a vaga permanentemente do sistema
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
