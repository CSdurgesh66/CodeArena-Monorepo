// const marked = require('marked');
const sanitizeHtmlLibrary = require('sanitize-html');
const TurndownService = require('turndown');


async function sanitizeMarkdownContent(markdownContent){
  
    const { marked } = await import('marked'); //  dynamic import 
    const turndownService = new TurndownService();

    // convert markdown to html
    const convertedHtml = marked.parse(markdownContent);


    // sanitize html
    const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml,{
        allowedTags:sanitizeHtmlLibrary.defaults.allowedTags.concat(['img'])
    });

    // convert sanitized html back to markdown
    const sanitizedMarkdown  = turndownService.turndown(sanitizedHtml);

  

    return sanitizedMarkdown;

}


module.exports = sanitizeMarkdownContent;