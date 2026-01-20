import React from 'react';

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const AllIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function FolderSidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  getTodosCountByFolder,
  onAddFolder,
  totalTodosCount,
  isOpen,
  onToggle,
}) {
  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={onToggle}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">✓</div>
          <h1 className="sidebar-title">할일 관리</h1>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-section-title">메뉴</h3>
          <ul className="folder-list">
            <li
              className={`folder-item ${selectedFolderId === null ? 'active' : ''}`}
              onClick={() => onSelectFolder(null)}
            >
              <AllIcon />
              <span className="folder-name">전체 보기</span>
              <span className="folder-count">{totalTodosCount}</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-section" style={{ flex: 1 }}>
          <h3 className="sidebar-section-title">폴더</h3>
          <ul className="folder-list">
            {folders.map((folder) => (
              <li
                key={folder.id}
                className={`folder-item ${selectedFolderId === folder.id ? 'active' : ''}`}
                onClick={() => onSelectFolder(folder.id)}
              >
                <div
                  className="folder-color"
                  style={{ backgroundColor: folder.color }}
                />
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count">
                  {getTodosCountByFolder(folder.id)}
                </span>
              </li>
            ))}
          </ul>
          <button className="add-folder-btn" onClick={onAddFolder}>
            <PlusIcon />
            새 폴더 추가
          </button>
        </div>
      </aside>
    </>
  );
}

export default FolderSidebar;
