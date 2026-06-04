<?php

$apiKey = "3fd1a403a8eb487a8c191e32c413d5fe";

$competition = $_GET['competition'] ?? '2003';

$url = "https://api.football-data.org/v4/competitions/$competition/standings";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-Auth-Token: $apiKey"
]);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo curl_error($ch);
    exit;
}

curl_close($ch);

header("Content-Type: application/json");

echo $response;