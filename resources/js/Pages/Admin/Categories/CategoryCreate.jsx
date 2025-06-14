import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function CategoryCreate({ category }) {
    const { data, setData, processing, errors, reset, setError, clearErrors } = useForm({
        name: category?.name || '',
        slug: category?.slug || '',
        image: category?.image || '',
        is_featured: category?.is_featured ?? 0,
        status: category?.status ?? 1,
    });

    // Autogenerar slug desde name
    useEffect(() => {
        const generatedSlug = data.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');
        setData('slug', generatedSlug);
    }, [data.name]);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        if (category) {
            router.put(route('admin.categories.update', category.slug), data, {
                onSuccess: () => toast.success('Categoría actualizada correctamente'),
                onError: (errors) => {
                    toast.error('Error al actualizar la categoría');
                    setError(errors);
                },
            });
        } else {
            router.post(route('admin.categories.store'), data, {
                onSuccess: () => {
                    toast.success('Categoría creada correctamente');
                    reset();
                },
                onError: (errors) => {
                    toast.error('Error al crear la categoría');
                    setError(errors);
                },
            });
        }
    };

    return (
        <AdminLayout header={category ? "Editar Categoría" : "Crear Categoría"}>
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Nombre */}
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="name">Nombre</InputLabel>
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Slug (solo lectura) */}
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="slug">Slug</InputLabel>
                            <TextInput
                                id="slug"
                                value={data.slug}
                                className="w-full bg-black/5 dark:bg-gray-100/10"
                                disabled
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="w-full">
                        <InputLabel htmlFor="image">Imagen (URL)</InputLabel>
                        <TextInput
                            id="image"
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            className="w-full"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        {data.image && (
                            <div className="mt-2 w-full flex justify-center">
                                <img src={data.image} alt="Vista previa" className="w-1/3 rounded-md" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* ¿Destacado? */}
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="is_featured">¿Destacado?</InputLabel>
                            <SelectInput
                                id="is_featured"
                                value={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.value)}
                                className="w-full"
                            >
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </SelectInput>
                            {errors.is_featured && <p className="text-red-500 text-xs mt-1">{errors.is_featured}</p>}
                        </div>

                        {/* Estado */}
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="status">Estado</InputLabel>
                            <SelectInput
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full"
                            >
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </SelectInput>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-rose-500 active:bg-rose-700 focus:ring-2 focus:ring-rose-500 disabled:opacity-25 transition"
                        >
                            {category ? "Actualizar Categoría" : "Crear Categoría"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
