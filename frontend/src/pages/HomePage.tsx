import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useTasks } from "../hooks/useTasks";
import TaskFilter from "../components/TaskFilter";
import TaskModal from "../components/TaskModal";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "done";
  dueDate?: Date;
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<Task["status"], string> = {
  pending: "Ожидание",
  in_progress: "В процессе",
  done: "Завершено",
};

const HomePage = () => {
  const [filterStatus, setFilterStatus] = React.useState("");
  const { tasks, loading, error, fetchTasks, deleteTask, setTasks } =
    useTasks(filterStatus);

  const [form, setForm] = React.useState<Partial<Task>>({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleEdit = (task: Task) => {
    setForm(task);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCreate = () => {
    setForm({});
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && form._id) {
        const res = await axiosInstance.put(`/tasks/${form._id}`, form);
        setTasks((prev) =>
          prev.map((t) => (t._id === res.data._id ? res.data : t))
        );
      } else {
        const res = await axiosInstance.post("/tasks", {
          ...form,
          status: form.status || "pending",
        });
        setTasks((prev) => [res.data, ...prev]);
      }
      setShowModal(false);
      setForm({});
    } catch {
      toast.error("Ошибка при сохранении");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-14 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Мои задачи</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="size-6 mr-2" />
          Создать
        </button>
      </div>

      <TaskFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onRefresh={fetchTasks}
      />

      {loading ? (
        <div className="loading loading-spinner text-primary" />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="alert alert-info">Задач нет</div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="card shadow border">
              <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                {task.description && <p>{task.description}</p>}
                <div className="text-md text-base space-y-1">
                  <p>
                    Статус:{" "}
                    <span className="badge badge-info">
                      {statusLabels[task.status]}
                    </span>
                  </p>
                  {task.dueDate && (
                    <p>
                      Дедлайн: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
