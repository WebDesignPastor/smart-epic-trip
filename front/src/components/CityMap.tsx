// CityMap.tsx
import React, { useRef, useEffect, useState } from 'react';

interface CityMapProps {
    defaultLat: number;
    defaultLng: number;
    defaultZoom: number;
  }

const CityMap: React.FC<CityMapProps> = ({ defaultLat, defaultLng, defaultZoom }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
  
    useEffect(() => {
      if (mapRef.current && !map) {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: defaultLat, lng: defaultLng },
          zoom: defaultZoom,
        };
        setMap(new window.google.maps.Map(mapRef.current, mapOptions));
      }
    }, [defaultLat, defaultLng, defaultZoom, map]);
  
    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
  };

export default CityMap;
