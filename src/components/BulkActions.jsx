import React from 'react';
import { CheckCheck, ClipboardCheck, Trash2, X } from 'lucide-react';

export function BulkActions({ count, onClear, onComplete, onReview, onDelete }) {
  if (!count) return null;
  return <div className="work-bulk-bar" role="toolbar" aria-label="Selected task actions"><button className="bulk-dismiss" onClick={onClear} aria-label="Clear selection"><X size={18}/></button><strong className="bulk-count">{count}</strong><span className="bulk-label">{count===1?'task':'tasks'} selected</span><span className="bulk-divider"/><button onClick={onReview}><ClipboardCheck size={17}/> Move to review</button><button onClick={onComplete}><CheckCheck size={17}/> Complete</button><button className="bulk-danger" onClick={onDelete}><Trash2 size={17}/> Delete</button></div>;
}
