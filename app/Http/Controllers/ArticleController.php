<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ArticleController extends Controller
{
    use AuthorizesRequests;

    //Contructor para aplicar el middleware de autorización
    public function __construct()
    {
        $this->middleware('can:admin.articles.index')->only('index');
        $this->middleware('can:admin.articles.create')->only(['create', 'store']);
        $this->middleware('can:admin.articles.edit')->only(['edit', 'update']);
        $this->middleware('can:admin.articles.destroy')->only('destroy');
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Traer la información del usuario user
        $user = Auth::user();

        $articles = Article::where('user_id', $user->id)
            ->with([
                'categories:id,name',
            ])
            ->orderBy('id', 'desc')            
            ->paginate(10);        

        return inertia('Admin/Articles/ArticleIndex', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::select('id', 'name')
            ->where('status', 1)
            ->get();

        return inertia('Admin/Articles/ArticleCreate', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        $request->merge([
            'user_id' => Auth::user()->id,
        ]);

        $article = $request->all();
        
        Article::create($article);

        return redirect()->action([ArticleController::class, 'index'])
        ->with('success', 'Artículo creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $this->authorize('published', $article);

        $article->load([
            'user:id,full_name',
            'user.profile:id,user_id,photo'
        ]);

        $comments = $article->comments()
            ->with([
                'user:id,full_name',
                'user.profile:id,user_id,photo'
            ])
            ->orderBy('id', 'desc')
            ->simplePaginate(5);


        return inertia('Articles/ArticleShow',
         compact('article', 'comments'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $this->authorize('view', $article);

        $categories = Category::select('id', 'name')
            ->where('status', 1)
            ->get();

        return inertia('Admin/Articles/ArticleCreate', compact('categories', 'article'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);

        $article->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'introduction' => $request->introduction,
            'body' => $request->body,
            'image' => $request->image ?? $article->image,
            'user_id' => Auth::user()->id,
            'status' => $request->status,            
            'category_id' => $request->category_id,
        ]);  
        
        return redirect()->action([ArticleController::class, 'index'])
        ->with('success', 'Artículo actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);

        // Eliminar el artículo
        $article->delete();
        
        return redirect()->action([ArticleController::class, 'index'])
            ->with('success', 'Artículo eliminado correctamente.');            
    }
}
