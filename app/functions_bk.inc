<?php
function isAjax()
{
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        return true;
    }
    return false;
}

$response = array();
//---------------セッションスタート
session_start();
$session_id = sha1(session_id());

//---------------ajax通信でトークンが不一致の場合
if(isAjax() && $_SERVER["REQUEST_METHOD"] != "POST" && $_POST['id'] != sha1(session_id())){
  $response["data"] = 'error token number';
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode($response);
  exit;
}

//---------------ajax通信
if(isAjax() && $_POST['id'] == sha1(session_id())){
  try{
  $img_data = $_POST['image'];
  $img_data = preg_replace('/data:[^,]+,/i','', $img_data);
  $img_data = base64_decode($img_data);

  $image = imagecreatefromstring($img_data);
  imagesavealpha($image, TRUE);

  $path = date('Y/m');
  $upload_dir = './upload/';
  $dir = $upload_dir . $path;


  if(!file_exists($dir)){
    clearstatcache();
    mkdir($dir, 0777, TRUE);

  }
  do{
    $filename = $dir . '/' . mt_rand() . '.png';
  } while(file_exists($filename));

  $filename = str_replace("\r\n", '', htmlspecialchars($filename));

  if(isset($filename)){
    imagepng($image,$filename,9);
    $response["data"] = $filename;
  }else{
    $response["response_error"] = "error";
  }

}catch(Exception $e){
  $response['response_error'] = $e->getMessage();
}

  header("Content-Type: application/json; charset=utf-8");
  echo json_encode($response);
  exit;
}

?>
