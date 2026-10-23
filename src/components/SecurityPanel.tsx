import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Fingerprint, 
  FileCode, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  Check, 
  Database,
  Eye,
  EyeOff
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { encryptDataAES, generateSHA256Hash } from '../utils/crypto';

interface SecurityPanelProps {
  isBiometricAuthenticated: boolean;
  onOpenBiometricModal: () => void;
  lang: Language;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({
  isBiometricAuthenticated,
  onOpenBiometricModal,
  lang,
}) => {
  const t = translations[lang];

  // Interactive Live AES-256 Playground
  const [inputText, setInputText] = useState<string>('Titular: Inversor FIFA 2030 | Cuenta: ES76 2100 0418 4502 0005 1120 | Meta: $6,500 USD');
  const [encryptedOutput, setEncryptedOutput] = useState<{ cipherText: string; iv: string } | null>(null);
  const [shaHash, setShaHash] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showMasked, setShowMasked] = useState<boolean>(false);

  // Security audit log items
  const [auditLogs] = useState([
    {
      id: 'LOG-9921',
      timestamp: '2026-09-06 17:45:12',
      event: 'Verificación de Firma Biométrica WebAuthn Level 3',
      algorithm: 'FIDO2 / ECDSA P-256',
      status: 'VERIFICADO',
    },
    {
      id: 'LOG-9918',
      timestamp: '2026-09-06 14:20:05',
      event: 'Cifrado de Aportación Extraordinaria en Tránsito',
      algorithm: 'AES-256-GCM + IV 96-bit',
      status: 'CIFRADO SEGURO',
    },
    {
      id: 'LOG-9890',
      timestamp: '2026-09-05 09:12:33',
      event: 'Validación de Integridad de Hash de Saldo',
      algorithm: 'SHA-256 HMAC',
      status: 'CONSISTENTE',
    },
    {
      id: 'LOG-9872',
      timestamp: '2026-09-04 18:00:00',
      event: 'Rotación de Llave de Sesión Institucional',
      algorithm: 'HKDF / X9.63 Key Derivation',
      status: 'ACTUALIZADO',
    },
  ]);

  const handleRunEncryption = async () => {
    setIsEncrypting(true);
    try {
      const res = await encryptDataAES(inputText);
      const hash = await generateSHA256Hash(inputText);
      setEncryptedOutput(res);
      setShaHash(hash);
    } finally {
      setIsEncrypting(false);
    }
  };

  useEffect(() => {
    handleRunEncryption();
  }, [inputText]);

  const handleCopyCipher = () => {
    if (encryptedOutput) {
      navigator.clipboard.writeText(encryptedOutput.cipherText);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/25 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Arquitectura Bancaria Zero-Knowledge & Cifrado Militar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-['Space_Grotesk'] tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {t.securityTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {t.securityDesc}
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={onOpenBiometricModal}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg backdrop-blur-md cursor-pointer ${
              isBiometricAuthenticated
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>{isBiometricAuthenticated ? 'Biometría Activa' : 'Autenticar con Biometría'}</span>
          </button>
        </div>
      </div>

      {/* Security Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3 hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 backdrop-blur-md">
              Activo
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Cifrado Simétrico AES-256-GCM
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Todos los datos de aportaciones, saldos e identidad viajan y se almacenan cifrados con claves de 256 bits y vector de inicialización único por bloque.
            </p>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <Fingerprint className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/20 backdrop-blur-md">
              FIDO2
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Custodia Biométrica Local
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Tu huella y rostro jamás salen del Secure Enclave de tu dispositivo. La financiera solo recibe pruebas criptográficas sin almacenar tu biometría.
            </p>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 backdrop-blur-md">
              <Key className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20 backdrop-blur-md">
              SHA-256
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Libro Mayor Inmutable
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Cada aportación mensual o extraordinaria genera un hash SHA-256 que garantiza que el historial de rendimientos no pueda ser alterado.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Encryption Playground */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center">
              <FileCode className="w-5 h-5 text-blue-500 mr-2" />
              {t.samplePayload}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prueba interactiva del motor de cifrado nativo Web Crypto API operando en tu navegador
            </p>
          </div>
          <button
            onClick={handleRunEncryption}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEncrypting ? 'animate-spin' : ''}`} />
            <span>Recifrar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plain Text Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>{t.plainText}</span>
              <button 
                onClick={() => setShowMasked(!showMasked)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center text-[11px] cursor-pointer"
              >
                {showMasked ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                {showMasked ? 'Ocultar' : 'Revelar'}
              </button>
            </div>
            <textarea
              rows={4}
              value={showMasked ? inputText : '*************************************************************************'}
              onChange={(e) => {
                if (showMasked) setInputText(e.target.value);
              }}
              className="w-full p-3.5 text-xs font-mono bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
            <p className="text-[11px] text-slate-400">
              Datos sensibles del cliente protegidos bajo la directiva europea de privacidad y secreto financiero.
            </p>
          </div>

          {/* Ciphertext Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <Lock className="w-3.5 h-3.5 mr-1" />
                {t.cipherResult}
              </span>
              <button
                onClick={handleCopyCipher}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center text-[11px] cursor-pointer"
              >
                {copiedKey ? <Check className="w-3 h-3 text-emerald-500 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Copiar
              </button>
            </div>
            <div className="p-3.5 text-xs font-mono bg-black/40 text-emerald-400 border border-white/10 rounded-2xl h-24 overflow-y-auto break-all shadow-inner backdrop-blur-md">
              {encryptedOutput ? encryptedOutput.cipherText : 'Cifrando...'}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Vector Inicial (IV): <strong className="font-mono text-slate-700 dark:text-slate-300">{encryptedOutput?.iv || '000000000000'}</strong></span>
              <span>Longitud: <strong>256 bits</strong></span>
            </div>
          </div>
        </div>

        {/* SHA-256 Hash Display */}
        <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-md text-xs">
          <span className="text-slate-500 dark:text-slate-400 block mb-1">Firma Digital de Integridad (SHA-256):</span>
          <p className="font-mono text-[11px] text-slate-800 dark:text-slate-200 break-all">
            {shaHash || 'Generando hash de bloque...'}
          </p>
        </div>
      </div>

      {/* Security Event Audit Trail */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center pb-2 border-b border-slate-200/60 dark:border-white/10">
          <Database className="w-5 h-5 text-blue-500 mr-2" />
          {t.securityAuditLog}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/10 text-slate-400">
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Identificador</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Fecha y Hora</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Evento de Seguridad</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Algoritmo</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px] text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-slate-500 dark:text-slate-400">{log.id}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-400">{log.timestamp}</td>
                  <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">{log.event}</td>
                  <td className="py-3 font-mono text-slate-500 dark:text-slate-400">{log.algorithm}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
