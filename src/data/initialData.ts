import { 
  DesignCategory, 
  DesignItem, 
  ServiceItem, 
  ProjectItem, 
  SiteVisitBooking, 
  EnquiryItem, 
  CustomerReview, 
  FAQItem, 
  HomePageContent, 
  CompanyInfo, 
  ServiceArea,
  AppNotification
} from '../types';

export const initialCategories: DesignCategory[] = [
  {
    id: 'cat-1',
    slug: 'metallic-marble',
    name: 'Metallic & Resin Marble',
    shortDesc: 'Deep liquid swirl with pearlescent metallic pigments mimicking exotic Italian & exotic natural marbles.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Luxury Signature',
    totalDesigns: 6
  },
  {
    id: 'cat-2',
    slug: '2d-flooring',
    name: '2D Designer Epoxy Flooring',
    shortDesc: 'Seamless graphic inlays, Moroccan geometrics, and precision patterned floors for timeless modern spaces.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular Choice',
    totalDesigns: 5
  },
  {
    id: 'cat-3',
    slug: '3d-flooring',
    name: '3D Epoxy Flooring',
    shortDesc: 'Hyper-realistic optical illusion and depth floors transforming bathrooms, lobbies, and luxury master bedrooms.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ultra Premium',
    totalDesigns: 6
  },
  {
    id: 'cat-4',
    slug: 'wall-art',
    name: 'Resin Wall Art & Cladding',
    shortDesc: 'Handcrafted geode murals, metallic waves, liquid marble feature walls, and illuminated stone veneers.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    badge: 'Artisan Bespoke',
    totalDesigns: 5
  },
  {
    id: 'cat-5',
    slug: 'staircase',
    name: 'Designer Epoxy Staircase',
    shortDesc: 'Live-edge river wood steps, seamless waterfall marble treads with anti-skid transparent grip finishes.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    badge: 'Architectural',
    totalDesigns: 4
  },
  {
    id: 'cat-6',
    slug: 'ceiling',
    name: 'Resin Ceiling & Domes',
    shortDesc: 'Backlit translucent onyx panels, celestial cosmic starlight domes, and atmospheric optical sky ceilings.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    badge: 'Illuminated Finishes',
    totalDesigns: 4
  },
  {
    id: 'cat-7',
    slug: 'commercial-industrial',
    name: 'Commercial & Industrial Epoxy',
    shortDesc: 'Heavy-duty high traffic resistance, chemical-proof, anti-bacterial, ESD safe, and corporate logo integration.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    badge: 'Heavy Duty Grade',
    totalDesigns: 4
  }
];

