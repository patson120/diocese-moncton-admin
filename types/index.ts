export type Message = {
    id: number;
    titre_fr: string;
    titre_en: string,
    message_fr: string;
    message_en: string,
    archeveque_id: number;
    prevId: number | null;
    nextId: number | null;
    etat: number;
    created_at: string;
    updated_at: string;
    message: string;
    archeveque: Archeveque;
}

export type Archeveque = {
    id: number;
    name: string;
    photo: string;
    created_at: string;
    updated_at: string;
}

export type Category = {
    id: number;
    parent_id: number;
    intitule_fr: string;
    intitule_en: string;
    menu: string;
    created_at: string;
    updated_at: string;
}



export type Actualite = {
    id: number;
    categorie_id: number;
    titre_fr: string;
    titre_en: string;
    date_publication: string;
    is_brouillon: number;
    is_planifier: number;
    date_planification: any;
    description_fr: string;
    description_en: string;
    prevId: number | null;
    nextId: number | null;
    created_at: string;
    updated_at: string;
    categorie: Category;
    motcles: string[]
}