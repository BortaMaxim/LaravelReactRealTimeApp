<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateChannelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'channel_type' => 'required',
            'channel_name' => 'required|string',
            'detail_name' => 'required|string',
            'detail_desc' => 'required|string',
            'detail_visible' => 'required',
            'detail_type' => 'required',
        ];
    }
}
