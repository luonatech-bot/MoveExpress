import React, { useState } from 'react';
import { Video, Calendar, Clock, CheckCircle2, X, Sparkles, User, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VideoSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoSurveyModal: React.FC<VideoSurveyModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:00 AM');
  const [platform, setPlatform] = useState<'whatsapp' | 'google_meet' | 'zoom'>('whatsapp');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#155EEF]/10 text-[#155EEF] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827]">Virtual Video Assessment</h3>
              <span className="text-[11px] text-gray-500">10-min live walk-through with our estimator</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="text-center py-6 space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#12B76A] mx-auto" />
            <h4 className="text-lg font-bold text-[#111827]">Virtual Survey Scheduled!</h4>
            <p className="text-xs text-gray-600">
              We have booked your appointment for <strong>{date}</strong> at <strong>{time}</strong> via <strong>{platform.toUpperCase()}</strong>.
            </p>
            <p className="text-[11px] text-gray-500">
              Our chief surveyor will connect with you on {phone || 'your phone number'}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#155EEF] text-white text-xs font-bold shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chief Adeleke Briggs"
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phone Number (WhatsApp Active)</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Time Window</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Video Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'google_meet', label: 'Google Meet' },
                  { id: 'zoom', label: 'Zoom' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as any)}
                    className={`py-2 rounded-xl text-center font-bold border transition-colors ${
                      platform === p.id
                        ? 'bg-[#155EEF] text-white border-[#155EEF]'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border text-gray-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#155EEF] text-white font-bold shadow-md flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Confirm Video Walkthrough</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
