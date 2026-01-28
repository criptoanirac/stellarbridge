import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface Notification {
  id: string;
  type: "match" | "update" | "success" | "warning";
  title: string;
  message: string;
  talentName: string;
  talentSkills: string[];
  matchPercentage: number;
  jobTitle: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  filterByJob: (jobTitle: string | null) => void;
  filterByCompatibility: (minPercentage: number | null) => void;
  filterByType: (type: string | null) => void;
  getFilteredNotifications: () => Notification[];
  activeFilters: {
    jobTitle: string | null;
    minCompatibility: number | null;
    type: string | null;
  };
  clearFilters: () => void;
  getUniqueJobs: () => string[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState({
    jobTitle: null as string | null,
    minCompatibility: null as number | null,
    type: null as string | null,
  });

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);

      // Auto-remove notification after 8 seconds if not interacted
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== newNotification.id)
        );
      }, 8000);
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const filterByJob = useCallback((jobTitle: string | null) => {
    setFilters((prev) => ({ ...prev, jobTitle }));
  }, []);

  const filterByCompatibility = useCallback((minPercentage: number | null) => {
    setFilters((prev) => ({ ...prev, minCompatibility: minPercentage }));
  }, []);

  const filterByType = useCallback((type: string | null) => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      jobTitle: null,
      minCompatibility: null,
      type: null,
    });
  }, []);

  const getFilteredNotifications = useCallback(() => {
    return notifications.filter((notif) => {
      if (filters.jobTitle && notif.jobTitle !== filters.jobTitle) {
        return false;
      }
      if (filters.minCompatibility && notif.matchPercentage < filters.minCompatibility) {
        return false;
      }
      if (filters.type && notif.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [notifications, filters]);

  const getUniqueJobs = useCallback(() => {
    const jobs = new Set(notifications.map((n) => n.jobTitle));
    return Array.from(jobs).sort();
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    filterByJob,
    filterByCompatibility,
    filterByType,
    getFilteredNotifications,
    activeFilters: filters,
    clearFilters,
    getUniqueJobs,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
