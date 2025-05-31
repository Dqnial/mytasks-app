interface TaskModalProps {
  form: Partial<Task>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Task>>>;
  isEditing: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  form,
  setForm,
  isEditing,
  showModal,
  setShowModal,
  onSubmit,
}) => {
  if (!showModal) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Редактировать задачу" : "Создать задачу"}
        </h3>
        <input
          type="text"
          placeholder="Заголовок"
          className="input input-bordered w-full mb-3"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Описание"
          className="textarea textarea-bordered w-full mb-3"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="select select-bordered w-full mb-3"
          value={form.status || "pending"}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as Task["status"] })
          }
        >
          <option value="pending">Ожидание</option>
          <option value="in_progress">В процессе</option>
          <option value="done">Завершено</option>
        </select>
        <input
          type="date"
          className="input input-bordered w-full mb-3"
          value={form.dueDate?.slice(0, 10) || ""}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-ghost"
              type="button"
            >
              Отмена
            </button>
            <button
              onClick={onSubmit}
              className="btn btn-success"
              type="button"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default TaskModal;
