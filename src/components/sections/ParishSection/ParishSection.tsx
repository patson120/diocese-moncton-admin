import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDownIcon, Church, LayoutGridIcon, ListFilter, PlusIcon, SearchIcon } from 'lucide-react';

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
            <Tabs defaultValue="paroisses" >
                <header className="w-full bg-white pt-6 px-9">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                                GESTION DES PAROISSES
                            </h3>
                            <TabsList className="bg-transparent p-0 h-auto">
                                {clergyTabs.map((item) => (
                                    <TabsTrigger
                                        key={item.value}
                                        value={item.value}
                                        className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                                        {item.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
                            <PlusIcon className="w-5 h-5" />
                            <span className="font-body-3 text-sm">Ajouter une paroisse</span>
                        </Button>
                    </div>
                </header>

                <div className="p-6">
                    <section className="bg-white rounded-2xl p-7 space-y-6">
                        <Tabs defaultValue="paroisses-actives">
                            <div className="flex justify-between items-center">
                                <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                                    <TabsTrigger
                                        value="paroisses-actives"
                                        className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                                        <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                                            Paroisses actives
                                        </span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="paroisses-fermees"
                                        className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                                        <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                                            Paroisses fermées
                                        </span>
                                    </TabsTrigger>
                                </TabsList>
                                <div className="flex items-start gap-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-[256px]">
                                            <Input
                                                className="h-10 bg-neutral-100 border-none pl-9"
                                                placeholder="Rechercher une paroisse"
                                            />
                                            <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                                            <ListFilter className="w-5 h-5" />
                                            <span className="font-body-3 text-noir-dashboard">
                                                Trier par...
                                            </span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg"
                                        >
                                            <LayoutGridIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <TabsContent value="paroisses-actives" className="mt-6">
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
                            </TabsContent>

                            <TabsContent value="paroisses-fermees" className="mt-6">
                                {/* Priests grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {priestsData.slice(2, 8).map((priest, index) => (
                                        <Card
                                            key={index}
                                            className="w-full border-none shadow-none">
                                            <CardContent className="bg-[#F9F9F0] rounded-xl px-5 py-6">
                                                <div className='body-1 font-bold text-black line-clamp-2'>
                                                    {/* <Text labelFr={message.titre_fr} labelEn={message.titre_en} /> */}
                                                    <h1 className='text-lg font-bold'>Immaculée-Conception</h1>
                                                </div>
                                                <div className='body-2 line-clamp-2 text-[#575757]'>
                                                    {/* <Text labelFr={message.message_fr} labelEn={message.message_en} /> */}
                                                    <p className='text-gray'>Paroisse fermée</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>
                </div>
            </Tabs>
        </main>
    );

}
