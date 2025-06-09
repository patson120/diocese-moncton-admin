"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Copy, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Page } from "./lib/types";
import { usePagesStore } from "./stores/pages-store";

interface PagesListProps {
  pages: Page[];
}

export function PagesList({ pages }: PagesListProps) {
  const router = useRouter();
  const { deletePage, duplicatePage } = usePagesStore();
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/builder/${id}`);
  };

  const handleDuplicate = (id: string) => {
    duplicatePage(id);
    toast.success("Page duplicated successfully");
  };

  const handleDelete = () => {
    if (pageToDelete) {
      deletePage(pageToDelete);
      setPageToDelete(null);
      toast.success("Page deleted successfully");
    }
  };

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">No pages created yet</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-md">
          Get started by creating your first page. You can add components, customize them, and preview how they'll look on your website.
        </p>
        <Button onClick={() => router.push('/builder/new')}>
          Create Your First Page
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Card key={page.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">{page.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(page.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(page.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => setPageToDelete(page.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">{page.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[180px] bg-secondary/50 relative">
                {page.preview ? (
                  <img
                    src={page.preview}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No preview available
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={page.status === "published" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {page.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between pt-4">
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page
              and all of its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}