import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon } from "lucide-react";
import React, { JSX } from "react";

export const Connexion = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[900px] relative">
        {/* Right side image */}
        <div className="absolute w-[780px] h-[852px] top-12 left-[660px] bg-white">
          <img
            className="absolute w-[760px] h-[832px] top-2.5 left-2.5 object-cover"
            alt="Rectangle"
            src="login-bg.png"
          />
        </div>

        {/* Logo */}
        <img
          className="absolute w-[89px] h-[54px] top-[94px] left-[286px] object-cover"
          alt="Photo"
          src="/photo-2024-12-08-19-09-08-1.png"
        />

        {/* Login form container */}
        <div className="flex flex-col w-[400px] items-start gap-11 absolute top-[182px] left-[130px]">
          {/* Notice box */}
          <Card className="w-full bg-[#f2f2f9] rounded-xl">
            <CardContent className="px-[15px] py-2.5">
              <p className="font-body-3 text-blue text-center">
                Cette espace est reservé uniquement aux membres du <br />
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
                    htmlFor="email"
                  >
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
                      type="password"
                      className="h-[50px] rounded-[13px]"
                      placeholder="Entrez votre mot de passe"
                    />
                    <EyeIcon className="absolute w-5 h-5 top-3.5 right-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Forgot password link */}
              <a href="#" className="text-sm text-black underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Login button */}
            <Button className="w-full h-[50px] bg-blue rounded-[13px] text-base font-bold">
              Se connecter
            </Button>
          </div>
        </div>

        {/* Return to homepage link */}
        <a
          href="#"
          className="absolute top-[619px] left-[245px] text-gray text-sm underline"
        >
          Retour à la page d&apos;accueil
        </a>

        {/* Copyright */}
        <div className="absolute top-[866px] left-[179px] font-legend text-gray text-[length:var(--legend-font-size)]">
          Archidiocèse de Moncton - Tous droits reservés
        </div>
      </div>
    </div>
  );
};
