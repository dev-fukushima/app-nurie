<?php

class Makeimg {

  public static $response = array();
  public static $source = '';

  public static function isAjax(){
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        return true;
    }
    return false;
  }

  public static function sessionStart(){
    session_start();
    setcookie('sid',self::getSessionId());
  }

  public static function getSessionId(){
    return sha1(session_id());
  }

  public static function sessionEnd(){
    setcookie('sid', '', time() - 1800);
    $_SESSION = array();
    session_destroy();
  }

  public static function getDirList($dir) {
    $files = scandir($dir);
    $files = array_filter($files, function ($file) { // 注(1)
        return !in_array($file, array('.', '..'));
    });
    return $files;
  }

  public function __construct(){

  }

  public static function rmfile($dir){
    if ($handle = opendir("$dir")) :
      while (false !== ($item = readdir($handle))) {
          if ($item != "." && $item != "..") {
            if (is_dir("$dir/$item")) {
              Makeimg::rmfile("$dir/$item");
            } else {
              unlink("$dir/$item");
            }
          }
        }
        closedir($handle);
        rmdir($dir);
    endif;
  }

  public static function create_svg_and_png($filename,$img_data = '',$background){
    if(empty($img_data)):
      $img_data = self::$source;
    endif;
    $tmpsvg_filename = str_replace(".png",".svg",$filename);
    file_put_contents($tmpsvg_filename,$img_data);
    $cmd = '/usr/bin/convert '.$tmpsvg_filename.' '.$filename;
    //$cmd = '/usr/bin/mogrify '.$filename.' -crop '.($w-10).'x'.($h-10).'+'.($w/2).'+'.($h/2);
    //$cmd = '/usr/bin/mogrify '.$filename.' -background "'.$background.'" -gravity center -extent '.$img_width.'x'.$img_height;
    //$cmd = '/usr/bin/convert '.$tmpsvg_filename.' -background "'.$background.'" -gravity center -extent '.$img_width.'x'.$img_height.' '.$filename;
    //-bordercolor "#e2ddd4" -border 10x0
    system($cmd);
    chmod($filename,0777);
    unlink($tmpsvg_filename);
  }

  public static function run(){

    //---------------ajax通信でトークンが不一致の場合
    if(Makeimg::isAjax() && ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['id'] != sha1(session_id()))){
      Makeimg::$response["data"] = 'error token number';
      header("Content-Type: application/json; charset=utf-8");
      echo json_encode(Makeimg::$response);
      Makeimg::sessionEnd();
      exit;
    }


    if(Makeimg::isAjax() && $_POST['id'] == sha1(session_id())){
      //---------------ajax通信
      try{

      $img_data = $_POST['image'];
      $background = $_POST['background'];
      $img_data = preg_replace('/data:[^,]+,/i','', $img_data);
      $img_data = base64_decode($img_data);
      Makeimg::$source = $img_data;

      /*canvasでpngにデコード済の場合は以下で対応可能*/
      $image = imagecreatefromstring($img_data);
      imagesavealpha($image, TRUE);

      $path = date('Ymd');
      $pastpath = date('Ymd',strtotime("-1 day"));
      $upload_dir = './upload/';
      $dirlist = Makeimg::getDirList($upload_dir);
      $dir = $upload_dir . $path;

      if(!empty($dirlist)):
      //1日前のディレクトリを削除
      foreach($dirlist as $d):
      if($d <= $pastpath){
        if(file_exists($upload_dir . $d)):
          //rmdir($upload_dir . $d);
          Makeimg::rmfile($upload_dir . $d);
        endif;
      }
      endforeach;
      endif;

      if(!file_exists($dir)){
        clearstatcache();
        mkdir($dir, 0777, TRUE);
        chmod($dir,0777);
      }

      do{
        $filename = $dir . '/' . mt_rand() . '.png';
      } while(file_exists($filename));

      $filename = str_replace("\r\n", '', htmlspecialchars($filename));

      if(isset($filename)){
        /*ファイル生成処理*/
        //Makeimg::create_svg_and_png($filename);
        /*CANVASでPNGデータにデコード済の場合は以下でOK*/
        imagepng($image,$filename,9);

        Makeimg::$response["data"] = $filename;
      }else{
        Makeimg::$response["response_error"] = "error";
      }

    }catch(Exception $e){
      Makeimg::$response['response_error'] = $e->getMessage();
    }

      Makeimg::sessionEnd();
      header("Content-Type: application/json; charset=utf-8");
      echo json_encode(Makeimg::$response);
      exit;
    }
  }
}


Makeimg::sessionStart();

Makeimg::run();

?>
