import PropTypes from 'prop-types';
import React from 'react';
import { Link } from '@inertiajs/react';

const ArticleCard = ({ article }) => {
  const { image, title, introduction, slug, user, created_at } = article;

  return (
    <article className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden">
      <Link
        href={route('articles.show', { article: slug })}
        className="block h-full text-gray-900 dark:text-gray-100 no-underline"
      >
        {/* Imagen del artículo */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Contenido del card */}
        <div className="p-6">
          {/* Meta información */}
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                {user.profile?.photo ? (
                  <img
                    src={user.profile.photo}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="material-symbols-rounded text-gray-400 text-sm">
                      account_circle
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  {user.full_name}
                </p>
                {created_at && (
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(created_at).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Título */}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3 leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Introducción */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {introduction}
          </p>

          {/* Indicador de lectura */}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-200">
              Leer más
              <span className="material-symbols-rounded text-sm ml-1 group-hover:translate-x-1 transition-transform duration-200">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
      profile: PropTypes.shape({
        photo: PropTypes.string,
      }),
    }),
    created_at: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;