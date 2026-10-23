import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Coins, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency } from '../types';
import { translations } from '../i18n/translations';
import { formatCurrency, encryptDataAES, generateSHA256Hash } from '../utils/crypto';

interface ExtraordinaryDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  lang: Language;
  onExecuteDeposit: (amountUSD: number, note: string, hash: string) => void;
}

export const ExtraordinaryDepositModal: React.FC<ExtraordinaryDepositModalProps> = ({
  isOpen,
  onClose,
  currency,
  lang,
  onExecuteDeposit,
}) => {
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('500');
  const [method, setMethod] = useState<'bank' | 'card' | 'crypto'>('bank');
  const [note, setNote] = useState<string>('Inyección extraordinaria para el Mundial 2030');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successReceipt, setSuccessReceipt] = useState<{
    amount: number;
    hash: string;
    cipherSnippet: string;
    date: string;
  } | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  if (!isOpen) return null;

  const t = translations[lang];

  const presets = [100, 250, 500, 1000, 2500];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleConfirm = async () => {
    if (amount <= 0) return;
    setIsProcessing(true);

    try {
      const now = new Date().toISOString();
      const payloadToEncrypt = JSON.stringify({
        fund: 'INVERSION_FIFA_2030',
        amountUSD: amount,
        currency,
        method,
        note,
        timestamp: now,
        clientId: 'FIFA2030_USR_8892',
      });

      // Genuine AES-256 GCM encryption through Web Crypto API
      const encrypted = await encryptDataAES(payloadToEncrypt);
      const hash = await generateSHA256Hash(encrypted.cipherText + now);

      setTimeout(() => {
        setIsProcessing(false);
        setSuccessReceipt({
          amount,
          hash: hash.slice(0, 36),
          cipherSnippet: encrypted.cipherText.slice(0, 28) + '...',
          date: new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#fbbf24', '#10b981']
        });

        // Update parent state
        onExecuteDeposit(amount, note, hash);
      }, 1500);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleCopyHash = () => {
    if (successReceipt) {
      navigator.clipboard.writeText(successReceipt.hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleClose = () => {
    setSuccessReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/60 dark:border-white/10 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-['Space_Grotesk']">
                {t.extraModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inversión FIFA 2030 • Depósito Inmediato
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!successReceipt ? (
          <div className="py-4 space-y-5 relative z-10">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.extraModalDesc}
            </p>

            {/* Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Selecciona o ingresa el monto:
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                      amount === preset
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/25'
                        : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    +${preset}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                  $
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-16 py-3 text-base font-bold text-slate-900 dark:text-white bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  {currency}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t.paymentMethod}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('bank')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all backdrop-blur-md cursor-pointer ${
                    method === 'bank'
                      ? 'border-blue-500/50 bg-blue-500/15 ring-1 ring-blue-500/30 shadow-md'
                      : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${method === 'bank' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">SPEI / SEPA</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Inmediato sin comisión</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all backdrop-blur-md cursor-pointer ${
                    method === 'card'
                      ? 'border-blue-500/50 bg-blue-500/15 ring-1 ring-blue-500/30 shadow-md'
                      : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mb-2 ${method === 'card' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Tarjeta Débito</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Cuenta nómina</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('crypto')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all backdrop-blur-md cursor-pointer ${
                    method === 'crypto'
                      ? 'border-blue-500/50 bg-blue-500/15 ring-1 ring-blue-500/30 shadow-md'
                      : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Coins className={`w-5 h-5 mb-2 ${method === 'crypto' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">USDC Institucional</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Paridad 1:1 dólar</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Concepto o Motivo (Opcional):
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Security Guarantee Notice */}
            <div className="flex items-start space-x-2.5 p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-md text-[11px] text-slate-600 dark:text-slate-400">
              <Lock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Transacción protegida con <strong>cifrado AES-256-GCM</strong>. El monto se invertirá de inmediato en los activos de tu estrategia asignada.
              </span>
            </div>

            {/* Action Button */}
            <button
              disabled={isProcessing || amount <= 0}
              onClick={handleConfirm}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 backdrop-blur-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.encryptingTx}</span>
                </>
              ) : (
                <>
                  <span>{t.confirmDeposit} ({formatCurrency(amount, currency)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Success Receipt View */
          <div className="py-6 space-y-4 text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                {t.depositSuccess}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                {t.depositSuccessDesc}
              </p>
            </div>

            {/* Receipt Details Box */}
            <div className="bg-white/40 dark:bg-white/5 rounded-2xl p-4 text-left border border-slate-200/60 dark:border-white/10 backdrop-blur-md text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/60 dark:border-white/10 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Monto Acreditado:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  +{formatCurrency(successReceipt.amount, currency)}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 dark:border-white/10 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Fecha y Hora:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {successReceipt.date}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 dark:border-white/10 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Cifrado de Saldo:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  AES-256-GCM Validado
                </span>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">Hash Criptográfico de Auditoría:</span>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-[10px] text-slate-300 break-all backdrop-blur-md">
                  <span>{successReceipt.hash}</span>
                  <button 
                    onClick={handleCopyHash}
                    className="ml-2 text-slate-400 hover:text-white cursor-pointer"
                    title="Copiar hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 backdrop-blur-md transition-all cursor-pointer"
            >
              Volver al Panel Principal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
