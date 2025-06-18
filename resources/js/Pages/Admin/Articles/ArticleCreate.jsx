import InputLabel from '@/Components/InputLabel';
import RichTextEditor from '@/Components/RichTextEditor';
import SelectInput from '@/Components/SelectInput';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ArticleCreate({ categories, article }) {
    const { data, setData, processing, errors, reset, setError, clearErrors } = useForm({
        title: article?.title || '',
        slug: article?.slug || '',
        introduction: article?.introduction || '',
        image: article?.image || '',
        body: article?.body || '',
        status: article?.status || 1,
        category_id: article?.category_id || '',
    });

    // Autogenerar el slug cuando cambia el título
    useEffect(() => {
        const generatedSlug = data.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');
        setData('slug', generatedSlug);
    }, [data.title]);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        if (article) {
            // Si estamos editando un artículo existente, usamos el método PUT
            router.post(route('admin.articles.update', article), {
                ...data,
                _method: 'put', // Aseguramos que se use el método PUT

            }, {
                onSuccess: () => toast.success('Artículo actualizado exitosamente'),
                onError: (errors) => {
                    toast.error('Hubo un problema al actualizar el artículo');
                    setError(errors);
                },
            });
        } else {
            router.post(route('admin.articles.store'), data, {
                onSuccess: () => toast.success('Artículo creado exitosamente'),
                onError: (errors) => {
                    toast.error('Hubo un problema al crear el artículo');
                    setError(errors);
                },
            });
        }
    };

    return (
        <AdminLayout header="Crear Artículo">
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
                        {/* Título */}
                        <div className='w-full md:w-1/2'>
                            <InputLabel htmlFor="title">Título</InputLabel>
                            <TextInput
                                type="text"
                                id="title"
                                value={data.title}
                                autoComplete="off"
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* Slug (deshabilitado) */}
                        <div className='w-full md:w-1/2'>
                            <InputLabel htmlFor="slug">Slug</InputLabel>
                            <TextInput
                                type="text"
                                id="slug"
                                value={data.slug}
                                className="w-full bg-black/5 dark:bg-gray-100/10 select-none"
                                disabled
                            />
                            {errors.slug && (<p className="text-red-500 text-xs mt-1">{errors.slug}</p>)}
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className='w-full'>
                        <InputLabel htmlFor="image">Imagen (URL)</InputLabel>
                        <TextInput
                            type="text"
                            id="image"
                            autoComplete="off"
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            className="w-full"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        {article?.image && (
                            <div className="mt-2 w-full justify-center flex">
                                <img src={article.image} alt="Imagen del artículo" className="w-1/3 h-auto rounded-md" />
                            </div>
                        )}
                    </div>

                    {/* Introducción */}
                    <div className='w-full'>
                        <InputLabel htmlFor="introduction">Introducción</InputLabel>
                        <TextArea
                            id="introduction"
                            value={data.introduction}
                            onChange={(e) => setData('introduction', e.target.value)}
                            className="w-full"
                            rows="3"
                        />
                        {errors.introduction && <p className="text-red-500 text-xs mt-1">{errors.introduction}</p>}
                    </div>

                    

                    {/* Cuerpo */}
                   <div className='w-full'>
                        <InputLabel htmlFor="body">Cuerpo del Artículo</InputLabel>
                        <RichTextEditor
                            value={data.body}
                            onChange={(val) => {
                                setData('body', val);
                            }}
                        />
                        {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                    </div>

                    <div className='flex flex-col md:flex-row md:gap-8 w-full'>
                        {/* Estado */}
                        <div className='w-full md:w-1/2'>
                            <InputLabel htmlFor="status">Estado</InputLabel>
                            <SelectInput
                                id="status"
                                value={data.status}
                                className="w-full"
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="1">Público</option>
                                <option value="0">Privado</option>
                            </SelectInput>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>

                        {/* Categoría */}
                        <div className='w-full md:w-1/2'>
                            <InputLabel htmlFor="category_id">Categoría</InputLabel>
                            <SelectInput
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full"
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </SelectInput>
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>
                    </div>
                    

                    {/* Botón */}
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-rose-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-500 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            {article ? "Editar Artículo" : "Crear Artículo"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
