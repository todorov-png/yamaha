<?php

//Подключаем скрипт
require_once 'data_connect_db.php'; 
  
//Подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

//Указываем кодировку
mysqli_set_charset($con, "utf8"); 

//Получаем данные в JSON
$_POST = json_decode(file_get_contents('php://input'), true);

//Выполняем операции с базой данных
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
  
  //Переводим в JSON и отправляем ответ
  echo json_encode($answer, JSON_UNESCAPED_UNICODE); 
}    
  
//Закрываем подключение
mysqli_close($link);
?>