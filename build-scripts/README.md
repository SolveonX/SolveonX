# Blog publish workflow (local only)

1. Create a Notion database with properties: Title, Slug, Content, Cover Image, Status, Date, Category
2. Create a Notion integration at https://www.notion.so/my-integrations and share the database with it
3. Copy `build-scripts/.env.example` → `build-scripts/.env` and set:
   - NOTION_API_KEY
   - NOTION_DATABASE_ID
4. (Optional) `npm i notion-to-md @notionhq/client` in build-scripts for richer body conversion
5. Run:
   ```
   node build-scripts/fetch-notion-posts.js
   node build-scripts/generate-blog-html.js
   ```
6. Upload the generated `/blog` folder to Hostinger (File Manager or FTP)

Seed case-study posts are already generated so the blog works before Notion is connected.
