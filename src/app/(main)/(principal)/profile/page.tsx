"use client";

import { User } from '@/app/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import {
    Calendar,
    Camera,
    Check,
    Edit,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Save,
    User as UserIcon,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Schemas de validation
const profileSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null)

    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: user!,
    });

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        },
    })

    const handleProfileSubmit = async (data: ProfileFormData) => {
        setIsEditing(true)
        try {
            const updateUser = {
                role_id: user?.role_id,
                nom: data.nom!,
                email: data.email,
                statut: user?.statut
            }
            const response: any = await apiClient.put(`/api/administrateurs/${user?.id}`, updateUser)
            if (response.id ) {
                toast.success('Profil mis à jour avec succès !');
                setUser({...response, role: user?.role });
                Cookies.set('user', JSON.stringify({...response, role: user?.role }), { expires: 7 });
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
            else  {
                toast.error(
                    <div className='p-3 bg-red-500 text-white rounded-md'>
                        Une erreur est survenue lors de la mise à jour de l'utilisateur
                    </div>
                )
            }
        }
        catch (error: any) {
            toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Erreur lors de la mise à jour de l'utilisateur {JSON.stringify(error.message)}
                </div>
            )
        }
        finally { setIsEditing(false) }
    }

    const handlePasswordSubmit = async (data: PasswordFormData) => {
        // Ici vous feriez l'appel à l'API pour changer le mot de passe
        const body = {
          id: user?.id,
          nom: user?.nom,
          email: user?.email,
          role_id: user?.role_id,
          password: data.newPassword.trim(),
          statut: user?.statut,
        };
        try {
            const response: any = await apiClient.put(`/api/administrateurs/${user?.id}`, body);
            if (response.id ) {
                toast.success('Mot de passe modifié avec succès !');
                window.localStorage.clear()
                Cookies.remove('user');
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            }
            else  {
                toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Une erreur est survenue lors de la mise à jour de l'utilisateur
                </div>
                )
            }
        }
        catch (error: any) {
          toast.error(
            <div className='p-3 bg-red-500 text-white rounded-md'>
              Erreur lors de la mise à jour de l'utilisateur {JSON.stringify(error)}
            </div>
          )
        }
    }

    const handleCancel = () => {
        profileForm.reset(user!);
        setIsEditing(false);
    };

    useEffect(() => {
        const currentUser = Cookies.get('user');
        if (currentUser){
            const profile: User = JSON.parse(currentUser!)
            setUser(profile)
            profileForm.setValue("nom", profile?.nom!)
            profileForm.setValue("email", profile?.email!)
        }       
    }, [])



    return (
        <div className="min-h-screen overflow-y-scroll v-scroll bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="max-w-7xl p-6">
                {/* Header */}
                <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Mon Profil</h1>
                <p className="text-slate-600">Gérez vos informations personnelles et vos paramètres de sécurité</p>
                </div>

                {/* Profile Header Card */}
                <Card className="mb-8 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-purple-600 h-32"></div>
                <CardContent className="relative pt-0 pb-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
                    <div className="relative">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage src={'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                            alt={`${user?.nom!}`} />
                        <AvatarFallback className="text-2xl font-semibold">
                            {user?.nom!}
                        </AvatarFallback>
                        </Avatar>
                        <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 shadow-md">
                            <Camera className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-4xl font-bold text-slate-900 mb-3">
                            {user?.nom!}
                        </h2>
                        <Badge variant="secondary" className="mb-2">{user?.role?.intitule!}</Badge>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user?.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Membre depuis {new Date(user?.created_at!).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long' 
                            })}
                        </div>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Informations personnelles
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sécurité
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                        <CardTitle>Informations personnelles</CardTitle>
                        <p className="text-sm text-slate-600">
                            Gérez vos informations personnelles et votre profil public
                        </p>
                        </div>
                        {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                        </Button>
                        ) : (
                        <div className="flex gap-2">
                            <Button 
                            onClick={profileForm.handleSubmit(handleProfileSubmit)} 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            >
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder
                            </Button>
                            <Button onClick={handleCancel} variant="outline" size="sm">
                            <X className="w-4 h-4 mr-2" />
                            Annuler
                            </Button>
                        </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className='flex flex-col gap-4'>
                            <div className=''>
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    {...profileForm.register('nom')}
                                    disabled={!isEditing}
                                    className={!isEditing ? 'bg-slate-50' : ''}
                                />
                                {   profileForm.formState.errors.nom && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {profileForm.formState.errors.nom.message}
                                    </p>
                                    )
                                }
                            </div>
                            <div className=''>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...profileForm.register('email')}
                                    disabled={!isEditing}
                                    className={!isEditing ? 'bg-slate-50' : ''}
                                />
                                {profileForm.formState.errors.email && (
                                    <p className="text-red-600 text-sm mt-1">
                                    {profileForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                        </form>
                    </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card>
                    <CardHeader>
                        <CardTitle>Changer le mot de passe</CardTitle>
                        <p className="text-sm text-slate-600">
                        Assurez-vous que votre mot de passe soit sécurisé et unique
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                            <div className="relative">
                            <Input
                                id="currentPassword"
                                type={showCurrentPassword ? 'text' : 'password'}
                                {...passwordForm.register('currentPassword')}
                                placeholder="Entrez votre mot de passe actuel"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                                ) : (
                                <Eye className="h-4 w-4" />
                                )}
                            </Button>
                            </div>
                            {passwordForm.formState.errors.currentPassword && (
                            <p className="text-red-600 text-sm mt-1">
                                {passwordForm.formState.errors.currentPassword.message}
                            </p>
                            )}
                        </div>

                        <Separator />

                        <div>
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <div className="relative">
                            <Input
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                {...passwordForm.register('newPassword')}
                                placeholder="Entrez votre nouveau mot de passe"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                                ) : (
                                <Eye className="h-4 w-4" />
                                )}
                            </Button>
                            </div>
                            {passwordForm.formState.errors.newPassword && (
                            <p className="text-red-600 text-sm mt-1">
                                {passwordForm.formState.errors.newPassword.message}
                            </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                            <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...passwordForm.register('confirmPassword')}
                                placeholder="Confirmez votre nouveau mot de passe"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                                ) : (
                                <Eye className="h-4 w-4" />
                                )}
                            </Button>
                            </div>
                            {passwordForm.formState.errors.confirmPassword && (
                            <p className="text-red-600 text-sm mt-1">
                                {passwordForm.formState.errors.confirmPassword.message}
                            </p>
                            )}
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Conseils pour un mot de passe sécurisé :</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Au moins 8 caractères
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Mélange de lettres majuscules et minuscules
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Au moins un chiffre
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Au moins un caractère spécial (!@#$%^&*)
                            </li>
                            </ul>
                        </div>

                        <Button type="submit" className="w-full bg-blue hover:bg-blue-700">
                            <Lock className="w-4 h-4 mr-2" />
                            Changer le mot de passe
                        </Button>
                        </form>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}