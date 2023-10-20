<?php

$phone = $_POST['number'];
$city1 = $_POST['city1'];
$city2 = $_POST['city2'];
$city3 = $_POST['city3'];
$city4 = $_POST['city4'];
$city5 = $_POST['city5'];
$movers = $_POST['postMovers'];
$hour = $_POST['postAmount'];
$price = $_POST['price'];
$car = $_POST['postCar'];
$type = $_POST['type'];
$page = $_POST['page'];
$date = $_POST['date'];
$amount = $_POST['postAmount'];

$token = "1296674698:AAGLE1aMgcRyzS2fchZCdjRVkOyojrwaQyA";
$chat_id = "-1001437773760";

$arr = array(
  'Сторінка: ' => $page,
  'Тип: ' => $type,
  'Вантажники: ' => $movers .' шт.',
  'Авто: ' => $car,
  'Тривалість: ' => $amount .' год.',
  'Дата: ' => $date,
  'Сума: ' => $price .' грн.',
  'Адреса 1: ' => $city1,
  'Адреса 2: ' => $city2,
  'Адреса 3: ' => $city3,
  'Адреса 4: ' => $city4,
  'Адреса 5: ' => $city5,
  'Телефон: ' => $phone
);

$txt = "";

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo 'ok';
} else {
  echo "Error";
}
?>
