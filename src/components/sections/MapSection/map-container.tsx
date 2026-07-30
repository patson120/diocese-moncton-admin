"use client";

import { Location, Paroisse } from "@/app/types";
import { LoadingSpinner } from "@/components/sections/MapSection/loading-spinner";
import { MapDisplay } from "@/components/sections/MapSection/map-display";
import { SearchBar } from "@/components/sections/MapSection/search-bar";
import { useLoadGoogleMapsScript } from "@/hooks/use-load-google-maps-script";
import { useState } from "react";

type MapContainerProps  ={
  showSearchBar?: boolean;
  location?: Location | null,
  parishes?: Paroisse[] | null,
  zoom?: number | null,
  setLocation?: (location: Location | null) => void
}

export function MapContainer({
  showSearchBar,
  location,
  parishes,
  setLocation,
  zoom
} : MapContainerProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(location!);
  const { isLoaded, loadError } = useLoadGoogleMapsScript();

  const handleLocationSelect = (loc: Location) => {
    setSelectedLocation(loc);
    setLocation!(loc);
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-destructive text-xl font-semibold mb-2">
          Error loading Google Maps
        </div>
        <p className="text-muted-foreground text-center">
          There was a problem loading the Google Maps API. Please check your API key and try again.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingSpinner />
        <p className="text-muted-foreground mt-4">Loading Maps...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden relative">
      <MapDisplay 
        parishes={parishes!} 
        selectedLocation={selectedLocation} 
        zoom={zoom} 
      />
      {
        showSearchBar && 
        <div className="absolute top-3 left-3 right-3 bg-white rounded-md">
          <SearchBar onLocationSelect={handleLocationSelect} />
        </div>
      }
    </div>
  );
}