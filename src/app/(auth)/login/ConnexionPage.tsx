'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/lib/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchemaOne = z.object({
  password: z.string().min(1, "Le mot de passe est requis"),
  email: z.string().email("L'adresse email n'est pas valide"),
});
const formSchemaTwo = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
});

const formSchemaThree = z.object({
  codeotp: z.string().length(4, 'Code OTP invalide'),
});
const formSchemaFour = z.object({
  password: z.string().min(1, "Le nouveau mot de passe est requis"),
  confirmPassword: z.string().min(1, "Confirmez le nouveau mot de passe"),
});

export const ConnexionPage = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null);
  const router =  useRouter() 
  const { login } = useAuth()

  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      email: "",  
      password: "",
    },
  });
  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      email: "",  
    },
  });
  const formThree = useForm<z.infer<typeof formSchemaThree>>({
    resolver: zodResolver(formSchemaThree),
    defaultValues: {
      codeotp: "",  
    },
  });

  const formFour = useForm<z.infer<typeof formSchemaFour>>({
    resolver: zodResolver(formSchemaFour),
    defaultValues: {
      password: "",  
      confirmPassword: "",  
    },
  });

  const handleLoginUser = async (values: z.infer<typeof formSchemaOne>) => {
    if (isLoading) return 
    setIsLoading(true)
    try {
      const user = await login(values.email.trim(), values.password.trim());
      if (user) {
        // router.push('/');
        window.location.reload();
      } else {
        setError('Identifiants invalides');
      }

    } catch (error: any ) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue lors de la connexion. Erreur: {JSON.stringify(error.message)}
        </div>
      )
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (values: z.infer<typeof formSchemaTwo>) => {
    console.log(values);
    setStep(3)
  }
  const handleCodeOtp = async (values: z.infer<typeof formSchemaThree>) => {
    console.log(values);
    setStep(4)
  }
  const handleChangePassword = async (values: z.infer<typeof formSchemaFour>) => {
    console.log(values);
    setStep(1)
  }

  return (
    <div className="bg-white w-full h-screen flex flex-row justify-center">
      <div className="grid grid-cols-5 gap-4 md:gap-10 mx-5 md:m-3 w-full">
        <div className="col-span-full md:col-span-2 relative flex flex-col justify-center items-center">
          {/* Login form container */}
          <div className="flex flex-col md:w-2/3 gap-5 lg:gap-10">
            {/* Logo */}
            <div className="w-full flex justify-center items-center">
              <div className="relative w-[160px] h-[95px] shrink-0">
                <Image
                  fill
                  priority
                  className="w-ful h-full object-cover"
                  alt="logo archidiocèse de Moncton"
                  src="/photo-2024-12-08-19-09-08-1.png"
                />
              </div>
            </div>

            {/** Login user directly */}
            {
              ( step === 1) &&
              <>
                {/* Notice box */}
                <Card className="w-full bg-[#f2f2f9] rounded-xl">
                  <CardContent className="px-2 md:px-[15px] py-2.5">
                    <p className="font-body-3 text-blue text-center">
                      Cette espace est reservé uniquement aux membres du
                      diocèse de Moncton
                    </p>
                  </CardContent>
                </Card>
                <Form {...formOne}>
                  <form onSubmit={formOne.handleSubmit(handleLoginUser)} className="space-y-4">
                    {/* Form fields */}
                    <div className="flex flex-col items-start gap-16 relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                          {/* Email field */}
                          <FormField
                            control={formOne.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    id="email"
                                    {...field}
                                    type="email"
                                    // className="h-[50px] rounded-[13px]"
                                    className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                    placeholder="Entrez votre email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Password field */}
                          <FormField
                            control={formOne.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                  <div className="relative w-full">
                                    <Input
                                      id="password"
                                      {...field}
                                      type={showPassword ? 'text': 'password'}
                                      className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                      placeholder="Entrez votre mot de passe"
                                    />
                                    {
                                      showPassword ?
                                      <EyeClosed onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> :
                                      <EyeIcon onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> 
                                    }
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Forgot password link */}
                        <Button onClick={() => setStep(2)} variant={'link'} type="button" className="p-0 text-sm text-black underline">
                          Mot de passe oublié ?
                        </Button>
                      </div>

                      <div className="w-full">
                        {/* Login button */}
                        <Button type="submit" className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
                          { isLoading && <Loader className="w-5 h-5 mr-2" /> }
                          Se connecter
                        </Button>

                          {/* Return to homepage link */}
                        <div className="mt-10 text-center">  
                          <Link href="/"
                            className="text-gray text-sm underline">
                            Retour à la page d&apos;accueil
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </>
            }

            {/** Password forgot */}
            {
              ( step === 2) &&
              <>
                <div className="flex justify-center items-center">
                  <h1 className="font-bold text-3xl text-blue">Mot de passe oublié</h1>
                </div>
                <Form {...formTwo}>
                  <form onSubmit={formTwo.handleSubmit(handleForgotPassword)} className="space-y-4">
                    {/* Form fields */}
                    <div className="flex flex-col items-start gap-16 relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                          {/* Email field */}
                          <FormField
                            control={formTwo.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    id="email"
                                    {...field}
                                    type="email"
                                    className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                    placeholder="Entrez votre adresse email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <Button type="submit" className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
                          Suivant
                        </Button>

                          {/* Return to homepage link */}
                        <div className="mt-10 text-center">  
                          <Link href="/"
                            className="text-gray text-sm underline">
                            Retour à la page d&apos;accueil
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </>
            }
            {
              ( step === 3) &&
              <>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <h1 className="font-bold text-3xl text-blue">Mot de passe oublié</h1>
                  <div>
                    <p className="text-gray text-center">Un code de vérification a été envoyé à votre adresse <span className="font-semibold text-blue">xxxxx@gmail.com</span></p>
                  </div>
                </div>
                <Form {...formThree}>
                  <form onSubmit={formThree.handleSubmit(handleCodeOtp)} className="space-y-4">
                    {/* Form fields */}
                    <div className="flex flex-col items-start gap-16 relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                          {/* Email field */}
                          <FormField
                            control={formThree.control}
                            name="codeotp"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Entrez le code à 4 chiffres</FormLabel>
                                <FormControl>
                                  <Input
                                    id="opt"
                                    {...field}
                                    type="number"
                                    className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                    placeholder="Entrez votre code OTP"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <Button type="submit" className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
                          Suivant
                        </Button>

                        {/* Return to homepage link */}
                        <div className="mt-10 text-center">  
                          <Link href="/"
                            className="text-gray text-sm underline">
                            Retour à la page d&apos;accueil
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </>
            }
            {/** Login user directly */}
            {
              ( step ===  4) &&
              <>
                <div className="flex flex-col justify-center items-center space-y-4">
                  <h1 className="font-bold text-3xl text-blue">Mot de passe oublié</h1>
                  <div>
                    <p className="text-gray text-center">Réinitialiser le mot de passe</p>
                  </div>
                </div>
                <Form {...formFour}>
                  <form onSubmit={formFour.handleSubmit(handleChangePassword)} className="space-y-4">
                    {/* Form fields */}
                    <div className="flex flex-col items-start gap-16 relative self-stretch w-full">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                          {/* Email field */}
                          <FormField
                            control={formFour.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Nouveau mot de passe</FormLabel>
                                <FormControl>
                                <div className="relative w-full">
                                  <Input
                                    id="password"
                                    {...field}
                                    type={showPassword ? 'text': 'password'}
                                    className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                    placeholder="Entrez votre nouveau mot de passe"
                                  />
                                  {
                                    showPassword ?
                                    <EyeClosed onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> :
                                    <EyeIcon onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> 
                                  }
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Password field */}
                          <FormField
                            control={formFour.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Confirmez nouveau mot de passe</FormLabel>
                                <FormControl>
                                  <div className="relative w-full">
                                    <Input
                                      id="password"
                                      {...field}
                                      type={showPassword ? 'text': 'password'}
                                      className="h-12 rounded-[13px] px-3 py-3.5 border border-neutral-200 self-stretch w-full"
                                      placeholder="Confirmez le mot de passe"
                                    />
                                    {
                                      showPassword ?
                                      <EyeClosed onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> :
                                      <EyeIcon onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> 
                                    }
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                      </div>

                      <div className="w-full">
                        {/* Login button */}
                        <Button type="submit" className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
                          { isLoading && <Loader className="w-5 h-5 mr-2" /> }
                          Changer mot de passe
                        </Button>

                          {/* Return to homepage link */}
                        <div className="mt-10 text-center">  
                          <Link href="/"
                            className="text-gray text-sm underline">
                            Retour à la page d&apos;accueil
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </>
            }
            
          </div>

          {/* Copyright */}
          <div className="absolute bottom-5 left-0 right-0 text-center font-legend text-gray text-[length:var(--legend-font-size)]">
            Archidiocèse de Moncton - Tous droits reservés
          </div>
        </div>
        <div className="hidden md:block col-span-3 rounded-xl overflow-hidden">
          {/* Right side image */}
          <div className="relative w-full h-full">
            <Image
              fill
              priority
              className="w-full h-full object-cover"
              alt="image de fond de connexion"
              src="/login-bg.png"
            />
          </div>
        </div>       
      </div>
    </div>
  );
};
