
  

import { apiClient } from '@/lib/axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MediaFile, MediaFolder, MediaManagerState } from '../types/media';

export const useDocumentManager = () => {
  const [state, setState] = useState<MediaManagerState>({
    folders: [],
    currentFolders: [],
    currentFolder: null,
    selectedFiles: [],
    searchQuery: '',
    viewMode: 'grid',
    sortBy: 'name',
    sortOrder: 'asc'
  })

  const updateFolder = useCallback((folderId: string, updates: Partial<MediaFolder>) => {
    putFolder(Number(folderId), updates.name!)
    setState(prev => ({
      ...prev,
      folders: updateFolderInTree(prev.folders, folderId, updates)
    }));
  }, [])

  const updateFolderInTree = (folders: MediaFolder[], folderId: string, updates: Partial<MediaFolder>): MediaFolder[] => {
    return folders.map((folder) => {
      if (folder.id === folderId) {
        return { ...folder, ...updates };
      }
      if (folder.children.length > 0) {
        return {
          ...folder,
          children: updateFolderInTree(folder.children, folderId, updates)
        };
      }
      return folder;
    });
  }

  const createFolder = useCallback( async(parentId: string, name: string) => {
    const newFolder: MediaFolder = {
      id: Date.now().toString(),
      name,
      path: parentId ? `${parentId}/${name}` : `/${name}`,
      parentId,
      children: [],
      files: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
      isExpanded: false,
      color: '#6b7280'
    };
    if (parentId){
      const id = await postFolder(Number(parentId), name)
      setState(prev => ({
        ...prev,
        folders: addFolderToTree(prev.folders, parentId, {...newFolder, id})
      }))
    }
    else {
      const id = await postFolder(0, name,)
      setState(prev => ({
        ...prev,
        folders: prev.folders.concat({...newFolder, id})
      }))
    }

  }, [])

  const postFolder = async (parent_id: number, titre: string) => {
    const response: any = await apiClient.post(`/api/dossiers`, {
      parent_id: parent_id,
      titre_fr: titre,
      titre_en: titre,
      menu: "document"
    })
    return response.id
  }

  const putFolder = async (folder_id: number, titre: string) => {
    await apiClient.put(`/api/dossiers/${folder_id}`, {
      titre_fr: titre,
      titre_en: titre,
    })
  }

  const dropFolder = async (folder_id: number) => {
    await apiClient.delete(`/api/dossiers/${folder_id}`)
  }

  const getFolderList = (list: any[]) => {
    return list.map(dossier => ({
      id: dossier.id,
      name: dossier.titre_fr,
      path: dossier.parent_id ? `${dossier.parent_id}/${dossier.titre_fr}` : `/${dossier.titre_fr}`,
      parentId: dossier.parent_id,
      children: [],
      files: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
      isExpanded: false,
      color: dossier.id % 2 ? '#3b82f6' : dossier.id % 3 ? '#7c3aed' : '#6b7280'
    }) ) as MediaFolder[]
  }

  const fetchFoldersFromApi = async (parentId: string = '0') => {
    try {
      const response: any[] = await apiClient.get(`/api/dossiers?menu=document&parent_id=${parentId}`);
      return getFolderList(response); // Transforme les données en MediaFolder[]
    } catch (error) {
      console.error("Erreur lors du chargement des dossiers :", error);
      return [];
    }
  }

  const addFolderToTree = (folders: MediaFolder[], parentId: string, newFolder: MediaFolder): MediaFolder[] => {
    return folders.map(folder => {
      if (folder.id === parentId) {
        const found = folder.children.findIndex( f => f.id === newFolder.id )
        if (found !== -1) {
          const data = folder.children
          data[found] = newFolder
          return {
            ...folder,
            children: data
          }
        }
        
        return {
          ...folder,
          isExpanded: true,
          children: [...folder.children, newFolder],
          modifiedAt: new Date()
        }
      }
      if (folder.children.length > 0) {
        return {
          ...folder,
          children: addFolderToTree(folder.children, parentId, newFolder)
        };
      }
      return folder;
    });
  }

  const deleteFolder = useCallback( async (folderId: string) => {
    await dropFolder(Number(folderId))
    setState(prev => ({
      ...prev,
      folders: removeFolderFromTree(prev.folders, folderId),
      currentFolder: prev.currentFolder?.id === folderId ? null : prev.currentFolder
    }))
  }, [])

  const removeFolderFromTree = (folders: MediaFolder[], folderId: string): MediaFolder[] => {
    return folders.filter(folder => folder.id !== folderId).map(folder => ({
      ...folder,
      children: removeFolderFromTree(folder.children, folderId)
    }));
  };

  const toggleFolder = useCallback((folderId: string) => {
    updateFolder(folderId, { isExpanded: !getFolderById(state.folders, folderId)?.isExpanded });
  }, [state.folders, updateFolder])

  const getFolderById = (folders: MediaFolder[], folderId: string): MediaFolder | null => {
    for (const folder of folders) {
      if (folder.id === folderId) return folder;
      const found = getFolderById(folder.children, folderId);
      if (found) return found;
    }
    return null;
  };

  const setCurrentFolder = useCallback( async(folder: MediaFolder | null) => {
    setState(prev => ({
      ...prev,
      currentFolder: folder
    }))
    // if(!folder || folder.children.length) return
    if(!folder) return

    const childrenFolders = await fetchFoldersFromApi(folder.id);

    const updatedFolder: MediaFolder = {
      ...folder,
      children: childrenFolders,
      isExpanded: true,
      modifiedAt: new Date()
    }
    setState(prev => {
      let newList = prev.folders
      childrenFolders.forEach(item => {
        newList = addFolderToTree(newList, folder.id, item)
      })
      return {
        ...prev,
        folders: newList,
        currentFolder: updatedFolder,
        currentFolders: childrenFolders
      }
    })
  }, [])

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, [])

  const setViewMode = useCallback((mode: 'grid' | 'list') => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, [])

  const setSortBy = useCallback((sortBy: 'name' | 'date' | 'size' | 'type') => {
    setState(prev => ({ ...prev, sortBy }));
  }, [])

  const setSortOrder = useCallback((sortOrder: 'asc' | 'desc') => {
    setState(prev => ({ ...prev, sortOrder }));
  }, [])

  const toggleFileSelection = useCallback((fileId: string) => {
    setState(prev => ({
      ...prev,
      selectedFiles: prev.selectedFiles.includes(fileId)
        ? prev.selectedFiles.filter(id => id !== fileId)
        : [...prev.selectedFiles, fileId]
    }));
  }, [])

  const selectAllFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedFiles: filteredFiles.map(file => file.id)
    }));
  }, [])

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedFiles: [] }));
  }, [])

  const toggleFileFavorite = useCallback((fileId: string) => {
    setState(prev => ({
      ...prev,
      folders: prev.folders.map(folder => ({
        ...folder,
        files: folder.files.map(file => 
          file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file
        ),
        children: folder.children.map(child => ({
          ...child,
          files: child.files.map(file => 
            file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file
          )
        }))
      }))
    }));
  }, [])

  const filteredFiles = useMemo(() => {
    if (!state.currentFolder) return [];
    
    let files = state.currentFolder.files;
    
    if (state.searchQuery) {
      files = files.filter(file => 
        file.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    }
    
    return files.sort((a, b) => {
      let aValue, bValue;
      
      if (state.sortBy === 'date') {
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
      } else {
        aValue = a[state.sortBy as keyof Pick<MediaFile, 'name' | 'size' | 'type'>];
        bValue = b[state.sortBy as keyof Pick<MediaFile, 'name' | 'size' | 'type'>];
      }
      
      const modifier = state.sortOrder === 'asc' ? 1 : -1;
      
      if (aValue < bValue) return -1 * modifier;
      if (aValue > bValue) return 1 * modifier;
      return 0;
    });
  }, [state.currentFolder, state.searchQuery, state.sortBy, state.sortOrder])

  const allFiles = useMemo(() => {
    const getAllFiles = (folders: MediaFolder[]): MediaFile[] => {
      let files: MediaFile[] = [];
      folders.forEach(folder => {
        files = [...files, ...folder.files];
        if (folder.children.length > 0) {
          files = [...files, ...getAllFiles(folder.children)];
        }
      });
      return files;
    };
    return getAllFiles(state.folders);
  }, [state.folders])

  const favoriteFiles = useMemo(() => {
    return allFiles.filter(file => file.isFavorite);
  }, [allFiles])

  const recentFiles = useMemo(() => {
    return [...allFiles]
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
      .slice(0, 10);
  }, [allFiles])

  

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folderList = await fetchFoldersFromApi();
          setState(prev => ({
            ...prev,
            folders: folderList
        }))
      } catch (error) {
        console.error("Erreur lors du chargement des dossiers :", error);
      }
    }
    fetchFolders()
  }, [])

  return {
    state,
    updateFolder,
    createFolder,
    deleteFolder,
    toggleFolder,
    setCurrentFolder,
    setSearchQuery,
    setViewMode,
    setSortBy,
    setSortOrder,
    toggleFileSelection,
    selectAllFiles,
    clearSelection,
    toggleFileFavorite,
    filteredFiles,
    allFiles,
    favoriteFiles,
    recentFiles,
    getFolderById
  }
}