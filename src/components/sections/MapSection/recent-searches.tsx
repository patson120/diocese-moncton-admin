"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, X } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Location } from "@/app/types";

interface RecentSearchesProps {
  searches: Location[];
  onSelect: (location: Location) => void;
}

export function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  const [expanded, setExpanded] = useState(false);
  
  if (searches.length === 0) {
    return null;
  }
  
  const displayedSearches = expanded ? searches : searches.slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2">
          {displayedSearches.map((location) => (
            <li 
              key={location.placeId}
              className="flex items-start gap-2 border rounded-md p-2 hover:bg-secondary/50 transition-colors cursor-pointer"
              onClick={() => onSelect(location)}
            >
              <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{location.name}</p>
                <p className="text-xs text-muted-foreground truncate">{location.address}</p>
              </div>
            </li>
          ))}
        </ul>
        
        {searches.length > 3 && (
          <>
            <Separator />
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-muted-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : `Show ${searches.length - 3} More`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}