import { blogPosts } from "@/data/blogs";
import { Link } from "react-router-dom";

const BlogsSection = () => {
  return (
    <section id="blogs" className="blogs-section">
      <div className="blogs-container">
        <span className="section-label reveal">📝 Health Insights</span>
        <h2 className="section-title reveal">From the Doctor's Desk</h2>
        <p className="blogs-section-desc reveal">
          Expert articles on cancer prevention, women's health, and wellness — written by Dr. Madhulika
        </p>

        <div className="blogs-grid">
          {blogPosts.map((post, index) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className={`blog-card reveal ${index === 0 ? "blog-card-featured" : ""}`}
            >
              <div className="blog-card-image">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} loading="lazy" />
                ) : (
                  <div className="blog-card-placeholder">
                    <span className="blog-card-emoji">{post.emoji}</span>
                  </div>
                )}
                <span
                  className="blog-card-category"
                  style={{ background: post.categoryColor }}
                >
                  {post.category}
                </span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{post.date}</span>
                  <span className="blog-meta-dot">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-link">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
