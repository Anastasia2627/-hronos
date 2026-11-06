import React, { useEffect } from 'react';
import {
  X
} from 'lucide-react';

export function PageHeading({ eyebrow, title, subtitle, right }) { return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{right && <div className="page-actions">{right}</div>}</div>; }

export function Modal({ title, subtitle, children, onClose, size = 'medium' }) { useEffect(() => { const handler = (e) => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', handler); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; }; }, [onClose]); return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className={`modal-dialog modal-${size}`} role="dialog" aria-modal="true" aria-label={title}><header className="modal-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-button close-modal" aria-label="Close" onClick={onClose}><X size={20} /></button></header>{children}</section></div>; }