export const initialDesigns: DesignItem[] = [
  // Metallic & Resin Marble
  {
    id: 'des-me-01',
    code: 'ME-01',
    name: 'Italian Royal Marble',
    category: 'metallic-marble',
    subType: 'Metallic',
    description: 'High-gloss Italian Carrara and Calacatta vein reproduction with deep gold and charcoal crystal pigments embedded in crystal-clear resin matrix.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    suitableLocations: ['Living Room', 'Luxury Lobby', 'Master Bedroom', 'Executive Suite'],
    features: ['Mirror Glass High-Gloss Finish', 'Seamless Monolithic Floor', 'Stain & Chemical Proof', 'UV Stable Crystal Topcoat'],
    minRate: 350,
    maxRate: 550,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'des-me-02',
    code: 'ME-02',
    name: 'Ocean Breeze',
    category: 'metallic-marble',
    subType: 'Metallic',
    description: 'Breathtaking Caribbean azure and deep sapphire swirls layered over shimmering mother-of-pearl metallic veins.',
    mainImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Spa & Wellness', 'Bathroom Suites', 'Boutique Showroom', 'Villa Living'],
    features: ['Multi-Depth Layering', '100% Waterproof Sealing', 'Zero Tile Grout Lines', 'Gentle Thermal Comfort'],
    minRate: 380,
    maxRate: 580,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-12'
  },
  {
    id: 'des-me-03',
    code: 'ME-03',
    name: 'Midnight Galaxy',
    category: 'metallic-marble',
    subType: 'Metallic',
    description: 'Deep obsidian black base intertwined with interstellar silver stardust, subtle purple undertones, and shimmering mica flakes.',
    mainImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Home Theatre', 'Cocktail Lounge', 'Master Suite', 'Modern Office'],
    features: ['Diamond Tough Surface', 'Scratch Resistant Polyaspartic', 'Reflective Depth Effect', 'Custom Metallic Density'],
    minRate: 400,
    maxRate: 620,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'des-me-04',
    code: 'ME-04',
    name: 'Copper & Charcoal Swirl',
    category: 'metallic-marble',
    subType: 'Metallic',
    description: 'Warm Venetian burnished copper veins flowing smoothly over charcoal and anthracite textured gradients.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Dining Room', 'Hotel Reception', 'Jewelry Showroom', 'Modern Kitchen'],
    features: ['Rich Earthy Luster', 'Thermal Shock Tolerant', 'High Impact Grade', 'Seamless Wall-to-Floor Transition'],
    minRate: 360,
    maxRate: 540,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-18'
  },

  // 2D Epoxy Flooring
  {
    id: 'des-2d-04',
    code: '2D-FL-04',
    name: 'Moroccan Tiles Pattern',
    category: '2d-flooring',
    subType: '2D',
    description: 'Precision stencil and hand-inlaid royal Andalusian and Moroccan geometric tiles embedded seamlessly beneath crystal clear self-leveling resin.',
    mainImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Kitchen & Pantry', 'Balcony / Veranda', 'Boutique Cafe', 'Courtyard Entry'],
    features: ['No Dirty Grout Lines Forever', 'Slip-Resistant Satin or Gloss', 'Custom Stencil Sizing', 'Easy Wipe Clean'],
    minRate: 280,
    maxRate: 420,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-20'
  },
  {
    id: 'des-2d-05',
    code: '2D-FL-05',
    name: 'Golden Inlay Geometry',
    category: '2d-flooring',
    subType: '2D',
    description: 'Art Deco inspired precision brass and metallic gold geometric gridlines inlaid on satin cream or matte graphite base.',
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Living Room', 'Dining Area', 'Luxury Foyer', 'Penthouse Lobby'],
    features: ['High-Precision Laser Cuts', 'Flush Seamless Topcoat', 'Heavy Foot Traffic Rated', 'Anti-Yellowing UV Armor'],
    minRate: 320,
    maxRate: 480,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-01-22'
  },

  // 3D Epoxy Flooring
  {
    id: 'des-3d-01',
    code: '3D-FL-01',
    name: 'Coral Underwater',
    category: '3d-flooring',
    subType: '3D',
    description: 'Ultra high-definition photorealistic marine coral reef, crystal-clear turquoise waters and swimming tropical fishes beneath a 3D lens epoxy topcoat.',
    mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Master Bathroom', 'Kids Play Area', 'Theme Lounge', 'Poolside Shower Room'],
    features: ['3D Optical Depth Effect', '100% Water Immersion Proof', 'Non-Slip Clear Micro-Bead Option', 'Zero Micro-Bubbles'],
    minRate: 450,
    maxRate: 750,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-25'
  },
  {
    id: 'des-3d-02',
    code: '3D-FL-02',
    name: 'Waterfall & Pebble River',
    category: '3d-flooring',
    subType: '3D',
    description: 'Stunning optical perspective of cascading river rapids, smooth polished river stones, and crystal clear water flow underfoot.',
    mainImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Balcony / Solarium', 'Guest Powder Room', 'Resort Corridor', 'Spa Entrance'],
    features: ['Immersive Perspective Viewing', 'Anti-Scratch Polyurethane Seal', 'Easy Maintenance', 'Eco-friendly Resin'],
    minRate: 480,
    maxRate: 780,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-01-27'
  },
  {
    id: 'des-3d-03',
    code: '3D-FL-03',
    name: '3D Depth Abyss',
    category: '3d-flooring',
    subType: '3D',
    description: 'Mesmerizing geometric spiral into endless atmospheric depth with glowing crystalline elements, perfect for modern statement architecture.',
    mainImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Nightclub Lounge', 'Gaming Room', 'Creative Studio', 'Modern Villa Foyer'],
    features: ['Deep Perspective Illusion', 'Reflective Gloss Finish', 'Heavy Static Load Capacity', 'Custom Artwork Integration'],
    minRate: 500,
    maxRate: 850,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-01-28'
  },

  // Wall Art & Cladding
  {
    id: 'des-wall-01',
    code: 'WALL-2D-01',
    name: 'Seamless Liquid Marble',
    category: 'wall-art',
    subType: '2D',
    description: 'Continuous vertical pour creating seamless liquid stone patterns across entire feature walls without a single tile joint.',
    mainImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['TV Background Wall', 'Master Bed Backsplash', 'Reception Wall', 'Conference Room'],
    features: ['Zero Joint Lines', 'Moisture & Mildew Proof', 'Custom Color Matching', 'Washable High-Gloss'],
    minRate: 350,
    maxRate: 550,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'des-wall-02',
    code: 'WALL-3D-02',
    name: 'Crystal Geode Mural',
    category: 'wall-art',
    subType: '3D',
    description: 'Hand-sculpted real quartz crystals, glass gems, and gold leaf ribbons embedded into shimmering colored resin geodes.',
    mainImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Luxury Living Room', 'Hotel Suite', 'Fine Jewelry Store', 'Executive Lounge'],
    features: ['Genuine Mineral & Crystal Inlays', '3D Sculpted Relief', 'Optional Backlight Channels', 'One-of-a-kind Masterpiece'],
    minRate: 650,
    maxRate: 1200,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-04'
  },
  {
    id: 'des-wall-03',
    code: 'WALL-3D-03',
    name: 'Embossed Metallic Wave',
    category: 'wall-art',
    subType: '3D',
    description: 'Textured dynamic waves with champagne gold, bronze, and titanium metallic shifting layers reflecting room lighting.',
    mainImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Dining Wall', 'Stairway Wall', 'Clubhouse', 'Villa Entrance'],
    features: ['Light-Reactive 3D Waves', 'Durable Acrylic Resin Mix', 'Scratch Resistant', 'Custom Dimensions'],
    minRate: 450,
    maxRate: 750,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-06'
  },

  // Designer Staircase
  {
    id: 'des-st-01',
    code: 'ST-01',
    name: 'Resin River Wood Steps',
    category: 'staircase',
    subType: 'Custom',
    description: 'Live-edge solid Teak or Walnut timber encapsulated with translucent turquoise, gold, or smokey resin river channels across stair treads.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Duplex Villas', 'Penthouse Stairwell', 'Modern Architectural Homes', 'Corporate HQs'],
    features: ['Solid Hardwood Core', 'Glass-Strength Resin Bond', 'Anti-Skid Clear Grip Finish', 'Custom Edge Profiles'],
    minRate: 2500,
    maxRate: 4500,
    unit: 'step',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'des-st-02',
    code: 'ST-02',
    name: 'Waterfall Marble Steps',
    category: 'staircase',
    subType: 'Metallic',
    description: 'Continuous seamless metallic epoxy pour flowing down treads and risers with unbroken Italian marble vein continuity.',
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Grand Spiral Stairs', 'Luxury Hotel Steps', 'Duplex Residences', 'Commercial Showrooms'],
    features: ['Continuous Vein Match', 'Riser + Tread Encapsulation', 'Integrated Anti-Slip Nose Grip', 'Impact Resilient'],
    minRate: 2000,
    maxRate: 3800,
    unit: 'step',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-12'
  },
  {
    id: 'des-st-03',
    code: 'ST-03',
    name: 'Night Glow Risers',
    category: 'staircase',
    subType: 'Glow',
    description: 'Photoluminescent mineral crystals embedded into staircase risers and edges that gently illuminate at night for safety and elegance.',
    mainImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Home Theatres', 'Villa Staircases', 'Outdoor Covered Steps', 'Night Venues'],
    features: ['Self-Charging Glow In Dark (8+ Hrs)', 'Anti-Skid Clear Micro-Texture', 'Zero Electricity Required', 'Smooth Rounded Safety Edges'],
    minRate: 2200,
    maxRate: 4000,
    unit: 'step',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-14'
  },

  // Resin Ceiling
  {
    id: 'des-cl-01',
    code: 'CL-01',
    name: 'Backlit Onyx Marble Sheet',
    category: 'ceiling',
    subType: 'Custom',
    description: 'Translucent composite resin onyx panels designed with LED diffuser channels for glowing ambient ceiling luxury.',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Dining Room Ceiling', 'Master Suite Island', 'Hotel Lobby Island', 'Conference Hall'],
    features: ['Lightweight Composite', 'Even Backlight Diffusion', 'Zero Sagging / Warping', 'Dimmable Ambiance Compatible'],
    minRate: 420,
    maxRate: 680,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-18'
  },
  {
    id: 'des-cl-02',
    code: 'CL-02',
    name: 'Starlight Cosmic Dome',
    category: 'ceiling',
    subType: '3D',
    description: 'Deep cosmic space nebulae with embedded fiber optic star points and metallic deep-space swirls.',
    mainImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Home Theatre', 'Master Bedroom Dome', 'Children Astronomy Room', 'Luxury Bar'],
    features: ['Fiber Optic Twinkle Integration', 'Deep Nebula Painting', 'Acoustic Backing Option', 'Custom Constellations'],
    minRate: 500,
    maxRate: 850,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-20'
  },
  {
    id: 'des-cl-03',
    code: 'CL-03',
    name: 'Natural Blue Sky',
    category: 'ceiling',
    subType: '3D',
    description: 'Serene blue sky with soft volumetric clouds and warm sunburst, giving subterranean and windowless spaces a feeling of natural open sunlight.',
    mainImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Basement Lounge', 'Spa Treatment Room', 'Hospitality Suites', 'Windowless Dining'],
    features: ['Circadian Light Friendly', 'Hyper-Realistic High Res Canvas', 'Dust & Humidity Resistant', 'Long-life Color Retention'],
    minRate: 380,
    maxRate: 600,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-22'
  },

  // Commercial & Industrial
  {
    id: 'des-com-01',
    code: 'COM-01',
    name: 'Heavy-Duty Self-Leveling Epoxy',
    category: 'commercial-industrial',
    subType: '2D',
    description: 'High-compressive strength 100% solids epoxy flooring engineered for warehouse, factory, and heavy automotive traffic.',
    mainImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Manufacturing Plant', 'Commercial Garage', 'Distribution Center', 'Automotive Workshop'],
    features: ['Shore D Hardness 85+', 'Forklift & Heavy Vehicle Rated', 'Chemical & Oil Resistant', 'Seamless Hygienic Surface'],
    minRate: 150,
    maxRate: 280,
    unit: 'sq.ft.',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-25'
  },
  {
    id: 'des-com-02',
    code: 'COM-02',
    name: 'Terrazzo Epoxy System',
    category: 'commercial-industrial',
    subType: 'Terrazzo',
    description: 'Polished epoxy binder with marble chips, granite granules, mother of pearl and mirrored glass aggregates.',
    mainImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Airports', 'Shopping Malls', 'Hospitals', 'University Campus', 'Hotel Lobbies'],
    features: ['40+ Year Lifespan', 'Endless Color Combinations', 'Ultra Low Maintenance Cost', 'Crack Resistant Flexibility'],
    minRate: 450,
    maxRate: 750,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-26'
  },
  {
    id: 'des-com-03',
    code: 'COM-03',
    name: '3D Corporate Logo Flooring',
    category: 'commercial-industrial',
    subType: '3D',
    description: 'Custom corporate emblem and branding embedded beneath an ultra-tough industrial clear polyaspartic wear layer.',
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Corporate Headquarters', 'Dealership Showrooms', 'Gym & Fitness Centers', 'Brand Boutiques'],
    features: ['Precision Laser Printed Emblem', 'Zero Edge Peeling', 'Resistant to High Footfall', 'Glossy Brand Representation'],
    minRate: 350,
    maxRate: 550,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-27'
  },
  {
    id: 'des-com-04',
    code: 'COM-04',
    name: 'Anti-Bacterial & ESD Floor',
    category: 'commercial-industrial',
    subType: 'Custom',
    description: 'Electrostatic dissipative (ESD) and anti-microbial seamless flooring for cleanrooms, data centers, and pharmaceuticals.',
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    suitableLocations: ['Hospitals & OT Rooms', 'Pharma Labs', 'Electronics Assembly', 'Data Centers'],
    features: ['Conductive Carbon Grid Underlay', 'Anti-Microbial Nano Additives', 'USDA & ISO Cleanroom Approved', 'Static Voltage Suppression'],
    minRate: 280,
    maxRate: 460,
    unit: 'sq.ft.',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-02-28'
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'metallic-marble',
    name: 'Metallic & Resin Marble Flooring',
    tagline: 'Liquid Luxury Reimagined with Italian Veining & Shimmering Pigments',
    description: 'Our signature metallic epoxy systems replicate the natural organic beauty of Italian marble with 10x the strength, zero grout lines, and complete resistance to spills, turmeric, red wine, and scratching.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Monolithic Seamless Surface (No grout lines)',
      'Mirror Glass Luster or Matte Satin Topcoats',
      'Stain-Proof, Waterproof & Chemical Resistant',
      'UV-Stable Non-Yellowing Formulations',
      'Custom Pigment Mixing with Copper, Gold & Silver'
    ],
    suitableLocations: ['Living Rooms', 'Master Bedrooms', 'Hotel Lobbies', 'Luxury Bathrooms', 'Executive Boardrooms'],
    minRate: 350,
    maxRate: 580,
    unit: 'sq.ft.',
    isPublished: true
  },
  {
    id: 'srv-2',
    slug: '2d-flooring',
    name: '2D Designer Epoxy Flooring',
    tagline: 'Timeless Patterns, Moroccan Geometrics & Inlaid Motifs',
    description: 'Custom graphic designs, tile patterns, and geometric brass inlays encapsulated beneath heavy-duty self-leveling clear resins. Enjoy intricate decorative patterns with the easy cleaning of a single glass sheet.',
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Precision Handcrafted Inlays',
      'Moroccan, Greek & Art Deco Patterns',
      'Scratch-Proof Polyurethane Armor Coat',
      'Ultra Easy Mopping & Dust-Free Living',
      'Available in High Gloss or Micro-Texture Anti-Slip'
    ],
    suitableLocations: ['Kitchens', 'Balconies', 'Dining Areas', 'Boutique Cafes', 'Corridors'],
    minRate: 280,
    maxRate: 450,
    unit: 'sq.ft.',
    isPublished: true
  },
  {
    id: 'srv-3',
    slug: '3d-flooring',
    name: '3D Optical Epoxy Flooring',
    tagline: 'Mind-Blowing Visual Depth & Lifelike Natural Perspectives',
    description: 'Transform your bathroom, bedroom, or entertainment space into a vibrant oceanic reef, river bed, or cosmic abyss with our 3-layer optical magnification resin system.',
    mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    features: [
      'High-Resolution 4K Optical Prints',
      'Magnifying Resin Topcoat for Real 3D Depth',
      '100% Waterproof - Ideal for Bathrooms & Spas',
      'Anti-Skid Micro-Grit Additive Included',
      'Long-Term Color Brilliance Guaranteed'
    ],
    suitableLocations: ['Bathrooms & Powder Rooms', 'Kids Bedrooms', 'Theme Lounges', 'Swimming Pool Areas'],
    minRate: 450,
    maxRate: 780,
    unit: 'sq.ft.',
    isPublished: true
  },
  {
    id: 'srv-4',
    slug: 'wall-art',
    name: 'Resin Wall Art & Custom Cladding',
    tagline: 'Hand-Sculpted Gemstone Geodes & Seamless Liquid Walls',
    description: 'Create show-stopping feature walls with genuine crystals, gold leaf veining, and 3D textured relief. Every piece is an artisan original tailored to your interior design theme.',
    mainImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Handcrafted with Real Quartz & Mica Gems',
      'Seamless Wall Paneling Without Joints',
      'Light-Reflecting Metallic Depths',
      'Custom Sizing from Framed Canvases to Full Walls',
      'Mildew, Termite & Moisture Resistant'
    ],
    suitableLocations: ['TV Backgrounds', 'Bed Headboard Walls', 'Dining Room Accents', 'Hotel Lobbies'],
    minRate: 350,
    maxRate: 1200,
    unit: 'sq.ft.',
    isPublished: true
  },
  {
    id: 'srv-5',
    slug: 'staircase',
    name: 'Designer Epoxy Staircase',
    tagline: 'Live-Edge River Wood & Continuous Waterfall Marble Steps',
    description: 'Make your staircase the centerpiece of your architecture. We cast custom solid wood resin river steps or wrap existing concrete/granite stairs in seamless metallic marble with certified anti-skid grip.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Anti-Skid Clear Grip Nose Treatment for Safety',
      'Live-Edge Natural Timber Encapsulation',
      'Seamless Waterfall Treads & Risers',
      'Optional Night-Glow Safety Crystals',
      'Impact Resistant Against Heavy Footwear'
    ],
    suitableLocations: ['Duplex Villas', 'Penthouse Staircases', 'Commercial Atriums', 'Boutique Hotels'],
    minRate: 2000,
    maxRate: 4500,
    unit: 'step',
    isPublished: true
  },
  {
    id: 'srv-6',
    slug: 'ceiling',
    name: 'Resin Ceiling & Backlit Domes',
    tagline: 'Translucent Onyx Sheets, Starlight Galaxies & Open Skies',
    description: 'Elevate your vertical perspective with translucent resin onyx ceiling panels, starry night fiber optic domes, or hyper-realistic daytime skies.',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Translucent Onyx with Custom LED Backlighting',
      'Fiber Optic Starlight Twinkle Systems',
      'Lightweight Architectural Poly-resin',
      'Zero Sagging & Fire Retardant Formulations',
      'Dimmable Smart Home App Control Ready'
    ],
    suitableLocations: ['Dining Room Ceiling Island', 'Home Theatres', 'Master Bedrooms', 'Spa Lounges'],
    minRate: 380,
    maxRate: 850,
    unit: 'sq.ft.',
    isPublished: true
  },
  {
    id: 'srv-7',
    slug: 'commercial-industrial',
    name: 'Commercial & Industrial Epoxy',
    tagline: 'Heavy Duty Self-Leveling, Terrazzo & ESD Flooring',
    description: 'Engineered for high compressive strength, chemical resistance, anti-microbial hygiene, and electrostatic dissipation across factories, hospitals, and luxury commercial centers.',
    mainImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    features: [
      'High Compressive Load (Forklift & Heavy Machinery)',
      'Chemical, Acid & Solvent Proof Formulations',
      'Hygienic Anti-Bacterial Cleanroom Grade',
      'ESD Anti-Static Dissipative Options',
      'Custom Corporate Logo & Wayfinding Inlays'
    ],
    suitableLocations: ['Manufacturing Plants', 'Automotive Showrooms', 'Cleanroom Labs', 'Shopping Malls', 'Warehouses'],
    minRate: 150,
    maxRate: 750,
    unit: 'sq.ft.',
    isPublished: true
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Royal Penthouse Italian Marble Transformation',
    location: 'Salt Lake Sector V, Kolkata',
    category: 'metallic-marble',
    designUsed: 'ME-01 Italian Royal Marble',
    area: '1,850 sq.ft.',
    beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80', // old worn tiled floor
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // high gloss seamless metallic marble
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Converted an aging, stained ceramic tile floor into a seamless, high-mirror Italian Carrara metallic resin floor without demolishing the existing tiles.',
    clientName: 'Dr. S. Mukherjee',
    completionDate: '2026-01-20',
    isPublished: true
  },
  {
    id: 'proj-2',
    name: 'Luxury Villa 3D Coral Suite',
    location: 'Rajarhat, New Town',
    category: '3d-flooring',
    designUsed: '3D-FL-01 Coral Underwater',
    area: '240 sq.ft.',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Created a jaw-dropping master bathroom underwater experience with anti-skid transparent micro-bead finish and complete waterproofing.',
    clientName: 'Mr. R. Agarwal',
    completionDate: '2026-02-05',
    isPublished: true
  },
  {
    id: 'proj-3',
    name: 'Artisan Geode Mural & Backlit Onyx Foyer',
    location: 'Alipore, Kolkata',
    category: 'wall-art',
    designUsed: 'WALL-3D-02 Crystal Geode Mural',
    area: '180 sq.ft.',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-sculpted natural amethyst and quartz crystal geode feature wall in the reception lobby with custom concealed warm LED strips.',
    clientName: 'Heritage Jewels Showroom',
    completionDate: '2026-02-18',
    isPublished: true
  },
  {
    id: 'proj-4',
    name: 'Duplex Teak Resin River Staircase',
    location: 'Ballygunge, Kolkata',
    category: 'staircase',
    designUsed: 'ST-01 Resin River Wood Steps',
    area: '22 Steps + Landings',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Crafted 22 steps of seasoned Burmese Teak with deep turquoise metallic resin river veins, sealed with Anti-Skid Clear Grip armor.',
    clientName: 'K. Sengupta',
    completionDate: '2026-02-28',
    isPublished: true
  }
];

