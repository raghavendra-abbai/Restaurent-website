import { Clock, Calendar, AlertCircle, PartyPopper } from 'lucide-react';
import { regularHours, holidays2026 } from '../data/holidays';

export function HolidaysHours() {
  const today = new Date();
  const currentDayIndex = today.getDay();

  return (
    <section id="hours" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Plan Your Visit</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Hours & Holidays
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Check our regular schedule and upcoming festival hours before your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Schedule */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-amber-400" />
                <h3 className="text-white font-bold text-xl">Weekly Schedule</h3>
              </div>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {regularHours.map((day, index) => {
                const isToday = index === currentDayIndex;
                return (
                  <div
                    key={day.day}
                    className={`px-6 py-4 flex items-center justify-between transition-colors ${
                      isToday ? 'bg-amber-500/5' : 'hover:bg-zinc-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                      <div>
                        <p className={`font-semibold ${isToday ? 'text-amber-400' : 'text-white'}`}>
                          {day.day} {isToday && <span className="text-xs text-amber-400/70 font-normal">(Today)</span>}
                        </p>
                        {day.isBar && (
                          <span className="text-xs text-purple-400/80 flex items-center gap-1">
                            <PartyPopper className="w-3 h-3" /> Late Night Bar
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-zinc-300 text-sm font-medium">
                      {day.open} — {day.close}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Holiday Schedule */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-400" />
                <h3 className="text-white font-bold text-xl">Festival & Holiday Schedule 2026</h3>
              </div>
            </div>
            <div className="divide-y divide-zinc-800/50 max-h-[600px] overflow-y-auto">
              {holidays2026.map(holiday => {
                const holidayDate = new Date(holiday.date + 'T00:00:00');
                const isPast = holidayDate < today;
                return (
                  <div
                    key={holiday.date}
                    className={`px-6 py-4 ${isPast ? 'opacity-40' : 'hover:bg-zinc-800/30'} transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-semibold ${isPast ? 'text-zinc-500' : 'text-white'}`}>
                            {holiday.name}
                          </p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            holiday.status === 'closed'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : holiday.status === 'open-reduced'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-green-500/10 text-green-400 border border-green-500/20'
                          }`}>
                            {holiday.status === 'closed' ? 'Closed' : holiday.status === 'open-reduced' ? 'Special Hours' : 'Open'}
                          </span>
                        </div>
                        {holiday.hours && (
                          <p className="text-amber-400 text-sm font-medium">{holiday.hours}</p>
                        )}
                        {holiday.note && (
                          <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {holiday.note}
                          </p>
                        )}
                      </div>
                      <span className="text-zinc-500 text-xs font-mono shrink-0">
                        {holidayDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
