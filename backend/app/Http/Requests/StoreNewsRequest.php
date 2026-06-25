<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewsRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'image' => ['nullable', 'image', 'max: 2048'],
            'content' => ['required', 'string', 'min:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'O título é obrigatório.',
            'title.min'            => 'O título deve ter pelo menos 3 caracteres.',
            'description.required' => 'A descrição é obrigatória.',
            'description.min'      => 'A descrição deve ter pelo menos 10 caracteres.',
            'image.image'          => 'O arquivo deve ser uma imagem.',
            'image.max'            => 'A imagem deve ter no máximo 2MB.',
            'content.required'     => 'O conteúdo é obrigatório.',
            'content.min'          => 'O conteúdo deve ter pelo menos 10 caracteres.',
        ];
    }
}
