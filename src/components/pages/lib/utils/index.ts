
import { apiClient } from "@/lib/axios";
import { generatePageHtml } from "./html-generator";
import { Page as PageType } from "@/app/types";
import { Page } from "../types";

export const handleCreatePage = async (page: Page) => {
  try {
    return await apiClient.post("/api/pages", {
      is_publier: 1,
      is_planifier: 0,
      titre: page.title,
      description: page.title,
      contenu_html: generatePageHtml(page),
      contenu_json: JSON.stringify(page)
    })
  } catch (error) {
    console.log(error)
  }
}

export const handleUpdatePage = async (page: Page) => {
  try {
    return await apiClient.put(`/api/pages/${page.id}`, {
      is_publier: 1,
      is_planifier: 0,
      titre: page.title,
      description: page.title,
      contenu_html: generatePageHtml(page),
      contenu_json: JSON.stringify(page)
    })
  } catch (error) {
    console.log(error)
  }
}

export const handleReadPage = async (pageId: string): Promise<Page | undefined> => {
  try {
    const pageFound = await apiClient.get(`/api/pages/${pageId}`) as PageType
    return JSON.parse(pageFound!.contenu_json!) as Page;
  } catch (error) {
    console.log(error)
    return undefined
  }
}
