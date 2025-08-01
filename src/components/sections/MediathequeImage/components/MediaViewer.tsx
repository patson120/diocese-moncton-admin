"use client";

import { Image as ImageType } from '@/app/types';
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
import { Loader } from '@/components/ui/loader';
import useRole from '@/hooks/use-role';
import { apiClient } from '@/lib/axios';
import { cn } from '@/lib/utils';
import {
  CheckSquare,
  Download,
  Eye,
  FileText,
  Folder,
  Heart,
  Image as ImageIcon,
  InfoIcon,
  MoreHorizontal,
  Music,
  Share2,
  Square,
  Trash2Icon,
  Video
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MediaFile, MediaFolder } from './types/media';
import { LoadingSpinner } from '../../MapSection/loading-spinner';

interface MediaViewerProps {
  files: MediaFile[];
  currentFolder: MediaFolder | null;
  currentFolders: MediaFolder[];
  onFolderSelect: (folder: any) => void;
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

export const MediaViewer: React.FC<MediaViewerProps> = ({
  files,
  currentFolder,
  currentFolders,
  onFolderSelect,
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
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'name': return 'Nom';
      case 'date': return 'Date';
      case 'size': return 'Taille';
      case 'type': return 'Type';
      default: return 'Nom';
    }
  };



  // Image

  const { canDeleteImage } = useRole()

  const [loading, setLoading] = useState(false)
    
  const [images, setImages] = useState<ImageType[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageType | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    ( async () => {
      setLoading(true)
      try {
        const url = currentFolder?.id! ? `/api/galeries?dossier_id=${currentFolder?.id!}` : '/api/galeries'
        const response: ImageType[] = await apiClient.get(url);
        setImages(response)
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }) ()
    
  }, [currentFolder?.id])

  const handleDeleteImage = async (img?: ImageType) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette image ?")) return
    if (!canDeleteImage()){ 
      return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
    }
    if (isDeleting) return;
    if (img) {
      setIsDeleting(true);
      try {
        await apiClient.delete(`/api/galeries/${ img.id}`);
        setImages(images.filter(image => image.id !== img.id));
        setSelectedImage(undefined);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
      finally {
        setIsDeleting(false);
      }
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-sm text-muted-foreground">
            {images.length} fichier{images.length > 1 ? 's' : ''}
            {selectedFiles.length > 0 && (
              <span className="ml-2 text-blue-600">
                • {selectedFiles.length} sélectionné{selectedFiles.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        {/*
        <div className="flex items-center gap-2">
          {selectedFiles.length > 0 && (
            <Button variant="outline" size="sm" onClick={onClearSelection}>
              Désélectionner
            </Button>
          )}
          
          {files.length > 0 && (
            <Button variant="outline" size="sm" onClick={onSelectAll}>
              Tout sélectionner
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {getSortLabel(sortBy)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSortChange('name')}>
                Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('date')}>
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('size')}>
                Taille {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('type')}>
                Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? 'Décroissant' : 'Croissant'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => onViewModeChange('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => onViewModeChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
         */}
      </div>
      {/* 
      {
        files.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <ImageIcon className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun fichier</h3>
          <p className="text-muted-foreground">Il n'y a aucun fichier dans cette section</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              isSelected={selectedFiles.includes(file.id)}
              onSelect={onFileSelect}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              isSelected={selectedFiles.includes(file.id)}
              onSelect={onFileSelect}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}*/} 

      { 
        (images.length === 0 && currentFolders.length === 0 && !loading) &&
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <ImageIcon className="h-16 w-16 mx-auto" />
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

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      { !loading && currentFolders.map((folder, index) => (
          <Card
              key={index}
              onClick={() => onFolderSelect(folder)}
              className="overflow-hidden rounded-lg border border-black/15 relative shrink-0 min-h-[150px] max-h-[200px] flex flex-col justify-center items-center">
              <Folder className="h-10 w-10 flex-shrink-0" style={{ color: folder.color }} />
              <div className='mt-2'>
                <p className='text-center font-semibold'>{folder.name}</p>
              </div>
              {/* 
                <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out'>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => {}} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                        { isDeleting ? <Loader className="h-5 w-5" /> : <Trash2Icon className='w-5 h-5'/>}
                      </button>
                    </div>
                </div>
              */}
          </Card>
        ))}
        { !loading && images.map((image, index) => (
          <Card
              key={index}
              className="overflow-hidden rounded-lg border-none relative shrink-0 min-h-[150px] max-h-[200px]">
              <Image
                  alt={`Image ${index + 1}`}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${image.path!}`}
                  style={{ objectFit: 'cover' }}
                  fill
                  priority
              />
              <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out'>
                  <div className='flex items-center gap-2'>
                    <button onClick={() => {setSelectedImage(image)}} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                      <Eye className='w-5 h-5'/>
                    </button>
                    <button onClick={() => handleDeleteImage(image)} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                      { isDeleting ? <Loader className="h-5 w-5" /> : <Trash2Icon className='w-5 h-5'/>}
                    </button>
                  </div>
              </div>
          </Card>
        ))}
      </div>
      <Dialog open={selectedImage != undefined} onOpenChange={() => setSelectedImage(undefined)}>
          <DialogContent aria-describedby={undefined} className="max-w-4xl p-3 rounded-2xl">
            <DialogClose onClick={() => setSelectedImage(undefined)} className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
            </DialogClose>
            <DialogHeader className='hidden'>
                <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className='w-full h-[calc(70vh)] relative rounded-xl overflow-hidden'>
              <Image
                alt={`Image details`}
                src={`${process.env.NEXT_PUBLIC_API_URL}/${selectedImage?.path!}`}
                style={{ objectFit: 'cover' }}
                fill
                priority
              />
            </div>
            <div className='flex justify-between items-center gap-3'>
              <div className='flex gap-3'>
                <Button onClick={() => setSelectedImage(undefined)} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
                  <span className="font-body-3 whitespace-nowrap">
                    Fermer
                  </span>
                </Button>
                <Button
                  onClick={() => handleDeleteImage(selectedImage)}
                  variant="outline"
                  className=" p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]">
                  { isDeleting && <Loader className="h-5 w-5 mr-2" />}
                  <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                      Supprimer
                  </span>
                </Button>
              </div>
              <div className='flex items-center gap-1'>
                <InfoIcon className='h-5 w-5' />
                <p className='text-gray'>{selectedImage?.path.split('/')[selectedImage?.path.split('/').length - 1]}</p>
              </div>
            </div>
          </DialogContent>
      </Dialog>
    </div>
  );
};