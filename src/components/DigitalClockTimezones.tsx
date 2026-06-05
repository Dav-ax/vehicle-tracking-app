import React, { useState, useEffect } from 'react';
import { Plus, X, Globe } from 'lucide-react';

interface TimeZoneConfig {
  id: string;
  name: string;
  timezone: string;
  utcOffset: number;
  color: string;
}

interface TimeDisplay {
  hours: string;
  minutes: string;
  seconds: string;
  period: string; // AM/PM
}

const DEFAULT_TIMEZONES: TimeZoneConfig[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York', utcOffset: -5, color: 'bg-blue-500' },
  { id: '2', name: 'London', timezone: 'Europe/London', utcOffset: 0, color: 'bg-green-500' },
  { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo', utcOffset: 9, color: 'bg-purple-500' },
  { id: '4', name: 'Sydney', timezone: 'Australia/Sydney', utcOffset: 10, color: 'bg-orange-500' },
  { id: '5', name: 'Dubai', timezone: 'Asia/Dubai', utcOffset: 4, color: 'bg-red-500' },
];

const AVAILABLE_TIMEZONES = [
  { name: 'New York', timezone: 'America/New_York', utcOffset: -5 },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', utcOffset: -8 },
  { name: 'Chicago', timezone: 'America/Chicago', utcOffset: -6 },
  { name: 'Denver', timezone: 'America/Denver', utcOffset: -7 },
  { name: 'London', timezone: 'Europe/London', utcOffset: 0 },
  { name: 'Paris', timezone: 'Europe/Paris', utcOffset: 1 },
  { name: 'Madrid', timezone: 'Europe/Madrid', utcOffset: 1 },
  { name: 'Berlin', timezone: 'Europe/Berlin', utcOffset: 1 },
  { name: 'Dubai', timezone: 'Asia/Dubai', utcOffset: 4 },
  { name: 'India', timezone: 'Asia/Kolkata', utcOffset: 5.5 },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', utcOffset: 7 },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', utcOffset: 8 },
  { name: 'Singapore', timezone: 'Asia/Singapore', utcOffset: 8 },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', utcOffset: 9 },
  { name: 'Sydney', timezone: 'Australia/Sydney', utcOffset: 10 },
  { name: 'Auckland', timezone: 'Pacific/Auckland', utcOffset: 12 },
];

const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-cyan-500',
];

const DigitalClockTimezones: React.FC = () => {
  const [timezones, setTimezones] = useState<TimeZoneConfig[]>(DEFAULT_TIMEZONES);
  const [timeDisplays, setTimeDisplays] = useState<Map<string, TimeDisplay>>(new Map());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');

  // Update time for all timezones
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const newTimeDisplays = new Map<string, TimeDisplay>();

      timezones.forEach(tz => {
        const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone }));

        const hours = String(tzTime.getHours()).padStart(2, '0');
        const minutes = String(tzTime.getMinutes()).padStart(2, '0');
        const seconds = String(tzTime.getSeconds()).padStart(2, '0');
        const period = tzTime.getHours() >= 12 ? 'PM' : 'AM';

        newTimeDisplays.set(tz.id, {
          hours,
          minutes,
          seconds,
          period,
        });
      });

      setTimeDisplays(newTimeDisplays);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezones]);

  const handleAddTimezone = (timezone: string) => {
    const tzConfig = AVAILABLE_TIMEZONES.find(tz => tz.timezone === timezone);
    if (tzConfig) {
      const newId = String(Date.now());
      const newColor = COLORS[timezones.length % COLORS.length];
      
      setTimezones([
        ...timezones,
        {
          id: newId,
          name: tzConfig.name,
          timezone: tzConfig.timezone,
          utcOffset: tzConfig.utcOffset,
          color: newColor,
        },
      ]);

      setSelectedTimezone('');
      setShowAddModal(false);
    }
  };

  const handleRemoveTimezone = (id: string) => {
    if (timezones.length > 1) {
      setTimezones(timezones.filter(tz => tz.id !== id));
    }
  };

  const timeDisplay = timeDisplays.get(timezones[0]?.id);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">World Clock</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Timezone
          </button>
        </div>

        {/* Main Clock Display */}
        {timezones.length > 0 && timeDisplay && (
          <div className="mb-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/20 shadow-2xl">
            <div className="text-center">
              <p className="text-cyan-400 text-lg font-semibold mb-4">
                {timezones[0].name} • {timezones[0].timezone}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono">
                  {timeDisplay.hours}:{timeDisplay.minutes}:{timeDisplay.seconds}
                </div>
                <div className="text-4xl font-bold text-cyan-300">
                  {timeDisplay.period}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timezones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timezones.map(tz => {
            const display = timeDisplays.get(tz.id);
            if (!display) return null;

            return (
              <div
                key={tz.id}
                className="relative group p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-400/10"
              >
                {/* Remove Button */}
                {timezones.length > 1 && (
                  <button
                    onClick={() => handleRemoveTimezone(tz.id)}
                    className="absolute top-3 right-3 p-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Color Indicator */}
                <div className={`absolute top-0 left-0 w-1 h-full ${tz.color} rounded-l-xl`}></div>

                {/* Timezone Info */}
                <div className="pl-4 mb-4">
                  <h3 className="text-lg font-semibold text-white">{tz.name}</h3>
                  <p className="text-sm text-slate-400">{tz.timezone}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    UTC{tz.utcOffset >= 0 ? '+' : ''}{tz.utcOffset}
                  </p>
                </div>

                {/* Digital Time */}
                <div className="pl-4 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold font-mono text-white">
                      {display.hours}:{display.minutes}
                    </span>
                    <span className="text-2xl font-bold text-slate-400">
                      {display.seconds}
                    </span>
                    <span className="text-xl font-semibold text-slate-400 ml-2">
                      {display.period}
                    </span>
                  </div>

                  {/* Analog Clock Representation */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="w-20 h-20 mx-auto relative bg-slate-700/50 rounded-full border-2 border-slate-600">
                      {/* Center dot */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>

                      {/* Hour hand */}
                      <div
                        className="absolute bottom-1/2 left-1/2 origin-bottom w-1 h-6 bg-cyan-400 rounded transform -translate-x-1/2"
                        style={{
                          transform: `translateX(-50%) rotate(${(parseInt(display.hours) % 12) * 30 + parseInt(display.minutes) * 0.5}deg)`,
                        }}
                      ></div>

                      {/* Minute hand */}
                      <div
                        className="absolute bottom-1/2 left-1/2 origin-bottom w-0.5 h-7 bg-blue-400 rounded transform -translate-x-1/2"
                        style={{
                          transform: `translateX(-50%) rotate(${parseInt(display.minutes) * 6 + parseInt(display.seconds) * 0.1}deg)`,
                        }}
                      ></div>

                      {/* Second hand */}
                      <div
                        className="absolute bottom-1/2 left-1/2 origin-bottom w-px h-8 bg-red-400 transform -translate-x-1/2"
                        style={{
                          transform: `translateX(-50%) rotate(${parseInt(display.seconds) * 6}deg)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Timezone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add Timezone</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Select a timezone
                </label>
                <select
                  value={selectedTimezone}
                  onChange={e => setSelectedTimezone(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="">Choose timezone...</option>
                  {AVAILABLE_TIMEZONES.map(tz => (
                    <option key={tz.timezone} value={tz.timezone}>
                      {tz.name} (UTC{tz.utcOffset >= 0 ? '+' : ''}{tz.utcOffset})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddTimezone(selectedTimezone)}
                  disabled={!selectedTimezone}
                  className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalClockTimezones;
