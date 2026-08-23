import React, { useState } from 'react';
import { Phone, CheckCircle2, X, Clock, ShieldCheck } from 'lucide-react';

interface QuickCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCallModal: React.FC<QuickCallModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-3 py-2 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#12B76A] mx-auto" />
            <h4 className="text-base font-bold text-[#111827]">Request Dispatched!</h4>
            <p className="text-xs text-gray-600">
              Our lead move coordinator will call <strong>{phone}</strong> within 5 minutes.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#155EEF]/10 text-[#155EEF] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111827]">Request an Instant Callback</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your phone number and an on-duty logistics specialist will call you directly.
              </p>
            </div>

            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-center text-sm font-semibold focus:ring-2 focus:ring-[#155EEF]"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1048b8] text-white text-xs font-bold shadow-md transition-colors"
            >
              Call Me in 5 Minutes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
