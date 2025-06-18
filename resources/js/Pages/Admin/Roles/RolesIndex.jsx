import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import { Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function RolesIndex({ roles }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout header="Roles">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        {/* Header con botón crear */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Gestión de Roles
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Administra todos los roles de tu sitio web
            </p>
          </div>
          <Link
            href={route('admin.roles.create')}
            title="Crear nuevo rol"
            className="inline-flex items-center px-4 py-2 bg-rose-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          >
            <span className="material-symbols-rounded text-sm mr-2">add</span>
            Nuevo
          </Link>
        </div>

        {/* Tabla de roles */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha de creación
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {roles.data && roles.data.length > 0 ? (
                roles.data.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {role.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(role.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Editar */}
                        <Link
                          href={route('admin.roles.edit', role.id)}
                          className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-md transition-colors duration-150"
                          title="Editar rol"
                        >
                          <span className="material-symbols-rounded text-lg">edit</span>
                        </Link>

                        {/* Eliminar */}
                        <button
                          onClick={() => {
                            if (confirm('¿Estás seguro de eliminar este rol?')) {
                              router.post(route('admin.roles.destroy', role.id), {
                                _method: 'DELETE',
                              }, {
                                onSuccess: () => toast.success('Rol eliminado correctamente'),
                                onError: () => toast.error('Error al eliminar el rol')
                              });
                            }
                          }}
                          className="inline-flex items-center p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors duration-150"
                          title="Eliminar rol"
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
                        shield_person
                      </span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        No hay roles
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Comienza creando tu primer rol
                      </p>
                      <Link
                        href={route('admin.roles.create')}
                        className="inline-flex items-center px-4 py-2 bg-rose-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                      >
                        <span className="material-symbols-rounded text-sm mr-2">add</span>
                        Crear Rol
                      </Link>
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
            Mostrando roles del {roles.from} al {roles.to} de {roles.total}
          </div>
          <div className="flex gap-1">
            {roles.prev_page_url && (
              <Link
                href={roles.prev_page_url}
                className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                &laquo; Anterior
              </Link>
            )}
            <span className="px-3 py-1 text-sm border rounded-md bg-rose-500 text-white border-rose-500">
              Página {roles.current_page}
            </span>
            {roles.next_page_url && (
              <Link
                href={roles.next_page_url}
                className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Siguiente &raquo;
              </Link>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
