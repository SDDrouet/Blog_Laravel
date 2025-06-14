import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'
import { Link, router } from '@inertiajs/react'
import toast from 'react-hot-toast';

export default function ArticleIndex({ articles }) {
    console.log(articles);
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {

        let statusString = status == 1 ? 'published' : 'private';

        const statusStyles = {
            published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            private: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
        };

        const statusLabels = {
            published: 'Público',
            private: 'Privado',
        };

        return (
            <span className={`select-none inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[statusString] || statusStyles.private}`}>
                {statusLabels[statusString] || statusString}
            </span>
        );
    };

    return (
        <AdminLayout header="Artículos">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                {/* Header con botón crear */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Gestión de Artículos
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Administra todos los artículos de tu sitio web
                        </p>
                    </div>
                    <Link
                        href={route('admin.articles.create')}
                        title='Crear nuevo artículo'
                        className="inline-flex items-center px-4 py-2 bg-rose-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        <span className="material-symbols-rounded text-sm mr-2">add</span>
                        Nuevo
                    </Link>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Fecha de Creación
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Fecha de Edición
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {articles.data && articles.data.length > 0 ? (
                                articles.data.map((article) => (
                                    <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate w-64">
                                                {article.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {article.categories ? article.categories.name : 'Sin categoría'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(article.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(article.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(article.updated_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                {/* Ver */}
                                                <Link
                                                    href={route('articles.show', article)}
                                                    className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-md transition-colors duration-150"
                                                    title="Ver artículo"
                                                >
                                                    <span className="material-symbols-rounded text-lg">visibility</span>
                                                </Link>
                                                
                                                {/* Editar */}
                                                <Link
                                                    href={route('admin.articles.edit', article)}
                                                    className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md transition-colors duration-150"
                                                    title="Editar artículo"
                                                >
                                                    <span className="material-symbols-rounded text-lg">edit</span>
                                                </Link>
                                                
                                                {/* Eliminar */}
                                                <button
                                                    onClick={() => {
                                                        router.delete(route('admin.articles.destroy', article), {
                                                            onBefore: () => confirm('¿Estás seguro de eliminar este artículo?'),
                                                            onSuccess: () => {                                                                
                                                                toast.success('Artículo eliminado correctamente');
                                                            },
                                                            onError: () => {
                                                                toast.error('Error al eliminar el artículo');                                                                
                                                            }
                                                        });

                                                    }}
                                                    className="inline-flex items-center p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors duration-150"
                                                    title="Eliminar artículo"
                                                >
                                                    <span className="material-symbols-rounded text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="material-icons text-6xl text-gray-300 dark:text-gray-600 mb-4">
                                                article
                                            </span>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                No hay artículos
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                Comienza creando tu primer artículo
                                            </p>
                                            <Link
                                                href="/admin/articles/create"
                                                className="inline-flex items-center px-4 py-2 bg-rose-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                            >
                                                <span className="material-icons text-sm mr-2">add</span>
                                                Crear Artículo
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación (opcional) */}
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
        </AdminLayout>
    )
}