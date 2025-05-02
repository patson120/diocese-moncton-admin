"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  badgeClassName?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
  badgeClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelect = (value: string) => {
    onChange([...selected, value]);
    setInputValue("");
  };

  const selectedOptions = selected.map(
    (value) => options.find((option) => option.value === value)?.label || value
  );

  return (
    <Command
      className={cn(
        "overflow-visible bg-background rounded-lg border border-input",
        className
      )}
    >
      <div className="group relative flex min-h-[40px] w-full items-center overflow-hidden rounded-md bg-background px-3 py-2 text-sm ring-offset-background">
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => (
            <Badge
              key={value}
              variant="secondary"
              className={cn(
                "flex items-center gap-1 px-2 py-1",
                badgeClassName
              )}
            >
              {options.find((option) => option.value === value)?.label || value}
              <button
                type="button"
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(value);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(value)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            placeholder={selected.length === 0 ? placeholder : undefined}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-1 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-[300px]">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    disabled={option.disabled}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      if (isSelected) {
                        handleUnselect(option.value);
                      } else {
                        handleSelect(option.value);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent",
                      isSelected ? "bg-accent/50" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50"
                      )}
                    >
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
              {options.length === 0 && (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}