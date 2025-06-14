import React from 'react'
import ArticleCard from './ArticleCard'
import { Link } from '@inertiajs/react'

function Articles({articles}) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-8 lg:p-12">
            <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    Artículos
                </h2>
            </div>

            {articles.data.length > 0 ? (
                <div>
                    <div className="mt-6 flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Mostrando artículos del {articles.from} a {articles.to} de {articles.total}
                        </div>
                        <div className="flex gap-1">
                            {articles.prev_page_url && (
                                <Link
                                    href={articles.prev_page_url}
                                    className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    &laquo; Anterior
                                </Link>
                            )}

                            <span className="px-3 py-1 text-sm border rounded-md bg-rose-500 text-white border-rose-500">
                                Página {articles.current_page}
                            </span>

                            {articles.next_page_url && (
                                <Link
                                    href={articles.next_page_url}
                                    className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Siguiente &raquo;
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.data.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Mostrando artículos del {articles.from} a {articles.to} de {articles.total}
                        </div>
                        <div className="flex gap-1">
                            {articles.prev_page_url && (
                                <Link
                                    href={articles.prev_page_url}
                                    className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    &laquo; Anterior
                                </Link>
                            )}

                            <span className="px-3 py-1 text-sm border rounded-md bg-rose-500 text-white border-rose-500">
                                Página {articles.current_page}
                            </span>

                            {articles.next_page_url && (
                                <Link
                                    href={articles.next_page_url}
                                    className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Siguiente &raquo;
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="material-symbols-rounded text-gray-400 text-2xl">
                            article
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        No hay artículos disponibles
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Vuelve pronto para ver nuevo contenido
                    </p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Articles
