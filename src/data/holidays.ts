export interface Holiday {
  date: string;
  name: string;
  status: 'closed' | 'open-reduced' | 'open-normal';
  hours?: string;
  note?: string;
}

export interface DayHours {
  day: string;
  open: string;
  close: string;
  isBar: boolean;
}

export const regularHours: DayHours[] = [
  { day: 'Monday', open: '11:00 AM', close: '11:30 PM', isBar: false },
  { day: 'Tuesday', open: '11:00 AM', close: '11:30 PM', isBar: false },
  { day: 'Wednesday', open: '11:00 AM', close: '11:30 PM', isBar: false },
  { day: 'Thursday', open: '11:00 AM', close: '12:00 AM', isBar: true },
  { day: 'Friday', open: '11:00 AM', close: '1:00 AM', isBar: true },
  { day: 'Saturday', open: '10:00 AM', close: '1:00 AM', isBar: true },
  { day: 'Sunday', open: '10:00 AM', close: '11:00 PM', isBar: true },
];

export const holidays2026: Holiday[] = [
  {
    date: '2026-01-14',
    name: '🎉 Makar Sankranti / Pongal',
    status: 'open-reduced',
    hours: '12:00 PM — 11:00 PM',
    note: 'Special Pongal thali and sugarcane juice cocktails available all day!',
  },
  {
    date: '2026-01-26',
    name: '🇮🇳 Republic Day',
    status: 'open-reduced',
    hours: '12:00 PM — 11:00 PM',
    note: 'Tricolor cocktails and patriotic evening specials.',
  },
  {
    date: '2026-02-14',
    name: '❤️ Valentine\'s Day',
    status: 'open-reduced',
    hours: '12:00 PM — 12:00 AM',
    note: 'Couple\'s special menu with complimentary cocktails for two.',
  },
  {
    date: '2026-03-09',
    name: '🕉️ Maha Shivratri',
    status: 'open-reduced',
    hours: '12:00 PM — 10:00 PM',
    note: 'Special vegetarian thali menu. Bar opens after 7 PM.',
  },
  {
    date: '2026-03-14',
    name: '🎨 Holi',
    status: 'open-reduced',
    hours: '12:00 PM — 1:00 AM',
    note: 'Holi celebration night — bhang special lassis and thandai cocktails! 🌈',
  },
  {
    date: '2026-03-30',
    name: '🌙 Eid ul-Fitr',
    status: 'open-reduced',
    hours: '12:00 PM — 12:00 AM',
    note: 'Special Biryani and Sheer Khurma menu. Eid Mubarak!',
  },
  {
    date: '2026-04-02',
    name: '🌕 Gudhi Padwa / Ugadi',
    status: 'open-reduced',
    hours: '11:00 AM — 10:00 PM',
    note: 'Festive special menu with traditional sweets and festive drinks.',
  },
  {
    date: '2026-04-14',
    name: '🙏 Dr. Ambedkar Jayanti',
    status: 'open-reduced',
    hours: '12:00 PM — 11:00 PM',
    note: 'Special tribute dinner and community feast.',
  },
  {
    date: '2026-05-01',
    name: '🛠️ Maharashtra Day',
    status: 'open-reduced',
    hours: '12:00 PM — 11:30 PM',
    note: 'Maharashtrian special — Vada Pav, Misal Pav and local craft brews.',
  },
  {
    date: '2026-08-15',
    name: '🇮🇳 Independence Day',
    status: 'open-reduced',
    hours: '12:00 PM — 12:00 AM',
    note: 'Freedom special — all drinks 15% off. DJ night from 9 PM.',
  },
  {
    date: '2026-08-30',
    name: '🐘 Ganesh Chaturthi',
    status: 'open-reduced',
    hours: '11:00 AM — 11:00 PM',
    note: 'Ganpati Bappa Morya! Special modaks and festive cocktails.',
  },
  {
    date: '2026-09-25',
    name: '🪔 Dussehra / Navratri',
    status: 'open-reduced',
    hours: '6:00 PM — 1:00 AM',
    note: 'Navratri Raas Garba night with dandiya and drinks. Garba starts at 8 PM.',
  },
  {
    date: '2026-10-20',
    name: '🪔 Diwali',
    status: 'open-reduced',
    hours: '5:00 PM — 1:00 AM',
    note: 'Diwali Bash — fireworks, special thali, unlimited cocktails and live DJ.',
  },
  {
    date: '2026-11-09',
    name: '🎂 Guru Nanak Jayanti',
    status: 'open-reduced',
    hours: '12:00 PM — 10:00 PM',
    note: 'Special langar-style vegetarian menu served all day.',
  },
  {
    date: '2026-12-25',
    name: '🎄 Christmas',
    status: 'open-reduced',
    hours: '6:00 PM — 12:00 AM',
    note: 'Christmas Eve dinner with carols. Special wine pairing menu available.',
  },
  {
    date: '2026-12-31',
    name: '🎆 New Year\'s Eve',
    status: 'open-reduced',
    hours: '6:00 PM — 3:00 AM',
    note: 'NYE Grand Bash — live DJ, unlimited food and drinks, midnight countdown and fireworks.',
  },
];

export function getTodayStatus(): { isCurrentlyOpen: boolean; nextOpenTime?: string; nextCloseTime?: string; message: string } {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayHours = regularHours[dayIndex];
  
  const todayStr = now.toISOString().split('T')[0];
  const holiday = holidays2026.find(h => h.date === todayStr);
  
  if (holiday && holiday.status === 'closed') {
    return {
      isCurrentlyOpen: false,
      message: `Currently Closed — ${holiday.name}. ${holiday.note || ''}`,
    };
  }
  
  if (holiday && holiday.status === 'open-reduced') {
    return {
      isCurrentlyOpen: true,
      message: `${holiday.name} — ${holiday.hours || 'See schedule'}. ${holiday.note || ''}`,
    };
  }

  return {
    isCurrentlyOpen: true,
    nextOpenTime: dayHours.open,
    nextCloseTime: dayHours.close,
    message: `We're open today ${dayHours.open} — ${dayHours.close}${dayHours.isBar ? ' (Late Night Bar!)' : ''}`,
  };
}
