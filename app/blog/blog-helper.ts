export type NewPostFormData = {
    title: string;
    image?: string;
    content?: string;
    author?: string;
    tags?: { label: string; value: string }[];
};

export const sampleData = {
    "title": "Exploring the Future of AI in Job Searches",
    "content": `# Heading level 1
    ## Heading level 2
    ### Heading level 3
    #### Heading level 4
    ##### Heading level 5
    ###### Heading level 6
    
    ### Paragraph
    I really like using Markdown.
    
    I think I'll use it to format all of my documents from now on.
    
    ### Bold & Italic
    
    This is a **bold** text and this is an *italic* text.
    
    ### Code Block
    
    \`\`\`javascript
    function helloWorld() {
        console.log("Hello, world!");
    }
    \`\`\`
    
    ### Quote
    
    > This is a blockquote example.
    > It can span multiple lines.
    
    ### Unordered List
    
    - Item 1
    - Item 2
      - Subitem 2.1
      - Subitem 2.2
    
    ### Ordered List
    
    1. First item
    2. Second item
    
    ### Image
    
    ![Sample Image](/images/stock/business-woman.jpg)
    
    ### Link
    
    This is a [link to Pixabay](https://pixabay.com).
    
    # GFM
    
    ## Autolink literals
    
    www.example.com, https://example.com, and contact@example.com.
    
    ## Footnote
    
    A note[^1]
    
    [^1]: Big note.
    
    ## Strikethrough
    
    ~one~ or ~~two~~ tildes.
    
    ## Tasklist
    
    * [ ] to do
    * [x] done`,
    "author": "Jane Doe",
    "tags": ["AI", "Job Search", "Technology"],
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "featuredImage": "https://res.cloudinary.com/kyaria/image/upload/v1704328000/blog/g6vy7ol3pcbdfge8suop.jpg",
    "images": ["https://res.cloudinary.com/kyaria/image/upload/v1704328000/blog/g6vy7ol3pcbdfge8suop.jpg", 'https://res.cloudinary.com/kyaria/image/upload/v1704328000/blog/aiq6zmckdpyk3hgafbks.png']
};