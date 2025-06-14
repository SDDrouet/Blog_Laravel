import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'
import { Link, router } from '@inertiajs/react'
import toast from 'react-hot-toast'

export default function UserIndex({ users }) {
    return (
        <AdminLayout header="Usuarios">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">

                {/* Header con título */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Gestión de Usuarios
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Administra todos los usuarios registrados
                        </p>
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Nombre completo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Correo electrónico
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.data && users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {user.full_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-2">

                                                {/* Editar */}
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
                                                    className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md transition-colors duration-150"
                                                    title="Editar usuario"
                                                >
                                                    <span className="material-symbols-rounded text-lg">edit</span>
                                                </Link>

                                                {/* Eliminar */}
                                                <button
                                                    onClick={() => {
                                                        if (confirm('¿Estás seguro de eliminar este usuario?')) {
                                                            router.delete(route('admin.users.destroy', user.id), {
                                                                onSuccess: () => {
                                                                    toast.success('Usuario eliminado correctamente')
                                                                },
                                                                onError: () => {
                                                                    toast.error('Error al eliminar el usuario')
                                                                }
                                                            })
                                                        }
                                                    }}
                                                    className="inline-flex items-center p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors duration-150"
                                                    title="Eliminar usuario"
                                                >
                                                    <span className="material-symbols-rounded text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="material-symbols-rounded text-6xl text-gray-300 dark:text-gray-600 mb-4">
                                                person_off
                                            </span>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                No hay usuarios registrados
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                Actualmente no hay usuarios disponibles
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando usuarios del {users.from} al {users.to} de {users.total}
                    </div>
                    <div className="flex gap-1">
                        {users.prev_page_url && (
                            <Link
                                href={users.prev_page_url}
                                className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                &laquo; Anterior
                            </Link>
                        )}
                        <span className="px-3 py-1 text-sm border rounded-md bg-rose-500 text-white border-rose-500">
                            Página {users.current_page}
                        </span>
                        {users.next_page_url && (
                            <Link
                                href={users.next_page_url}
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
