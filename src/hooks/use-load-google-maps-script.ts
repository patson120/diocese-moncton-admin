"use client";

import { useState, useEffect } from "react";

// This fake API key will be replaced with a real one that the user provides
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;


export function useLoadGoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Define callbacks
    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setLoadError(true);
      document.body.removeChild(script);
    };

    // Append script to body
    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts before script loads
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return { isLoaded, loadError };
}

// https://maps.googleapis.com/maps/api/js?key=AIzaSyDi7kH5lqvLMV8zpQiXlW0xDvcZwQ-XGrg&libraries=places