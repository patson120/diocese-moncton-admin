'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeClosed, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";

export const Connexion = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="bg-white w-full h-screen flex flex-row justify-center">
      <div className="grid grid-cols-5 gap-10 m-3 w-full">
        <div className="col-span-2 relative flex flex-col justify-center items-center">
          {/* Login form container */}
          <div className="flex flex-col w-2/3 gap-5 lg:gap-10">
            {/* Logo */}
            <div className="w-full flex justify-center items-center">
              <div className="relative w-[160px] h-[95px] shrink-0">
                <Image
                  fill
                  priority
                  className="w-ful h-full object-cover"
                  alt="Photo"
                  src="/photo-2024-12-08-19-09-08-1.png"
                />
              </div>
            </div>

            {/* Notice box */}
            <Card className="w-full bg-[#f2f2f9] rounded-xl">
              <CardContent className="px-[15px] py-2.5">
                <p className="font-body-3 text-blue text-center">
                  Cette espace est reservé uniquement aux membres du
                  diocèse de Moncton
                </p>
              </CardContent>
            </Card>

            {/* Form fields */}
            <div className="flex flex-col items-start gap-16 relative self-stretch w-full">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
                <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                  {/* Email field */}
                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                    <label
                      className="font-bold text-[#1c0004] text-sm"
                      htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      className="h-[50px] rounded-[13px]"
                      placeholder="Entrez votre nom d'utilisateur"
                    />
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                    <label
                      className="font-bold text-[#1c0004] text-sm"
                      htmlFor="password"
                    >
                      Mot de passe
                    </label>
                    <div className="relative w-full">
                      <Input
                        id="password"
                        type={showPassword ? 'text': 'password'}
                        className="h-[50px] rounded-[13px]"
                        placeholder="Entrez votre mot de passe"
                      />
                      {
                        showPassword ?
                        <EyeClosed onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> :
                        <EyeIcon onClick={() => setShowPassword(prev => !prev) } className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400 cursor-pointer" /> 
                      }
                    </div>
                  </div>
                </div>

                {/* Forgot password link */}
                <a href="#" className="text-sm text-black underline">
                  Mot de passe oublié ?
                </a>
              </div>

              <div className="w-full">
                {/* Login button */}
                <Button className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
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
          </div>

          {/* Copyright */}
          <div className="absolute bottom-5 left-0 right-0 text-center font-legend text-gray text-[length:var(--legend-font-size)]">
            Archidiocèse de Moncton - Tous droits reservés
          </div>
        </div>
        <div className="col-span-3 rounded-xl overflow-hidden">
          {/* Right side image */}
          <div className="relative w-full h-full">
            <Image
              fill
              priority
              className="w-full h-full object-cover"
              alt="Rectangle"
              src="/login-bg.png"
            />
          </div>
        </div>       
      </div>
    </div>
  );
};
