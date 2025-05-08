"use client";

import { LoadingSpinner } from "@/components/sections/MapSection/loading-spinner";
import { MapDisplay } from "@/components/sections/MapSection/map-display";
import { SearchBar } from "@/components/sections/MapSection/search-bar";
import { useLoadGoogleMapsScript } from "@/hooks/use-load-google-maps-script";
import { useEffect, useState } from "react";

export type Location = {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export function MapContainer() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [recentSearches, setRecentSearches] = useState<Location[]>([]);
  const { isLoaded, loadError } = useLoadGoogleMapsScript();

  // Load recent searches from localStorage when component mounts
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error("Error parsing recent searches:", e);
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    
    // Add to recent searches if not already present
    if (!recentSearches.some(search => search.placeId === location.placeId)) {
      const updatedSearches = [location, ...recentSearches].slice(0, 5); // Keep only 5 most recent
      setRecentSearches(updatedSearches);
    }
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
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
      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingSpinner />
        <p className="text-muted-foreground mt-4">Loading Maps...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">

      {/**
        <header className="bg-background/95 backdrop-blur-sm border-b z-10 sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Place Search
            </h1>
            <p className="text-muted-foreground mb-4">
              Find places and get their GPS coordinates
            </p>
            <SearchBar onLocationSelect={handleLocationSelect} />
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 container mx-auto">
          <div className="md:col-span-1 space-y-4">
            {selectedLocation && (
              <CoordinatesDisplay location={selectedLocation} />
            )}
            <RecentSearches 
              searches={recentSearches}
              onSelect={handleLocationSelect}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 h-[50vh] md:h-[70vh] rounded-lg overflow-hidden shadow-md relative">
            <MapDisplay selectedLocation={selectedLocation} />
            <div className="absolute top-4 left-3 right-3 bg-white rounded-md">
              <SearchBar onLocationSelect={handleLocationSelect} />
            </div>
          </div>
        </div>
      */}

      <div className="h-80 w-[500px] rounded-xl overflow-hidden shadow-md relative">
        <MapDisplay selectedLocation={selectedLocation} />
        <div className="absolute top-3 left-3 right-3 bg-white rounded-md">
          <SearchBar onLocationSelect={handleLocationSelect} />
        </div>
      </div>
    </div>
  );
}