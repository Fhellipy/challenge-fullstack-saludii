import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { BubbleMenu, type Editor as EditorType } from "@tiptap/react"
import { BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, LinkIcon, UnderlineIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { BubbleButton } from "./BubbleButton"

type Props = {
  editor?: EditorType;
}

export function BubbleMenuComponent({ editor }: Props) {
  if(!editor) return null;

  return (
    <BubbleMenu
        editor={editor}
        className="bg-zinc-700 border border-zinc-600 rounded-lg shadow-xl shadow-black/20 overflow-hidden flex divide-x divide-zinc-600"
    >
      <BubbleButton
        title="Texto"
        data-active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
       >
         Texto
       </BubbleButton>
       <BubbleButton
        title="Negrito"
        data-active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
       >
        <BoldIcon size={20} />
       </BubbleButton>
       <BubbleButton
        title="Itálico"
        data-active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
       >
        <ItalicIcon size={20} />
       </BubbleButton>
       <BubbleButton
        title="Sublinhado"
        data-active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
       >
        <UnderlineIcon size={20} />
       </BubbleButton>
       <ModalLink editor={editor} />
       <BubbleButton
        title="Título 1"
        data-active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
       >
          <Heading1Icon size={20} />
       </BubbleButton>
       <BubbleButton
        title="Título 2"
        data-active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
       >
          <Heading2Icon size={20} />
       </BubbleButton>
       <BubbleButton
        title="Título 3"
        data-active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
       >
          <Heading3Icon size={20} />
       </BubbleButton>
    </BubbleMenu>
  )
}



export function ModalLink({ editor }: Props) {


  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(editor) {
      if (link.trim()) {
        editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run();
      } else {
        editor.chain().focus().unsetLink().run()
      }
    }

    setOpen(false);
  };

  useEffect(() => {
    if(editor?.isActive("link")) {
      setLink(editor.getAttributes("link").href)
    }
  }, [editor])

  if(!editor) return null;

  return (
      <React.Fragment>
         <BubbleButton
           title="Link"
           data-active={editor.isActive("link")}
           onClick={handleClickOpen}
         >
          <LinkIcon size={20} />
       </BubbleButton>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >Adicionar url de redirecionamento</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={link}
            placeholder="Adicione o link"
            className="border border-zinc-600 p-2 w-full rounded-md"
            onChange={(e) => setLink(e.target.value)}
          />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    )
}
