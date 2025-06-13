import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Comment extends Component {
    static propTypes = {comment: PropTypes.object.isRequired, index: PropTypes.number.isRequired}

    renderStars(value) {
        const fullStar = '★';
        const emptyStar = '☆';

        return (
            <div className="flex gap-0">
            {[1, 2, 3, 4, 5].map((rating) => (
                <span
                key={rating}
                className={`text-2xl duration-100 transform 
                    ${rating <= value
                    ? 'text-rose-500 drop-shadow-sm'
                    : 'text-gray-300 dark:text-gray-600'
                    } 
                    select-none`}
                style={{
                    textShadow: rating <= value
                    ? '0 0 3px rgba(244, 63, 94, 0.3)'
                    : 'none',
                }}
                >
                {rating <= value ? fullStar : emptyStar}
                </span>
            ))}
            </div>
        );
        }


  render() {
    const { comment, index } = this.props;

    return (
      <div key={comment.id} className={`${index !== 0 ? 'pt-8 border-t border-gray-100 dark:border-gray-800' : ''}`}>
                      
        {/* Header del comentario */}
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
                {comment.user.profile?.photo ? (
                <img
                    src={comment.user.profile.photo}
                    alt={comment.user.full_name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                />
                ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="material-symbols-rounded text-gray-400 text-lg">
                    account_circle
                    </span>
                </div>
                )}
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {comment.user.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </p>
                {/* Estrellas */}
                <div className="flex mt-1">
                    {this.renderStars(comment.value)}
                </div>
            </div>
            </div>

            {/* Contenido del comentario */}
            <div className="ml-14">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {comment.description}
            </p>
            </div>
        </div>
    )
  }
}

export default Comment