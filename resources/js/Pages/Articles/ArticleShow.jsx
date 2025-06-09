import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { useEffect } from 'react'
import Comment from './Partials/Comment';

export default function ArticleIndex({article, comments}) {
  useEffect(() => {
    console.log('Article:', article);
    console.log('Comments:', comments);
  }, [article, comments]);

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