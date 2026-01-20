import React from 'react';
import TodoItem from './TodoItem';

const EmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

function TodoList({ todos, getFolderById, onToggle, onEdit, onDelete, onAdd, categoryLabel }) {
  // Sort: incomplete first, then by due date
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <section className="todo-section">
      <div className="todo-section-header">
        <h2 className="todo-section-title">
          {categoryLabel} ({todos.length})
        </h2>
        <button className="add-todo-btn" onClick={onAdd}>
          <PlusIcon />
          할 일 추가
        </button>
      </div>

      {sortedTodos.length === 0 ? (
        <div className="todo-empty">
          <div className="todo-empty-icon">
            <EmptyIcon />
          </div>
          <p>등록된 할 일이 없습니다</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            새로운 할 일을 추가해보세요!
          </p>
        </div>
      ) : (
        <div className="todo-list">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              folder={getFolderById(todo.folderId)}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
