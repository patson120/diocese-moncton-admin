"use client";

import { Location } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      
      // Create a dummy map element for PlacesService
      const mapDiv = document.createElement("div");
      mapDiv.style.display = "none";
      document.body.appendChild(mapDiv);
      const map = new google.maps.Map(mapDiv, {
        center: { lat: 0, lng: 0 },
        zoom: 1,
      });
      
      placesService.current = new google.maps.places.PlacesService(map);
    }
  }, []);

  useEffect(() => {
    // Close predictions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        predictionsRef.current && 
        !predictionsRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowPredictions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!search || search.length < 3 || !autocompleteService.current) {
        setPredictions([]);
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await new Promise<google.maps.places.AutocompletePrediction[]>(
          (resolve, reject) => {
            autocompleteService.current!.getPlacePredictions(
              { input: search },
              (predictions, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                  resolve([]);
                  return;
                }
                resolve(predictions);
              }
            );
          }
        );
        
        setPredictions(response);
        if (response.length > 0) {
          setShowPredictions(true);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Use a debounce for the API calls
    const timer = setTimeout(() => {
      fetchPredictions();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handlePredictionSelect = (placeId: string, description: string) => {
    if (!placesService.current) return;
    
    setIsLoading(true);
    
    placesService.current.getDetails(
      { placeId: placeId, fields: ["name", "formatted_address", "geometry"] },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          onLocationSelect({
            placeId,
            name: place.name || description,
            address: place.formatted_address || description,
            lat,
            lng,
          });
          
          setSearch(place.name || description);
        }
        
        setIsLoading(false);
        setShowPredictions(false);
      }
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Entrez un lieu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search.length >= 3 && predictions.length > 0 && setShowPredictions(true)}
          className="pl-10 pr-4 py-5 rounded-lg w-full"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {showPredictions && predictions.length > 0 && (
        <div 
          ref={predictionsRef}
          className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <ul className="divide-y">
            {predictions.map((prediction) => (
              <li 
                key={prediction.place_id}
                className="p-3 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handlePredictionSelect(prediction.place_id, prediction.description)}
              >
                <div className="font-medium">{prediction.structured_formatting?.main_text || prediction.description}</div>
                {prediction.structured_formatting?.secondary_text && (
                  <div className="text-sm text-muted-foreground">
                    {prediction.structured_formatting.secondary_text}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}