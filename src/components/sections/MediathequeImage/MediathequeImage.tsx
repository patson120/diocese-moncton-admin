import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import { VideoContentSection } from "./VideoContentSection";
import { AudioContentSection } from "./AudioContentSection";

export default function MediathequeImage(): JSX.Element {


  // Media tabs data
  const mediaTabs = [
    { value: "images", label: "Images", active: true },
    { value: "documents", label: "Documents", active: false },
    { value: "videos", label: "Vidéos", active: false },
    { value: "audio", label: "Audio", active: false },
  ];

  // Sample image grid data
  const imageGrid = Array(20).fill({
    src: "/mask-group.png",
  });

  return (
    <Tabs defaultValue="images" className="w-full bg-[#f0f0f4]">
      {/* Tab navigation */}
      <div className="bg-white px-9 pt-6 flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
            GESTION DES MEDIA
          </h3>
          <div className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-0">
              {mediaTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <Button className="bg-blue hover:bg-blue/90 text-white gap-2">
          <PlusIcon className="w-5 h-5" />
          Ajouter une image
        </Button>
      </div>

      <TabsContent
        value="images"
        className="border-none">
        {/* Image grid */}
        <div className="flex-1 p-6">
          <div className=" bg-white rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {imageGrid.map((image, index) => (
                <Card
                  key={index}
                  className="overflow-hidden rounded-lg border-none relative shrink-0 min-h-[150px] max-h-[200px]"
                >
                  <Image
                    alt={`Image ${index + 1}`}
                    src={`/image1.png`}
                    style={{ objectFit: 'cover' }}
                    fill
                    priority
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="videos"
        className="border-none">
        {/* Video grid */}
        <VideoContentSection />
      </TabsContent>
      <TabsContent
        value="audio"
        className="border-none">
        {/* Audio grid */}
        <AudioContentSection />
      </TabsContent>
    </Tabs>
  );
};
