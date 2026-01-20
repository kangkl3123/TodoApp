import React, { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { filterTodosByCategory } from './utils/dateUtils';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FolderSidebar from './components/FolderSidebar';
import FolderManager from './components/FolderManager';
import './styles/index.css';

const CATEGORY_LABELS = {
  all: '전체 할 일',
  today: '오늘 할 일',
  week: '이번주 할 일',
  later: '나중에 할 일',
};

function App() {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Custom hook for todos & folders
  const {
    todos,
    folders,
    folderColors,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    addFolder,
    updateFolder,
    deleteFolder,
    getTodosByFolder,
    getTodosCountByFolder,
    getFolderById,
  } = useTodos();

  // Filter todos by folder and category
  const filteredTodos = useMemo(() => {
    let result = selectedFolderId ? getTodosByFolder(selectedFolderId) : todos;
    return filterTodosByCategory(result, activeCategory);
  }, [todos, selectedFolderId, activeCategory, getTodosByFolder]);

  // Handlers
  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsTodoFormOpen(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsTodoFormOpen(true);
  };

  const handleTodoSubmit = (data) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, data);
    } else {
      addTodo(data);
    }
    setEditingTodo(null);
  };

  const handleAddFolder = () => {
    setEditingFolder(null);
    setIsFolderFormOpen(true);
  };

  const handleFolderSubmit = (data) => {
    if (data.id) {
      updateFolder(data.id, { name: data.name, color: data.color });
    } else {
      addFolder(data.name, data.color);
    }
  };

  const handleSelectFolder = (folderId) => {
    setSelectedFolderId(folderId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const totalTodosCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-container">
      <FolderSidebar
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={handleSelectFolder}
        getTodosCountByFolder={getTodosCountByFolder}
        onAddFolder={handleAddFolder}
        totalTodosCount={totalTodosCount}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="main-content">
        <Dashboard todos={todos} />

        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <TodoList
          todos={filteredTodos}
          getFolderById={getFolderById}
          onToggle={toggleTodo}
          onEdit={handleEditTodo}
          onDelete={deleteTodo}
          onAdd={handleAddTodo}
          categoryLabel={CATEGORY_LABELS[activeCategory]}
        />
      </main>

      {/* Todo Form Modal */}
      <TodoForm
        isOpen={isTodoFormOpen}
        onClose={() => {
          setIsTodoFormOpen(false);
          setEditingTodo(null);
        }}
        onSubmit={handleTodoSubmit}
        initialData={editingTodo}
        folders={folders}
      />

      {/* Folder Manager Modal */}
      <FolderManager
        isOpen={isFolderFormOpen}
        onClose={() => {
          setIsFolderFormOpen(false);
          setEditingFolder(null);
        }}
        onSubmit={handleFolderSubmit}
        onDelete={deleteFolder}
        initialData={editingFolder}
        folderColors={folderColors}
      />
    </div>
  );
}

export default App;
