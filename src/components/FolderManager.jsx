import React, { useState, useEffect } from 'react';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function FolderManager({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialData,
  folderColors,
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(folderColors[0]);

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setColor(initialData.color);
    } else {
      setName('');
      setColor(folderColors[0]);
    }
  }, [initialData, isOpen, folderColors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      id: initialData?.id,
      name: name.trim(),
      color,
    });

    onClose();
  };

  const handleDelete = () => {
    if (initialData && window.confirm('이 폴더를 삭제하시겠습니까? 폴더 내의 할 일은 삭제되지 않습니다.')) {
      onDelete(initialData.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? '폴더 수정' : '새 폴더 추가'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="folderName">
                폴더 이름 *
              </label>
              <input
                type="text"
                id="folderName"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="폴더 이름을 입력하세요"
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">폴더 색상</label>
              <div className="folder-color-picker">
                {folderColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`color-option ${color === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                    aria-label={`색상 ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {isEditing && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                style={{ marginRight: 'auto' }}
              >
                삭제
              </button>
            )}
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

export default FolderManager;
