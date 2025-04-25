"use client";

import { Event } from "@/app/types/event";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MapPin, Clock, Tag } from "lucide-react";

interface EventDetailsDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">{event.description}</p>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {format(new Date(event.startDate), "PPP 'à' HH:mm", { locale: fr })}
              {" - "}
              {format(new Date(event.endDate), "PPP 'à' HH:mm", { locale: fr })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.location.address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4" />
            <span className="capitalize">{event.type}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}