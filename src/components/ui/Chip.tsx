export function StatusChip({ status }: { status: 'available' | 'planned' | 'neutral'; children?: never }) {
  const label = status === 'available' ? 'Available now' : status === 'planned' ? 'Planned, not yet available' : '';
  return <span className={`chip chip--${status}`}>{label}</span>;
}
export function Chip({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'available' | 'planned' | 'neutral' }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}
