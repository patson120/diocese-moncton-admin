"use client";

import { Image as ImageType, Ressource } from '@/app/types';
import { LoadingSpinner } from '@/components/sections/MapSection/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import useRole from '@/hooks/use-role';
import { apiClient } from '@/lib/axios';
import { cn } from '@/lib/utils';
import {
  CheckSquare,
  Download,
  Edit2,
  FileText,
  Folder,
  FolderPlus,
  Heart,
  Image as ImageIcon,
  InfoIcon,
  MoreHorizontal,
  MoreHorizontalIcon,
  Music,
  Notebook,
  Share2,
  Square,
  Trash2,
  Video
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AddDocumentFormSection } from '../forms/AddDocumentFormSection';
import { MediaFile, MediaFolder } from './types/media';

interface DocumentViewerProps {
  files: MediaFile[];
  currentFolder: MediaFolder | null;
  currentFolders: MediaFolder[];
  folders: MediaFolder[];
  onFolderSelect: (folder: any) => void;
  onDeleteFolder: (folderId: string) => Promise<void>;
  onUpdateFolder: (folderId: string, updates: Partial<MediaFolder>) => void;
  onCreateFolder: (parentId: string, name: string) => void;
  getFolderById: (folders: MediaFolder[], folderId: string) => MediaFolder | null;
  viewMode: 'grid' | 'list';
  selectedFiles: string[];
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
  onFileSelect: (fileId: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sortBy: 'name' | 'date' | 'size' | 'type') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onToggleFavorite: (fileId: string) => void;
  title?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: MediaFile['type']) => {
  switch (type) {
    case 'image': return <ImageIcon className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    case 'audio': return <Music className="h-4 w-4" />;
    case 'document': return <FileText className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getFileTypeColor = (type: MediaFile['type']) => {
  switch (type) {
    case 'image': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'video': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'audio': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'document': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const FileCard: React.FC<{
  file: MediaFile;
  isSelected: boolean;
  onSelect: (fileId: string) => void;
  onToggleFavorite: (fileId: string) => void;
}> = ({ file, isSelected, onSelect, onToggleFavorite }) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group relative",
        isSelected && "ring-2 ring-blue-500 shadow-md"
      )}
      onClick={() => onSelect(file.id)}
    >
      <CardContent className="p-3">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 overflow-hidden relative">
          {file.type === 'image' && file.thumbnail ? (
            <img 
              src={file.thumbnail} 
              alt={file.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-2xl">
                {getFileIcon(file.type)}
              </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onToggleFavorite(file.id)}>
                  <Heart className="h-4 w-4 mr-2" />
                  {file.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {file.isFavorite && (
            <div className="absolute top-2 left-2">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </div>
          )}

          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(file.id);
              }}
            >
              {isSelected ? (
                <CheckSquare className="h-4 w-4 text-blue-600" />
              ) : (
                <Square className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm truncate" title={file.name}>{file.name}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatFileSize(file.size)}</span>
            <Badge variant="secondary" className={cn("text-xs border", getFileTypeColor(file.type))}>
              {file.type}
            </Badge>
          </div>
          
          {file.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {file.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {file.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{file.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const FileRow: React.FC<{
  file: MediaFile;
  isSelected: boolean;
  onSelect: (fileId: string) => void;
  onToggleFavorite: (fileId: string) => void;
}> = ({ file, isSelected, onSelect, onToggleFavorite }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-accent/50 group transition-all duration-200",
        isSelected && "bg-accent shadow-sm"
      )}
      onClick={() => onSelect(file.id)}
    >
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(file.id);
          }}
        >
          {isSelected ? (
            <CheckSquare className="h-4 w-4 text-blue-600" />
          ) : (
            <Square className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="flex-shrink-0">
        {file.type === 'image' && file.thumbnail ? (
          <img 
            src={file.thumbnail} 
            alt={file.name}
            className="w-10 h-10 object-cover rounded"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded flex items-center justify-center">
            {getFileIcon(file.type)}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm truncate">{file.name}</h3>
          {file.isFavorite && (
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{formatFileSize(file.size)}</span>
          <Badge variant="secondary" className={cn("text-xs border", getFileTypeColor(file.type))}>
            {file.type}
          </Badge>
          <span>{file.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {file.tags.length > 0 && (
          <div className="flex gap-1">
            {file.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onToggleFavorite(file.id)}>
                <Heart className="h-4 w-4 mr-2" />
                {file.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  files,
  folders,
  currentFolder,
  currentFolders,
  onFolderSelect,
  onDeleteFolder,
  onUpdateFolder,
  onCreateFolder,
  getFolderById,
  viewMode,
  selectedFiles,
  sortBy,
  sortOrder,
  onFileSelect,
  onViewModeChange,
  onSortChange,
  onSortOrderChange,
  onSelectAll,
  onClearSelection,
  onToggleFavorite,
  title = "Fichiers"
}) => {

  const { canDeleteDocument,  } = useRole()

  const [loading, setLoading] = useState(false)
    
  const [images, setImages] = useState<ImageType[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [ressources, setRessources] = useState<Ressource[]>([])


  useEffect(() => {
    ( async () => {
      setLoading(true)
      try {
        const url = currentFolder?.id! ? `/api/ressources?type=document&dossier_id=${currentFolder?.id!}` : '/api/ressources?type=document'
        const response: Ressource[] = await apiClient.get(url);
        setRessources(response)
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }) ()
  }, [currentFolder?.id])

  const handleSaveEdit = (folder: MediaFolder) => {
    if (editName.trim() && editName !== folder.name) {
      onUpdateFolder(folder.id, { name: editName.trim() });
      currentFolders = currentFolders.map(f => {
        if (f.id === folder.id){
          return {
            ...f,
            name: editName.trim()
          }
        }
        return f
      })
    }
    setIsEditing(false);
  };

  const handleEdit = (folder: MediaFolder) => {
    setIsEditing(true);
    setEditName(folder.name);
  };

  const handleCreateFolder = (folder: MediaFolder) => {
    onCreateFolder(folder.id, "Nouveau dossier");
    onFolderSelect(folder)
    setNewFolderName('');
    setIsCreating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'edit' | 'create', folder: MediaFolder) => {
    if (e.key === 'Enter') {
      onFolderSelect(getFolderById( folders, folder.parentId!))
      if (action === 'edit') handleSaveEdit(folder);
      else handleCreateFolder(folder);
    } else if (e.key === 'Escape') {
      if (action === 'edit') setIsEditing(false);
      else setIsCreating(false);
    }
  };


  const deleteRessources = async (idRessource: number) => {
    if (!canDeleteDocument()){ 
      return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
    }
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await apiClient.delete(`/api/ressources/${idRessource}`)
      setRessources(prev  => prev.filter( doc  => doc.id != idRessource))
      toast.success("Ressource supprimée avec succès")
    } catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
        </div>
      )
    }
    finally {
      setIsDeleting(false)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-sm text-muted-foreground">
            {ressources.length} fichier{ressources.length > 1 ? 's' : ''}
            {selectedFiles.length > 0 && (
              <span className="ml-2 text-blue-600">
                • {selectedFiles.length} sélectionné{selectedFiles.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        { !loading && ( <AddDocumentFormSection dossier_id={currentFolder?.id} />) }
      </div>
      { 
        (ressources.length === 0 && currentFolders.length === 0 && !loading) &&
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Notebook className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun fichier</h3>
            <p className="text-muted-foreground">Il n'y a aucun fichier dans cette section</p>
          </div>
      }
      {
        (loading) &&
        <div className='py-16 flex flex-col justify-center items-center'>
          <LoadingSpinner />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {/*  Document cards grid */}
        {!loading && currentFolders.map((folder, index) => (
          <Card
            key={index}
            onClick={() => onFolderSelect(folder)}
            className="overflow-hidden rounded-lg border border-black/15 relative shrink-0 min-h-[150px] max-h-[200px] flex flex-col justify-center items-center cursor-pointer">
            <Folder className="h-10 w-10 flex-shrink-0" style={{ color: folder.color }} />
            <div className='mt-2'>
              {
                isEditing ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => handleSaveEdit(folder)}
                    onKeyDown={(e) => handleKeyPress(e, 'edit', folder)}
                    className="h-6 py-0 text-sm flex-1 z-10"
                    autoFocus
                  />
                ) : ( 
                  <div className="flex items-center gap-2 flex-1 min-w-0 z-0" onClick={() => {
                    onFolderSelect(folder)
                  }}>
                    <span className="truncate text-sm flex-1">{folder.name}</span>
                  </div>
                )
              }
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 absolute top-2 right-2 hover:bg-accent/70"
                  onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(folder)
                }}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Renommer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  setIsCreating(true)
                  handleCreateFolder(folder)
                }}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Nouveau dossier
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => {
                  onFolderSelect(currentFolders.find( f => f.id === folder.parentId))
                  onDeleteFolder(folder.id)
                }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        ))}
        { 
          !loading && ressources.map((doc, index) => (
          <Card
            key={index}
            className="bg-[#f9f9f0] rounded-2xl">
            <CardContent className="p-0">
              <div className="mt-2 mx-auto">
                <div className="flex flex-row justify-end items-center px-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                      <Button
                        variant="ghost"
                        className="w-[18px] h-[18px] p-0">
                        <MoreHorizontalIcon className="w-[18px] h-[18px]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* Dropdown menu items would go here */}
                      <DropdownMenuItem className="text-gray">
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.media}`} target="_blank" >Consulter</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteRessources(doc.id)}
                        className="text-red-500">
                        { (isDeleting ) &&
                          <Loader className="w-4 h-4 mr-2" />
                        }
                        Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                    
                  </DropdownMenu>
                </div>

                <div className="flex flex-col items-center gap-3 my-4">
                  <div className="w-[100px] h-20 bg-white rounded-2xl border border-solid border-[#d9d9d9] flex items-center justify-center">
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] uppercase text-gray text-center">
                      {doc.media.split(".")[1]}
                    </span>
                  </div>
                  <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                    {doc.titre_fr}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};