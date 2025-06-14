<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = DB::table('comments')
            ->join('articles', 'comments.article_id', '=', 'articles.id')
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.id','comments.value', 'comments.description', 'articles.id as article_id', 'articles.user_id as article_user_id', 'articles.title', 'users.full_name')
            ->where('articles.user_id', Auth::user()->id)
            ->orderBy('comments.id', 'desc')
            ->get();        

        return inertia('Admin/Comments/CommentIndex', compact('comments'));
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
    public function store(CommentRequest $request) {
        $userId = Auth::id();
        $article = Article::select('slug', 'status')->find($request->article_id);

        $alreadyCommented = Comment::where('user_id', $userId)
            ->where('article_id', $request->article_id)
            ->exists();

        if (!$alreadyCommented && $article->status == 1) {
            $comment = Comment::create([
                'value' => $request->value,
                'description' => $request->description,
                'article_id' => $request->article_id,
                'user_id' => $userId,
            ]);

            // Cargar las relaciones necesarias para el nuevo comentario
            $comment->load('user.profile');

            // Retornar respuesta JSON en lugar de redirect
            return response()->json([
                'success' => true,
                'message' => 'Comentario enviado correctamente.',
                'comment' => $comment
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Ya has comentado en este artículo o el artículo no está disponible',
        ], 422);
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
        $this->authorize('deleteComment', $comment);

        $comment->delete();

        return redirect()->action([CommentController::class, 'index'], compact('comment'))
            ->with('success', 'Comentario eliminado correctamente');
    }
}
