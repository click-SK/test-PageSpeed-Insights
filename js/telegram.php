<?php

$phone = $_POST['phone'];
$page = $_POST['page'];
$type = $_POST['type'];
$token = "1296674698:AAGLE1aMgcRyzS2fchZCdjRVkOyojrwaQyA";
$chat_id = "-1001437773760";
$arr = array(
  'Сторінка: ' => $page,
  'Тип: ' => $type,
  'Телефон: ' => $phone
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


if ($sendToTelegram) {
  echo 'ok';
} else {
  echo "Error";
}
?>