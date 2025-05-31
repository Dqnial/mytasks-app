interface FilterProps {
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  onRefresh: () => void;
}

const TaskFilter: React.FC<FilterProps> = ({
  filterStatus,
  setFilterStatus,
  onRefresh,
}) => (
  <div className="mb-6 flex gap-2">
    <select
      className="select select-bordered"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="">Все статусы</option>
      <option value="pending">Ожидание</option>
      <option value="in_progress">В процессе</option>
      <option value="done">Завершено</option>
    </select>
    <button className="btn btn-outline" onClick={onRefresh}>
      Обновить
    </button>
  </div>
);

export default TaskFilter;
