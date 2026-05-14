import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogs";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* Simple markdown-to-HTML (handles ##, **, *, -, |tables|, ---) */
const renderMarkdown = (md: string) => {
  const lines = md.split("\n");
  const html: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableRows.length === 0) return;
    let t = '<div class="blog-table-wrap"><table class="blog-table">';
    tableRows.forEach((cols, ri) => {
      // Skip separator rows like |---|---|
      if (cols.every(c => /^[-:]+$/.test(c.trim()))) return;
      const tag = ri === 0 ? "th" : "td";
      t += "<tr>" + cols.map(c => `<${tag}>${inlineFormat(c.trim())}</${tag}>`).join("") + "</tr>";
    });
    t += "</table></div>";
    html.push(t);
    tableRows = [];
    inTable = false;
  };

  const inlineFormat = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table row
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      const cols = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      tableRows.push(cols);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html.push('<hr class="blog-hr" />');
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      html.push(`<h2 class="blog-h2">${inlineFormat(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      html.push(`<h3 class="blog-h3">${inlineFormat(line.slice(4))}</h3>`);
      continue;
    }

    // List items
    if (/^[-•]\s/.test(line.trim())) {
      html.push(`<div class="blog-list-item">${inlineFormat(line.trim().slice(2))}</div>`);
      continue;
    }
    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      html.push(`<div class="blog-list-item blog-list-numbered">${inlineFormat(line.trim())}</div>`);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // Paragraph
    html.push(`<p class="blog-p">${inlineFormat(line)}</p>`);
  }

  if (inTable) flushTable();
  return html.join("\n");
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.id === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(".blogpost-hero-content", {
      opacity: 0, y: 40, duration: 0.8, ease: "power3.out", delay: 0.1
    });
    gsap.from(".blogpost-body", {
      opacity: 0, y: 30, duration: 0.7, ease: "power3.out", delay: 0.3
    });
  }, { scope: containerRef });

  if (!post) {
    return (
      <div className="blogpost-not-found">
        <h1>Blog not found</h1>
        <Link to="/" className="quiz-btn-primary">← Back to Home</Link>
      </div>
    );
  }

  const whatsAppLink = `https://wa.me/918754626295?text=${encodeURIComponent(
    `Hi Dr. Madhulika, I just read your blog "${post.title}" and I would like to book a consultation.`
  )}`;

  // Related posts (exclude current)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="blogpost-page" ref={containerRef}>
      {/* Nav bar */}
      <div className="blogpost-nav">
        <Link to="/" className="blogpost-back">← Back to Home</Link>
        <Link to="/#blogs" className="blogpost-back">All Blogs</Link>
      </div>

      {/* Hero */}
      <div className="blogpost-hero">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="blogpost-hero-img" />
        ) : (
          <div className="blogpost-hero-placeholder">
            <span>{post.emoji}</span>
          </div>
        )}
        <div className="blogpost-hero-overlay" />
        <div className="blogpost-hero-content">
          <span className="blogpost-category" style={{ background: post.categoryColor }}>
            {post.category}
          </span>
          <h1 className="blogpost-title">{post.title}</h1>
          <p className="blogpost-hook">"{post.hook}"</p>
          <div className="blogpost-meta">
            <span>By Dr. Madhulika</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.date}</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="blogpost-body">
        <article
          className="blogpost-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="blogpost-cta">
          <div className="blogpost-cta-inner">
            <span className="blogpost-cta-emoji">💬</span>
            <h3>Have questions about this topic?</h3>
            <p>Dr. Madhulika is here to help. Book a consultation today.</p>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="quiz-btn-whatsapp">
              💬 Book Appointment via WhatsApp
            </a>
          </div>
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <div className="blogpost-related">
            <h3 className="blogpost-related-title">More from Dr. Madhulika</h3>
            <div className="blogpost-related-grid">
              {relatedPosts.map(rp => (
                <Link to={`/blog/${rp.id}`} key={rp.id} className="blogpost-related-card">
                  <div className="blogpost-related-img">
                    {rp.coverImage ? (
                      <img src={rp.coverImage} alt={rp.title} loading="lazy" />
                    ) : (
                      <div className="blog-card-placeholder blog-card-placeholder-sm">
                        <span className="blog-card-emoji">{rp.emoji}</span>
                      </div>
                    )}
                  </div>
                  <div className="blogpost-related-body">
                    <span className="blogpost-related-cat" style={{ color: rp.categoryColor }}>{rp.category}</span>
                    <h4>{rp.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
