import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import { Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function CategoryIndex({ categories }) {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getBadge = (value, labels, styles) => (
        <span className={`select-none inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[value]}`}>
            {labels[value]}
        </span>
    );

    const featuredLabels = { 1: 'Destacado', 0: 'No destacado' };
    const featuredStyles = {
        1: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        0: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };

    const statusLabels = { 1: 'Activo', 0: 'Inactivo' };
    const statusStyles = {
        1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        0: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };

    return (
        <AdminLayout header="Categorías">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Gestión de Categorías
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Administra las categorías del blog
                        </p>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        title='Crear nueva categoría'
                        className="inline-flex items-center px-4 py-2 bg-rose-500 text-white rounded-md text-xs font-semibold uppercase tracking-widest hover:bg-rose-600 focus:bg-rose-600 transition"
                    >
                        <span className="material-symbols-rounded text-sm mr-2">add</span>
                        Nueva
                    </Link>
                </div>

                {/* Tabla de categorías */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Destacado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Creado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actualizado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {categories.data.length > 0 ? categories.data.map(category => (
                                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</td>
                                    <td className="px-6 py-4">{getBadge(category.is_featured, featuredLabels, featuredStyles)}</td>
                                    <td className="px-6 py-4">{getBadge(category.status, statusLabels, statusStyles)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(category.created_at)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(category.updated_at)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            {/* Editar */}
                                            <Link
                                                href={route('admin.categories.edit', category.slug)}
                                                title="Editar categoría"
                                                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md flex items-center justify-center"
                                            >
                                                <span className="material-symbols-rounded text-lg">edit</span>
                                            </Link>
                                            {/* Eliminar */}
                                            <button
                                                onClick={() => {
                                                    router.delete(route('admin.categories.destroy', category.slug), {
                                                        onBefore: () => confirm('¿Estás seguro de eliminar esta categoría?'),
                                                        onSuccess: () => toast.success('Categoría eliminada correctamente'),
                                                        onError: () => toast.error('Error al eliminar la categoría')
                                                    });
                                                }}
                                                title="Eliminar categoría"
                                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md flex items-center justify-center"
                                            >
                                                <span className="material-symbols-rounded text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10">
                                        <p className="text-gray-500 dark:text-gray-400">No hay categorías registradas</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando categorías del {categories.from} al {categories.to} de {categories.total}
                    </div>
                    <div className="flex gap-1">
                        {categories.prev_page_url && (
                            <Link href={categories.prev_page_url} className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                &laquo; Anterior
                            </Link>
                        )}
                        <span className="px-3 py-1 text-sm border rounded-md bg-rose-500 text-white border-rose-500">
                            Página {categories.current_page}
                        </span>
                        {categories.next_page_url && (
                            <Link href={categories.next_page_url} className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Siguiente &raquo;
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