export const initialBookings: SiteVisitBooking[] = [
  {
    id: 'bkg-101',
    customerName: 'Anirban Bhattacharya',
    mobile: '+91 98301 44521',
    email: 'anirban.bhatt@gmail.com',
    fullAddress: 'Flat 9B, Silver Oak Heights, New Town Action Area 1',
    city: 'Kolkata',
    pinCode: '700156',
    serviceCategory: 'Metallic & Resin Marble',
    selectedDesignCode: 'ME-01',
    approxArea: '850 sq.ft.',
    preferredDate: '2026-09-24',
    preferredTime: '11:00 AM - 01:00 PM',
    requirementNotes: 'Looking to upgrade living room & open kitchen floor over existing tiles without breaking.',
    status: 'New',
    notes: [
      {
        id: 'n-1',
        text: 'Customer requested samples of ME-01 and ME-04 to be brought during visit.',
        date: '2026-09-21 09:30 AM',
        author: 'Admin'
      }
    ],
    createdAt: '2026-09-21 09:15 AM'
  },
  {
    id: 'bkg-102',
    customerName: 'Pooja Singhania',
    mobile: '+91 98312 88741',
    email: 'pooja.s@singhaniagroup.in',
    fullAddress: 'Plot 42, Block CD, Sector 1, Salt Lake City',
    city: 'Kolkata',
    pinCode: '700064',
    serviceCategory: '3D Epoxy Flooring',
    selectedDesignCode: '3D-FL-01',
    approxArea: '220 sq.ft.',
    preferredDate: '2026-09-25',
    preferredTime: '03:00 PM - 05:00 PM',
    requirementNotes: 'For master bathroom and jacuzzi area. Want non-slip warranty.',
    status: 'Visit Scheduled',
    notes: [
      {
        id: 'n-2',
        text: 'Visit assigned to Lead Engineer Sourav. Confirmed via phone.',
        date: '2026-09-21 10:00 AM',
        author: 'Admin'
      }
    ],
    createdAt: '2026-09-20 04:30 PM'
  },
  {
    id: 'bkg-103',
    customerName: 'Vikramaditya Roy',
    mobile: '+91 97482 11099',
    email: 'vikram.roy@outlook.com',
    fullAddress: 'Bungalow 7, Queens Park, Ballygunge',
    city: 'Kolkata',
    pinCode: '700019',
    serviceCategory: 'Designer Epoxy Staircase',
    selectedDesignCode: 'ST-01',
    approxArea: '18 Steps',
    preferredDate: '2026-09-26',
    preferredTime: '10:00 AM - 12:00 PM',
    requirementNotes: 'Curved wooden staircase transformation into turquoise river wood.',
    status: 'Contacted',
    createdAt: '2026-09-19 11:20 AM'
  }
];

