import { ScrollArea } from '@/components/ui/scroll-area';
import { apiClient } from '@/lib/axios';
import { Image as ImageType } from '../../../../types';

export default async function ImageContentSection() {
    const response: ImageType[] = await apiClient.get('/api/galeries');
    const images = response.filter(item => !item.path.toString().includes("https"))
    // console.log(images);
    
    return (
        <section className="w-full flex-1 p-6">
            <div className="flex flex-col bg-white w-full items-start gap-6 rounded-2xl p-6">
                <ScrollArea className="w-full h-[500px]">
                    {/* Image grid */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {images.map((image, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden rounded-lg border-none relative shrink-0 min-h-[150px] max-h-[200px]">
                                <Image
                                    alt={`Image ${index + 1}`}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${image.path!}`}
                                    style={{ objectFit: 'cover' }}
                                    fill
                                    priority
                                />
                                <img
                                    className='h-full w-full'
                                    alt={`Image ${index + 1}`}
                                    src={`https://diocese.wds-project.com/${image.path}`}
                                    style={{ objectFit: 'cover' }}
                                />

                                
                            </Card>
                        ))}
                    </div> */}
                </ScrollArea>
            </div>
        </section>
    )
}
