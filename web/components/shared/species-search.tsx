"use client";

import { useState, useMemo } from "react";
import { Search, Shield, ShieldOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchSpecies, SPECIES_DATABASE } from "@/data/species";
import type { Species } from "@/data/types";
import { cn } from "@/lib/utils";

interface SpeciesSearchProps {
  onSelect: (species: Species) => void;
  selectedId?: string;
  className?: string;
}

export function SpeciesSearch({ onSelect, selectedId, className }: SpeciesSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    return searchSpecies(query).slice(0, 8);
  }, [query]);

  const selected = useMemo(
    () => SPECIES_DATABASE.find((s) => s.id === selectedId),
    [selectedId]
  );

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari spesies (nama ilmiah, lokal, atau Inggris)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-9"
        />
      </div>

      {selected && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
          <span className="text-sm font-medium">{selected.localName}</span>
          <span className="text-xs italic text-muted-foreground">
            ({selected.scientificName})
          </span>
          {selected.protectionStatus === "dilindungi" ? (
            <Badge variant="destructive" className="ml-auto text-[10px]">
              <Shield className="mr-1 size-3" />
              Dilindungi
            </Badge>
          ) : (
            <Badge variant="secondary" className="ml-auto text-[10px]">
              <ShieldOff className="mr-1 size-3" />
              Tidak Dilindungi
            </Badge>
          )}
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md">
          {results.map((species) => (
            <li key={species.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent",
                  selectedId === species.id && "bg-accent"
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(species);
                  setQuery("");
                  setIsOpen(false);
                }}
              >
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium">{species.localName}</div>
                  <div className="truncate text-xs italic text-muted-foreground">
                    {species.scientificName}
                  </div>
                </div>
                {species.protectionStatus === "dilindungi" && (
                  <Shield className="size-3.5 shrink-0 text-destructive" />
                )}
                {species.citesAppendix && (
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    CITES {species.citesAppendix}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-4 text-center text-sm text-muted-foreground shadow-md">
          Spesies tidak ditemukan
        </div>
      )}
    </div>
  );
}
