import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import ArticleCard from './Partials/ArticleCard';

export default function Dashboard({ articles, navbar, categories }) {

    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    Inicio
                </h1>
            }
        >
            <Head title="Inicio" />

            {/* Navegación de categorías */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-center py-6">
                        <ul className="flex flex-wrap items-center gap-8 text-sm">
                            <li>
                                <button className="text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    Todos
                                </button>
                            </li>
                            {navbar.data.map((item) => (
                                <li key={item.id}>
                                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 cursor-pointer">
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {articles == null ? (
                        /* Vista de Categorías */
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="p-8 lg:p-12">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                                        Categorías
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Explora nuestras categorías de contenido
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.data.map(category => (
                                        <div 
                                            key={category.id}
                                            className="group p-6 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200"></div>
                                                <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                                    {category.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Vista de Artículos */
                        <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="p-8 lg:p-12">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                                        Artículos
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {articles.data.length} {articles.data.length === 1 ? 'artículo disponible' : 'artículos disponibles'}
                                    </p>
                                </div>

                                {articles.data.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {articles.data.map(article => (
                                            <ArticleCard key={article.id} article={article} />
                                        ))}
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
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}