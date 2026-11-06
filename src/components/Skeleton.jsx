import React from 'react';

function Bar({ size = 'wide', className = '' }) {
  return <span className={`skeleton-bar skeleton-${size} ${className}`} />;
}

function Card() {
  return <div className="skeleton-card"><Bar size="short" /><Bar /><Bar size="medium" /><div className="skeleton-card-footer"><Bar size="tiny" /><Bar size="tiny" /></div></div>;
}

export function PageSkeleton({ page = 'overview', view = 'board' }) {
  if (page === 'settings') return <div className="ps-skeleton" role="status" aria-label="Loading settings" aria-busy="true"><div className="ps-skeleton-tabs"><Bar size="tiny" /><Bar size="tiny" /><Bar size="tiny" /></div><div className="ps-skeleton-controls"><Bar size="short" /><Bar size="short" /></div><div className="ps-skeleton-cover" /><div className="ps-skeleton-content"><div className="ps-skeleton-avatar" /><Bar size="short" /><Bar size="medium" />{Array.from({ length: 9 }, (_, i) => <div key={i} className="ps-skeleton-line"><Bar size="short" /><Bar size="medium" /></div>)}</div><span className="sr-only">Loading profile settings</span></div>;
  const board = page === 'tasks' && view === 'board';
  const list = page === 'tasks' && view === 'list';
  return <div className="page-skeleton" aria-busy="true" aria-label="Loading content" role="status">
    <div className="skeleton-header"><Bar size="tiny" /><Bar size="heading" /><Bar size="medium" /></div>
    {board ? <div className="skeleton-columns">{Array.from({ length: 4 }, (_, i) =>
      <div className="skeleton-column" key={i}><Bar size="short" /><Card /><Card /><Card /></div>
    )}</div> : list ? <div className="skeleton-table"><div className="skeleton-table-head"><Bar size="short" /><Bar size="tiny" /></div>{Array.from({ length: 7 }, (_, i) => <div key={i} className="skeleton-row"><Bar /><Bar size="medium" /><Bar size="short" /><Bar size="tiny" /></div>)}</div> : page === 'tasks' ? <div className="skeleton-table"><Bar size="medium" /><div className="skeleton-milestones"><Bar /><Bar /><Bar /></div>{Array.from({ length: 5 }, (_, i) => <div className="skeleton-row" key={i}><Bar size="medium" /><Bar size="short" /></div>)}</div> : <><div className="skeleton-stats">{Array.from({ length: 4 }, (_, i) => <div className="skeleton-stat" key={i}><Bar size="short" /><Bar size="heading" /><Bar size="medium" /></div>)}</div><div className="skeleton-main-grid"><div className="skeleton-table"><Bar size="medium" />{Array.from({ length: 5 }, (_, i) => <div className="skeleton-row" key={i}><Bar /><Bar size="short" /></div>)}</div><div className="skeleton-table"><Bar size="medium" /><Card /><Card /></div></div></>}
    <span className="sr-only">Loading Chronos content</span>
  </div>;
}
