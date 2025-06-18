import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';

export default function UserCreate({ user, roles }) {
    const { data, setData, processing, errors, setError, clearErrors } = useForm({
        full_name: user?.full_name || '',
        email: user?.email || '',
        role: user?.roles?.[0]?.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        router.post(route('admin.users.update', user.id), {
            ...data,
            _method: 'PUT',
        }, {
            onSuccess: () => toast.success('Usuario actualizado correctamente'),
            onError: (errors) => {
                toast.error('Error al actualizar el usuario');
                setError(errors);
            },
        });
    };

    return (
        <AdminLayout header="Editar Usuario">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <form onSubmit={submit} className="space-y-6">
                    {/* Nombre */}
                    <div className="w-full">
                        <InputLabel htmlFor="name">Nombre</InputLabel>
                        <TextInput
                            type="text"
                            id="full_name"
                            value={data.full_name}
                            className="w-full bg-black/5 dark:bg-gray-100/10"
                            disabled
                        />
                    </div>

                    {/* Correo */}
                    <div className="w-full">
                        <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
                        <TextInput
                            type="email"
                            id="email"
                            value={data.email}
                            className="w-full bg-black/5 dark:bg-gray-100/10"
                            disabled
                        />
                    </div>

                    {/* Rol */}
                    <div className="w-full">
                        <InputLabel htmlFor="role">Rol</InputLabel>
                        <SelectInput
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full"
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </SelectInput>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>

                    {/* Botón */}
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-rose-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-500 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Actualizar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
