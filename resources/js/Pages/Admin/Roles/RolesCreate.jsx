import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';

export default function RolesCreate({ role, permissions }) {
    const { data, setData, processing, errors, clearErrors } = useForm({
        name: role?.name || '',
        permissions: Array.isArray(role?.permissions)
            ? role.permissions.map((p) => p.id)
            : [],
    });

    const togglePermission = (id) => {
        const selected = Array.isArray(data.permissions) ? data.permissions : [];
        if (selected.includes(id)) {
            setData('permissions', selected.filter((pid) => pid !== id));
        } else {
            setData('permissions', [...selected, id]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        if (role) {
            // Si estamos editando un rol existente, usamos el método PUT
            router.put(route('admin.roles.update', role.id), data, {
                onSuccess: () => toast.success('Rol actualizado exitosamente'),
                onError: (errors) => {
                    toast.error('Hubo un problema al actualizar el rol');
                    setError(errors);
                },
            });
        } else {
            // Si estamos creando un nuevo rol
            router.post(route('admin.roles.store'), data, {
                onSuccess: () => toast.success('Rol creado exitosamente'),
                onError: (errors) => {
                    toast.error('Hubo un problema al crear el rol');
                    setError(errors);
                },
            });
        }
    };


    return (
        <AdminLayout header={role ? 'Editar Rol' : 'Crear Rol'}>
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <form onSubmit={submit} className="space-y-6">
                    {/* Nombre del rol */}
                    <div>
                        <InputLabel htmlFor="name">Nombre del Rol</InputLabel>
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Permisos en tabla */}
                    <div>
                        <InputLabel>Permisos</InputLabel>
                        <div className="overflow-x-auto rounded-lg border dark:border-gray-700 mt-2 overflow-auto max-h-60">
                            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300 relative">
                                <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase font-semibold sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-3">Seleccionar</th>
                                        <th className="px-4 py-3">Permiso</th>
                                        <th className="px-4 py-3">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.map((permission) => (
                                        <tr
                                            key={permission.id}
                                            className="border-t border-gray-200 dark:border-gray-700"
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={Array.isArray(data.permissions) && data.permissions.includes(permission.id)}
                                                    onChange={() => togglePermission(permission.id)}
                                                    className="rounded text-rose-600 focus:ring-rose-500"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                {permission.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {permission.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {errors.permissions && (
                            <p className="text-red-500 text-xs mt-2">{errors.permissions}</p>
                        )}
                    </div>

                    {/* Botón */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-rose-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-500 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            {role ? 'Actualizar Rol' : 'Crear Rol'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
