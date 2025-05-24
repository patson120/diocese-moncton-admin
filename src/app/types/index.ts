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
    is_actif: number;
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
    galerie: Image[]
}
export type Paroisse = {
    id: number;
    type_paroisse_id: number;
    nom: string;
    nom_en: string;
    adresse: string;
    telephone: string;
    email: string;
    site_web: string;
    statut: number,
    code_postal: string;
    lien_youtube: string;
    pretre_responsable: string;
    gps: string;
    histoire: string;
    histoire_en: string;
    created_at: string;
    updated_at: string;
    galerie: Image[];
    type: TypeParoisse;
    horaireparoisses: Horaire[];
    etabli_le: number | null,
    ordonne_le: number | null,
    premier_cure: number | null,
}
export type TypeParoisse = {
    id: number;
    intitule_fr: string;
    intitule_en: string;
    couleur: string;
    gps: string;
    created_at: string;
    updated_at: string;
    paroisses: Paroisse[]
}

export type Horaire = {
    id: number;
    paroisse_id: number;
    jour: string;
    heure: string;
    created_at: string;
    updated_at: string;
}
export type Event = {
    id: number;
    paroisse_id: number;
    categorie_id: number;
    titre_fr: string;
    titre_en: string;
    heure_event: string;
    date_event: string;
    prevId: number | null;
    nextId: number | null;
    lieu: string;
    gps: string;
    etat: number;
    contact: string;
    description_fr: string;
    description_en: string;
    created_at: string;
    updated_at: string;
    paroisse: Paroisse;
    categorie: Category;
    galerie: Image[];
}
export type Image = {
    id: number;
    titre: string | null;
    path: string;
    path_en: string | null;
    label: string;
    value: number;
    comment: string;
    created_at: string;
    updated_at: string;
}
export type Member = {
    id: number;
    categorie_id: number;
    image: string;
    nom: string;
    prenom: string;
    poste: string;
    description_fr: string;
    description_en: string;
    coordonnees: string;
    etat: number;
    unites: TypeParoisse[]
    created_at: string;
    updated_at: string;
    categorie: Category;
}

export type Role = {
    id: number;
    intitule: string;
    sigle:  string;
    created_at: string;
    updated_at: string;
}

export type User = {
    id: number;
    nom: string;
    email: string;
    statut: number;
    password: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    privilege: string[];
    role: Role;
}

export type Location = {
    placeId: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
};

export type Ressource = {
    id: number;
    categorie_id: number | null;
    titre_fr: string;
    titre_en: string | null;
    type: string;
    media: string;
    description_fr: string | null;
    description_en: string | null;
    created_at: string;
    updated_at: string;
    categorie: any;
}