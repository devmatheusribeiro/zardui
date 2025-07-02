import { Parser, type Tokens } from 'marked';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { parseMarkdown } from './teste';

export function markedOptionsFactory(): MarkedOptions {
  parseMarkdown();
  const renderer = new MarkedRenderer();

  renderer.heading = ({ tokens, depth }) => {
    const text = Parser.parseInline(tokens);
    return `<h${depth} class="${depth === 1 ? 'text-3xl font-bold' : ''}">${text}</h${depth}>`;
  };

  renderer.paragraph = ({ tokens }) => {
    const text = Parser.parseInline(tokens);
    return `${text}`;
  };

  renderer.code = ({ raw, text, type, codeBlockStyle, escaped, lang }) => {
    console.log(raw, text, type, codeBlockStyle, escaped, lang);
    // const texte = Parser.parseInline(tokens);
    if (lang !== 'step') {
      const markdown = renderer.code({ text, lang, escaped } as Tokens.Code);
      return markdown;
      // return `
      //   <div class="relative">
      //     <pre class="${'language-' + lang} flex my-4 p-3 rounded-md border border-neutral-300/50 bg-neutral-200/30 dark:border-neutral-800/60 dark:bg-neutral-900/40" tabindex="0">
      //       <code class="${'language-' + lang} mx-1 px-2 py-1 whitespace-nowrap bg-transparent border-none">
      //         ${text}
      //       </code>
      //     </pre>
      //   </div>
      // `;
    }

    return `
          <article class="relative">
        <header class="absolute flex h-9 w-9 select-none items-center justify-center rounded-full border-[3px] border-background bg-neutral-300 dark:bg-neutral-800">
          <span class="font-semibold text-primary">1</span>
        </header>
        <main class="ml-[1.1rem] border-l border-neutral-200 dark:border-neutral-900">
          <section class="space-y-4 pb-10 pl-8 pt-1">
            <h2 class="font-medium text-primary">teste</h2>
            <p>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
            <a z-button zType="link" class="p-0" href="https://google.com">If you don't know, you can follow the initial documentation step by step</a>
        <div class="relative">
          <pre class="${'language-' + lang} flex my-4 p-3 rounded-md border border-neutral-300/50 bg-neutral-200/30 dark:border-neutral-800/60 dark:bg-neutral-900/40" tabindex="0">
            <code class="${'language-' + lang} mx-1 px-2 py-1 whitespace-nowrap! bg-transparent border-none">
              ${text}
            </code>
          </pre>
        </div>
          </section>
        </main>
      </article>
    `;
  };

  renderer.table = ({ header, rows }) => {
    const th = header
      .map(cell => {
        const htmlContent = Parser.parseInline(cell.tokens).replace(/<code>/g, '<code class="bg-accent rounded-sm border-none font-sans">');
        return `<th class="h-12 px-4 text-left align-middle font-medium">${htmlContent}</th>`;
      })
      .join('');

    const tr = rows
      .map(row => {
        const cells = row
          .map(cell => {
            const htmlContent = Parser.parseInline(cell.tokens).replace(/<code>/g, '<code class="bg-accent rounded-sm border-none font-sans">');
            return `<td class="p-4 align-middle last-child:border-0">${htmlContent}</td>`;
          })
          .join('');

        return `<tr class="border-b transition-colors hover:bg-muted/50">${cells}</tr>`;
      })
      .join('');

    return `<div class="overflow-auto rounded-md border my-4">
    <table class="w-full caption-bottom text-sm">
      <thead class="text-primary bg-accent">
        <tr>${th}</tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0 bg-accent/20">
        ${tr}
      </tbody>
    </table>
  </div>`;
  };

  return {
    renderer: renderer,
  };
}
