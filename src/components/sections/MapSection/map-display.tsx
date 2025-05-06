"use client";

import { useEffect, useRef, useState } from "react";
import { Location } from "@/components/sections/MapSection/map-container";

interface MapDisplayProps {
  selectedLocation: Location | null;
}

export function MapDisplay({ selectedLocation }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      // Default center is Paris
      const defaultCenter = { lat: 46.091091, lng: -64.781880 };
      
      const newMap = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
      });
      
      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    if (map && selectedLocation) {
      const position = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      
      // Create or move marker
      if (!marker) {
        const newMarker = new google.maps.Marker({
          position,
          map,
          animation: google.maps.Animation.DROP,
          title: selectedLocation.name,
        });
        setMarker(newMarker);
      } else {
        marker.setPosition(position);
        marker.setTitle(selectedLocation.name);
      }
      
      // Pan to the location with a smooth animation
      map.panTo(position);
      
      // Set an appropriate zoom level
      map.setZoom(15);
      
      // Create an info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px; font-size: 16px;">${selectedLocation.name}</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">${selectedLocation.address}</p>
          </div>
        `,
      });
      
      // Open info window when marker is clicked
      marker?.addListener("click", () => {
        infoWindow.open(map, marker);
      });
      
      // Open info window initially
      infoWindow.open(map, marker || undefined);
      
      // Close info window after 5 seconds
      setTimeout(() => {
        infoWindow.close();
      }, 5000);
    }
  }, [map, selectedLocation, marker]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}