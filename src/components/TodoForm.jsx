import React, { useState, useEffect } from 'react';
import { getTodayFormatted } from '../utils/dateUtils';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function TodoForm({ isOpen, onClose, onSubmit, initialData, folders }) {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    dueDate: getTodayFormatted(),
    dueTime: '',
    folderId: '',
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        memo: initialData.memo || '',
        dueDate: initialData.dueDate || '',
        dueTime: initialData.dueTime || '',
        folderId: initialData.folderId || '',
      });
    } else {
      setFormData({
        title: '',
        memo: '',
        dueDate: getTodayFormatted(),
        dueTime: '',
        folderId: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      memo: formData.memo.trim(),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? '할 일 수정' : '새 할 일 추가'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                제목 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="할 일을 입력하세요"
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="memo">
                메모
              </label>
              <textarea
                id="memo"
                name="memo"
                className="form-textarea"
                value={formData.memo}
                onChange={handleChange}
                placeholder="추가 메모를 입력하세요 (선택)"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="dueDate">
                  날짜
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dueTime">
                  시간
                </label>
                <input
                  type="time"
                  id="dueTime"
                  name="dueTime"
                  className="form-input"
                  value={formData.dueTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="folderId">
                폴더
              </label>
              <select
                id="folderId"
                name="folderId"
                className="form-select"
                value={formData.folderId}
                onChange={handleChange}
              >
                <option value="">폴더 없음</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
