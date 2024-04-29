import Link from "@tiptap/extension-link"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Underline from "@tiptap/extension-underline"
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useMemo, useRef, useState } from "react"
import { BubbleMenuComponent } from './BubbleMenuComponent'
import "./editor.css"
import { initialContent } from "./initialContent"

const extensions = [
  StarterKit,
  Underline,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Link.configure({
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "text-primary hover:underline cursor-pointer",
    },
  }),
]

export function Editor() {
  const [editable, setEditable] = useState(false);
  const editorRef = useRef(null);

  const handleClickOutside = (event) => {
    if (editorRef.current && !editorRef.current.contains(event.target)) {
      setEditable(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 const editor = useEditor({
    extensions,
    content: initialContent,
    editable,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
      handleDoubleClickOn: () => setEditable(true),
    }
  })

  useEffect(() => {
    editor?.setOptions({ editable });

    if(editable){
      editor?.commands.focus()
    }

  }, [editable, editor]);

  const isEditor = useMemo(() => editor !== null, [editor])

  if (!isEditor) {
    return null
  }


  return (
    <div className="border" ref={editorRef}>

      {editor && (
        <FloatingMenu editor={editor}
          className="bg-zinc-700 p-1 border border-zinc-600 rounded-lg shadow-xl shadow-black/20 overflow-hidden flex flex-col"
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText?.startsWith("/") && $from.parentOffset === 1
          }}
        >
          <button
            className="p-1 flex items-center gap-2 font-medium min-w-[280px] hover:bg-zinc-600"
            onClick={(ev) => {
              const { tr } = editor.state;
              const { from } = editor.state.selection;
              tr.delete(from - 1, from);
              editor.view.dispatch(tr);
              editor.chain().focus().toggleTaskList().run()
            }}
           >
            <img src="https://www.notion.so/images/blocks/to-do.f8d20542.png" alt="to-do-list image"
              className="w-[60px] h-[60px] rounded-lg flex-shrink-0"
            />

            <div className="flex flex-col ">
              <span>To-do-list</span>
              <span className="text-xs">Adiciona lista de tarefas</span>
            </div>
           </button>
        </FloatingMenu>
      )}

      <BubbleMenuComponent editor={editor} />

      <EditorContent editor={editor} className="max-w-[700px] mx-auto prose prose-invert prose-emerald"/>
    </div>
  )
}

