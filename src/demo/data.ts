/**
 * Demonstration data for "Larkfield & Pryce", a fictional London estate agency created by Fieldwork to show a website with a
 * self-managed listing system. Every company, person, address, price and property here is made up. Nothing is for sale.
 */
export type ListingType = 'sale' | 'rent';
export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'let';

export interface Property {
  id: string;
  title: string;
  headline: string;
  listing: ListingType;
  status: PropertyStatus;
  /** Published listings show on the public site. Drafts do not. */
  published: boolean;
  featured: boolean;
  propertyType: string;
  price: number;
  beds: number;
  baths: number;
  receptions: number;
  sqft: number;
  address: string;
  area: string;
  postcode: string;
  description: string;
  features: string[];
  tenure: string;
  epc: string;
  /** Photograph keys from the image register, or uploaded images as data URLs. The first is the cover. */
  images: string[];
  development?: string;
  added: string;
}

export const PROPERTY_TYPES = ['House', 'Townhouse', 'Flat', 'Penthouse', 'Villa', 'Cottage', 'Mews house', 'Maisonette'] as const;
export const AREAS = ['Kensington', 'Notting Hill', 'Clapham', 'Islington', 'Hampstead', 'Richmond', 'Greenwich', 'Chiswick', 'Shoreditch', 'Camden', 'Blackheath', 'Cobham', 'Cheltenham'] as const;

/** Photographs available in the listing editor's library. */
export const LIBRARY: { key: string; label: string }[] = [
  { key: 'prop-exterior-white', label: 'White modern house' },
  { key: 'prop-exterior-day', label: 'Modern house, daylight' },
  { key: 'prop-exterior-timber-dusk', label: 'Timber house at dusk' },
  { key: 'prop-exterior-black-dusk', label: 'Dark house at dusk' },
  { key: 'prop-villa-pool', label: 'Villa with pool' },
  { key: 'prop-modernist', label: 'Contemporary house' },
  { key: 'prop-block', label: 'Apartment block' },
  { key: 'uk-georgian', label: 'Georgian terrace' },
  { key: 'uk-london', label: 'Mansion block' },
  { key: 'uk-terrace', label: 'Brick terrace' },
  { key: 'uk-flats', label: 'New apartments' },
  { key: 'uk-newbuild', label: 'New homes' },
  { key: 'uk-suburb', label: 'Semi-detached house' },
  { key: 'home-living-light', label: 'Open-plan living room' },
  { key: 'home-living-premium', label: 'Living space' },
  { key: 'home-living-gallery', label: 'Living room, gallery wall' },
  { key: 'home-plants-living', label: 'Living room with plants' },
  { key: 'home-kitchen-white', label: 'White kitchen' },
  { key: 'home-kitchen-detail', label: 'Kitchen worktop' },
  { key: 'home-apartment-bright', label: 'Bright apartment' },
];

const added = (d: number) => new Date(Date.UTC(2026, 9, 23 - d)).toISOString();

const P = (p: Omit<Property, 'published' | 'featured' | 'headline' | 'tenure' | 'epc' | 'added'> & Partial<Pick<Property, 'published' | 'featured' | 'headline' | 'tenure' | 'epc' | 'added'>>): Property => ({
  published: true, featured: false, headline: '', tenure: p.listing === 'rent' ? 'Rental' : 'Freehold', epc: 'C', added: added(10), ...p,
});

