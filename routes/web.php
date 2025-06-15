<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
    Route::resource('admin/users', \App\Http\Controllers\UserController::class)
        ->except(['show', 'create', 'store']) // Exclude show, create, and store methods
        ->names('admin.users');

    Route::post('/comment', action: [CommentController::class, 'store'])->name('comments.store');

    Route::get('/frase', function () {
        return Inertia::render('Others/Frase');
    })->name('frase');


    Route::get('/admin', action: [AdminController::class, 'index'])
            ->middleware('can:admin.index') // Middleware to check if the user can access the admin index
            ->name('admin.index');
});

// Authentication routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas publicas
Route::get('/category/{category}', [CategoryController::class, 'detail'])->name('categories.detail');
Route::get('/categories', [DashboardController::class, 'all'])->name('dashboard.all'); // Ver categorias
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');    // Ver articulos
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');




require __DIR__.'/auth.php';


// Rutas de forma larga
/*
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Forma larga para crear un artículo
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    
});
*/