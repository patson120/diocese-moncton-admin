import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDownIcon, Church, PlusIcon, SearchIcon } from 'lucide-react';

export default function ParishSection() {
    // parish tabs data
    const clergyTabs = [
        { value: "paroisses", label: "Paroisses", active: true },
        { value: "unites-paroissiales", label: "Unités paroissiales", active: false },
    ];

    // Priest data
    const priestsData = [
        {
            name: "Paroisse Immaculée-Conception / Acadieville",
        },
        {
            name: "Notre Dame de Fatima",
        },
        {
            name: "Saint François-de-sales",
        },
        {
            name: "Paroisse Immaculée-Conception / Acadieville",
        },
        {
            name: "Notre Dame de Fatima",
        },
        {
            name: "Saint François-de-sales",
        },
        {
            name: "Paroisse Immaculée-Conception / Acadieville",
        },
        {
            name: "Notre Dame de Fatima",
        },
        {
            name: "Saint François-de-sales",
        },
        {
            name: "Paroisse Immaculée-Conception / Acadieville",
        },
    ];

    return (
        <main>
            <header className="w-full bg-white pt-6 px-9">
                <div className="flex items-start justify-between">
                    <div className="space-y-4">
                        <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                            GESTION DES PAROISSES
                        </h3>
                        <Tabs defaultValue="paroisses" className="w-fit">
                            <TabsList className="bg-transparent p-0 h-auto">
                                {clergyTabs.map((item) => (
                                    <TabsTrigger
                                        key={item.value}
                                        value={item.value}
                                        className={`p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-2 data-[state=active]:border-[#11112e] data-[state=active]:text-noir-dashboard data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent`}
                                    >
                                        {item.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
                        <PlusIcon className="w-5 h-5" />
                        <span className="font-body-3 text-sm">Ajouter une paroisse</span>
                    </Button>
                </div>
            </header>

            <div className="p-6">
                <section className="bg-white rounded-2xl p-7 space-y-6">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <div className="relative w-[256px]">
                                <Input
                                    className="h-9 bg-neutral-100 border-none pl-9"
                                    placeholder="Rechercher une paroisse"
                                />
                                <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard">
                                    Trier par ordre{" "} <span className="font-semibold">alphabétique</span>
                                </div>
                                <ChevronDownIcon className="w-[16px] h-[16px]" />
                            </div>
                        </div>
                    </div>

                    {/* Priests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {priestsData.map((priest, index) => (
                            <Card
                                key={index}
                                className="w-full border-none shadow-none">
                                <CardContent className="p-0 space-y-2 bg-[#F9F9F0] rounded-xl flex flex-col justify-between gap-[10px] px-5 py-6">
                                    <div className="">
                                        <div className='h-6 w-6 mb-2'>
                                            <Church className='h-5 w-5' />
                                        </div>
                                        <div className='body-1 font-bold text-black line-clamp-2'>
                                            {/* <Text labelFr={message.titre_fr} labelEn={message.titre_en} /> */}
                                            <h1 className='text-lg font-bold'>Immaculée-Conception</h1>
                                        </div>
                                        <div className='body-2 line-clamp-2 text-[#575757]'>
                                            {/* <Text labelFr={message.message_fr} labelEn={message.message_en} /> */}
                                            <p className='text-gray'>Unité pastorale Saint-Benoît</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );

}
