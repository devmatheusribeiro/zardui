import { Marked } from 'marked';

export function parseMarkdown(): void {
  const marked = new Marked();

  marked.use({
    walkTokens(token) {
      const { type, raw } = token;
      console.log(type);
      console.log(raw);

      //   // Modify paragraph blocks beginning and ending with $$.
      //   if (type === 'paragraph' && raw.startsWith('$$\n') && raw.endsWith('\n$$')) {
      //     token.type = 'code';
      //     token.lang = 'mathematics';
      //     token.text = token.raw.slice(3, -3); // Remove the $$ boundaries.
      //     token.tokens.length = 0; // Remove child tokens.
      //   }
    },
    renderer: {
      //   code(code, language) {
      //     // Use custom mathematics renderer.
      //     if (language === 'mathematics') {
      //       return renderMathematics(code);
      //     }
      //     // Use default code renderer.
      //     return false;
      //   }
    },
  });
}
