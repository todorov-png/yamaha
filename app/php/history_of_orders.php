<?php

// подключаем скрипт
require_once 'data_connect_db.php'; 
  
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

mysqli_set_charset($con, "utf8"); //обозначаем кодировку

$_POST = json_decode(file_get_contents('php://input'), true);

// выполняем операции с базой данных
if (isset($_POST)) {
  $email = $_POST;

  // получаем данные о заказах пользователя
  $query_select_orders = "SELECT orders, tools FROM orders WHERE email='$email'";
  $link_query_select_orders = mysqli_query($link, $query_select_orders);
  $result_select = mysqli_fetch_all($link_query_select_orders);
  $counter_rows = mysqli_num_rows($link_query_select_orders);
  $i = 0;

  if ($counter_rows > 0) {
    foreach ($result_select as $row) {
      $answer[$i][0] = $row[0];
      $answer[$i][1] = json_decode($row[1]);
      $i++;
    }
  } else {
    $answer = false;
  }

  // переводим в JSON и отправляем ответ
  echo json_encode($answer, JSON_UNESCAPED_UNICODE); 
}     
  
// закрываем подключение
mysqli_close($link);
?>