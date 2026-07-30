"use client";

import { Location, Paroisse } from "@/app/types";
import { useEffect, useRef, useState } from "react";
/// <reference types="@types/google.maps" />

interface MapDisplayProps {
  selectedLocation: Location | null;
  parishes?: Paroisse[];
  zoom?: number | null;
}

function parseParishGps(gps: string): { lat: number; lng: number } | null {
  if (!gps) return null;
  const parts = gps.split(";");
  if (parts.length !== 2) return null;
  const lat = Number(parts[0]);
  const lng = Number(parts[1]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  return { lat, lng };
}

export function MapDisplay({ selectedLocation, parishes, zoom }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const parishMarkersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !map) {
      // Default center is Paris
      const defaultCenter = getDefaultCenter();

      const newMap = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: zoom ?? 10,
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
    if (!map) return;

    parishMarkersRef.current.forEach((m) => m.setMap(null));
    parishMarkersRef.current = [];

    if (!parishes || parishes.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    let hasValid = false;

    parishes.forEach((paroisse) => {
      const pos = parseParishGps(paroisse.gps);
      if (!pos) return;
      const newMarker = new google.maps.Marker({
        position: pos,
        map,
        animation: google.maps.Animation.DROP,
        title: paroisse.nom,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px; font-size: 16px;">${paroisse.nom}</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">${paroisse.adresse}</p>
          </div>
        `,
      });

      newMarker.addListener("click", () => {
        infoWindow.open(map, newMarker);
      });

      parishMarkersRef.current.push(newMarker);
      bounds.extend(pos);
      hasValid = true;
    });

    if (hasValid) {
      map.fitBounds(bounds);
    }

    return () => {
      parishMarkersRef.current.forEach((m) => m.setMap(null));
      parishMarkersRef.current = [];
    };
  }, [map, parishes]);

  const getDefaultCenter = () => {
    if (parishes && parishes?.length > 0 ){
      const pos = parseParishGps(parishes[0].gps)
      if (pos) return pos
      else return { lat: selectedLocation!.lat, lng: selectedLocation!.lng };
    }
    else if (selectedLocation) return { lat: selectedLocation!.lat, lng: selectedLocation!.lng };

    else return { lat: 46.091091, lng: -64.781880 };
  }

  useEffect(() => {
    if (map && selectedLocation && !parishes) {
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
      map.setZoom(zoom ?? 15);

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