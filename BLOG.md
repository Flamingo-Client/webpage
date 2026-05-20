# Blog System

Blog posts live in the [`Flamingo-Client/blog`](https://github.com/Flamingo-Client/blog) repository. Each post is a directory (the slug) containing an `index.mdx` file and optionally an `images/` folder.

```
blog/
├── my-first-post/
│   ├── index.mdx
│   └── images/
│       ├── hero.webp
│       └── screenshot.png
├── another-post/
│   ├── index.mdx
│   └── images/
│       └── diagram.webp
└── ...
```

---

## Frontmatter

Every `index.mdx` must start with YAML frontmatter:

```yaml
---
title: My Blog Post Title
date: 2024-03-20
description: A short summary of the post (will be auto-truncated to 150 chars)
image: hero.webp    # optional — filename inside images/ folder
authors:
  - name: Author Name
    github: github-username    # optional
    x: "@x_username"           # optional — quote if it starts with @
    website: https://example.com  # optional
  - name: Co-Author
    github: coauthor-username
---
```

### Frontmatter Fields

| Field         | Required | Description                                     |
|---------------|----------|-------------------------------------------------|
| `title`       | ✅       | Post title                                      |
| `date`        | ✅       | Publication date (any parseable date string)    |
| `description` | ✅       | Short summary (auto-truncated at 150 chars)     |
| `image`       | ❌       | Hero image filename (place in `images/` folder) |
| `authors`     | ❌       | Array of authors (see below)                     |

### Author Fields

| Field     | Required | Description                               |
|-----------|----------|-------------------------------------------|
| `name`    | ✅       | Display name                              |
| `github`  | ❌       | GitHub username (shows GitHub icon link)   |
| `x`       | ❌       | X/Twitter handle (shows X icon link)      |
| `website` | ❌       | Personal URL (shows globe icon link)      |

---

## Markdown

All standard [GitHub Flavored Markdown](https://github.github.com/gfm/) is supported, plus the extras below.

### Alerts (GitHub-style callouts)

```
> [!NOTE] Title
> Body text here

> [!TIP] Title
> Body text here

> [!WARNING] Title
> Body text here

> [!DANGER] Title
> Body text here
```

If no title is provided, the alert type name is used:

```
> [!NOTE]
> Just a note
```

Renders as styled colored blocks with a left border:
- `NOTE` → blue
- `TIP` → green
- `WARNING` → amber
- `DANGER` → red

Markdown is supported inside alert bodies:

```
> [!TIP] **Pro tip**
> Use `marked` for fast markdown rendering and `gray-matter` for frontmatter parsing.
```

### Regular Blockquotes

Plain blockquotes (without `[!TYPE]`) render as normal `<blockquote>`:

```
> This is a regular blockquote.
> Multiple lines are fine.
```

### Images

Place images in the `images/` subdirectory of your post folder, then reference them with a relative path:

```markdown
![Alt text](images/hero.webp)
```

This gets rewritten to the full GitHub raw URL automatically.

The hero image (set in frontmatter via `image: hero.webp`) is rendered at the top of the post page.

### Bold, Italic, Links

Standard markdown works everywhere:

```markdown
**bold** *italic* ~~strikethrough~~ `inline code`

[link text](https://example.com)
```

### Code Blocks

With syntax highlighting support:

````markdown
```ts
const greeting: string = "Hello"
```
````

### Lists

```markdown
- Unordered item
- Another item

1. Ordered item
2. Another item
```

### Tables

```markdown
| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
```

---

## HTML

Raw HTML is supported by the markdown renderer and will be passed through:

```html
<div class="custom">Custom HTML block</div>
```

---

## Slug / URL

The directory name becomes the URL slug. For example:

```
blog/my-first-post/index.mdx  →  /blog/my-first-post
```

Slugs should be lowercase, hyphenated (`kebab-case`).
