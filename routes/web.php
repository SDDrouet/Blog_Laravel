<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Main routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/all', [DashboardController::class, 'all'])->name('dashboard.all');

    //Forma simplificada para crear un artículo mas simplificada
    //Articles
    Route::resource('articles', ArticleController::class)
        ->except('show')
        ->names('articles');

    //Categorías resource
    Route::resource('categories', CategoryController::class)
        ->except('show') // Exclude show and destroy methods
        ->names('categories');
    // articulos por categoría
    Route::get('/category/{category}', [CategoryController::class, 'detail'])->name('categories.detail');
    
    // Ver articulos
    Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

    // Comentarios
    Route::resource('comments', CommentController::class)
        ->only(['index', 'destroy'])
        ->names('comments');

    Route::get('/comment', [CommentController::class, 'store'])->name('comments.store');
});



// Rutas
Route::middleware(['auth', 'verified'])->group(function () {
    /*
    // Forma larga para crear un artículo
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    */
});

// oTHER routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/frase', function () {
        return Inertia::render('Others/Frase');
    })->name('frase');
});


// Authentication routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});


require __DIR__.'/auth.php';
