import React from 'react';
import { ArrowLeft, Clock, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { articles, getAllCategories } from '../articles/articleRegistry';
import Footer from './Footer';
import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';

interface ArticlesListProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onFeaturesClick?: () => void;isLoggedIn?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  onBack,
  onArticleClick,
  onHelpClick,
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick,
  onFeaturesClick,
  isLoggedIn
}) => {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Raleway, sans-serif', background: 'linear-gradient(180deg, SBS_COLORS.lightYellow 0%, #ffffff 100%)' }}>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)' }}>
              <TrendingUp size={24} style={{ color: 'SBS_COLORS.darkBase' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>ABNVerify</h1>
              <p className="text-xs" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Powered by ABR</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-sm font-medium hidden sm:block hover:opacity-80" style={{ color: 'SBS_COLORS.midCharcoal' }}>Pricing</button>
            <button onClick={onBack} className="text-sm font-medium hidden sm:block hover:opacity-80" style={{ color: 'SBS_COLORS.midCharcoal' }}>Try Free</button>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="text-sm font-medium hidden sm:block hover:opacity-80"
                style={{ color: 'SBS_COLORS.midCharcoal' }}
              >
                Help
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)', color: 'SBS_COLORS.darkBase' }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen size={40} style={{ color: 'SBS_COLORS.standardYellow' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
            ABN Verification Articles
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'SBS_COLORS.midCharcoal' }}>
            Learn everything about bulk ABN verification, compliance, and best practices for Australian businesses.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)', color: 'SBS_COLORS.darkBase' }}>
              All Articles
            </span>
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-2 bg-white hover:bg-gray-100 rounded-full text-sm font-semibold border transition-colors"
                style={{ color: 'SBS_COLORS.midCharcoal', borderColor: '#e5e5e5' }}
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
                className="bg-white rounded-3xl border hover:shadow-xl transition-all cursor-pointer group"
                style={{ borderColor: '#e5e5e5' }}
                onClick={() => onArticleClick(article.id)}
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: 'SBS_COLORS.lightYellow', color: 'SBS_COLORS.standardYellow' }}>
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 transition-colors line-clamp-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed" style={{ color: 'SBS_COLORS.midCharcoal' }}>
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
                    <span className="font-semibold text-sm group-hover:underline" style={{ color: 'SBS_COLORS.standardYellow' }}>
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
        onFeaturesClick={onFeaturesClick} />
    </div>
  );
};

export default ArticlesList;
