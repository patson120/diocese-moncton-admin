import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FolderPlus, RefreshCw, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { Breadcrumb } from './Breadcrumb'
import { Separator } from '@/components/ui/separator'
import { MediaViewer } from './MediaViewer'
import { FolderTree } from './FolderTree'
import { useMediaManager } from './hooks/useMediaManager'

type ViewType = 'folder' | 'favorites' | 'recent';

export default function Folders() {
  const {
    state,
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
    getFolderById,
    updateFolder
  } = useMediaManager();

  const [currentView, setCurrentView] = useState<ViewType>('folder');

  const handleShowFavorites = () => {
    setCurrentView('favorites');
    setCurrentFolder(null);
  };

  const handleShowRecent = () => {
    setCurrentView('recent');
    setCurrentFolder(null);
  };

  const handleFolderSelect = (folder: any) => {
    setCurrentView('folder');
    setCurrentFolder(folder);
  };

  const getCurrentFiles = () => {
    switch (currentView) {
      case 'favorites':
        return favoriteFiles;
      case 'recent':
        return recentFiles;
      default:
        return filteredFiles;
    }
  };

  const getCurrentTitle = () => {
    switch (currentView) {
      case 'favorites':
        return 'Favoris';
      case 'recent':
        return 'Fichiers récents';
      default:
        return state.currentFolder ? state.currentFolder.name : 'Tous les fichiers';
    }
  };

  const totalSize = allFiles.reduce((acc, file) => acc + file.size, 0);
  const formatTotalSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-220px)] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Navigation</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => createFolder('1', 'Nouveau dossier')}
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
                  <FolderTree
                    folders={state.folders}
                    currentFolder={state.currentFolder}
                    onFolderSelect={handleFolderSelect}
                    onToggleFolder={toggleFolder}
                    onCreateFolder={createFolder}
                    onUpdateFolder={updateFolder}
                    onDeleteFolder={deleteFolder}
                    onShowFavorites={handleShowFavorites}
                    onShowRecent={handleShowRecent}
                    favoriteCount={favoriteFiles.length}
                    recentCount={recentFiles.length}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <Card className="h-[calc(100vh-220px)] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Breadcrumb
                    currentFolder={state.currentFolder}
                    folders={state.folders}
                    onFolderSelect={handleFolderSelect}
                    getFolderById={getFolderById}
                    isSpecialView={currentView !== 'folder'}
                    specialViewTitle={currentView === 'favorites' ? 'Favoris' : currentView === 'recent' ? 'Récents' : undefined}
                  />
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-4">
                <div className="h-full">
                  <MediaViewer
                    files={getCurrentFiles()}
                    viewMode={state.viewMode}
                    selectedFiles={state.selectedFiles}
                    sortBy={state.sortBy}
                    sortOrder={state.sortOrder}
                    onFileSelect={toggleFileSelection}
                    onViewModeChange={setViewMode}
                    onSortChange={setSortBy}
                    onSortOrderChange={setSortOrder}
                    onSelectAll={selectAllFiles}
                    onClearSelection={clearSelection}
                    onToggleFavorite={toggleFileFavorite}
                    title={getCurrentTitle()}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
    </div>
  )
}
