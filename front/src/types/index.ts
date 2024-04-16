interface PlaceApiResResult {
    business_status: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    plus_code: PlusCode;
    price_level: number;
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
}

interface Location {
    lat: number;
    lng: number;
}

interface Geometry {
    location: Location;
    viewport: Viewport;
  }
  
  interface Viewport {
    northeast: Location;
    southwest: Location;
  }
  
  interface OpeningHours {
    open_now: boolean;
    periods: Period[];
    weekday_text: string[];
  }
  
  interface Period {
    close: Close;
    open: Open;
  }
  
  interface Close {
    day: number;
    time: string;
  }
  
  interface Open {
    day: number;
  
    time: string;
  }
  
  interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }
  
  interface PlusCode {
    compound_code: string;
    global_code: string;
  }
  
  interface PlaceApiReqParams {
    radius?: number;
    keyword?: string;
    opennow?: boolean;
    location?: string;
    pagetoken?: string;
    rankby?: "prominence" | "distance"; 
  }

  interface WaypointsDetails {
    name: string
    address_components: Array<any>
    photos?: Array<any>
    international_phone_number?: string
    rating?: number
    place_id?: string
}
  
  interface TripDetailsElement {
        content: WaypointsDetails
        place_id?: string
  }

  interface PlaceDetail {
    address_components: AddressComponents[]
    adr_address: string 
    business_status: string
    current_opening_hours: OpeningHours[]
    editorial_summary: EditorialSummary
    formatted_address: string 
    formatted_phone_number: string 
    geometry: Geometry
    icon: string
    icon_background_color: string 
    icon_mask_base_uri: string 
    international_phone_number: string 
    name: string 
    opening_hours: OpeningHours[]
    photos: Photo[]
    place_id: string 
    rating: number 
    plus_code: PlusCode
    reference: string 
    reviews: Review[]
    types: string[]
    url: string 
    user_ratings_total: number 
    utc_offset: number 
    vicinity: string 
    website: string 
    wheelchair_accessible_entrance: boolean
  }

  interface AddressComponents {
    long_name: string 
    short_name: string
    types: string[]
  }

  interface EditorialSummary {
    language: string 
    overview: string
  }
  
  interface Review {
    author_name: string 
    author_url: string 
    language: string 
    original_language: string 
    profile_photo_url: string 
    rating: number 
    relative_time_description: string 
    text: string 
    time: number
    translated: boolean
  }

interface EventDetail {
  dates: {
    start: {
      localDate: string 
    }
  }
  images: [
    {
      url: string
    }
  ]
  name: string
  description: string
  _embedded: {
    venues: [
      {
        address: {
          line1: string 
        }
        city: {name: string}
        country: {name: string}
        postalCode: string
      }
    ]
  }
}