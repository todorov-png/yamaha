<?php
  // подключаем скрипт
  require_once 'data_connect_db.php'; 
  
  // подключаемся к серверу
  $link = mysqli_connect($host, $user, $password, $database) 
      or die("Ошибка " . mysqli_error($link));
  
  // выполняем операции с базой данных
  if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $query = "INSERT INTO Users (email, password) VALUES ('$email', '$password')";
    $result = mysqli_query($link, $query);

    if($result) {
      $answer = array(
        'password_status' => true,
        'email' => $email,
        'phone' => $password,
        'orders' => 0
      ); 
    } else {
      $answer = false;
    }
    // переводим в JSON и отправляем ответ
    echo json_encode($answer, JSON_UNESCAPED_UNICODE); 
  }    
    
  // закрываем подключение
  mysqli_close($link);
?>