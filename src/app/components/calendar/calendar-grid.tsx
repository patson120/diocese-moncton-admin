"use client";

import { EventDetailsDialog } from "@/app/components/event-details-dialog";
import { holidays } from "@/app/lib/holidays";
import { Event, eventTypeColors } from "@/app/types/event";
import { cn } from "@/lib/utils";
import {
  daysToWeeks,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  getHours,
  isFirstDayOfMonth,
  isFriday,
  isSameDay,
  isSameMonth,
  isSaturday,
  isToday,
  isWithinInterval,
  parseISO,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
  weeksToDays
} from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { WeekNumber } from "react-day-picker";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  view: "day" | "week" | "month";
}

export function CalendarGrid({ currentDate, events, view }: CalendarGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blankDays, setblankDays] = useState<number>(0)
    

  const days = (() => {
    if (view === "month") {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      // const startDay = isSaturday(new Date(currentDate))
      return eachDayOfInterval({ start, end });
    } else if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    } else {
      return [currentDate];
    }
  })();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const getEventStyle = (event: Event) => {
    const colors = eventTypeColors[event.type];
    return cn(
      "rounded-md shadow-sm cursor-pointer transition-colors",
      "bg-gradient-to-r",
      colors.light,
      colors.dark,
      colors.hover,
      colors.darkHover
    );
  };

  const isMultiDayEvent = (event: Event) => {
    return differenceInDays(new Date(event.endDate), new Date(event.startDate)) > 0;
  };

  const getEventDurationLabel = (event: Event) => {
    const days = differenceInDays(new Date(event.endDate), new Date(event.startDate)) + 1;
    return days > 1 ? `(${days} jours)` : '';
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  const isHoliday = (date: Date) => {
    return holidays.some(holiday => isSameDay(parseISO(holiday.date), date));
  };

  const getHolidayName = (date: Date) => {
    return holidays.find(holiday => isSameDay(parseISO(holiday.date), date))?.name;
  };

  if (view === "day") {
    return (
      <>
        <div className="h-[600px] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {hours.map((hour) => {
              const currentHourEvents = events.filter(event => {
                const eventDate = new Date(event.startDate);
                return isSameDay(eventDate, currentDate) && getHours(eventDate) === hour;
              });

              return (
                <div key={hour} className="min-h-[60px] grid grid-cols-[80px_1fr] border-b">
                  <div className="p-2 text-sm text-muted-foreground">
                    {format(setHours(setMinutes(new Date(), 0), hour), "HH:mm")}
                  </div>
                  <div className="p-1">
                    {currentHourEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn("text-sm p-2 mb-1", getEventStyle(event))}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{event.title}</span>
                          {isMultiDayEvent(event) && (
                            <span className="text-xs opacity-75">{getEventDurationLabel(event)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <EventDetailsDialog
          event={selectedEvent}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </>
    );
  }

  if (view === "week") {
    return (
      <>
        <div className="h-[600px] overflow-y-auto">
          <div className="grid grid-cols-[80px_repeat(7,1fr)]">
            <div className="sticky top-0 z-10 bg-background" />
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  "sticky top-0 z-10 p-2 text-center border-b bg-background",
                  isToday(day) && "bg-blue-50 dark:bg-blue-900/20"
                )}
              >
                <div className="font-medium">{format(day, "EEE", { locale: fr })}</div>
                <div className="text-sm text-muted-foreground">{format(day, "d", { locale: fr })}</div>
              </div>
            ))}

            {hours.map((hour, index) => (
              <>
                <div key={`hour-${hour}`} className="p-2 text-sm text-muted-foreground border-b">
                  {format(setHours(setMinutes(new Date(), 0), hour), "HH:mm")}
                </div>
                {days.map((day) => {
                  const dayEvents = events.filter(event => {
                    const eventDate = new Date(event.startDate);
                    return isSameDay(eventDate, day) && getHours(eventDate) === hour;
                  });

                  return (
                    <div key={`${day.toISOString()}-${hour}`} className="border-b border-r p-1">
                      {dayEvents.map((event) => (
                          <div
                          key={event.id}
                          className={cn("text-xs p-1 truncate", getEventStyle(event))}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{event.title}</span>
                            {isMultiDayEvent(event) && (
                              <span className="text-xs opacity-75">{getEventDurationLabel(event)}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
        <EventDetailsDialog
          event={selectedEvent}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-7">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div key={day} className="p-2 text-center font-semibold bg-muted">
            {day}
          </div>
        ))}

        { 
          Array.from({length: (new Date(days[0])).getDay() - 1}).map((_, i) =>  (
            <div key={i} className="p-2 border transition-colors bg-[#f7f7f8]"></div>
          ))
        }

        {
          days.map((day) => {
          const dayEvents = getDayEvents(day);
          const holiday = isHoliday(day);
          const holidayName = getHolidayName(day);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[120px] p-2 border border-[#F1F3F6] transition-colors",
                isToday(day) && "bg-teal-100/40 dark:bg-green-900/20",
                !isSameMonth(day, currentDate) && "opacity-50",
                holiday && "bg-red-50 dark:bg-red-900/20"
              )}
            >
              <div className="font-medium flex items-center justify-between">
                <span>{format(day, "d", { locale: fr })}</span>
                {holiday && (
                <span className="text-xs text-red-600 dark:text-red-400">
                  {holidayName}
                </span>
                )}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn("text-xs p-1.5 h-max", getEventStyle(event))}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{event.title}</span>
                      {isMultiDayEvent(event) && (
                        <span className="text-xs opacity-75 ml-1 shrink-0">
                          {getEventDurationLabel(event)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <EventDetailsDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}