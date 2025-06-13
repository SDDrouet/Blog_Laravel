import React from 'react';
import { Link } from '@inertiajs/react';

const CategoryCard = ({ category }) => {
  const { name, slug, image } = category;

  return (
    <article className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden">
      <Link
        href={route('categories.detail', { category: slug })}
        className="block h-full text-gray-900 dark:text-gray-100 no-underline"
      >
        {/* Imagen del artículo */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Contenido del card */}
        <div className="p-6">
          {/* Título */}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3 leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200 line-clamp-2">
            {name}
          </h3>

          {/* Indicador de lectura */}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center text-xs text-rose-600 dark:text-rose-400 font-medium group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-200">
              Ver artículos de {name}
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

export default CategoryCard;