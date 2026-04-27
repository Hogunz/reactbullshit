<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            [ 'name' => 'Adobe', 'logo' => '/img/partners/logo/ADOBE.jpg' ],
            [ 'name' => 'Maya', 'logo' => '/img/partners/logo/MAYA.jpg' ],
            [ 'name' => 'GDAP', 'logo' => '/img/partners/logo/GDAP.jpg' ],
            [ 'name' => 'Oracle', 'logo' => '/img/partners/logo/ORACLE.jpg' ],
            [ 'name' => 'SmartBridge', 'logo' => '/img/partners/logo/smartbridge.jpg' ],
            [ 'name' => 'Cisco', 'logo' => '/img/partners/logo/CISCO.jpg' ],
            [ 'name' => 'PaloAlto', 'logo' => '/img/partners/logo/palo_alto.png' ],
            [ 'name' => 'Wacom', 'logo' => '/img/partners/logo/wacom.webp' ],
        ];

        foreach ($partners as $partner) {
            Partner::create($partner);
        }
    }
}
