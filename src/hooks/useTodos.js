import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

// Default folders with pastel colors
const DEFAULT_FOLDERS = [
  { id: 'folder-work', name: '업무', color: '#FFB3BA' },
  { id: 'folder-personal', name: '개인', color: '#BAFFC9' },
  { id: 'folder-study', name: '공부', color: '#BAE1FF' },
];

const FOLDER_COLORS = [
  '#FFB3BA', // Pastel Pink
  '#BAFFC9', // Pastel Green
  '#BAE1FF', // Pastel Blue
  '#FFFFBA', // Pastel Yellow
  '#E2B6FF', // Pastel Purple
  '#FFD9BA', // Pastel Orange
  '#B5EAD7', // Pastel Mint
  '#FFDAC1', // Pastel Peach
];

/**
 * Custom hook for managing todos and folders
 */
export function useTodos() {
  const [todos, setTodos] = useLocalStorage('todo-manager-todos', []);
  const [folders, setFolders] = useLocalStorage('todo-manager-folders', DEFAULT_FOLDERS);

  // ============ Todo Operations ============

  const addTodo = (todoData) => {
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      memo: todoData.memo || '',
      dueDate: todoData.dueDate || null,
      dueTime: todoData.dueTime || null,
      folderId: todoData.folderId || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ============ Folder Operations ============

  const addFolder = (name, color) => {
    const newFolder = {
      id: uuidv4(),
      name,
      color: color || FOLDER_COLORS[folders.length % FOLDER_COLORS.length],
    };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder;
  };

  const updateFolder = (id, updates) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, ...updates } : folder
      )
    );
  };

  const deleteFolder = (id) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    // Remove folder reference from todos
    setTodos((prev) =>
      prev.map((todo) =>
        todo.folderId === id ? { ...todo, folderId: null } : todo
      )
    );
  };

  // ============ Getters ============

  const getTodosByFolder = (folderId) => {
    if (!folderId) return todos;
    return todos.filter((todo) => todo.folderId === folderId);
  };

  const getTodosCountByFolder = (folderId) => {
    return todos.filter(
      (todo) => todo.folderId === folderId && !todo.completed
    ).length;
  };

  const getFolderById = (folderId) => {
    return folders.find((folder) => folder.id === folderId);
  };

  return {
    todos,
    folders,
    folderColors: FOLDER_COLORS,
    // Todo operations
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    // Folder operations
    addFolder,
    updateFolder,
    deleteFolder,
    // Getters
    getTodosByFolder,
    getTodosCountByFolder,
    getFolderById,
  };
}

export default useTodos;
