<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')
            ->simplePaginate(8);

        return inertia('Categories/CategoryIndex', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Categories/CategoryCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category = $request->all();

        // Si el archivo tiene una imagen, guardarla
        if ($request->hasFile('image')) {
            $category['image'] = $request->file('image')->store('categories');
        }

        Category::create($category);

        return redirect()->action([CategoryController::class, 'index'])
            ->with('success', 'Categoría creada correctamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Categories/CategoryEdit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        if($request->hasFile('image')) {
            File::delete(public_path('storage/' . $category->image));
            // Guardar la nueva imagen
            $category->image = $request->file('image')->store('categories');
        }

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
        if ($category->image) {
            File::delete(public_path('storage/' . $category->image));
        }

        $category->delete();
    }

    //Filtrar articulos por categoria
    public function detail(Category $category)
    {
        $articles = Article::where([
                ['status', 1],
                ['category_id', $category->id],
            ])
            ->orderBy('id', 'desc')
            ->simplePaginate(5);

        $navbar = Category::where([
            ['status', 1],
            ['is_featured', 1],
        ])->paginate(3);

        return inertia('Categories/CategoryDetail', compact('articles', 'category', 'navbar'));
    }
}
