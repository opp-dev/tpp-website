export function calculateReadingTime(body: any[]): number {
    if (!body || !Array.isArray(body)) {
        return 1;
    }

    let text = '';

    body.forEach(block => {
        if (block._type === 'block' && block.children) {
            block.children.forEach((child: any) => {
                if (child.text) {
                    text += child.text + ' ';
                }
            });
        }
    });

    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 160);

    return Math.max(1, readingTime);
}
