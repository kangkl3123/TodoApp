import React from 'react';
import { getDateLabel, formatTime, isOverdue } from '../utils/dateUtils';

// Icons as SVG components
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

function TodoItem({ todo, folder, onToggle, onEdit, onDelete }) {
  const overdue = !todo.completed && isOverdue(todo.dueDate, todo.dueTime);

  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{ borderLeftColor: folder?.color || 'transparent' }}
    >
      <div
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle(todo.id)}
      >
        {todo.completed && <CheckIcon />}
      </div>

      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        
        <div className="todo-meta">
          {todo.dueDate && (
            <span className="todo-meta-item" style={{ color: overdue ? '#FF7675' : undefined }}>
              <CalendarIcon />
              {getDateLabel(todo.dueDate)}
            </span>
          )}
          {todo.dueTime && (
            <span className="todo-meta-item" style={{ color: overdue ? '#FF7675' : undefined }}>
              <ClockIcon />
              {formatTime(todo.dueTime)}
            </span>
          )}
          {folder && (
            <span
              className="todo-folder-tag"
              style={{ backgroundColor: folder.color, color: '#2D3436' }}
            >
              {folder.name}
            </span>
          )}
        </div>

        {todo.memo && (
          <p className="todo-memo">{todo.memo}</p>
        )}
      </div>

      <div className="todo-actions">
        <button
          className="todo-action-btn"
          onClick={() => onEdit(todo)}
          aria-label="수정"
        >
          <EditIcon />
        </button>
        <button
          className="todo-action-btn delete"
          onClick={() => onDelete(todo.id)}
          aria-label="삭제"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