export const initialEnquiries: EnquiryItem[] = [
  {
    id: 'enq-201',
    name: 'Debashis Sen',
    mobile: '+91 98305 77661',
    location: 'Behala Chowrasta, Kolkata',
    service: 'Metallic & Resin Marble',
    design: 'ME-03 Midnight Galaxy',
    approxArea: '600 sq.ft.',
    message: 'Can this be applied on top of old mosaic floor? Please share estimated cost and timeline.',
    status: 'New',
    createdAt: '2026-09-21 08:45 AM'
  },
  {
    id: 'enq-202',
    name: 'Sneha Chawla',
    mobile: '+91 90510 33452',
    location: 'Howrah, West Bengal',
    service: 'Resin Wall Art & Cladding',
    design: 'WALL-3D-02 Crystal Geode Mural',
    approxArea: '120 sq.ft.',
    message: 'Want to make a gold and emerald geode wall behind our 75-inch TV. Do you provide 3D visual preview before making?',
    status: 'Contacted',
    createdAt: '2026-09-20 02:15 PM'
  },
  {
    id: 'enq-203',
    name: 'Rajesh Sharma (Apex Motors)',
    mobile: '+91 98310 99432',
    location: 'Chinar Park, Kolkata',
    service: 'Commercial & Industrial Epoxy',
    design: 'COM-01 Heavy-Duty Self-Leveling',
    approxArea: '4,500 sq.ft.',
    message: 'Need quotation for automotive car showroom and service bay with tire-mark resistance.',
    status: 'Quotation Sent',
    createdAt: '2026-09-18 05:00 PM'
  }
];

