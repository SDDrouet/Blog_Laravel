import React from 'react';

export default function RichTextHTML({ content }) {
  const html = serializeSlateToHTML(content);

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function serializeSlateToHTML(nodes) {
  return nodes
    .map((node) => {
      const align = node.align ? ` style="text-align:${node.align};"` : '';

      switch (node.type) {
        case 'heading-one':
          return `<h1${align} class="text-3xl font-bold mb-4">${serializeChildren(node.children)}</h1>`;
        case 'heading-two':
          return `<h2${align} class="text-2xl font-semibold mb-3">${serializeChildren(node.children)}</h2>`;
        case 'paragraph':
          return `<p${align} class="text-base leading-relaxed mb-4">${serializeChildren(node.children)}</p>`;
        case 'block-quote':
          return `<blockquote${align} class="border-l-4 pl-4 italic text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-md my-4 text-base">${serializeChildren(node.children)}</blockquote>`;
        case 'numbered-list':
          return `<ol${align} class="list-decimal list-inside pl-6 space-y-1 text-base mb-4">${serializeListItems(node.children)}</ol>`;
        case 'bulleted-list':
          return `<ul${align} class="list-disc list-inside pl-6 space-y-1 text-base mb-4">${serializeListItems(node.children)}</ul>`;
        case 'list-item':
          return `<li${align} class="mb-1">${serializeChildren(node.children)}</li>`;
        default:
          return `<div${align} class="text-base mb-4">${serializeChildren(node.children)}</div>`;
      }
    })
    .join('');
}

function serializeListItems(items) {
  return items
    .map((item) => {
      const align = item.align ? ` style="text-align:${item.align};"` : '';
      return `<li${align} class="mb-1">${serializeChildren(item.children)}</li>`;
    })
    .join('');
}

function serializeChildren(children) {
  return children
    .map((child) => {
      let text = escapeHTML(child.text || '');

      // Aplica estilos de texto enriquecido
      if (child.code) {
        text = `<code class="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-400 font-mono text-sm px-1 py-0.5 rounded">${text}</code>`;
      }
      if (child.bold) {
        text = `<strong class="font-semibold">${text}</strong>`;
      }
      if (child.italic) {
        text = `<em class="italic">${text}</em>`;
      }
      if (child.underline) {
        text = `<u class="underline">${text}</u>`;
      }

      return text;
    })
    .join('');
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
