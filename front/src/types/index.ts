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
  
  interface TripDetailsElement {
        content: string
        desc?: string
  }