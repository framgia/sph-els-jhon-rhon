<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class maxWord implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($params)
    {
        $this->params = $params;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->wordCount = str_word_count($value, 0);
        return $this->wordCount <= $this->params;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Words must not be greater than '. $this->params .' word, you entered '. $this->wordCount .' words';
    }
}