export const initialReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Abhishek & Tanushree Bose',
    location: 'Silver Spring, EM Bypass',
    serviceUsed: 'ME-01 Italian Royal Marble',
    review: 'Our 1,400 sq.ft. apartment floor looks like a 7-star palace suite! The liquid gold veins on pure white resin look far richer than Italian marble slabs, and with zero tile joint lines, cleaning is effortless.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    date: '2026-02-14',
    isPublished: true
  },
  {
    id: 'rev-2',
    customerName: 'Sanjay Mukherjee',
    location: 'New Town, Kolkata',
    serviceUsed: '3D-FL-01 Coral Underwater Bathroom',
    review: 'The 3D depth in our master bathroom is unbelievable. Guests always stop in awe when they step in. The anti-slip micro-texture is completely safe even with wet soapy feet. Highly recommend Royal Resin team!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    date: '2026-02-20',
    isPublished: true
  },
  {
    id: 'rev-3',
    customerName: 'Priyanka Ghosh',
    location: 'Ballygunge Circular Road',
    serviceUsed: 'WALL-3D-02 Geode Wall & Resin River Steps',
    review: 'True artisan craftsmanship. The team took 4 days to hand-craft the geode wall with real crystals and light strips. It has become the signature conversation piece of our duplex.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    date: '2026-03-01',
    isPublished: true
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Epoxy flooring কী? (What is Epoxy Flooring?)',
    answer: 'Epoxy flooring হলো একটি হাই-টেক পলিমার সিস্টেম যা লিকুইড রেজিন এবং হার্ডেনার মিশিয়ে মেঝেতে ঢালা হয়। এটি একটি সিমলেস (কোনো জোড়া ছাড়া), হাই-গ্লস, গ্লাস-লাইক শক্ত আবরণ তৈরি করে যা সাধারণ মার্বেল বা টাইলের চেয়ে অনেক গুণ বেশি টেকসই ও সহজে পরিষ্কারযোগ্য।',
    category: 'General',
    isPublished: true,
    order: 1
  },
  {
    id: 'faq-2',
    question: '2D এবং 3D flooring-এর difference কী?',
    answer: '2D Epoxy Flooring-এ মেটালিক পিগমেন্ট, মার্বেল ভেইন, বা স্টেনসিল জিওমেট্রিক প্যাটার্ন ফুটিয়ে তোলা হয়। অন্যদিকে 3D Epoxy Flooring-এ হাই-ডেফিনিশন অপটিক্যাল পার্সপেক্টিভ প্রিন্টের ওপর ক্রিস্টাল ক্লিয়ার রেজিন দিয়ে গভীরতার (depth illusion) থ্রি-ডাইমেনশনাল এফেক্ট তৈরি করা হয় (যেমন: আন্ডারওয়াটার কোরাল, জলপ্রপাত ইত্যাদি)।',
    category: 'Designs',
    isPublished: true,
    order: 2
  },
  {
    id: 'faq-3',
    question: 'প্রতি sq.ft. কত খরচ হতে পারে?',
    answer: 'বেসিক ডিজাইনার 2D ফ্লোরিং ₹280/sq.ft. থেকে শুরু হয়, মেটালিক মার্বেল ফ্লোরিং ₹350–₹580/sq.ft. এবং প্রিমিয়াম 3D অপটিক্যাল ফ্লোরিং ₹450–₹780/sq.ft. পর্যন্ত হতে পারে। বিস্তারিত রেট শিট আমাদের Pricing পেজে পেয়ে যাবেন।',
    category: 'Pricing',
    isPublished: true,
    order: 3
  },
  {
    id: 'faq-4',
    question: 'Final price কীভাবে calculate হয়?',
    answer: 'ফাইনাল কোটেশন নির্ভর করে মোট স্কোয়ার ফিট এরিয়া, বর্তমান মেঝের কন্ডিশন (ময়েশ্চার ও ক্র্যাক লেভেল), সিলেক্টেড ডিজাইন ও মেটালিক লেয়ারের ঘনত্ব, এবং টপকোট স্পেসিফিকেশন (পলিঅ্যাসপার্টিক / অ্যান্টি-স্ক্র্যাচ / অ্যান্টি-স্লিপ) এর ওপর। সাইট ভিজিটের পর আমরা ফ্রি মেজারমেন্ট ও সঠিক এস্টিমেট দিই।',
    category: 'Pricing',
    isPublished: true,
    order: 4
  },
  {
    id: 'faq-5',
    question: 'Existing floor বা পুরোনো টাইলের ওপর কি সরাসরি করা যায়?',
    answer: 'হ্যাঁ, অবশ্যই! আমাদের স্পেশাল ডায়মন্ড গ্রাইন্ডিং ও হাই-বন্ড প্রাইমার টেকনোলজির মাধ্যমে পুরোনো মার্বেল, মোজাইক বা সিরামিক টাইলের ওপর কোনো ভাঙচুর বা ধূলোবালি ছাড়াই সরাসরি রেজিন ফ্লোরিং করা যায়।',
    category: 'Installation',
    isPublished: true,
    order: 5
  },
  {
    id: 'faq-6',
    question: 'পুরো কাজ সম্পন্ন করতে কতদিন সময় লাগে?',
    answer: 'সাধারণত একটি ৫০০-১০০০ স্কোয়ার ফিটের ফ্ল্যাটের জন্য ৩ থেকে ৫ দিন সময় লাগে (সারফেস প্রিপারেশন, প্রাইমার, ডিজাইন লেয়ার, এবং কিউরিং টাইম সহ)। কাজ শেষের ২৪-৪৮ ঘণ্টার মধ্যে হালকা হাঁটাচলা করা যায়।',
    category: 'Installation',
    isPublished: true,
    order: 6
  },
  {
    id: 'faq-7',
    question: 'Design কি পুরোপুরি custom করা যায়?',
    answer: 'হ্যাঁ! আপনার ঘরের ওয়াল কালার, ফার্নিচার বা ব্যক্তিগত পছন্দের ওপর ভিত্তি করে কালার শেড, মার্বেল ভেইনের প্যাটার্ন, গোল্ড ফ্লেক ডেনসিটি কিংবা আপনার নিজস্ব লোগো/ছবি দিয়ে ১০০% কাস্টম ডিজাইন তৈরি করা যায়।',
    category: 'Designs',
    isPublished: true,
    order: 7
  },
  {
    id: 'faq-8',
    question: 'এটি কি সম্পূর্ণ Waterproof এবং বাথরুমে পিছলে পড়ার ভয় আছে?',
    answer: 'রয়্যাল রেজিন ফ্লোরিং ১০০% ওয়াটারপ্রুফ এবং সিলড। বাথরুম, কিচেন এবং সিড়ির জন্য আমরা বিশেষ সার্টিফাইড Anti-Skid Clear Grip মাইক্রো-টেক্সচার ব্যবহার করি যা মেঝে ভিজে থাকলেও একদম স্লিপ-রেসিস্ট্যান্ট থাকে।',
    category: 'Maintenance',
    isPublished: true,
    order: 8
  },
  {
    id: 'faq-9',
    question: 'Cleaning এবং Maintenance কীভাবে করতে হয়?',
    answer: 'যেহেতু কোনো জয়েন্ট বা গ্রাউট লাইন থাকে না, তাই ময়লা বা শ্যাওলা জমার কোনো সুযোগ নেই। সাধারণ নরম কাপড় বা মপ দিয়ে জল বা হালকা ফ্লোর ক্লিনার দিয়ে মুছে নিলেই কাঁচের মতো চকচক করবে। হার্শ অ্যাসিডের প্রয়োজন নেই।',
    category: 'Maintenance',
    isPublished: true,
    order: 9
  },
  {
    id: 'faq-10',
    question: 'Site visit কীভাবে book করব?',
    answer: 'আমাদের ওয়েবসাইটের "Book a Site Visit" ফর্মে আপনার নাম, ঠিকানা ও পছন্দের তারিখ দিয়ে সাবমিট করলেই আমাদের টিম কল করে কনফার্ম করবে। আমাদের এক্সপার্ট রিয়েল ডিজাইন স্যাম্পল নিয়ে আপনার লোকেশনে গিয়ে মেজারমেন্ট ও কনসাল্টেশন প্রদান করবেন।',
    category: 'Booking',
    isPublished: true,
    order: 10
  }
];

