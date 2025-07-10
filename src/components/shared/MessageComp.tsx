
import { formatDateToLocal } from "@/lib/utils"
import { Message } from "../../app/types"
import Text from "./Text"
import Image from "next/image"

const MessageComp = ({ message, onClick }: { message: Message, onClick?: (e: any) => void }) => {
    return (
        <div onClick={onClick} className='bg-[#F9F9F0] cursor-pointer rounded-xl overflow-hidden flex flex-col justify-between gap-[10px] px-5 py-6'>
            <div className="">
                {
                    message.image === null ? ( 
                    <div
                        className="w-full h-[150px] rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url("/vector.svg")` }}
                    />
                    ) : (
                    <div
                        className="w-full h-[150px] rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${message.image})` }}
                    />
                )}
                <div className='body-1 font-bold text-black line-clamp-2'>
                    <Text labelFr={message.titre_fr} labelEn={message.titre_en} />
                </div>
                <div className='body-2 line-clamp-2 text-[#575757]'>
                    <Text labelFr={message.message_fr} labelEn={message.message_en} />
                </div>
            </div>
            <p className='body-3 whitespace-nowrap text-gray text-sm'>
                Publié le
                <span className="ml-2">{formatDateToLocal((new Date(message.created_at)).toISOString())}</span>
            </p>
        </div>
    )
}
export default MessageComp