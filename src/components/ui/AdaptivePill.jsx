import React from 'react';
import { CircleDashed, CirclePlay, CircleDotDashed, CheckCircle2, CalendarDays, Flame, Circle } from 'lucide-react';

const PRESETS = {
  todo: { label: 'To do', color:'violet', icon:CircleDashed },
  progress: { label: 'In progress', color:'orange', icon:CirclePlay },
  review: { label: 'In review', color:'blue', icon:CircleDotDashed },
  done: { label: 'Completed', color:'green', icon:CheckCircle2 },
  scheduled: { label: 'Scheduled', color:'sky', icon:CalendarDays },
  high: { label: 'High priority', color:'red', icon:Flame },
  medium: { label: 'Medium priority', color:'amber', icon:Circle },
  low: { label: 'Low priority', color:'green', icon:Circle },
};

/** Labels collapse in tight cards and expand on hover or keyboard focus. */
export function AdaptivePill({status='todo',compact=false,className=''}) {
  const item = PRESETS[status] || PRESETS.todo;
  const Icon = item.icon;
  return <span tabIndex={0} title={item.label} aria-label={item.label} className={`adaptive-pill adaptive-pill-${item.color} ${compact?'adaptive-pill-compact':''} ${className}`}>
    <Icon size={16} strokeWidth={2.5}/><span className="adaptive-pill-label">{item.label}</span>
  </span>;
}
