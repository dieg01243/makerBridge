import Icon from './Icon'

export const COMMISSION_RATE = 0.05

// 27075 -> '$ 27.075 ARS'
export const formatARS = (n) => `$ ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ARS`

export default function PriceField({ value, onChange }) {
  const price = parseInt(value, 10) || 0
  const commission = Math.round(price * COMMISSION_RATE)
  const net = price - commission

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="precio-cotizado" className="text-xs sm:text-sm font-bold text-gray-900">
        Presupuesto total a cotizar ($ ARS)
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-base font-bold text-gray-400 font-mono">$</span>
        <input
          id="precio-cotizado"
          name="precio"
          type="text"
          inputMode="numeric"
          placeholder="28500"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          className="w-full pl-8 pr-16 py-2.5 bg-white border border-[#ECDDC7] text-gray-900 text-base font-bold font-mono rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E06D53] focus:border-brand-primary shadow-sm transition-all"
        />
        <span className="absolute right-3.5 text-xs font-bold text-gray-400 font-mono uppercase">ARS</span>
      </div>
    </div>
  )
}
