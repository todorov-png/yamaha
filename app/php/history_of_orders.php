<?php

// подключаем скрипт
require_once 'data_connect_db.php'; 
  
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

mysqli_set_charset($con, "utf8"); //обозначаем кодировку

$_POST = json_decode(file_get_contents('php://input'), true);

// выполняем операции с базой данных
if (isset($_POST['email']) && isset($_POST['tools'])) {
  $email = $_POST['email'];
  $tools = json_encode($_POST['tools'], JSON_UNESCAPED_UNICODE);

  //Получаем количество заказов и номер телефона пользователя
  $query_select_user_data = "SELECT phone, orders FROM Users WHERE email='$email'";
  $result_select_user_data = mysqli_fetch_array(mysqli_query($link, $query_select_user_data));
  $phone = $result_select_user_data['phone'];
  $orders = $result_select_user_data['orders'] + 1;

  //Делаем запись заказа в бд
  $query_insert_orders = "INSERT INTO orders (email, phone, orders, tools) VALUES ('$email', '$phone', '$orders', '$tools')";
  $result_insert_orders = mysqli_query($link, $query_insert_orders);

  //Обновляем данные в бд о пользователе
  $query_update_orders = "UPDATE Users SET orders='$orders' WHERE email='$email'";
  $result_update_orders = mysqli_query($link, $query_update_orders);

  //Проверяем все ли запросы выполнились успешно
  if ($result_update_orders && $result_insert_orders) {
    $answer = true;
  } else {
    $answer = false;
  }

  //Получаем данные о заказах пользователя
  /* $query_select_orders = "SELECT orders, tools FROM orders WHERE email='$email'";
  $link_query_select_orders = mysqli_query($link, $query_select_orders);
  $result_select = mysqli_fetch_all($link_query_select_orders);
  $counter_rows = mysqli_num_rows($link_query_select_orders); */

  /* if ($counter_rows > 0) {
    foreach ($result_select as $row) {
      print("Город: " . $row['name'] . "; Идентификатор: . " . $row['id'] . "<br>");
    }
  } else {

  } */
  
  // переводим в JSON и отправляем ответ
  echo json_encode($answer, JSON_UNESCAPED_UNICODE); 
}    
  
// закрываем подключение
mysqli_close($link);



  



?>