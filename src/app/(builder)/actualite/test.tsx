// import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
// import React from "react";
// import { Button } from "../../components/ui/button";
// import { Card, CardContent } from "../../components/ui/card";
// import { Dialog, DialogClose, DialogContent } from "../../components/ui/dialog";
// import { Input } from "../../components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import { Separator } from "../../components/ui/separator";

// export const PostPlanification = (): JSX.Element => {
//   // Data for the post content
//   const postData = {
//     title:
//       "Quel est le problème avec l'aide médicale à mourir (AMM)? Le 9 octobre à 19h",
//     content:
//       "Un aperçu des trois arguments contre l'AMM, de la pratique actuelle de l'AMM au Canada et de l'enseignement catholique récent sur l'euthanasie sera présenté le mercredi 9 octobre à 19 heures à l'église Holy Family, 52 rue Falkland à Moncton.\n\nLa conférence « What is Wrong with Medical Assistance in Dying ? » dure environ 60 minutes et sera présentée en anglais par le diacre Laurence Worthen de l'archidiocèse de Halifax-Yarmouth. Mgr Desrochers encourage tous nos fidèles bilingues à assister à cette séance d'information importante.\n\nIl y aura une période de questions pendant laquelle ceux qui le désirent pourront poser leurs",
//     excerpt:
//       "Un aperçu des trois arguments contre l'AMM, de la pratique actuelle de l'AMM au...",
//   };

//   return (
//     <div className="relative w-full h-[900px] bg-[#f0f0f0]">
//       {/* Main content area with scrollable post preview */}
//       <main className="fixed w-full h-[787px] top-[113px] left-0 overflow-hidden overflow-y-scroll">
//         <div className="relative w-[800px] h-[700px] top-[94px] mx-auto">
//           <Card className="relative h-[700px]">
//             <CardContent className="flex flex-col w-[700px] items-start gap-6 p-9">
//               <div className="relative w-[700px] h-[250px] bg-[url(/rectangle-2470.svg)] bg-cover bg-[50%_50%]" />
//               <div className="relative w-[700px] h-[46px] bg-[url(/capture-d-e-cran--le-2025-03-02-a--15-40-17-1.png)] bg-[100%_100%]" />

//               <div className="flex flex-col items-start gap-3 self-stretch w-full">
//                 <h2 className="self-stretch mt-[-1.00px] font-heading-5 text-noir-dashboard">
//                   {postData.title}
//                 </h2>
//                 <p className="self-stretch font-body-2 text-gray whitespace-pre-line">
//                   {postData.content}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       {/* Utility buttons for copying/translating text */}
//       <div className="flex flex-col w-[244px] items-start gap-2 fixed top-[762px] left-[1038px]">
//         <Card className="flex flex-col items-start gap-2.5 px-5 py-3 bg-white rounded-lg shadow-[0px_4px_12px_#0000001a]">
//           <Button
//             variant="ghost"
//             className="inline-flex items-start gap-1 p-0 h-auto"
//           >
//             <img className="w-5 h-5" alt="Frame" src="/frame-3.svg" />
//             <span className="font-body-3 text-noir-dashboard">
//               Copier tout le texte
//             </span>
//           </Button>
//         </Card>

//         <Card className="flex flex-col items-start gap-2.5 px-5 py-3 w-full bg-white rounded-lg shadow-[0px_4px_12px_#0000001a]">
//           <Button
//             variant="ghost"
//             className="inline-flex items-start gap-1 p-0 h-auto"
//           >
//             <img className="w-5 h-5" alt="Frame" src="/frame-2.svg" />
//             <span className="font-body-3 text-noir-dashboard">
//               Traduire le texte sur Deepl
//             </span>
//           </Button>
//         </Card>
//       </div>

//       {/* Publication dialog modal */}
//       <Dialog defaultOpen>
//         <DialogContent className="w-[900px] h-[550px] p-0 rounded-2xl">
//           <DialogClose className="absolute w-5 h-5 top-[22px] right-[22px]">
//             <XIcon className="w-5 h-5" />
//           </DialogClose>

//           <div className="flex h-full">
//             {/* Left preview panel */}
//             <div className="w-[394px] h-full bg-[#f2f2f9] flex items-center justify-center">
//               <Card className="w-[270px] h-[300px] bg-white rounded-xl">
//                 <CardContent className="p-2.5">
//                   <img
//                     className="w-[250px] h-40 object-cover"
//                     alt="Rectangle"
//                     src="/rectangle-31.svg"
//                   />

//                   <div className="flex flex-col w-[250px] items-start gap-1 mt-4">
//                     <p className="self-stretch font-legend text-gray">
//                       Catégorie
//                     </p>
//                     <div className="flex flex-col items-start gap-[7px] self-stretch w-full">
//                       <p className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
//                         Quel est le problème avec l&apos;aide m...
//                       </p>
//                       <p className="self-stretch font-legend text-gray">
//                         {postData.excerpt}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="w-[250px] mt-4 font-legend text-gray">
//                     Date de publication
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right configuration panel */}
//             <div className="flex-1 p-[60px]">
//               <div className="flex flex-col w-[350px] items-start gap-4">
//                 <div className="flex flex-col items-start gap-2 self-stretch w-full">
//                   <label className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
//                     Catégorie
//                   </label>
//                   <Select>
//                     <SelectTrigger className="w-[350px] h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]">
//                       <SelectValue placeholder="Sélectionnez la catégorie" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {/* Category options would go here */}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex flex-col items-start gap-2 self-stretch w-full">
//                   <label className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
//                     Entrez les mots clés
//                   </label>
//                   <Input
//                     className="w-[350px] h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]"
//                     placeholder="séparez les mots par une virgule (,)"
//                   />
//                 </div>

//                 <div className="flex w-[350px] items-center gap-2 mt-[200px]">
//                   <Button className="flex-1 gap-2.5 p-3.5 bg-blue rounded-lg">
//                     <img className="w-5 h-5" alt="Frame" src="/frame-5.svg" />
//                     <span className="font-body-3 text-white">
//                       Publier l&apos;actualité
//                     </span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-[145px] p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]"
//                   >
//                     <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
//                       Planifier
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
