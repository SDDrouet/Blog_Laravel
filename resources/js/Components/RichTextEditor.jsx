import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo, useState } from 'react'
import {
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact } from 'slate-react'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+shift+.': 'block-quote',
  'mod+shift+1': 'heading-one',
  'mod+shift+2': 'heading-two',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const RichTextEditor = ({ value, onChange, placeholder = "Escribe tu contenido aquí...", className = "" }) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className={`border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      <Slate 
        editor={editor} 
        initialValue={value || initialValue}
        onChange={handleChange}
      >
        <Toolbar />
        <div className="p-4">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            spellCheck
            autoFocus
            className="min-h-[200px] focus:outline-none text-gray-900 dark:text-gray-100"
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  if (['heading-one', 'heading-two', 'block-quote'].includes(mark)) {
                    toggleBlock(editor, mark)
                  } else {
                    toggleMark(editor, mark)
                  }
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  )
}

// Componentes de la Toolbar
const Toolbar = () => {
  return (
    <div className="flex flex-wrap items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 gap-1">
      {/* Formato de texto */}
      <div className="flex items-center border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
        <MarkButton format="bold" icon="format_bold" tooltip="Negrita (Ctrl+B)" />
        <MarkButton format="italic" icon="format_italic" tooltip="Cursiva (Ctrl+I)" />
        <MarkButton format="underline" icon="format_underlined" tooltip="Subrayado (Ctrl+U)" />
        <MarkButton format="code" icon="code" tooltip="Código (Ctrl+`)" />
      </div>

      {/* Encabezados */}
      <div className="flex items-center border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
        <BlockButton format="heading-one" icon="looks_one" tooltip="Encabezado 1" />
        <BlockButton format="heading-two" icon="looks_two" tooltip="Encabezado 2" />
        <BlockButton format="block-quote" icon="format_quote" tooltip="Cita" />
      </div>

      {/* Listas */}
      <div className="flex items-center border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
        <BlockButton format="numbered-list" icon="format_list_numbered" tooltip="Lista numerada" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" tooltip="Lista con viñetas" />
      </div>

      {/* Alineación */}
      <div className="flex items-center">
        <BlockButton format="left" icon="format_align_left" tooltip="Alinear izquierda" />
        <BlockButton format="center" icon="format_align_center" tooltip="Centrar" />
        <BlockButton format="right" icon="format_align_right" tooltip="Alinear derecha" />
        <BlockButton format="justify" icon="format_align_justify" tooltip="Justificar" />
      </div>
    </div>
  )
}

const Button = ({ active, children, onMouseDown, tooltip, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      onMouseDown={onMouseDown}
      title={tooltip}
      className={`
        inline-flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150 ease-in-out
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800
        ${active 
          ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }
      `}
    >
      {children}
    </button>
  )
}

const Icon = ({ children }) => (
  <span className="material-symbols-rounded text-lg select-none">
    {children}
  </span>
)

const BlockButton = ({ format, icon, tooltip }) => {
  const editor = useSlate()
  
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      tooltip={tooltip}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon, tooltip }) => {
  const editor = useSlate()
  
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      tooltip={tooltip}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

// Funciones de utilidad
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? 'align' : 'type'
  )
  const isList = isListType(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  })

  let newProperties
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format
          }
          return n.type === format
        }
        return false
      },
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  const baseClasses = "focus:outline-none";
  const alignClass = element.align ? `text-${element.align}` : '';

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          className={`border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-800/50 italic text-gray-700 dark:text-gray-300 rounded-md text-base ${alignClass} ${baseClasses}`}
          {...attributes}
        >
          {children}
        </blockquote>
      );

    case 'bulleted-list':
      return (
        <ul className={`list-disc list-inside pl-6 space-y-1 text-base mb-4 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </ul>
      );

    case 'numbered-list':
      return (
        <ol className={`list-decimal list-inside pl-6 space-y-1 text-base mb-4 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </ol>
      );

    case 'list-item':
      return (
        <li className={`mb-1 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </li>
      );

    case 'heading-one':
      return (
        <h1 className={`text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </h1>
      );

    case 'heading-two':
      return (
        <h2 className={`text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </h2>
      );

    default:
      return (
        <p className={`text-base leading-relaxed mb-4 ${alignClass} ${baseClasses}`} {...attributes}>
          {children}
        </p>
      );
  }
};


const Leaf = ({ attributes, children, leaf }) => {
  let element = children;

  if (leaf.code) {
    element = (
      <code className="bg-gray-200 dark:bg-gray-700 text-rose-600 dark:text-rose-400 font-mono text-sm px-1 py-0.5 rounded">
        {element}
      </code>
    );
  }

  if (leaf.bold) {
    element = <strong className="font-semibold">{element}</strong>;
  }

  if (leaf.italic) {
    element = <em className="italic">{element}</em>;
  }

  if (leaf.underline) {
    element = <u className="underline">{element}</u>;
  }

  return <span {...attributes}>{element}</span>;
};


// Funciones de utilidad
const isAlignType = format => TEXT_ALIGN_TYPES.includes(format)
const isListType = format => LIST_TYPES.includes(format)
const isAlignElement = element => 'align' in element

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'Este es un editor de texto ' },
      { text: 'enriquecido', bold: true },
      { text: ' con soporte para ' },
      { text: 'formato', italic: true },
      { text: ' avanzado y ' },
      { text: 'código', code: true },
      { text: '.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Puedes usar atajos de teclado como Ctrl+B para ',
      },
      { text: 'negrita', bold: true },
      {
        text: ', o crear bloques especiales como citas:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'Una cita inspiradora para empezar.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: '¡Pruébalo por ti mismo!' }],
  },
]

export default RichTextEditor