<?php

namespace App\Models\Concern\Detail;

use App\Models\Detail;

trait HasOneDetail
{
    public function details(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Detail::class);
    }
}
