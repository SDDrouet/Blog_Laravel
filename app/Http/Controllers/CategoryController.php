<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    use AuthorizesRequests;

    // Constructor para aplicar el middleware de autorización
    public function __construct()
    {
        $this->middleware('can:admin.categories.index')->only('index');
        $this->middleware('can:admin.categories.create')->only(['create', 'store']);
        $this->middleware('can:admin.categories.edit')->only(['edit', 'update']);
        $this->middleware('can:admin.categories.destroy')->only('destroy');
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')
            ->paginate(8);

        return inertia('Admin/Categories/CategoryIndex', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Categories/CategoryCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category = $request->all();

        Category::create($category);

        return redirect()->action([CategoryController::class, 'index'])
            ->with('success', 'Categoría creada correctamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Admin/Categories/CategoryCreate', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        // Actualizar los demás campos
        $category->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'is_featured' => $request->is_featured,
            'status' => $request->status,
        ]);

        return redirect()->action([CategoryController::class, 'index'], compact('category'))
            ->with('success', 'Categoría actualizada correctamente.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }

    //Filtrar articulos por categoria
    public function detail(Category $category)
    {
        // Verificar si la categoría está activa
        $this->authorize('detail', $category);

        $articles = Article::where([
                ['status', 1],
                ['category_id', $category->id],
            ])
            ->orderBy('id', 'desc')
            ->paginate(5);

        $navbar = Category::where([
            ['status', 1],
            ['is_featured', 1],
        ])->get()->take(3);

        return inertia('Home/Dashboard', compact('articles', 'category', 'navbar'));
    }
}
