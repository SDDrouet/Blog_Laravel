import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';

export default function CommentIndex({ comments }) {
    const handleDelete = (comment) => {
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            router.delete(route('admin.comments.destroy', comment), {
                onSuccess: () => toast.success('Comentario eliminado correctamente'),
                onError: () => toast.error('Error al eliminar el comentario'),
            });
        }
    };

    return (
        <AdminLayout header="Comentarios">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Gestión de Comentarios
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Administra los comentarios del blog
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Artículo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Calificación</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comentario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {comments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No hay comentarios disponibles.
                                    </td>
                                </tr>
                            ) : (
                                comments.map((comment, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{comment.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{comment.value} ⭐</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{comment.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{comment.full_name}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(comment)}
                                                title="Eliminar comentario"
                                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md flex items-center justify-center"
                                            >
                                                <span className="material-symbols-rounded text-lg">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
