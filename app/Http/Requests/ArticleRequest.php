<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $slugRule = request()->isMethod('put')
            ? 'required|unique:articles,slug,' . $this->route('article')->id
            : 'required|unique:articles,slug';

        return [
            'title' => 'required|min:5|max:255',
            'slug' => $slugRule,
            'introduction' => 'required|min:10|max:255',
            'body' => 'required',
            'image' => 'string|nullable|max:255',
            'status' => 'required|boolean',
            'category_id' => 'required|integer',
        ];
    }

}
