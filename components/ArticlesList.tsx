import React from 'react';
import { ArrowLeft, Clock, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { articles, getAllCategories } from '../articles/articleRegistry';
import Footer from './Footer';

interface ArticlesListProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  onBack,
  onArticleClick,
  onHelpClick,
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick
}) => {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-blue-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ABN Verification Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn everything about bulk ABN verification, compliance, and best practices for Australian businesses.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              All Articles
            </span>
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-full text-sm font-semibold border border-gray-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => onArticleClick(article.id)}
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {article.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <time dateTime={article.publishDate}>
                        {new Date(article.publishDate).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                      Read Article →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State (if no articles) */}
          {articles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No articles yet</h3>
              <p className="text-gray-500">Check back soon for helpful guides and resources.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onHelpClick={onHelpClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onPrivacyClick={onPrivacyClick}
        onTermsClick={onTermsClick}
        onArticlesClick={() => {}} // Already on articles page
      />
    </div>
  );
};

export default ArticlesList;
