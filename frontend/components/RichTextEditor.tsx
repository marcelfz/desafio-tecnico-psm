'use client';

import { useRef, useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && editorRef.current) {
      editorRef.current.innerHTML = content || '';
      isFirstRender.current = false;
    }
  }, [content]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const isActive = (command: string): boolean => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  const handleHeading = (tag: string) => {
    execCommand('formatBlock', tag);
  };

  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-stone-200 px-2 py-2 flex-wrap">
        <ToolbarButton
          active={isActive('bold')}
          onClick={() => execCommand('bold')}
          label="Negrito"
        >
          <strong>B</strong>
        </ToolbarButton>

        <ToolbarButton
          active={isActive('italic')}
          onClick={() => execCommand('italic')}
          label="Itálico"
        >
          <em>I</em>
        </ToolbarButton>

        <ToolbarButton
          active={isActive('strikeThrough')}
          onClick={() => execCommand('strikeThrough')}
          label="Tachado"
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-stone-200 mx-1" />

        <ToolbarButton active={false} onClick={() => handleHeading('h2')} label="Título">
          H2
        </ToolbarButton>

        <ToolbarButton active={false} onClick={() => handleHeading('h3')} label="Subtítulo">
          H3
        </ToolbarButton>

        <ToolbarButton active={false} onClick={() => handleHeading('p')} label="Parágrafo">
          P
        </ToolbarButton>

        <div className="w-px h-5 bg-stone-200 mx-1" />

        <ToolbarButton
          active={isActive('insertUnorderedList')}
          onClick={() => execCommand('insertUnorderedList')}
          label="Lista"
        >
          •—
        </ToolbarButton>

        <ToolbarButton
          active={isActive('insertOrderedList')}
          onClick={() => execCommand('insertOrderedList')}
          label="Lista numerada"
        >
          1.
        </ToolbarButton>

        <ToolbarButton
          active={false}
          onClick={() => handleHeading('blockquote')}
          label="Citação"
        >
          &ldquo;&rdquo;
        </ToolbarButton>

        <div className="w-px h-5 bg-stone-200 mx-1" />

        <ToolbarButton active={false} onClick={() => execCommand('undo')} label="Desfazer">
          ↶
        </ToolbarButton>

        <ToolbarButton active={false} onClick={() => execCommand('redo')} label="Refazer">
          ↷
        </ToolbarButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="prose prose-stone max-w-none min-h-[300px] px-4 py-3 focus:outline-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-stone-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 text-gray-900"
        suppressContentEditableWarning
      />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={label}
      className={`text-sm px-2.5 py-1.5 rounded-md transition ${
        active
          ? 'bg-emerald-100 text-emerald-800'
          : 'text-stone-600 hover:bg-stone-100'
      }`}
    >
      {children}
    </button>
  );
}