export const initialHomeContent: HomePageContent = {
  heroTitle: 'ROYAL RESIN INTERIOR',
  heroHighlight: 'We Turn Your Floors & Walls Into Living Art',
  heroSubtitle: 'Premium 2D & 3D Epoxy Flooring, Resin Art, Designer Walls, Staircases & Luxury Interior Finishes.',
  heroBadge: '✦ Bengal\'s Premier Luxury Resin Finishes Studio',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  ctaPrimaryText: 'Explore Design Catalogue (ক্যাটালগ)',
  ctaSecondaryText: 'Book a Site Visit',
  whyChooseUs: [
    {
      title: 'Premium Mirror Finish',
      description: 'Diamond-grade crystal gloss and seamless monolithic elegance without grout lines.',
      iconName: 'Sparkles'
    },
    {
      title: 'Custom Artisan Designs',
      description: '100% bespoke color matching, veins, embedded crystals and Italian marble styles.',
      iconName: 'Palette'
    },
    {
      title: 'Easy Wipe Maintenance',
      description: 'Stain-resistant, dust-repellent, zero porosity surface that wipes clean in seconds.',
      iconName: 'ShieldCheck'
    },
    {
      title: 'Scratch Resistant Options',
      description: 'High-durability polyaspartic and ceramic nanocoatings engineered for heavy footfall.',
      iconName: 'Shield'
    },
    {
      title: 'Professional Installation',
      description: 'Trained German-grade precision application team with laser moisture checking.',
      iconName: 'Award'
    },
    {
      title: 'Long-Lasting Finish',
      description: 'Guaranteed bond strength that outlasts conventional tiles with zero tile cracking.',
      iconName: 'Clock'
    }
  ],
  processSteps: [
    {
      step: '01',
      title: 'Choose Your Design',
      description: 'Browse our extensive catalogue of Metallic Marble, 2D motifs, 3D underwater or geode walls.'
    },
    {
      step: '02',
      title: 'Book a Site Visit',
      description: 'Schedule a free consultation on our website or directly via WhatsApp & phone.'
    },
    {
      step: '03',
      title: 'Site Measurement',
      description: 'Our technical team visits with physical touch-and-feel samples and laser measure tools.'
    },
    {
      step: '04',
      title: 'Design & Quotation',
      description: 'Get custom 3D mockups and a clear, transparent square-footage cost breakdown.'
    },
    {
      step: '05',
      title: 'Professional Installation',
      description: 'Dust-free diamond grinding, precision pouring, and mirror-finish curing in 3-5 days.'
    }
  ],
  finalCtaTitle: 'Ready to Transform Your Space into a Living Masterpiece?',
  finalCtaSubtitle: 'Join hundreds of satisfied luxury homeowners, architects and commercial spaces who elevated their interiors with Royal Resin.'
};

