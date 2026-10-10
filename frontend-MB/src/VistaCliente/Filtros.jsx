import { useState } from 'react';

const statusFilters = [
  { id: 'all', label: 'Todas', count: 3 },
  { id: 'printing', label: 'En impresión', count: 1 },
  { id: 'preparing', label: 'En preparación', count: 1 },
  { id: 'delivered', label: 'Entregado', count: 1 },
];

const technologies = ['FDM', 'SLA', 'SLS'];

export default function Filtros() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTech, setSelectedTech] = useState('FDM');
  const [dateFrom, setDateFrom] = useState('2025-02-01');
  const [dateTo, setDateTo] = useState('2025-03-15');

  return (
    <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
      <div className="bg-brand-card rounded-2xl border border-stone-200 shadow-soft p-5 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-brand-coral"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <h2 className="text-sm font-bold tracking-tight text-brand-slate uppercase">
              Filtros
            </h2>
          </div>
          <button className="text-xs text-brand-blue hover:text-brand-blue-dark font-medium transition-colors">
            Restablecer
          </button>
        </div>

        {/* Date filter */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            Fecha de entrega
          </label>
          <div className="space-y-2">
            <div>
              <span className="block text-[11px] font-medium text-brand-muted mb-1">
                Desde:
              </span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-brand-slate focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition"
              />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-brand-muted mb-1">
                Hasta:
              </span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-brand-slate focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition"
              />
            </div>
          </div>
        </div>

        {/* Status filter */}
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            Estado de solicitud
          </label>
          <div className="space-y-1.5">
            {statusFilters.map((status) => {
              const isChecked = selectedStatus === status.id;
              return (
                <label
                  key={status.id}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer font-medium text-xs text-brand-slate transition ${
                    isChecked
                      ? 'bg-stone-100/70'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="order-status"
                      checked={isChecked}
                      onChange={() => setSelectedStatus(status.id)}
                      className="text-brand-slate focus:ring-brand-blue rounded-full border-stone-300"
                    />
                    <span>{status.label}</span>
                  </span>
                  <span
                    className={`text-[11px] font-semibold text-brand-muted px-2 py-0.5 rounded-full ${
                      isChecked ? 'bg-stone-200/60' : 'bg-stone-100'
                    }`}
                  >
                    {status.count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Technology filter */}
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            Tecnología 3D
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {technologies.map((tech) => {
              const isActive = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  className={`py-1.5 px-2 text-center rounded-lg border font-medium transition ${
                    isActive
                      ? 'border-brand-blue bg-blue-50/60 font-semibold text-brand-blue-dark'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tip */}
        <div className="p-3 bg-brand-sage-light/60 border border-brand-sage/50 rounded-xl text-xs space-y-1">
          <p className="font-bold text-stone-800 flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-emerald-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Garantía de Calidad
          </p>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Todos los pedidos cuentan con inspección dimensional y aprobación
            fotográfica previa al despacho.
          </p>
        </div>
      </div>
    </aside>
  );
}