export const SEED_PROPERTIES: Property[] = [
  P({ id: 'ashdown-mews-kensington', title: 'Ashdown House', headline: 'A white-walled family house behind a private gate', listing: 'sale', status: 'available', featured: true, propertyType: 'House', price: 4250000, beds: 5, baths: 4, receptions: 3, sqft: 3480, address: '7 Ashdown Mews', area: 'Kensington', postcode: 'W8 5QD', epc: 'B',
    description: 'Ashdown House is a calm, light-filled family home set back from the street behind a private gate.\n\nA double-height entrance leads to an open kitchen and dining room that runs the width of the house and opens onto a walled garden. Upstairs, five bedrooms each have their own bathroom, and the principal suite has a dressing room and a private terrace.\n\nIt is a short walk from the park, good schools and two Underground stations.',
    features: ['Walled garden', 'Underfloor heating', 'Private gated parking', 'Principal suite with terrace', 'Cinema room', 'Smart home wiring'], images: ['prop-exterior-white', 'home-living-premium', 'home-kitchen-white', 'home-living-light'], added: added(2) }),
  P({ id: 'elm-terrace-south-kensington', title: 'Elm Terrace', headline: 'A stucco townhouse on a quiet crescent', listing: 'sale', status: 'available', featured: true, propertyType: 'Townhouse', price: 5950000, beds: 5, baths: 4, receptions: 3, sqft: 4120, address: '22 Elm Terrace', area: 'Kensington', postcode: 'SW7 3HP', epc: 'D', tenure: 'Freehold',
    description: 'A handsome Georgian-style townhouse of five floors on one of the area\'s quietest crescents.\n\nThe original proportions have been kept: tall sash windows, a sweeping staircase and a double reception on the first floor. A lower-ground kitchen opens to a south-facing garden.\n\nElm Terrace is moments from the museums and the park.',
    features: ['South-facing garden', 'Lift to all floors', 'Original cornicing', 'Wine cellar', 'Roof terrace'], images: ['uk-georgian', 'home-living-gallery', 'home-kitchen-detail', 'home-plants-living'], added: added(4) }),
  P({ id: 'wexford-mansions-clerkenwell', title: 'Flat 12, Wexford Mansions', headline: 'A red-brick mansion flat above a private garden', listing: 'sale', status: 'available', featured: true, propertyType: 'Flat', price: 925000, beds: 2, baths: 2, receptions: 1, sqft: 1040, address: 'Flat 12, Wexford Mansions', area: 'Islington', postcode: 'EC1R 4TL', tenure: 'Leasehold (112 years)',
    description: 'A bright two-bedroom flat in a landmark red-brick mansion block, overlooking communal gardens.\n\nHigh ceilings and tall windows give the living room a generous feel, and the kitchen has been fitted with stone worktops and integrated appliances.\n\nThere is a porter on weekdays, a bike store, and the area\'s restaurants and markets on the doorstep.',
    features: ['Overlooks communal gardens', 'Porter on weekdays', 'High ceilings', 'Bike store', 'Share of freehold'], images: ['uk-london', 'home-apartment-bright', 'home-kitchen-white'], added: added(6) }),
  P({ id: 'the-forge-shoreditch', title: 'Apartment 604, The Forge', headline: 'A sixth-floor apartment with a long city view', listing: 'sale', status: 'available', propertyType: 'Flat', price: 780000, beds: 2, baths: 2, receptions: 1, sqft: 860, address: 'Apartment 604, The Forge', area: 'Shoreditch', postcode: 'E1 6AN', tenure: 'Leasehold (240 years)', epc: 'B',
    description: 'A clean-lined two-bedroom apartment on the sixth floor of a modern block, with floor-to-ceiling windows and a wide balcony.\n\nResidents share a gym, a quiet courtyard garden and a concierge desk.',
    features: ['Balcony', 'Concierge', 'Residents\' gym', 'Underfloor heating'], images: ['prop-block', 'home-living-light', 'home-kitchen-detail'], added: added(8) }),
  P({ id: 'hollin-lodge-hampstead', title: 'Hollin Lodge', headline: 'A timber-clad house among the trees', listing: 'sale', status: 'available', featured: true, propertyType: 'House', price: 3450000, beds: 4, baths: 3, receptions: 2, sqft: 2860, address: 'Hollin Lodge, Heathside', area: 'Hampstead', postcode: 'NW3 7RB', epc: 'B',
    description: 'Hollin Lodge sits among mature trees close to the Heath. Warm timber cladding gives way to a calm, glazed interior with a double-height living room and a kitchen that opens onto a deck.\n\nFour bedrooms, a study and a garden room make it equally good for a family or for working from home.',
    features: ['Close to the Heath', 'Double-height living room', 'Deck and lawn', 'Study and garden room', 'Electric car charging'], images: ['prop-exterior-timber-dusk', 'home-plants-living', 'home-living-gallery', 'home-kitchen-white'], added: added(3) }),
  P({ id: 'pinewood-house-cobham', title: 'Pinewood House', headline: 'A pool house for long summers', listing: 'sale', status: 'available', featured: true, propertyType: 'Villa', price: 5200000, beds: 6, baths: 5, receptions: 4, sqft: 5600, address: 'Pinewood House, Fairmile Lane', area: 'Cobham', postcode: 'KT11 2DL', epc: 'C',
    description: 'A contemporary six-bedroom house in about an acre of grounds, built around a heated outdoor pool.\n\nLiving spaces open fully to the terrace, there is a separate guest annexe, and a games room and gym sit beside the pool house.',
    features: ['Heated outdoor pool', 'Guest annexe', 'About one acre', 'Gym and games room', 'Triple garage'], images: ['prop-villa-pool', 'home-living-light', 'home-living-premium', 'home-kitchen-white'], added: added(5) }),
  P({ id: 'larch-court-richmond', title: 'Larch Court', headline: 'A contemporary family home near the river', listing: 'sale', status: 'available', propertyType: 'House', price: 2750000, beds: 4, baths: 3, receptions: 2, sqft: 2490, address: '3 Larch Court', area: 'Richmond', postcode: 'TW10 6QX', epc: 'B',
    description: 'A four-bedroom contemporary house with a sheltered courtyard garden, a short walk from the river and the town centre.',
    features: ['Courtyard garden', 'Off-street parking', 'Walk to the river'], images: ['prop-modernist', 'home-living-gallery', 'home-kitchen-detail'], added: added(9) }),
  P({ id: 'the-black-house-clapham', title: 'The Black House', headline: 'A dark, dramatic house by the common', listing: 'sale', status: 'reserved', propertyType: 'House', price: 2150000, beds: 3, baths: 3, receptions: 2, sqft: 1980, address: '41 Seldon Road', area: 'Clapham', postcode: 'SW4 9NE', epc: 'B',
    description: 'A three-bedroom house in charred timber and glass, overlooking the common. A reservation has been agreed.',
    features: ['Overlooks the common', 'Roof terrace', 'Charging point'], images: ['prop-exterior-black-dusk', 'home-living-premium', 'home-kitchen-white'], added: added(12) }),
  P({ id: 'highfield-blackheath', title: 'Highfield', headline: 'A sunlit house on the edge of the heath', listing: 'sale', status: 'sold', propertyType: 'House', price: 1850000, beds: 4, baths: 2, receptions: 2, sqft: 2210, address: '15 Highfield Road', area: 'Blackheath', postcode: 'SE3 0HX', epc: 'C',
    description: 'A four-bedroom house with a long garden, close to the heath and the village.', features: ['Long garden', 'Near the heath'], images: ['prop-exterior-day', 'home-living-light', 'home-kitchen-detail'], added: added(30) }),
  P({ id: 'orchard-lane-cheltenham', title: '19 Orchard Lane', headline: 'A well-kept semi in a leafy lane', listing: 'sale', status: 'available', propertyType: 'House', price: 645000, beds: 3, baths: 2, receptions: 2, sqft: 1420, address: '19 Orchard Lane', area: 'Cheltenham', postcode: 'GL52 6QB', epc: 'C',
    description: 'A three-bedroom semi-detached house with a south-facing garden and a garage, in a quiet lane close to good schools.', features: ['South-facing garden', 'Garage', 'Close to schools'], images: ['uk-suburb', 'home-living-gallery', 'home-kitchen-white'], added: added(7) }),
  P({ id: 'marlowe-house-islington', title: 'Flat 3, Marlowe House', headline: 'A bright two-bedroom flat near the canal', listing: 'rent', status: 'available', propertyType: 'Flat', price: 3450, beds: 2, baths: 1, receptions: 1, sqft: 810, address: 'Flat 3, Marlowe House', area: 'Islington', postcode: 'N1 8PL', tenure: 'Available furnished or unfurnished', epc: 'C',
    description: 'A light two-bedroom flat on the second floor, with a modern kitchen and a short walk to the canal and two Underground lines.', features: ['Furnished or unfurnished', 'Close to the canal', 'Bike storage'], images: ['home-apartment-bright', 'home-living-light', 'home-kitchen-detail'], added: added(1) }),
  P({ id: 'cranmere-road-chiswick', title: 'Garden flat, Cranmere Road', headline: 'A garden flat with its own entrance', listing: 'rent', status: 'available', propertyType: 'Flat', price: 2900, beds: 2, baths: 1, receptions: 1, sqft: 880, address: '8a Cranmere Road', area: 'Chiswick', postcode: 'W4 3RT', tenure: 'Unfurnished', epc: 'C',
    description: 'A ground-floor garden flat with its own front door and a private lawned garden, a few minutes from the high street.', features: ['Private garden', 'Own entrance', 'Pets considered'], images: ['home-living-premium', 'home-plants-living', 'home-kitchen-white'], added: added(2) }),
  P({ id: 'quarry-row-camden', title: '4 Quarry Row', headline: 'A three-bedroom terrace by the canal', listing: 'rent', status: 'let', propertyType: 'House', price: 4200, beds: 3, baths: 2, receptions: 1, sqft: 1380, address: '4 Quarry Row', area: 'Camden', postcode: 'NW1 9AB', tenure: 'Unfurnished', epc: 'D',
    description: 'A three-bedroom brick terrace with a small courtyard garden. Let agreed.', features: ['Courtyard garden', 'Close to the canal'], images: ['uk-terrace', 'home-living-gallery', 'home-kitchen-detail'], added: added(15) }),
  // The Wharf development: units are ordinary listings linked to a development
  P({ id: 'the-wharf-unit-1', title: 'The Wharf, Unit 1.04', headline: 'One-bedroom apartment', listing: 'sale', status: 'available', propertyType: 'Flat', price: 495000, beds: 1, baths: 1, receptions: 1, sqft: 560, address: 'Unit 1.04, The Wharf', area: 'Greenwich', postcode: 'SE10 9AA', tenure: 'Leasehold (999 years)', epc: 'B', development: 'the-wharf',
    description: 'A one-bedroom apartment on the first floor of The Wharf, with a river-facing balcony.', features: ['River-facing balcony', 'Residents\' lounge', 'Cycle store'], images: ['home-apartment-bright', 'uk-flats', 'home-kitchen-detail'], added: added(3) }),
  P({ id: 'the-wharf-unit-2', title: 'The Wharf, Unit 2.11', headline: 'Two-bedroom apartment', listing: 'sale', status: 'available', propertyType: 'Flat', price: 685000, beds: 2, baths: 2, receptions: 1, sqft: 830, address: 'Unit 2.11, The Wharf', area: 'Greenwich', postcode: 'SE10 9AA', tenure: 'Leasehold (999 years)', epc: 'B', development: 'the-wharf',
    description: 'A two-bedroom, two-bathroom apartment on the second floor, with an open kitchen and wide windows onto the water.', features: ['Two bathrooms', 'Open kitchen', 'Residents\' gym'], images: ['home-living-light', 'uk-flats', 'home-kitchen-white'], added: added(3) }),
  P({ id: 'the-wharf-unit-3', title: 'The Wharf, Unit 3.07', headline: 'Two-bedroom apartment with terrace', listing: 'sale', status: 'reserved', propertyType: 'Flat', price: 715000, beds: 2, baths: 2, receptions: 1, sqft: 880, address: 'Unit 3.07, The Wharf', area: 'Greenwich', postcode: 'SE10 9AA', tenure: 'Leasehold (999 years)', epc: 'B', development: 'the-wharf',
    description: 'A two-bedroom apartment on the third floor with a private terrace. Reserved.', features: ['Private terrace', 'Two bathrooms'], images: ['home-living-premium', 'uk-flats', 'home-kitchen-white'], added: added(3) }),
  P({ id: 'the-wharf-penthouse', title: 'The Wharf, Penthouse', headline: 'Three-bedroom penthouse', listing: 'sale', status: 'sold', propertyType: 'Penthouse', price: 1250000, beds: 3, baths: 3, receptions: 2, sqft: 1480, address: 'Penthouse, The Wharf', area: 'Greenwich', postcode: 'SE10 9AA', tenure: 'Leasehold (999 years)', epc: 'A', development: 'the-wharf',
    description: 'The top-floor penthouse, with a wraparound terrace and panoramic river views.', features: ['Wraparound terrace', 'Panoramic views'], images: ['home-living-gallery', 'uk-flats', 'home-kitchen-detail'], added: added(3) }),
];

