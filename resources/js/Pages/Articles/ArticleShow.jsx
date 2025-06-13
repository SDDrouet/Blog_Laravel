import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import Comment from './Partials/Comment';
import { useForm, usePage } from '@inertiajs/react';
import StarRating from './Partials/StarRating';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ArticleIndex({article, comments: initialComments}) {
  const user = usePage().props.auth.user;
  const [comments, setComments] = useState(initialComments);

  const { data, setData, processing, errors, reset, setError, clearErrors } = useForm({
    value: '',
    description: '',
    article_id: article.id,
  });

  const submit = async (e) => {
    e.preventDefault();
    clearErrors();

    try {
      const response = await axios.post(route('comments.store'), data);
      
      if (response.data.success) {
        // Agregar el nuevo comentario a la lista
        setComments(prevComments => ({
          ...prevComments,
          data: [response.data.comment, ...prevComments.data]
        }));

        toast.success(response.data.message);

        // Limpiar el formulario
        reset();
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Errores de validación
        const errorData = error.response.data;
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach(key => {
            setError(key, errorData.errors[key][0]);
          });
        } else {
          toast.error('Ya has comentado este artículo.');
        }
      } else {
        toast.error('Ocurrió un error al enviar el comentario.');
      }
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h1 className="text-2xl font-light text-gray-900 dark:text-gray-100">
          {article.title}
        </h1>
      }>

      {/* Artículo Principal */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            
            {/* Imagen del artículo */}
            <div className="aspect-video overflow-hidden rounded-t-xl">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 lg:p-12">
              {/* Meta información del autor */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex-shrink-0">
                  {article.user.profile?.photo ? (
                    <img
                      src={article.user.profile.photo}
                      alt={article.user.full_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="material-symbols-rounded text-gray-400 text-xl">
                        account_circle
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {article.user.full_name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(article.created_at).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'                      
                    })}
                  </p>
                </div>
              </div>

              {/* Título del artículo */}
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Introducción */}
              <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-light leading-relaxed">
                {article.introduction}
              </div>

              {/* Cuerpo del artículo */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-gray">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {article.body}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            {/*Si el usuario esta autenticado puede comentar*/ }

            {user ? (
              <div className="p-8 lg:p-12">
                {/* Título de la sección de comentarios */}
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
                  Deja un comentario
                </h2>
                  <form onSubmit={submit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Valoración (1 a 5)
                      </label>
                      
                      <StarRating 
                        value={parseInt(data.value) || 0}
                        onChange={(rating) => setData('value', rating.toString())}
                        error={errors.value}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Comentario
                      </label>
                      <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-900 dark:text-white focus:border-rose-500 focus:ring-rose-500"
                        rows="4"
                        required
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className='flex justify-end'>
                        <button
                        type="submit"
                        disabled={processing}
                        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-md"
                      >
                        {processing ? 'Enviando...' : 'Publicar comentario'}
                      </button>
                    </div>
                  </form>
              </div>
            ) : (
              <div className="p-8 lg:p-12">
                <p className="text-base text-gray-500 dark:text-gray-400">
                  Debes estar autenticado para comentar.
                </p>
              </div>
            )}

            
          </div>
        </div>
      </div>

      {/* Sección de Comentarios */}
      <div className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="p-8 lg:p-12">
              
              {/* Título de comentarios */}
              <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                  Comentarios
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {comments.data.length} {comments.data.length === 1 ? 'comentario' : 'comentarios'}
                </p>
              </div>

              {/* Lista de comentarios */}
              {comments.data.length > 0 ? (
                <div className="space-y-8">
                  {comments.data.map((comment, index) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="material-symbols-rounded text-gray-400 text-2xl select-none">
                      chat_bubble_outline
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 select-none">
                    Aún no hay comentarios en este artículo
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 select-none">
                    ¡Sé el primero en comentar!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}