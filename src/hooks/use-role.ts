import { User } from '@/app/types';
import Cookies from 'js-cookie';

const useRole = () => {

    const currentUser = Cookies.get('user');
    const userJson: User | null = currentUser ? JSON.parse(currentUser!) : null

    const canAddUser = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateUser = (): boolean => canAddUser()
    const canDeleteUser = (): boolean => canAddUser()

    

    const canAddParish = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }

    const canUpdateParish = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }
    const canDeleteParish = (): boolean => canUpdateParish()


    const canAddParishUnit= (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }

    const canUpdateParishUnit = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }
    const canDeleteParishUnit = (): boolean => canUpdateParishUnit()


    const canAddEvent = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateEvent = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteEvent = (): boolean => canUpdateEvent()


    const canAddClergy = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateClergy = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteClergy = (): boolean => canUpdateClergy()


    const canAddImage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateImage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteImage = (): boolean => canUpdateImage()


    const canAddDocument = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateDocument = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteDocument = (): boolean => canUpdateDocument()


    const canAddVideo = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateVideo = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteVideo = (): boolean => canUpdateVideo()


    const canAddAudio = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateAudio = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteAudio = (): boolean => canUpdateAudio()

    const canAddNews = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateNews = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteNews = (): boolean => canUpdateNews()

    const canAddMessage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return false
            default: return false
        }
    }
    const canUpdateMessage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return true
            case "lecteur": return false
            case "moderateur": return true
            default: return false
        }
    }

    const canDeleteMessage = (): boolean => canUpdateMessage()

    const canAddBulletin = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return false
            case "lecteur": return false
            case "moderateur": return false
            case "bulletin": return false
            default: return false
        }
    }
    const canUpdateBulletin = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return false
            case "lecteur": return false
            case "moderateur": return false
            case "bulletin": return false
            default: return false
        }
    }

    const canDeleteBulletin = (): boolean => canUpdateBulletin()

    const isCurrentUser = (userId: number): boolean => userJson?.id! === userId

    const canAddPage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return false
            case "lecteur": return false
            case "moderateur": return false
            case "bulletin": return false
            default: return false
        }
    }
    const canUpdatePage = (): boolean => {
        switch (userJson?.role?.sigle!) {
            case "admin": return true
            case "editeur": return false
            case "lecteur": return false
            case "moderateur": return false
            case "bulletin": return false
            default: return false
        }
    }

    const canDeletePage = (): boolean => canUpdatePage()



    return {
        canAddUser,
        canUpdateUser,
        canDeleteUser,

        canAddParish,
        canUpdateParish,
        canDeleteParish,

        canAddParishUnit,
        canUpdateParishUnit,
        canDeleteParishUnit,

        canAddEvent,
        canUpdateEvent,
        canDeleteEvent,

        canAddClergy,
        canUpdateClergy,
        canDeleteClergy,

        canAddImage,
        canUpdateImage,
        canDeleteImage,

        canAddDocument,
        canUpdateDocument,
        canDeleteDocument,

        canAddVideo,
        canUpdateVideo,
        canDeleteVideo,

        canAddAudio,
        canUpdateAudio,
        canDeleteAudio,

        canAddNews,
        canUpdateNews,
        canDeleteNews,

        canAddMessage,
        canUpdateMessage,
        canDeleteMessage,

        canAddBulletin,
        canUpdateBulletin,
        canDeleteBulletin,

        isCurrentUser,

        canAddPage,
        canUpdatePage,
        canDeletePage,
    }
}

export default useRole