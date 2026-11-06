import React, { useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Save, UserRound } from 'lucide-react';
import { initials } from '../lib/shared.jsx';
import { ProfileBanner } from './settings/ProfileBanner.jsx';
import { ProfileGeneral } from './settings/ProfileGeneral.jsx';

export function ProfilePage({ profile, onProfile, calendars, onToast }) {
  const [form, setForm] = useState(profile);
  const photoInput = useRef(null);
  useEffect(() => setForm(profile), [profile]);
  const update = changes => setForm(old => ({ ...old, ...changes }));
  const changed = JSON.stringify(form) !== JSON.stringify(profile);

  const save = event => {
    event.preventDefault();
    if (!form.name?.trim()) return onToast('Enter your display name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || '')) return onToast('Enter a valid email address');
    onProfile({ ...profile, ...form, name: form.name.trim(), email: form.email.trim() });
    onToast('Profile saved on this device');
  };
  const upload = event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return onToast('Select an image file');
    if (file.size > 900_000) return onToast('Choose a photo under 900 KB');
    const reader = new FileReader();
    reader.onload = () => update({ avatar: reader.result });
    reader.onerror = () => onToast('Could not open the photo');
    reader.readAsDataURL(file);
  };

  return <section className="ps-page" aria-label="Your profile">
    <div className="ps-frame">
      <form onSubmit={save}>
        <div className="ps-toolbar">
          <div className="account-heading"><span className="account-eyebrow">ACCOUNT</span><h1>My profile</h1><p>Your personal details</p></div>
          <div className="ps-buttons">
            <button className="ps-btn ps-btn-outline" type="button" onClick={() => setForm(profile)} disabled={!changed}><RotateCcw size={16}/> Discard</button>
            <button className="ps-btn ps-btn-save" type="submit" disabled={!changed}><Save size={16}/> Save changes</button>
          </div>
        </div>
        <ProfileBanner />
        <div className="ps-inner">
          <div className="ps-identity">
            <div className="ps-photo-wrap">
              <div className="ps-photo">{form.avatar ? <img src={form.avatar} alt="Your avatar"/> : <span>{initials(form.name)}</span>}</div>
              <button type="button" className="ps-camera" onClick={() => photoInput.current?.click()} aria-label="Change profile photo"><Camera size={15}/></button>
              <input ref={photoInput} className="ps-file-input" type="file" accept="image/*" onChange={upload}/>
            </div>
            <div className="ps-profile-name"><h2>{form.name || 'Your name'}</h2><p>{form.email || 'Email address'}</p></div>
            <div className="ps-profile-chips"><span><UserRound size={15}/> Personal account · Local demo</span></div>
            {form.avatar && <button className="ps-remove-photo" type="button" onClick={() => update({ avatar: '' })}>Remove photo</button>}
          </div>
          <ProfileGeneral form={form} update={update} calendars={calendars}/>
          {changed && <p className="ps-unsaved" role="status">Unsaved changes</p>}
        </div>
      </form>
    </div>
  </section>;
}
