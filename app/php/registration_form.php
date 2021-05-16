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

    // переводим в JSON и отправляем ответ
    echo json_encode($result); 
  }    
    
  // закрываем подключение
  mysqli_close($link);
?>