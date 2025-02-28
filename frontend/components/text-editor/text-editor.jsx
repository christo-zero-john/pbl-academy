"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

/**
 * Component used to insert a  text editor with text styling functionalities.
 * @props initialContent: Text to be displayed in the text editor.
 * @props onChange: A state updater function to which the 
 * 
 */
const TextEditor = ({ initialContent = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      } else {
        console.log(
          "No state update method specified to store input text. Pass an onChange attribute with a useState updater methoda s its value to store the text entered as state: ",
          html
        );
      }
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="editor-wrapper border border-2">
      {/* Custom Toolbar */}
      <div className="border-bottom border-2 p-2 d-flex justify-content-start align-items-center flex-wrap">
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1 fw-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        >
          Blockquote
        </button>
        <button type="button"
          className="btn btn-outline-secondary px-2 py-0 m-1"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        >
          &lt; /&gt;
        </button>
        <button type="button" className="btn btn-outline-secondary px-2 py-0 m-1 link-primary" onClick={addLink}>
          Link
        </button>
      </div>
      {/* Editor Content */}
      <div className="hd-75">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
