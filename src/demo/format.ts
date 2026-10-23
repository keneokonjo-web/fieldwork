import type { ListingType, Property, PropertyStatus } from '@/demo/data';

export const formatPrice = (p: Pick<Property, 'price' | 'listing'>) => `£${p.price.toLocaleString('en-GB')}${p.listing === 'rent' ? ' pcm' : ''}`;

export const statusLabel = (listing: ListingType, status: PropertyStatus): string => {
  if (listing === 'sale') return status === 'available' ? 'For sale' : status === 'reserved' ? 'Reserved' : 'Sold';
  return status === 'available' ? 'To let' : status === 'reserved' ? 'Reserved' : 'Let agreed';
};
export const STATUS_OPTIONS: Record<ListingType, { value: PropertyStatus; label: string }[]> = {
  sale: [{ value: 'available', label: 'For sale' }, { value: 'reserved', label: 'Reserved' }, { value: 'sold', label: 'Sold' }],
  rent: [{ value: 'available', label: 'To let' }, { value: 'reserved', label: 'Reserved' }, { value: 'let', label: 'Let agreed' }],
};
export const isOpen = (p: Property) => p.status === 'available';
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'property';
