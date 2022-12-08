<?php

namespace App\Models\Relationships\Detail;


use App\Models\User\UserDetail;

trait HasOneDetail
{
    public function details(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(UserDetail::class);
    }
}
