"use client"
import { Editor } from '@/components/Editor/Editor'
import { RichTextEditor } from '@/components/Editor/rich-text-editor'
import { Tiptap } from '@/components/Editor/Tiptap'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createMessage } from '@/lib/data'
import { ArrowLeft, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function page() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = async () => {
    console.log({ title });
    console.log({ content });
    const response = await createMessage({
      titre_fr: title,
      titre_en: "Et voluptatem architecto corporis",
      message_fr: content,
      message_en: "Et voluptatem architecto corporis. Et sequi aut excepturi nisi earum neque. Voluptate aspernatur id dolores labore assumenda magnam iure. Maxime eius optio consequuntur id.",
      archeveque_id: 16,
      etat: 0,
      // message: "Aliquid eveniet ex et porro similique totam. Officia fugiat eos et iure. Aut minus fugiat ipsa illum. Ipsa voluptas vel ut. Possimus ex voluptatem similique pariatur autem assumenda. Maiores enim quo accusamus adipisci.",
    })
    if (response.titre_fr) {
      toast.success("Message enregistré avec succès !")
      setTitle("")
      setContent("")
    }
    else {
      toast.success(JSON.stringify(response))
    }

  }
  return (
    <div className="relative w-full h-[900px] bg-[#f0f0f4]">

      {/* Secondary navigation bar */}
      <div className="fixed w-full h-[70px] z-10 top-0 left-0 bg-white flex items-center justify-between px-[50px]">
        {/* Back to home button */}
        <Button
          variant="ghost"
          className="h-10 gap-2 px-3.5 py-0 bg-white rounded-[7px]"
        >
          <ArrowLeft className='w-[18px] h-[18px]' />
          <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
            Retour à l&apos;accueil
          </span>
        </Button>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-10 px-3.5 py-0">
            <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
              Sauvegarder brouillon
            </span>
          </Button>

          <Separator orientation="vertical" className="h-[34px]" />

          <Button
            variant="outline"
            className="h-10 px-3.5 py-0 border-[#d9d9d9] rounded-[7px]"
          >
            <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
              Planifier
            </span>
          </Button>

          <Button className="h-10 px-3.5 py-0 bg-blue text-white rounded-[7px]">
            <span className="font-body-3 whitespace-nowrap">
              Publier message
            </span>
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-4xl mt-[70px] mx-auto bg-transparent">
        <div className="w-full bg-white rounded">
          {/* Language tabs */}
          <div className="py-4">
            <Tabs defaultValue="french" className="w-min">
              <TabsList className="flex w-full bg-[#f8f8f8] rounded-[0px_12px_0px_0px] p-0">
                <TabsTrigger
                  value="french"
                  className="flex items-center gap-2 p-3 data-[state=active]:bg-noir-dashboard data-[state=active]:text-white data-[state=inactive]:bg-white rounded-[12px_12px_0px_0px]"
                >
                  <div className="relative w-3.5 h-3.5 rounded-[7px] border border-solid border-current">
                    {/* Filled circle for active tab */}
                    <div className="data-[state=active]:block hidden relative w-2.5 h-2.5 top-px left-px bg-current rounded-[4.9px]" />
                  </div>
                  <span className="font-body-3 text-sm">Version française</span>
                </TabsTrigger>

                <TabsTrigger
                  value="english"
                  className="flex items-center gap-2 p-3 data-[state=active]:bg-noir-dashboard data-[state=active]:text-white data-[state=inactive]:bg-white rounded-[12px_12px_0px_0px]"
                >
                  <div className="relative w-3.5 h-3.5 rounded-[7px] border border-solid border-current" />
                  <span className="font-body-3 text-sm">Version anglaise</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Editor content */}
          <div className="flex flex-col p-10 items-start gap-6">
            <div className='w-full'>
              <label htmlFor="titre" className='text-lg text-gray font-semibold mb-2'>Titre</label>
              <Editor
                value={title}
                onChange={(text: string) => setTitle(text)}
              />
            </div>
            <div className='w-full'>
              <label htmlFor="titre" className='text-lg text-gray font-semibold mb-2'>Contenu</label>
              <Editor
                value={content}
                onChange={(text: string) => setContent(text)}
              />
            </div>
            {/* <Tiptap /> */}
            {/* <RichTextEditor
              // value={content}
              // onChange={onChange}
            /> */}

            <div>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="flex flex-col w-[244px] items-start gap-2 fixed top-[662px] left-[1038px]">
        <Card className="shadow-[0px_4px_12px_#0000001a] rounded-lg">
          <CardContent className="flex items-start gap-1 p-3">
            <CopyIcon className="w-5 h-5" />
            <span className="font-body-3 text-noir-dashboard text-sm">
              Copier tout le texte
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-[0px_4px_12px_#0000001a] rounded-lg w-full">
          <CardContent className="flex items-start gap-1 p-3">
            <ExternalLinkIcon className="w-5 h-5" />
            <span className="font-body-3 text-noir-dashboard text-sm">
              Traduire le texte sur Deepl
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
