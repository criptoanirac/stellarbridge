import { useNotifications } from "@/contexts/NotificationContext";
import { Bell, X, Check, AlertCircle, Filter } from "lucide-react";
import { useState } from "react";

/**
 * Notification Center Component
 * Design: Cyberpunk notification panel with real-time match alerts
 * Features: Toast notifications, notification center panel, mark as read, advanced filters
 */
export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    markAllAsRead,
    filterByJob,
    filterByCompatibility,
    filterByType,
    getFilteredNotifications,
    activeFilters,
    clearFilters,
    getUniqueJobs,
  } = useNotifications();

  const [showPanel, setShowPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotifications = getFilteredNotifications();
  const uniqueJobs = getUniqueJobs();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return "🌟";
      case "update":
        return "📝";
      case "success":
        return "✓";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "match":
        return "border-magenta-500/30 bg-magenta-500/5";
      case "update":
        return "border-cyan-500/30 bg-cyan-500/5";
      case "success":
        return "border-green-500/30 bg-green-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      default:
        return "border-gray-500/30 bg-gray-500/5";
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case "match":
        return "text-magenta-400";
      case "update":
        return "text-cyan-400";
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const hasActiveFilters =
    activeFilters.jobTitle || activeFilters.minCompatibility || activeFilters.type;

  return (
    <>
      {/* Notification Bell Icon */}
      <div className="relative">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="relative p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
        >
          <Bell className="w-6 h-6 text-cyan-400" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-magenta-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {showPanel && (
          <div className="absolute right-0 top-12 w-96 max-h-[600px] bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27] border border-cyan-500/30 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-500/5">
              <h3 className="text-lg font-semibold text-cyan-400">Notificações</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-1 rounded transition-colors ${
                    hasActiveFilters
                      ? "text-magenta-400 bg-magenta-500/20"
                      : "text-gray-400 hover:text-cyan-400"
                  }`}
                  title="Filtros"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Filter Section */}
            {showFilters && (
              <div className="p-4 border-b border-cyan-500/20 bg-cyan-500/5 space-y-3">
                {/* Job Filter */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Filtrar por Vaga</label>
                  <select
                    value={activeFilters.jobTitle || ""}
                    onChange={(e) => filterByJob(e.target.value || null)}
                    className="w-full px-2 py-1 bg-[#0a0e27] border border-cyan-500/30 rounded text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Todas as vagas</option>
                    {uniqueJobs.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Compatibility Filter */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">
                    Compatibilidade Mínima: {activeFilters.minCompatibility || "Nenhuma"}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={activeFilters.minCompatibility || 0}
                    onChange={(e) =>
                      filterByCompatibility(
                        e.target.value === "0" ? null : parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-cyan-500/20 rounded-lg appearance-none cursor-pointer accent-magenta-500"
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Tipo de Notificação</label>
                  <select
                    value={activeFilters.type || ""}
                    onChange={(e) => filterByType(e.target.value || null)}
                    className="w-full px-2 py-1 bg-[#0a0e27] border border-cyan-500/30 rounded text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Todos os tipos</option>
                    <option value="match">Novos Matches</option>
                    <option value="update">Atualizações</option>
                    <option value="success">Sucesso</option>
                    <option value="warning">Avisos</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full px-2 py-1 text-xs bg-magenta-500/20 text-magenta-400 rounded hover:bg-magenta-500/30 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                )}
              </div>
            )}

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>
                    {hasActiveFilters
                      ? "Nenhuma notificação corresponde aos filtros"
                      : "Nenhuma notificação no momento"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-cyan-500/10">
                  <div className="p-3 bg-cyan-500/5 border-b border-cyan-500/20">
                    <p className="text-xs text-gray-400">
                      Mostrando {filteredNotifications.length} de {notifications.length}
                    </p>
                  </div>
                  {filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-4 border-l-4 cursor-pointer transition-all hover:bg-cyan-500/5 ${getNotificationColor(
                        notif.type
                      )} ${!notif.read ? "bg-cyan-500/10" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                            <h4 className={`font-semibold ${getTextColor(notif.type)}`}>
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-magenta-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{notif.message}</p>

                          {/* Match Details */}
                          {notif.type === "match" && (
                            <div className="mt-3 p-3 bg-magenta-500/10 border border-magenta-500/20 rounded-lg">
                              <div className="text-sm mb-2">
                                <p className="text-magenta-400 font-semibold">
                                  {notif.talentName}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  Para: {notif.jobTitle}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {notif.talentSkills.slice(0, 3).map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-xs px-2 py-1 bg-magenta-500/20 text-magenta-300 rounded"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {notif.talentSkills.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-magenta-500/20 text-magenta-300 rounded">
                                    +{notif.talentSkills.length - 3}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Compatibilidade:</span>
                                <span className="text-sm font-bold text-magenta-400">
                                  {notif.matchPercentage}%
                                </span>
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-gray-500 mt-2">
                            {notif.timestamp.toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {/* Close Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notif.id);
                          }}
                          className="text-gray-400 hover:text-red-400 transition-colors mt-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-cyan-500/20 bg-cyan-500/5 flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex-1 text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
                  >
                    Marcar como lidas
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications (Top-right corner) */}
      <div className="fixed top-4 right-4 z-40 space-y-2 pointer-events-none">
        {filteredNotifications.slice(0, 3).map((notif) => (
          <div
            key={notif.id}
            className={`pointer-events-auto p-4 rounded-lg border backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-300 ${getNotificationColor(
              notif.type
            )}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{getNotificationIcon(notif.type)}</span>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${getTextColor(notif.type)}`}>
                  {notif.title}
                </h4>
                <p className="text-xs text-gray-300 mt-1">{notif.message}</p>
                {notif.type === "match" && (
                  <p className="text-xs text-magenta-400 mt-2 font-semibold">
                    {notif.matchPercentage}% Match • {notif.talentName}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeNotification(notif.id)}
                className="text-gray-400 hover:text-gray-300 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
