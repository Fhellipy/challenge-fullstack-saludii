import Link from "@tiptap/extension-link"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Underline from "@tiptap/extension-underline"
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDebounce } from "src/hooks"
import { BubbleMenuComponent } from './BubbleMenuComponent'
import "./editor.css"

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

type EditorProps = {
  initialContent: string;
  onChange: (content: string) => void;
  placeholder: string;
}

export function removeHTMLTags(str: string) {
  const checkboxComponent = str.includes('data-type="taskList"')

  if(checkboxComponent) return str;

  return str.replace(/<(?!img\s)[^>]+>/g, "");
}

export function Editor({ initialContent, placeholder, onChange } : EditorProps ) {
  const [editable, setEditable] = useState(false);
  const [change, setChange] = useState(false);
  const editorRef = useRef(null);

  const [content, setContent] = useState("");
  const contentDebounce = useDebounce(setContent, 1500);

  useEffect(() => {
    if(change) {
      onChange(content);
      setChange(false);
    }
  }, [content, onChange]);

  const handleClickOutside = (event) => {
    const modalLink = document.getElementById("modal-link");

    if (modalLink && modalLink.contains(event.target)) {
      return;
    }

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
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      contentDebounce(content);
      setChange(true);
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
      handleDoubleClickOn: () => setEditable(true),
    }
  })


  useEffect(() => {
    editor?.setOptions({ editable });
    editor?.commands.setContent(initialContent);

    if(!removeHTMLTags(initialContent).length && !editable ) {
      editor?.commands.setContent(`<p>${placeholder}</p>`)
    }

    if(editable){
      editor?.commands.focus()
    }
  }, [editable, editor, initialContent]);

  const isEditor = useMemo(() => editor !== null, [editor])

  if (!isEditor) return null

  return (
    <div ref={editorRef} className="w-full">
      {editor && (
        <FloatingMenu editor={editor}
          className="bg-card p-1 rounded-lg shadow-custom overflow-hidden flex flex-col hover:bg-muted/40"
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText?.startsWith("/") && $from.parentOffset === 1
          }}
        >
          <button
            className="p-1 flex items-center gap-2 font-medium min-w-[280px] hover:bg-muted/40 hover:text-primary rounded-lg"
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

      <EditorContent editor={editor} className="w-full p-2 max-w-[700px] prose  prose-emerald prose-p:m-1 text-muted-foreground truncate"/>
    </div>
  )
}

