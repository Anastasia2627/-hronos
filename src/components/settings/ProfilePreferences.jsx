import React from 'react';
import { CalendarRange, Clock3 } from 'lucide-react';

export function ProfilePreferences({ form, update }) {
  return <div className="ps-detail-sections">
    <section className="ps-detail-section">
      <h3 className="ps-section-heading"><CalendarRange size={18} /> Calendar preferences</h3>
      <label className="ps-info-row"><span className="ps-info-name">Default calendar view</span>
        <select aria-label="Default calendar view" className="ps-info-select" value={form.defaultView || 'month'} onChange={e => update({ defaultView: e.target.value })}>
          <option value="day">Day</option><option value="week">Week</option><option value="month">Month</option><option value="year">Year</option>
        </select>
      </label>
      <div className="ps-info-row"><span className="ps-info-name">Calendar color scheme</span><span className="ps-info-static ps-swatch-row"><i /><i /><i /><i /> Pastel</span></div>
    </section>
    <section className="ps-detail-section">
      <h3 className="ps-section-heading"><Clock3 size={18} /> Time & display</h3>
      <div className="ps-info-row"><span className="ps-info-name">Time format</span><span className="ps-info-static">24 hours</span></div>
      <div className="ps-info-row"><span className="ps-info-name">Week starts on</span><span className="ps-info-static">Monday</span></div>
    </section>
    <p className="ps-hint">Your default calendar view is saved locally and will open when you visit the calendar.</p>
  </div>;
}
