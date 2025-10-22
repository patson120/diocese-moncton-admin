
import { Page as PageType } from "@/app/types";
import { apiClient } from "@/lib/axios";
import { Page } from "../types";
import { generatePageHtml } from "./html-generator";

export const handleCreatePage = async (page: Page) => {
  try {
    return await apiClient.post("/api/pages", {
      is_publier: 1,
      is_planifier: 0,
      titre_fr: page.title_fr,
      titre_en: page.title_en,
      description_fr: page.title_fr,
      description_en: page.title_en,
      contenu_html_fr: generatePageHtml(page, "fr"),
      contenu_html_en: generatePageHtml(page, "en"),
      contenu_json_fr: JSON.stringify(page),
      contenu_json_en: null
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
      titre_fr: page.title_fr,
      titre_en: page.title_en,
      description_fr: page.title_fr,
      description_en: page.title_en,
      contenu_html_fr: generatePageHtml(page, "fr"),
      contenu_html_en: generatePageHtml(page, "en"),
      contenu_json_fr: JSON.stringify(page),
      contenu_json_en: null
    })
  } catch (error) {
    console.log(error)
  }
}

export const handleReadPage = async (pageId: string): Promise<Page | undefined> => {
  try {
    const pageFound = await apiClient.get(`/api/pages/${pageId}`) as PageType
   
    /* const page = JSON.parse(pageFound!.contenu_json_fr!) 
    return { 
      ...page, 
      title_fr: page.title,
      title_en: page.title,
      description_fr: page.description_fr,
      description_en: page.description_en,
      components_fr: page["components"],
      components_en: page["components"],
    } as Page */ 
  
    return JSON.parse(pageFound!.contenu_json_fr!) as Page
  } catch (error) {
    console.log(error)
    return undefined
  }
}
