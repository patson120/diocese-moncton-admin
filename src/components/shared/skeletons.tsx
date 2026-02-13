// Loading animation
export const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ActualiteSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl border-2 border-[#f9fafb] p-4 shadow-sm w-full flex flex-col space-y-3`}>
            <div className='relative h-56 md:h-60 w-full rounded-2xl overflow-hidden bg-[#f9fafb]'>

            </div>
            <span className='h-2 w-1/3 rounded bg-[#e5e7eb] ' />
            <h4 className='h-4 w-1/2 rounded bg-[#e5e7eb]' />
            <p className='h-2 rounded bg-[#e5e7eb]' />
            <p className='h-2 rounded bg-[#e5e7eb]' />
            <p className='h-2 w-2/3 rounded bg-[#e5e7eb]' />
            <p className='h-2 w-1/3 rounded bg-[#e5e7eb]' />
        </div>
    );
}

export function ActualiteDetailSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm col-span-full lg:col-span-4 h-min`}>
            <div className='h-72 lg:h-96 xl:h-[560px] relative md:rounded-[18px] overflow-hidden bg-gray-50'>

            </div>
            <div className='container max-margin pt-4 md:pt-0 md:px-0 md:mx-0 flex flex-col space-y-5'>
                <div className='flex justify-between pt-10'>
                    <span className='h-3 w-1/3 rounded bg-gray-200 ' />
                    <p className='h-3 w-1/4 rounded bg-gray-200' />
                </div>
                <h4 className='h-5 w-1/2 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 w-2/3 rounded bg-gray-200' />
                <div className="pt-10"></div>
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 w-2/3 rounded bg-gray-200' />
                <p className='h-3 w-1/3 rounded bg-gray-200' />

            </div>
        </div>
    )
}

export function ActualitesSkeleton({ items }: { items: number }) {
    const comps = []
    for (let i = 0; i < items; i++) {
        comps.push(<ActualiteSkeleton key={i} />)
    }
    return (
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {
                comps.map(item => item)
            }
        </div>
    );
}

export function RelativesActualitesSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm container max-margin py-4 md:px-0 md:mx-0 col-span-full lg:col-span-2 flex flex-col space-y-4 mb-10`}>
            <h4 className='h-6 mx-4 w-2/3 rounded bg-gray-200' />
            <div className="flex md:flex-col gap-4 overflow-x-scroll md:overflow-x-hidden pb-6 md:pb-0">
                <ActualiteSkeleton />
                <ActualiteSkeleton />
                <ActualiteSkeleton />
                <ActualiteSkeleton />
            </div>
        </div>
    );
}


export function EventItemSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm p-2 md:p-3 space-y-3 border border-gray-200 `}>
            <div className='flex flex-1 flex-row justify-between items-center divide-x'>
                <div className='w-[70px] flex-col justify-center items-center space-y-4 mr-3 '>
                    <p className='h-2 rounded bg-gray-200' />
                    <p className='h-2 w-1/2 rounded bg-gray-200' />
                </div>
                <div className='flex-1 pl-2 md:pl-3 space-y-3'>
                    <h4 className='h-4 w-1/2 rounded bg-gray-200' />
                    <p className='h-2 rounded bg-gray-200' />
                    <p className='h-2 w-2/3 rounded bg-gray-200' />
                </div>
            </div>
            <div className="divide-y flex-1">
                <div></div>
                <div className="flex flex-col pt-4 space-y-3">
                    <h4 className='h-3 w-1/2 rounded bg-gray-200' />
                    <span className='h-2 w-1/3 rounded bg-gray-200 ' />
                </div>
            </div>
        </div>
    )
}

export function EventsSkeleton({ items }: { items: number }) {
    const comps = []
    for (let i = 0; i < items; i++) {
        comps.push(<EventItemSkeleton key={i} />)
    }
    return (
        <div className="flex flex-col gap-4">
            {
                comps.map(item => item)
            }
        </div>
    );
}

export function ParoisseItemSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm flex justify-start items-center space-x-4 text-black`}>
            <div className='h-[80px] w-[80px] shrink-0 rounded-lg bg-gray-200 overflow-hidden relative'>

            </div>
            <div className="flex-1 space-y-3 ">
                <h4 className='h-4 w-1/2 rounded bg-gray-200 mb-1' />
                <p className='h-2 w-2/3 rounded bg-gray-200' />
                <p className='h-2 w-1/3 rounded bg-gray-200' />
            </div>
        </div>
    )
}

