import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { JSX } from "react";

export default function MediathequeImage(): JSX.Element {


  // Media tabs data
  const mediaTabs = [
    { value: "images", label: "Images", active: true },
    { value: "documents", label: "Documents", active: false },
    { value: "videos", label: "Vidéos", active: false },
    { value: "audio", label: "Audio", active: false },
  ];

  // Sample image grid data
  const imageGrid = Array(8).fill({
    src: "/mask-group.png",
  });

  return (
    <div className="bg-[#f0f0f4]">
      {/* Tab navigation */}
      <div className="bg-white px-9 pt-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray">GESTION DES PAGES</span>
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-0">
              {mediaTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`rounded-none px-2.5 py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Button className="bg-blue hover:bg-blue/90 text-white gap-2">
          <PlusIcon className="w-5 h-5" />
          Ajouter une image
        </Button>
      </div>

      {/* Image grid */}
      <div className="flex-1 p-6">
        <div className=" bg-white rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageGrid.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-lg border-none"
              >
                <img
                  src={`/image1.png`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover aspect-square"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
