<?php

namespace App\Models\Relationships\Detail;

interface HasOneDetailI
{
    public function details(): \Illuminate\Database\Eloquent\Relations\HasOne;
}
