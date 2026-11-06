import React from 'react';
import { BadgeCheck, CalendarDays, ShieldCheck } from 'lucide-react';

function ProfileField({ label, value, onChange, type = 'text', placeholder, hint, maxLength }) {
  return (
    <label className="ps-info-row">
      <span className="ps-info-name">{label}</span>
      <span className="ps-info-value">
        <input aria-label={label} type={type} value={value ?? ''} placeholder={placeholder}
          onChange={event => onChange(event.target.value)} maxLength={maxLength} />
        {hint && <small>{hint}</small>}
      </span>
    </label>
  );
}

export function ProfileGeneral({ form, update, calendars }) {
  return (
    <div className="ps-detail-sections">
      <section className="ps-detail-section">
        <h3 className="ps-section-heading"><BadgeCheck size={18} /> Personal information</h3>
        <ProfileField label="Display name" value={form.name} onChange={name => update({ name })} maxLength={64} placeholder="Your name" />
        <ProfileField label="Email address" value={form.email} onChange={email => update({ email })} type="email" maxLength={120} />
        <ProfileField label="About me" value={form.role} onChange={role => update({ role })} maxLength={90} placeholder="A little about yourself" />
      </section>
      <section className="ps-detail-section">
        <h3 className="ps-section-heading"><CalendarDays size={18} /> Your workspace</h3>
        <div className="ps-info-row"><span className="ps-info-name">Workspace</span><span className="ps-info-static">Personal workspace</span></div>
        <div className="ps-info-row"><span className="ps-info-name">Calendars</span><span className="ps-info-static">{calendars.length} calendars</span></div>
        <div className="ps-info-row"><span className="ps-info-name">Account type</span><span className="ps-info-static"><span className="ps-small-pill ps-pill-peach">Personal</span></span></div>
      </section>
      <section className="ps-detail-section">
        <h3 className="ps-section-heading"><ShieldCheck size={18} /> Privacy & data</h3>
        <div className="ps-info-row"><span className="ps-info-name">Local storage</span><span className="ps-info-static"><span className="ps-small-pill ps-pill-green"><BadgeCheck size={14} /> Active</span></span></div>
        <div className="ps-info-row"><span className="ps-info-name">Cloud sync</span><span className="ps-info-static ps-dim">Not connected — frontend preview</span></div>
      </section>
    </div>
  );
}
