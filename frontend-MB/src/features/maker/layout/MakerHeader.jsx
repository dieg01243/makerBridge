import Icon from '../components/Icon'

const navLinks = [
  { label: 'Explorar Pedidos', href: '#', active: true },
  { label: 'Mis trabajos', href: '#' },
]

export default function MakerHeader({ user = { initials: 'CD', name: 'Carlos Duarte' } }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#eee7dc]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-md shadow-brand-primary/25 transition-transform group-hover:scale-105">
              <Icon name="view_in_ar" className="text-[24px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[20px] tracking-tight text-[#1c1917] leading-none">MakerBridge</span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#a8a29e] uppercase mt-0.5">
                3D PRINTING NETWORK
              </span>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(({ label, href, active }) => (
              <a
                key={label}
                href={href}
                className={
                  active
                    ? 'text-[14px] font-bold text-brand-primary border-b-2 border-brand-primary pb-1 pt-1'
                    : 'text-[14px] font-medium text-[#78716c] hover:text-brand-primary transition-colors'
                }
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Usuario */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 pl-2 cursor-pointer border-l border-[#ede3d8]">
            <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user.initials}
            </div>
            <span className="hidden md:inline font-semibold text-[14px] text-[#292524]">{user.name}</span>
            <Icon name="expand_more" className="text-[#78716c] text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  )
}
