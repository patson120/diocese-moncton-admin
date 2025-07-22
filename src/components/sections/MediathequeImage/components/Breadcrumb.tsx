"use client";

import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';
import React, { useMemo } from 'react';
import { MediaFolder } from './types/media';

interface BreadcrumbProps {
  currentFolder: MediaFolder | null;
  folders: MediaFolder[];
  onFolderSelect: (folder: MediaFolder | null) => void;
  getFolderById: (folders: MediaFolder[], folderId: string) => MediaFolder | null;
  isSpecialView?: boolean;
  specialViewTitle?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentFolder,
  folders,
  onFolderSelect,
  getFolderById,
  isSpecialView = false,
  specialViewTitle,
}) => {
  // Optimisation : Calculer le chemin uniquement lorsque `currentFolder` ou `folders` change
  const path = useMemo(() => {
    if (!currentFolder) return [];

    const path: MediaFolder[] = [];
    let current: MediaFolder | null = currentFolder;

    const visited = new Set<string>(); // Pour éviter les boucles infinies

    while (current) {
      if (visited.has(current.id)) {
        console.warn("Référence circulaire détectée dans les dossiers.");
        break;
      }
      visited.add(current.id);

      path.unshift(current);
      current = current.parentId ? getFolderById(folders, current.parentId) : null;
    }

    return path;
  }, [currentFolder, folders, getFolderById]);

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Bouton pour revenir à la racine */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={() => onFolderSelect(null)}
      >
        <Home className="h-4 w-4" />
      </Button>

      {/* Vue spéciale ou chemin normal */}
      {isSpecialView ? (
        <>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{specialViewTitle}</span>
        </>
      ) : (
        path.map((folder, index) => (
          <React.Fragment key={folder.id}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 font-medium text-foreground hover:bg-accent"
              onClick={() => onFolderSelect(folder)}
            >
              {folder.name}
            </Button>
          </React.Fragment>
        ))
      )}
    </div>
  );
};