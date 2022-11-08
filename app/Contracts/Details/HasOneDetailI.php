<?php

namespace App\Contracts\Details;

interface HasOneDetailI
{
    public function details(): \Illuminate\Database\Eloquent\Relations\HasOne;
}
