"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface EventFormProps {
  onSubmit: (data: any) => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    value: locationValue,
    suggestions: { data: locationSuggestions },
    setValue: setLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["establishment", "geocode"],
    },
    debounce: 300,
  });

  const handleLocationSelect = async (address: string) => {
    setLocationValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setValue("location", { address, lat, lng });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input placeholder="Titre de l'événement" {...register("title", { required: true })} />
        {errors.title && <span className="text-red-500">Ce champ est requis</span>}
      </div>

      <div>
        <Textarea placeholder="Description" {...register("description")} />
      </div>

      <div>
        <Select onValueChange={(value: any) => setValue("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Type d'événement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Réunion</SelectItem>
            <SelectItem value="conference">Conférence</SelectItem>
            <SelectItem value="workshop">Atelier</SelectItem>
            <SelectItem value="holiday">Congé</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: fr }) : "Date de début"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setValue("startDate", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: fr }) : "Date de fin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setValue("endDate", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Command>
          <CommandInput
            placeholder="Rechercher un lieu..."
            value={locationValue}
            onValueChange={(value) => setLocationValue(value)}
          />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {locationSuggestions.length > 0 && (
            <CommandGroup>
              {locationSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  onSelect={() => handleLocationSelect(suggestion.description)}>
                  {suggestion.description}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </div>

      <Button type="submit" className="w-full">
        Créer l'événement
      </Button>
    </form>
  );
}