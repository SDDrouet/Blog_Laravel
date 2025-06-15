import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Articles from './Partials/Articles';
import Categories from './Partials/Categories';

export default function Dashboard({ articles, navbar, categories}) {
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
                                <Link 
                                href={route('dashboard')}
                                className="text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    Todos
                                </Link>
                            </li>
                            {navbar.map((item) => (
                                <li key={item.id}>
                                    <Link
                                    href={route('categories.detail', { category: item.slug })}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 cursor-pointer">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link 
                                href={route('dashboard.all')}
                                className="text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    Todas las categorías
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {articles == null ? (
                        <Categories categories={categories} />
                    ) : (
                        /* Vista de Artículos */
                        <Articles articles={articles} />
                    )}                    
                </div>                
            </div>
        </AuthenticatedLayout>
    );
}