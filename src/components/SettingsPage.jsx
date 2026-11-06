import React, { useEffect, useRef, useState } from 'react';
import { Camera, ChevronRight, Home, RotateCcw, Save, Settings2, UserRound } from 'lucide-react';
import { initials } from '../lib/shared.jsx';
import { ProfileBanner } from './settings/ProfileBanner.jsx';
import { ProfileGeneral } from './settings/ProfileGeneral.jsx';
import { ProfileCalendars } from './settings/ProfileCalendars.jsx';
import { ProfilePreferences } from './settings/ProfilePreferences.jsx';

const TABS = [{ id: 'general', label: 'General' }, { id: 'calendars', label: 'Calendars' }, { id: 'preferences', label: 'Preferences' }];
const DEFAULTS = { defaultView: 'month' };

export function SettingsPage({ profile, onProfile, calendars, onEditCal, onNewCal, onToggleCal, onCalendarView, onToast }) {
  const [form, setForm] = useState({ ...DEFAULTS, ...profile });
  const [active, setActive] = useState('general');
  const photoInput = useRef(null);
  useEffect(() => setForm({ ...DEFAULTS, ...profile }), [profile]);
  const update = changes => setForm(previous => ({ ...previous, ...changes }));
  const changed = JSON.stringify(form) !== JSON.stringify({ ...DEFAULTS, ...profile });

  const save = (event) => {
    event?.preventDefault();
    if (!form.name?.trim()) return onToast('Please enter a display name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || '')) return onToast('Please enter a valid email address');
    const next = { ...form, name: form.name.trim(), email: form.email.trim() };
    onProfile(next);
    onCalendarView?.(next.defaultView);
    onToast('Profile changes saved locally');
  };
  const discard = () => { setForm({ ...DEFAULTS, ...profile }); onToast('Changes discarded'); };
  const uploadPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    if (!file.type.startsWith('image/')) return onToast('Choose an image file');
    if (file.size > 900_000) return onToast('Choose a photo smaller than 900 KB');
    const reader = new FileReader();
    reader.onload = () => update({ avatar: reader.result });
    reader.onerror = () => onToast('Could not read this photo');
    reader.readAsDataURL(file);
  };

  return <div className="ps-page">
    <div className="ps-frame">
      <div className="ps-tabs" role="tablist" aria-label="Settings sections">
        {TABS.map(tab => <button key={tab.id} role="tab" aria-selected={active === tab.id} className={`ps-tab ${active === tab.id ? 'is-active' : ''}`} onClick={() => setActive(tab.id)}>{tab.label}</button>)}
      </div>
      <form onSubmit={save}>
        <div className="ps-toolbar">
          <div className="ps-breadcrumb"><Home size={17} /><ChevronRight size={15} /><Settings2 size={16} /><ChevronRight size={15} /><span>{TABS.find(tab => tab.id === active)?.label} information</span></div>
          <div className="ps-buttons"><button className="ps-btn ps-btn-outline" type="button" onClick={discard}><RotateCcw size={15} /> Discard</button><button className="ps-btn ps-btn-save" type="submit"><Save size={15} /> Save changes</button></div>
        </div>
        <ProfileBanner />
        <div className="ps-inner">
          <div className="ps-identity">
            <div className="ps-photo-wrap">
              <div className="ps-photo">{form.avatar ? <img src={form.avatar} alt="Your profile" /> : <span>{initials(form.name)}</span>}</div>
              <button type="button" className="ps-camera" aria-label="Upload profile photo" title="Upload profile photo" onClick={() => photoInput.current?.click()}><Camera size={15} /></button>
              <input ref={photoInput} type="file" accept="image/*" onChange={uploadPhoto} className="ps-file-input" aria-label="Profile photo" />
            </div>
            <div className="ps-profile-name"><h1>{form.name || 'Your name'}</h1><p>{form.email || 'email@example.com'}</p></div>
            <div className="ps-profile-chips"><span><UserRound size={14} /> Personal account</span><span className="ps-chip-success">● Local preview</span></div>
            {form.avatar && <button type="button" className="ps-remove-photo" onClick={() => update({ avatar: '' })}>Remove photo</button>}
          </div>
          {active === 'general' && <ProfileGeneral form={form} update={update} calendars={calendars} />}
          {active === 'calendars' && <ProfileCalendars calendars={calendars} onEditCal={onEditCal} onNewCal={onNewCal} onToggleCal={onToggleCal} />}
          {active === 'preferences' && <ProfilePreferences form={form} update={update} />}
          {changed && <p className="ps-unsaved" role="status">You have unsaved changes.</p>}
        </div>
      </form>
    </div>
  </div>;
}
