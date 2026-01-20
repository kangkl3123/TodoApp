import React from 'react';
import { getGreeting, getDashboardDate } from '../utils/dateUtils';
import { parseISO, isToday } from 'date-fns';

function Dashboard({ todos }) {
  const todayTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    return isToday(parseISO(todo.dueDate));
  });

  const completedToday = todayTodos.filter((todo) => todo.completed).length;
  const pendingToday = todayTodos.filter((todo) => !todo.completed).length;
  const totalPending = todos.filter((todo) => !todo.completed).length;

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-greeting">{getGreeting()} 👋</h1>
          <p className="dashboard-date">{getDashboardDate()}</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{pendingToday}</div>
          <div className="stat-label">오늘 할 일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedToday}</div>
          <div className="stat-label">오늘 완료</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalPending}</div>
          <div className="stat-label">전체 대기</div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
