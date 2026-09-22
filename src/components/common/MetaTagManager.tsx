import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { DesignItem, ServiceCategoryType } from '../../types';

interface MetaTagManagerProps {
  currentPage: string;
}

export const MetaTagManager: React.FC<MetaTagManagerProps> = ({ currentPage }) => {
  const { 
    companyInfo, 
    selectedDesignForModal, 
    isCompareModalOpen,
    comparisonDesignIds,
    designs,
    categories,
    faqs
  } = useStore();

  useEffect(() => {
    // 1. Determine Title, Description, Image, Type, and Schema according to state
    let title = 'Royal Resin Interior | Luxury Epoxy & 3D Flooring Studio';
    let description = 'Luxury 2D & 3D Epoxy Flooring, Metallic Resin Marble, Designer Wall Art, Staircases & Ceiling Finishes with 10-Year Studio Warranty.';
    let image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    let ogType = 'website';
    let canonicalPath = currentPage === 'home' ? '' : `/${currentPage}`;
    let isNoIndex = false;
    let structuredData: any = null;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.royalresininterior.com';
    const currentCanonicalUrl = `${baseUrl}${canonicalPath}`;

    // Base Organization / LocalBusiness Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${baseUrl}/#organization`,
      'name': companyInfo.businessName || 'Royal Resin Interior',
      'url': baseUrl,
      'logo': `${baseUrl}/logo.png`,
      'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'description': companyInfo.tagline || 'Luxury 2D & 3D Epoxy Flooring, Metallic Resin Marble, Wall Art & Staircases',
      'telephone': companyInfo.phone,
      'email': companyInfo.email,
      'priceRange': '₹₹₹',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': companyInfo.address,
        'addressLocality': 'Kolkata',
        'addressRegion': 'West Bengal',
        'postalCode': '700001',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '22.5726',
        'longitude': '88.3639'
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '20:00'
        }
      ],
      'sameAs': [
        'https://www.facebook.com/royalresininterior',
        'https://www.instagram.com/royalresininterior',
        'https://www.youtube.com/@royalresininterior'
      ]
    };

    // Sub-conditions: Check if modal is active
    if (selectedDesignForModal) {
      const design: DesignItem = selectedDesignForModal;
      title = `${design.code} - ${design.name} | Luxury ${design.category.replace('-', ' ')} | Royal Resin Interior`;
      description = `Discover ${design.name} (${design.code}) by Royal Resin Interior. ${design.subType || 'Luxury'} finish with 9H diamond topcoat. Estimated investment: ₹${design.minRate} - ₹${design.maxRate}/${design.unit}.`;
      image = design.mainImage;
      ogType = 'product';

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': `${design.name} (${design.code})`,
        'image': [design.mainImage, ...(design.galleryImages || [])],
        'description': design.description,
        'sku': design.code,
        'category': design.category,
        'brand': {
          '@type': 'Brand',
          'name': 'Royal Resin Interior'
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'INR',
          'lowPrice': design.minRate,
          'highPrice': design.maxRate,
          'offerCount': '1',
          'unitCode': design.unit === 'sq.ft.' ? 'FTK' : 'C62',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': 'Royal Resin Interior'
          }
        },
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'Suitable Locations',
            'value': design.suitableLocations.join(', ')
          },
          {
            '@type': 'PropertyValue',
            'name': 'Durability Topcoat',
            'value': '9H Diamond Scratch-Resistant Coat'
          },
          {
            '@type': 'PropertyValue',
            'name': 'Warranty',
            'value': '10-Year Studio Warranty'
          }
        ]
      };
    } else if (isCompareModalOpen) {
      title = `Compare Resin Designs Side-by-Side (${comparisonDesignIds.length} Selected) | Royal Resin Interior`;
      description = `Side-by-side technical and rate comparison for ${comparisonDesignIds.length} selected luxury epoxy and resin art finishes. Evaluate price brackets, scratch resistance, and room suitability.`;
    } else {
      // Main Page Routing SEO
      switch (currentPage) {
        case 'home':
          title = 'Royal Resin Interior | Luxury 2D & 3D Epoxy Flooring, Resin Art & Marble Finishes';
          description = 'Transform your floors & walls into living art. Premium 3D epoxy flooring, liquid metallic marble, resin murals, staircases & ceilings in West Bengal & Pan-India.';
          image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
          structuredData = organizationSchema;
          break;

        case 'about':
          title = 'About Us & Artisan Craftsmanship | Royal Resin Interior';
          description = 'Learn about Royal Resin Interior — master artisans with 12+ years of experience delivering German-grade 9H diamond epoxy finishes and bespoke architectural resin art.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            'mainEntity': organizationSchema
          };
          break;

        case 'services':
          title = 'Our Architectural Resin Services | 3D Flooring, Marble & Wall Cladding';
          description = 'Explore our luxury resin craftsmanship: 2D & 3D Epoxy Flooring, Metallic Resin Marble, Designer Wall Murals, Seamless Staircases, Ceilings & Commercial Floors.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': categories.map((cat, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': cat.name,
              'description': cat.shortDesc,
              'image': cat.image,
              'url': `${baseUrl}/service-${cat.slug}`
            }))
          };
          break;

        case 'service-metallic-marble':
          title = 'Liquid Metallic Marble Resin Flooring | Seamless Italian Marble Finish';
          description = 'Pristine liquid metallic marble floors with pearlescent pigments. 100% waterproof, zero grout lines, and 9H diamond scratch resistance. From ₹280/sq.ft.';
          image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Metallic & Resin Marble Flooring',
            'provider': organizationSchema,
            'serviceType': 'Luxury Interior Flooring',
            'description': 'Deep liquid swirl with pearlescent metallic pigments mimicking exotic Italian & natural marbles with zero joints.',
            'offers': {
              '@type': 'Offer',
              'priceCurrency': 'INR',
              'price': '280',
              'priceSpecification': {
                '@type': 'UnitPriceSpecification',
                'price': '280',
                'priceCurrency': 'INR',
                'unitText': 'sq.ft.'
              }
            }
          };
          break;

        case 'service-3d-flooring':
          title = 'Hyper-Realistic 3D Epoxy Flooring | Optical Depth & Marine Illusion';
          description = 'Transform your bathroom, master bedroom, or luxury lobby with 3D optical illusion floors. High optical clarity topcoat, seamless and UV stable. From ₹350/sq.ft.';
          image = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': '3D Epoxy Flooring',
            'provider': organizationSchema,
            'serviceType': 'Optical Illusion 3D Flooring',
            'description': 'Hyper-realistic optical illusion and depth floors transforming bathrooms, lobbies, and luxury master bedrooms.'
          };
          break;

        case 'service-2d-flooring':
          title = '2D Designer Epoxy Flooring | Graphic Inlays & Moroccan Geometric Motifs';
          description = 'Seamless 2D epoxy flooring with precision graphic inlays, Moroccan motifs, and clean modern finishes for luxury residential and commercial spaces. From ₹220/sq.ft.';
          image = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': '2D Designer Epoxy Flooring',
            'provider': organizationSchema,
            'serviceType': 'Designer Pattern Flooring'
          };
          break;

        case 'service-wall-art':
          title = 'Resin Wall Art & Geode Cladding | Luxury Artisan Feature Walls';
          description = 'Handcrafted geode crystal murals, metallic wave panels, and liquid marble wall cladding for living rooms, reception areas, and executive lounges. From ₹450/sq.ft.';
          image = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Resin Wall Art & Cladding',
            'provider': organizationSchema
          };
          break;

        case 'service-staircase':
          title = 'Designer Epoxy Staircase | Live-Edge River Wood & Marble Treads';
          description = 'Bespoke staircase transformations: live-edge river wood steps, seamless waterfall marble treads, and transparent anti-skid safety grip. From ₹300/sq.ft.';
          image = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Designer Epoxy Staircase',
            'provider': organizationSchema
          };
          break;

        case 'service-ceiling':
          title = 'High-Gloss Resin Ceilings & 3D Sky Architectural Panels';
          description = 'Reflective mirror resin ceilings, galaxy skies, and back-lit metallic ceiling inlays engineered for luxury living spaces and master suites. From ₹260/sq.ft.';
          image = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Resin Ceiling Finishes',
            'provider': organizationSchema
          };
          break;

        case 'service-commercial-industrial':
          title = 'Commercial & Industrial Epoxy Flooring | High Traffic & Chemical Proof';
          description = 'Heavy-duty seamless industrial resin flooring, anti-static ESD, chemical resistant, and showroom high-gloss finishes with 10-year durability. From ₹180/sq.ft.';
          image = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Commercial & Industrial Epoxy Flooring',
            'provider': organizationSchema
          };
          break;

        case 'gallery':
          title = 'Luxury Design Gallery & Catalogue | Royal Resin Interior';
          description = 'Browse 30+ exclusive 2D/3D epoxy floors, metallic marble finishes, geode wall murals, and live-edge steps with instant sq.ft rate cards and comparison tool.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Royal Resin Interior Design Gallery',
            'description': 'Catalogue of luxury epoxy flooring, resin wall art, and staircases.'
          };
          break;

        case 'projects':
          title = 'Completed Projects Portfolio | Verified Site Transformations';
          description = 'Explore real site transformations across luxury villas, penthouses, commercial showrooms, and hotels crafted by Royal Resin Interior.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Royal Resin Project Portfolio'
          };
          break;

        case 'pricing':
          title = 'Transparent Pricing & Cost Calculator | Royal Resin Interior';
          description = 'Calculate your estimated project investment with our instant sq.ft rate estimator for 2D/3D epoxy, metallic marble, wall art, and staircases.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Resin Flooring Pricing & Cost Calculator',
            'description': 'Price guides and cost estimation for epoxy resin finishes.'
          };
          break;

        case 'book-visit':
          title = 'Book Free Site Survey & Laser Measurement | Royal Resin Interior';
          description = 'Schedule a certified technical site inspection and physical resin sample demonstration across Kolkata, Durgapur, Siliguri, and Pan-India.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Book a Free Site Visit'
          };
          break;

        case 'enquiry':
          title = 'Request Project Quote & Consultation | Royal Resin Interior';
          description = 'Get a personalized architectural resin quote, technical material specifications, and expert design guidance within 24 hours.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Project Enquiry & Quotation'
          };
          break;

        case 'faq':
          title = 'Frequently Asked Questions & Epoxy Guide | Royal Resin Interior';
          description = 'Answers to all questions regarding epoxy flooring durability, curing timelines, scratch resistance, waterproofing, maintenance, and 10-year warranty.';
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          };
          break;

        case 'contact':
          title = 'Contact Us & Studio Location | Royal Resin Interior';
          description = `Connect with our master artisans. Phone: ${companyInfo.phone}, WhatsApp: ${companyInfo.whatsapp}, Email: ${companyInfo.email}. Visit our design studio.`;
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'mainEntity': organizationSchema
          };
          break;

        case 'admin':
          title = 'Admin Management Studio | Royal Resin Interior';
          description = 'Internal management dashboard for site visit bookings, inquiries, catalog management, and customer reviews.';
          isNoIndex = true;
          break;

        default:
          title = 'Royal Resin Interior | Luxury Epoxy & 3D Flooring Studio';
          description = 'Luxury 2D & 3D Epoxy Flooring, Metallic Resin Marble, Designer Wall Art, Staircases & Ceiling Finishes.';
          structuredData = organizationSchema;
          break;
      }
    }

    // 2. Apply updates to the Document Head
    // Set Document Title
    document.title = title;

    // Helper to create or update meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper to create or update link tag
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.head.querySelector(`link[rel="${relValue}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relValue);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', 'epoxy flooring, 3D flooring, metallic marble resin, resin wall art, epoxy staircase, Kolkata epoxy floor, seamless floors, luxury interior finishes');
    
    // OpenGraph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentCanonicalUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', companyInfo.businessName || 'Royal Resin Interior');

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // Canonical Link
    setLinkTag('canonical', currentCanonicalUrl);

    // Robots Tag for Admin
    if (isNoIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');
    }

    // 3. Inject / Update JSON-LD Structured Data
    const SCRIPT_ID = 'royal-resin-json-ld';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [currentPage, selectedDesignForModal, isCompareModalOpen, comparisonDesignIds, companyInfo, categories, faqs]);

  // Headless manager component
  return null;
};