export const initialCompanyInfo: CompanyInfo = {
  businessName: 'Royal Resin Interior',
  tagline: 'Luxury Epoxy Flooring & Artisan Resin Interiors',
  phone: '+91 98300 12345',
  whatsapp: '+919830012345',
  email: 'contact@royalresininterior.com',
  address: 'Salt Lake City, Sector V, Kolkata, West Bengal 700091',
  fullAddress: 'Tower 3, Infinity Benchmark, 8th Floor, Sector V, Bidhannagar, Kolkata, West Bengal - 700091',
  gmapUrl: 'https://maps.google.com/?q=Infinity+Benchmark+Sector+V+Kolkata',
  businessHours: 'Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: By Appointment',
  announcementTitle: "Bengal's Premier Luxury 2D & 3D Resin Studio",
  announcementSubtitle: 'Free Laser Measurement & On-Site Consultation',
  socialLinks: {
    facebook: 'https://facebook.com/royalresininterior',
    instagram: 'https://instagram.com/royalresininterior',
    youtube: 'https://youtube.com/@royalresininterior',
    pinterest: 'https://pinterest.com/royalresininterior'
  },
  currencySymbol: '₹'
};

export const initialServiceAreas: ServiceArea[] = [
  {
    id: 'area-1',
    city: 'Kolkata',
    district: 'Kolkata & North/South 24 Parganas',
    state: 'West Bengal',
    nearbyAreas: ['Salt Lake', 'New Town', 'Rajarhat', 'Alipore', 'Ballygunge', 'EM Bypass', 'Behala', 'Howrah'],
    active: true
  },
  {
    id: 'area-2',
    city: 'Durgapur & Asansol',
    district: 'Paschim Bardhaman',
    state: 'West Bengal',
    nearbyAreas: ['City Centre', 'Benachity', 'Kalyanpur', 'Burnpur'],
    active: true
  },
  {
    id: 'area-3',
    city: 'Siliguri',
    district: 'Darjeeling & Jalpaiguri',
    state: 'West Bengal',
    nearbyAreas: ['Sevoke Road', 'Matigara', 'Pradhan Nagar'],
    active: true
  },
  {
    id: 'area-4',
    city: 'Bhubaneswar',
    district: 'Khordha',
    state: 'Odisha',
    nearbyAreas: ['Patia', 'Saheed Nagar', 'Nayapalli', 'Jaydev Vihar'],
    active: true
  },
  {
    id: 'area-5',
    city: 'Ranchi & Jamshedpur',
    district: 'Ranchi / East Singhbhum',
    state: 'Jharkhand',
    nearbyAreas: ['Morabadi', 'Kanke Road', 'Bistupur', 'Sakchi'],
    active: true
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'New Site Visit Booking',
    message: 'Anirban Bhattacharya booked a visit for Metallic & Resin Marble (ME-01) in New Town.',
    time: '15 mins ago',
    isRead: false,
    targetId: 'bkg-101'
  },
  {
    id: 'notif-2',
    type: 'enquiry',
    title: 'New Enquiry Received',
    message: 'Debashis Sen enquired about Midnight Galaxy (ME-03) in Behala.',
    time: '45 mins ago',
    isRead: false,
    targetId: 'enq-201'
  }
];
