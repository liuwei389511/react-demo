/** @format */

import { Remarkable } from "remarkable";

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const post = {
    // Imagine this content is stored in the database.
    content: `${markdown}`,
  };

  return md.render(post.content);
}

export default function MarkdownPreview() {
  const markup = { __html: post.content };
  return <div dangerouslySetInnerHTML={markup} />;
}
