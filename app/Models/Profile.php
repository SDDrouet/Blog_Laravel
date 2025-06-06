<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // Relacion one to one profile->user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
