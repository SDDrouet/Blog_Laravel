<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // create function to show the dashboard react component, and articles
    public function index(Request $request)
    {
        // Obtener los articulos publicos
        $articles = Article::where('status', 1)
            ->orderBy('id', 'desc')
            ->paginate(12);

        // Obtener las categorias destacadas para el navbar
        $navbar = Category::where([
            ['status', 1],
            ['is_featured', 1],
        ])->get()->take(3);


        return inertia('Home/Dashboard', compact('articles', 'navbar'));
    }

    // todas las categorias
    public function all() {
        #categories
        $categories = Category::where('status', 1)            
            ->simplePaginate(12);

        $navbar = Category::where([
            ['status', 1],
            ['is_featured', 1],
        ])->get()->take(3);

        return inertia('Home/Dashboard', compact('categories', 'navbar'));
    }
}
