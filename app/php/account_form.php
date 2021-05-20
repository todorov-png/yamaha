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
    $query = "SELECT * FROM Users WHERE email='$email'";
    $result = mysqli_fetch_array(mysqli_query($link, $query));

    //Проверяем email в базе и совпадение password
    if(is_null($result['email'])) {
      $answer = false;
    } elseif ($result['password'] == $_POST['password']) {
      // Формируем массив для JSON ответа
      $answer = array(
        'password_status' => true,
        'email' => $result['email']
      ); 
    } else {
      $answer = array(
        'password_status' => false
      ); 
    }
    
    // переводим массив в JSON и отправляем ответ
    echo json_encode($answer, JSON_UNESCAPED_UNICODE); 
  }    
    
  // закрываем подключение
  mysqli_close($link);
?>