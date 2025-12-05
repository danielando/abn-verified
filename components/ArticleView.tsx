import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, TrendingUp } from 'lucide-react';
import { ArticleMetadata } from '../articles/articleRegistry';
import Footer from './Footer';

interface ArticleViewProps {
  article: ArticleMetadata;
  onBack: () => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;isLoggedIn?: boolean;
}

const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onHelpClick,
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick,
  onArticlesClick,
  onFeaturesClick,
  isLoggedIn
}) => {
  // Update document title and meta tags for SEO
  useEffect(() => {
    // Set page title
    document.title = `${article.title} | ABNVerify`;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', article.description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', article.keywords.join(', '));

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: article.title },
      { property: 'og:description', content: article.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://abnverify.com/articles/${article.id}` },
      { property: 'article:published_time', content: article.publishDate },
      { property: 'article:author', content: article.author },
      { property: 'article:section', content: article.category },
    ];

    if (article.lastModified) {
      ogTags.push({ property: 'article:modified_time', content: article.lastModified });
    }

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: article.title },
      { name: 'twitter:description', content: article.description },
    ];

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Organization',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ABNVerify',
        logo: {
          '@type': 'ImageObject',
          url: 'https://abnverify.com/logo.png',
        },
      },
      datePublished: article.publishDate,
      dateModified: article.lastModified || article.publishDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://abnverify.com/articles/${article.id}`,
      },
      keywords: article.keywords.join(', '),
      articleSection: article.category,
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    // Cleanup on unmount
    return () => {
      document.title = 'ABNVerify - Bulk ABN Verification for Australian Businesses';
    };
  }, [article]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ABNVerify</h1>
              <p className="text-xs text-gray-500">Powered by ABR</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Pricing</button>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Try Free</button>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block"
              >
                Help
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 bg-[#fdb717] hover:bg-[#e5a616] text-white rounded-full font-medium text-sm transition-all"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-[#fdb717] font-semibold mb-4">
              <span className="bg-[#fff9e6] px-3 py-1 rounded-full">{article.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
              <div>
                <span>By {article.author}</span>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: (() => {
                  const lines = article.content.split('\n');
                  const html: string[] = [];
                  let inList = false;

                  const processInlineMarkdown = (text: string): string => {
                    // Handle bold **text**
                    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    // Handle italic *text*
                    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
                    // Handle inline code `code`
                    text = text.replace(/`(.+?)`/g, '<code>$1</code>');
                    return text;
                  };

                  lines.forEach((line, index) => {
                    const trimmedLine = line.trim();

                    // Handle headings
                    if (line.startsWith('#### ')) {
                      if (inList) { html.push('</ul>'); inList = false; }
                      html.push(`<h4>${processInlineMarkdown(line.substring(5))}</h4>`);
                    } else if (line.startsWith('### ')) {
                      if (inList) { html.push('</ul>'); inList = false; }
                      html.push(`<h3>${processInlineMarkdown(line.substring(4))}</h3>`);
                    } else if (line.startsWith('## ')) {
                      if (inList) { html.push('</ul>'); inList = false; }
                      html.push(`<h2>${processInlineMarkdown(line.substring(3))}</h2>`);
                    } else if (line.startsWith('# ')) {
                      if (inList) { html.push('</ul>'); inList = false; }
                      html.push(`<h1>${processInlineMarkdown(line.substring(2))}</h1>`);
                    }
                    // Handle list items
                    else if (line.startsWith('- ') || line.startsWith('* ')) {
                      if (!inList) {
                        html.push('<ul>');
                        inList = true;
                      }
                      html.push(`<li>${processInlineMarkdown(line.substring(2))}</li>`);
                    }
                    // Handle empty lines
                    else if (trimmedLine === '') {
                      if (inList) {
                        html.push('</ul>');
                        inList = false;
                      }
                      html.push('<br />');
                    }
                    // Handle paragraphs
                    else {
                      if (inList) { html.push('</ul>'); inList = false; }
                      html.push(`<p>${processInlineMarkdown(line)}</p>`);
                    }
                  });

                  // Close any open list
                  if (inList) {
                    html.push('</ul>');
                  }

                  return html.join('');
                })()
              }}
            />
          </div>

          {/* Article Footer / CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to streamline your ABN verification?
              </h3>
              <p className="text-gray-700 mb-6">
                Start verifying Australian Business Numbers in bulk today with 10 free lookups.
              </p>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-[#fdb717] hover:bg-[#e5a616] text-white rounded-full font-bold text-lg transition-all shadow-lg"
              >
                Try ABNVerify Free
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer
        onHelpClick={onHelpClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onPrivacyClick={onPrivacyClick}
        onTermsClick={onTermsClick}
        onArticlesClick={onArticlesClick}
        onFeaturesClick={onFeaturesClick} />

      {/* Article-specific styles */}
      <style>{`
        .article-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .article-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4b5563;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .article-content p {
          color: #374151;
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .article-content strong {
          font-weight: 600;
          color: #111827;
        }

        .article-content li {
          color: #374151;
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }

        .article-content ul {
          list-style-type: disc;
          margin-bottom: 1.5rem;
        }

        .article-content a {
          color: #2563eb;
          text-decoration: underline;
        }

        .article-content a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
};

export default ArticleView;
