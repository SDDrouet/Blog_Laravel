<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Main routes privadas
Route::middleware(['auth', 'verified'])->group(function () {

    //Forma simplificada para crear un artículo mas simplificada
    //Articles
    Route::resource('admin/articles', ArticleController::class)
        ->except('show')
        ->names('admin.articles');

    //Categorías resource
    Route::resource('admin/categories', CategoryController::class)
        ->except('show') // Exclude show and destroy methods
        ->names('admin.categories');

    // Comentarios
    Route::resource('admin/comments', CommentController::class)
        ->only(['index', 'destroy'])
        ->names('admin.comments');

    // Usuarios
    Route::resource('admin/users', UserController::class)
        ->except(['show', 'create', 'store']) // Exclude show, create, and store methods
        ->names('admin.users');

    // Roles
    Route::resource('admin/roles', RoleController::class)
        ->except(['show']) // Exclude show
        ->names('admin.roles');

    Route::post('/comment', action: [CommentController::class, 'store'])->name('comments.store');

    Route::get('/frase', function () {
        return Inertia::render('Others/Frase');
    })->name('frase');


    Route::get('/admin', action: [AdminController::class, 'index'])
            ->middleware('can:admin.index') // Middleware to check if the user can access the admin index
            ->name('admin.index');
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Rutas publicas
Route::get('/category/{category}', [CategoryController::class, 'detail'])->name('categories.detail');
Route::get('/categories', [DashboardController::class, 'all'])->name('dashboard.all'); // Ver categorias
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');    // Ver articulos
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');


// Auth routes
require __DIR__.'/auth.php';