export interface Development { slug: string; name: string; area: string; summary: string; description: string; image: string; completion: string }
export const DEVELOPMENTS: Development[] = [
  { slug: 'the-wharf', name: 'The Wharf', area: 'Greenwich', summary: 'Riverside apartments with residents\' lounge, gym and cycle store.', completion: 'Completing summer 2027', image: 'uk-flats',
    description: 'The Wharf is a collection of apartments on the Greenwich waterfront, from one-bedroom homes to a three-bedroom penthouse. Each has a balcony or terrace, and residents share a lounge, a gym and secure cycle storage. A short walk takes you to the river path, the market and the Underground.' },
];

export interface Post { slug: string; title: string; date: string; category: string; image: string; excerpt: string; body: string[] }
export const POSTS: Post[] = [
  { slug: 'preparing-a-home-for-sale', title: 'Preparing a home for sale: a simple checklist', date: '2026-10-14', category: 'Selling', image: 'home-living-light', excerpt: 'Small, inexpensive jobs that make a home easier to love and easier to photograph.',
    body: ['Buyers decide quickly, so start with the first impression: a clean entrance, a clear hallway and good light. Tidy surfaces, put away personal clutter and make sure every bulb works.', 'Next, gather the paperwork a buyer\'s solicitor will ask for: guarantees, certificates and any planning documents. Having them ready speeds up the whole sale.', 'Finally, agree a photography date. Good photographs are the single most useful thing in a listing, so pick a bright morning and let us arrange the rest.'] },
  { slug: 'renting-in-london-what-to-have-ready', title: 'Renting in London: what to have ready', date: '2026-10-02', category: 'Renting', image: 'home-apartment-bright', excerpt: 'The documents and decisions that make a tenancy move faster.',
    body: ['Good rentals move quickly. Before you start viewing, gather proof of identity, proof of income and your landlord references.', 'Decide your budget including bills, and your ideal move date. Tell us if you have pets, or need the flat furnished.', 'When you find the right home, we can confirm the details and agree the next steps the same day.'] },
  { slug: 'new-homes-what-to-ask-before-you-reserve', title: 'New homes: what to ask before you reserve', date: '2026-09-20', category: 'Buying', image: 'uk-newbuild', excerpt: 'Questions worth asking about a new development before you commit.',
    body: ['Ask for the expected completion date and what happens if it moves. Ask what is included in the price and what is extra.', 'Ask about the service charge, the ground rent and who manages the building. Ask to see the specification in writing.', 'Take the paperwork to your solicitor before you reserve, and keep every promise you are given in writing.'] },
  { slug: 'a-quiet-autumn-in-west-london', title: 'A quiet autumn in west London', date: '2026-09-08', category: 'Market notes', image: 'uk-georgian', excerpt: 'What we are hearing from buyers and sellers this season.',
    body: ['This is a short, personal note, not a market report. We are speaking with buyers who are prepared and sellers who are realistic about price.', 'Homes with good light, good outside space and honest pricing are attracting the most interest.', 'If you are thinking of selling, a conversation costs nothing. We will tell you what we would do in your position.'] },
];

export const TEAM = [
  { name: 'Eleanor Pryce', role: 'Founding Partner' },
  { name: 'James Larkfield', role: 'Sales Director' },
  { name: 'Amara Okoye', role: 'Head of Lettings' },
  { name: 'Tom Hadley', role: 'Valuations' },
];

export const BRAND = { name: 'Larkfield & Pryce', short: 'Larkfield & Pryce', tagline: 'Estate agents and lettings, London', phone: '020 7946 0182', email: 'hello@larkfieldpryce.example', address: '14 Cavendish Mews, London W1G 0AA' };
