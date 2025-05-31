import React from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "done";
  dueDate?: Date;
  createdAt: string;
  updatedAt: string;
}

export function useTasks(filterStatus: string) {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const fetchTasks = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = filterStatus ? `?status=${filterStatus}` : "";
      const res = await axiosInstance.get<Task[]>(`/tasks${query}`);
      setTasks(res.data);
    } catch {
      setError("Ошибка при получении задач");
      toast.error("Ошибка при получении задач");
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const deleteTask = React.useCallback(async (id: string) => {
    if (!confirm("Удалить задачу?")) return;
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Задача удалена");
    } catch {
      toast.error("Ошибка при удалении задачи");
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    deleteTask,
    setTasks,
  };
}
