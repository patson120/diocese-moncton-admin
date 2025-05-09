"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Location } from "@/app/types";
interface CoordinatesDisplayProps {
  location: Location;
}

export function CoordinatesDisplay({ location }: CoordinatesDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`,
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Selected Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
          <p className="text-sm text-muted-foreground">{location.address}</p>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Latitude</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copyToClipboard(formatCoordinate(location.lat), "Latitude")}
              >
                {copied === "Latitude" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="font-mono bg-secondary p-2 rounded text-sm">
              {formatCoordinate(location.lat)}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Longitude</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copyToClipboard(formatCoordinate(location.lng), "Longitude")}
              >
                {copied === "Longitude" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="font-mono bg-secondary p-2 rounded text-sm">
              {formatCoordinate(location.lng)}
            </div>
          </div>
          
          <Button
            className="w-full"
            variant="outline"
            onClick={() => 
              copyToClipboard(
                `${formatCoordinate(location.lat)}, ${formatCoordinate(location.lng)}`,
                "Coordinates"
              )
            }
          >
            {copied === "Coordinates" ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Both
              </>
            )}
          </Button>
          
          <Button
            className="w-full"
            variant="default"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${location.placeId}`,
                "_blank"
              );
            }}
          >
            Open in Google Maps
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}