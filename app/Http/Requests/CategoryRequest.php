<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
        //slug and image
        $slug = request()->isMethod('put')
            ? 'required|unique:categories,slug,' . $this->route('category')->id
            : 'required|unique:categories,slug';

        return [
            'name' => 'required|max:40',
            'slug' => $slug,
            'image' => 'string|nullable|max:255',
            'is_featured' => 'required|boolean',
            'status' => 'required|boolean',
        ];
    }
}
