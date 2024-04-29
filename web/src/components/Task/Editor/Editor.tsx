import Document from "@tiptap/extension-document"
import Link from "@tiptap/extension-link"
import Paragraph from "@tiptap/extension-paragraph"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { BubbleMenuComponent } from './BubbleMenuComponent'


const extensions = [
  StarterKit,
  Underline,
  Document,
  Paragraph,
  Text,
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

export function Editor(){

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
      `,
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? 'is-active' : ''}
      >
        toggleTaskList
      </button>
      <button
        onClick={() => editor.chain().focus().splitListItem('taskItem').run()}
        disabled={!editor.can().splitListItem('taskItem')}
      >
        splitListItem
      </button>
      <button
        onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
        disabled={!editor.can().sinkListItem('taskItem')}
      >
        sinkListItem
      </button>
      <button
        onClick={() => editor.chain().focus().liftListItem('taskItem').run()}
        disabled={!editor.can().liftListItem('taskItem')}
      >
        liftListItem
      </button>

      <EditorContent
      className="max-w-[700px] mx-auto prose prose-invert prose-emerald prose-li:flex"
      editor={editor} />
    </>
  )


//  const editor = useEditor({
//     extensions,
//     content: initialContent,
//     editorProps: {
//       attributes: {
//         class: "outline-none"
//       }
//     }
//   })


  return (
    <div>
      <EditorContent editor={editor} className="max-w-[700px] mx-auto prose prose-invert prose-emerald"/>

      {editor && (
        <FloatingMenu editor={editor}
          className="bg-zinc-700 p-1 border border-zinc-600 rounded-lg shadow-xl shadow-black/20 overflow-hidden flex flex-col"
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText === "/"
          }}
        >
          <button
            className="p-1 flex items-center gap-2 font-medium min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
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
    </div>
  )
}

