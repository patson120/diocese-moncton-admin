
import { Calendar } from "lucide-react"
import { Message } from "../../../types"
import { formatDateToLocal } from "@/lib/utils"
import Text from "./Text"

const MessageComp = ({ message }: { message: Message }) => {
    return (
        <div className='bg-[#F9F9F0] rounded-xl flex flex-col justify-between gap-[10px] px-5 py-6'>
            <div className="">
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