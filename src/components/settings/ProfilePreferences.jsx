import React from 'react';
import { CalendarRange } from 'lucide-react';

export function ProfilePreferences({ form, update }) {
  return <div className="ps-detail-sections">
    <section className="ps-detail-section">
      <h3 className="ps-section-heading"><CalendarRange size={19}/> Calendar view</h3>
      <label className="ps-info-row"><span className="ps-info-name">Open calendar in</span>
        <select aria-label="Default calendar view" className="ps-info-select" value={form.defaultView || 'month'} onChange={e => update({defaultView:e.target.value})}>
          <option value="day">Day view</option><option value="week">Week view</option><option value="month">Month view</option><option value="year">Year view</option>
        </select>
      </label>
    </section>
    <p className="ps-hint">This setting is saved on your device and applies the next time you open the calendar.</p>
  </div>;
}
