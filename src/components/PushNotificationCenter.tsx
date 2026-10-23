import React, { useState } from 'react';
import { 
  Bell, 
  BellRing, 
  CheckCheck, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Trophy, 
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Language, PushNotificationItem } from '../types';
import { translations } from '../i18n/translations';

interface PushNotificationCenterProps {
  notifications: PushNotificationItem[];
  onMarkAllRead: () => void;
  onClearNotification: (id: string) => void;
  onAddNotification: (item: Omit<PushNotificationItem, 'id' | 'date'>) => void;
  lang: Language;
}

export const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({
  notifications,
  onMarkAllRead,
  onClearNotification,
  onAddNotification,
  lang,
}) => {
  const t = translations[lang];
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [testSentNotice, setTestSentNotice] = useState<string | null>(null);

  const [preferences, setPreferences] = useState({
    yields: true,
    progress: true,
    worldCupAlerts: true,
    security: true,
  });

  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setBrowserPermission(perm);
        if (perm === 'granted') {
          new Notification('Inversión FIFA 2030', {
            body: '¡Notificaciones push activadas! Te avisaremos con cada avance de tu ahorro hacia el Mundial.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error('Push permission error', err);
      }
    }
  };

  const handleSendTestPush = (type: 'yield' | 'progress' | 'milestone') => {
    let title = '';
    let message = '';

    if (type === 'yield') {
      title = '¡Rendimiento Acreditado!';
      message = 'Tu fondo generó +$42.50 USD este periodo gracias a la tasa de interés compuesto activa.';
    } else if (type === 'milestone') {
      title = '¡Hito del 50% Alcanzado!';
      message = '¡Felicidades! Ya tienes la mitad del costo de tu viaje a la Gran Final del Mundial 2030 asegurado.';
    } else {
      title = 'Progreso de Ahorro en Rumbo';
      message = 'Tu meta hacia los estadios de Madrid y Lisboa va 18 días adelantada al cronograma.';
    }

    onAddNotification({
      title,
      message,
      read: false,
      type
    });

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico'
        });
      } catch {
        // Ignored in sandbox
      }
    }

    setTestSentNotice(`Notificación "${title}" enviada.`);
    setTimeout(() => setTestSentNotice(null), 3000);
  };

  const getIconForType = (type: PushNotificationItem['type']) => {
    switch (type) {
      case 'yield':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'milestone':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner / Permission Bar */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2 border border-blue-500/25 backdrop-blur-md">
            <BellRing className="w-3.5 h-3.5" />
            <span>Sistema Web Push & In-App Alertas</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {t.notificationsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            {t.notificationsDesc}
          </p>
        </div>

        {/* Push Device Status Button */}
        <div className="relative z-10">
          {browserPermission === 'granted' ? (
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 backdrop-blur-md text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{t.pushActive}</span>
            </div>
          ) : (
            <button
              onClick={requestPushPermission}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 backdrop-blur-md transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>{t.enablePush}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Notifications Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Bell className="w-5 h-5 text-blue-500 mr-2" />
              Bandeja de Actualizaciones ({notifications.length})
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 mr-1" />
                {t.markAllRead}
              </button>
            )}
          </div>

          {/* List */}
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>{t.noNotifications}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 backdrop-blur-md ${
                    notif.read
                      ? 'bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5'
                      : 'bg-blue-500/10 dark:bg-white/10 border-blue-500/30 shadow-md ring-1 ring-blue-500/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/10 border border-slate-200/60 dark:border-white/10 flex-shrink-0 mt-0.5 backdrop-blur-md">
                      {getIconForType(notif.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1.5 font-medium">
                        {notif.date}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onClearNotification(notif.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="Eliminar notificación"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Triggers & Preferences (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulation Push Triggers */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <Send className="w-4 h-4 text-blue-500 mr-2" />
              Probar Disparadores de Notificación
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Genera eventos en vivo para simular el comportamiento que experimentarán los clientes conforme avanzan hacia el Mundial 2030:
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => handleSendTestPush('yield')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10 backdrop-blur-md text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Corte de Rendimiento Acreditado</span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Disparar</span>
              </button>

              <button
                onClick={() => handleSendTestPush('milestone')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10 backdrop-blur-md text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Hito de Meta (50% Alcanzado)</span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Disparar</span>
              </button>

              <button
                onClick={() => handleSendTestPush('progress')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10 backdrop-blur-md text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Aviso de Aportación Programada</span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Disparar</span>
              </button>
            </div>

            {testSentNotice && (
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center animate-fade-in pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                {testSentNotice}
              </p>
            )}
          </div>

          {/* User Push Preferences */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Preferencias de Suscripción Push
            </h3>

            <div className="space-y-3.5 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/30 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Rendimientos y Ganancias de Capital
                </span>
                <input
                  type="checkbox"
                  checked={preferences.yields}
                  onChange={(e) => setPreferences({ ...preferences, yields: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/30 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Hitos de Meta hacia el Mundial 2030
                </span>
                <input
                  type="checkbox"
                  checked={preferences.progress}
                  onChange={(e) => setPreferences({ ...preferences, progress: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/30 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Información Oficial de Sedes y Boletos
                </span>
                <input
                  type="checkbox"
                  checked={preferences.worldCupAlerts}
                  onChange={(e) => setPreferences({ ...preferences, worldCupAlerts: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/30 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Alertas de Cifrado y Auditoría de Seguridad
                </span>
                <input
                  type="checkbox"
                  checked={preferences.security}
                  onChange={(e) => setPreferences({ ...preferences, security: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
