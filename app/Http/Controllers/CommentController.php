<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = DB::table('comments')
            ->join('articles', 'comments.article_id', '=', 'articles.id')
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.value', 'comments.description', 'articles.title', 'users.full_name')
            ->where('articles.user_id', Auth::user()->id)
            ->orderBy('comments.id', 'desc')
            ->get();

        return inertia('Comments/Index', compact('comments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
        //Verificar si en el articulo ya existe un comentario del usuario actual
        $result = Comment::where('user_id', Auth::user()->id)
            ->where('article_id', $request->article_id)
            ->exists();

        // Consulta para obtener el slug y estado del artículo
        $article = Article::select('slug', 'status')
            ->find($request->article_id);

        if(!$result and $article->status == 1) {
            Comment::create([
                'value' => $request->value,
                'description' => $request->description,
                'article_id' => $request->article_id,
                'user_id' => Auth::user()->id,
            ]);
            
            return redirect()->action([ArticleController::class, 'show'], [$article->slug])
                ->with('success', 'Comentario creado correctamente');
        } else {
            return redirect()->action([ArticleController::class, 'show'], [$article->slug])
                ->with('success-error', 'Ya has comentado en este artículo o el artículo no está disponible');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->action([CommentController::class, 'index'], compact('comment'))
            ->with('success', 'Comentario eliminado correctamente');
    }
}