export function MessageArchevequeSkeleton() {
    return (
        <section className='vertical-margin bg-yellow100 text-[#1D0104]'>
            <div className="container max-margin py-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 xl:gap-12">
                <div className={`${shimmer} relative overflow-hidden bg-gray-100 shadow-sm order-1 md:order-last md:col-span-2 rounded-2xl bg-yellowColor px-5 md:px-14 py-5 md:py-8 flex flex-col gap-2 md:gap-4 xl:gap-7`}>
                    <div className="space-y-1 lg:space-y-2">
                        <h4 className='h-4 w-1/2 rounded bg-gray-300' />
                        <div className="pt-4 space-y-3">
                            <h4 className='h-2 rounded bg-gray-300 ' />
                            <h4 className='h-2 w-1/3 rounded bg-gray-300' />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className='h-2 rounded bg-gray-300' />
                        <p className='h-2 rounded bg-gray-300' />
                        <p className='h-2 w-1/3 rounded bg-gray-300' />
                        <p className='h-2 rounded bg-gray-300' />
                        <p className='h-2 rounded bg-gray-300' />
                        <p className='h-2 w-2/3 rounded bg-gray-300' />
                        <p className='h-2 w-1/3 rounded bg-gray-300' />
                    </div>
                    <div className='flex flex-col md:flex-row space-y-3 md:space-x-2 md:space-y-0'>
                        <p className='h-5 w-28 rounded bg-gray-300' />
                        <p className='h-5 w-32 rounded bg-gray-300' />
                    </div>
                </div>
                <div className={`${shimmer} bg-gray-100 shadow-sm md:order-last min-h-80 md:h-auto md:col-span-1 relative rounded-2xl overflow-hidden`}>

                    <div className="absolute inset-0 bg-gray-100 " />
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="p-4 space-y-3">
                            <h4 className='h-3 w-1/2 rounded bg-gray-200' />
                            <p className='h-2  w-2/3 rounded bg-gray-200' />
                            <p className='h-2 w-1/2 rounded bg-gray-200' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function MessageSkeleton() {
    return (
        <div className='border border-gray-50 rounded-xl flex flex-col gap-[10px] px-5 py-6 space-y-3'>
            <div className={`${shimmer} relative overflow-hidden bg-gray-100 shadow-sm h-6 w-1/2 flex justify-center items-center gap-2 bg-[#8B22360D] rounded-[8px] px-3 py-[5px]`}>
            </div>
            <div className="space-y-2">
                <p className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm h-3`} />
                <p className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm h-3 w-1/3`} />
            </div>
            <div className="space-y-2">
                <p className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm h-2`} />
                <p className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm h-2 w-2/3`} />
            </div>
        </div>
    )
}

export function MessagesSkeleton({ items }: { items: number }) {
    const comps = []
    for (let i = 0; i < items; i++) {
        comps.push(<MessageSkeleton key={i} />)
    }
    return (
        <div className="grid gap-6 md:gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                comps.map(item => item)
            }
        </div>
    );
}

export function MessageDetailSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl p-4 col-span-full lg:col-span-4 pb-10 lg:pb-0 md:pr-10 lg:pr-20 border-b lg:border-r lg:border-gray-100 h-min`}>
            <div className='container max-margin pt-4 md:pt-0 md:px-0 md:mx-0 flex flex-col space-y-5'>
                <div className="space-y-3 pb-6">
                    <h4 className='h-5 w-2/3 rounded bg-gray-200' />
                    <h4 className='h-5 w-1/2 rounded bg-gray-200' />
                </div>
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 w-2/3 rounded bg-gray-200' />
                <div className="pt-10"></div>
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 rounded bg-gray-200' />
                <p className='h-3 w-2/3 rounded bg-gray-200' />
                <p className='h-3 w-1/3 rounded bg-gray-200' />

            </div>
        </div>
    )
}

export function RelativesMessagesSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden container max-margin py-4 md:px-0 md:mx-0 col-span-full lg:col-span-2 flex flex-col space-y-4 mb-10 pt-4 md:pt-0`}>
            <h4 className='h-6 w-2/3 rounded bg-gray-100' />
            <div className="flex md:flex-col gap-4 overflow-x-scroll md:overflow-x-hidden pb-6 md:pb-0">
                <MessageSkeleton />
                <MessageSkeleton />
                <MessageSkeleton />
                <MessageSkeleton />
            </div>
        </div>
    );
}