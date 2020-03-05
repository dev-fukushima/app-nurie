<?php
  include_once(dirname(__FILE__) . '/app/functions.inc' );
?>

<!DOCTYPE html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>塗り絵アプリ</title>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="js/owlcarousel/assets/owl.carousel.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/animate.css">
  <!--[if lt IE 9]>
<script src="js/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

</head>
<body>
  <div class="wrapper row">
    <div class="colorpicker">
      <span class="row">
        <input class="jscolor col-12" value="ab2567">
      </span>
    </div>
    <article>
      <header class="headerArea">
        <h1>
          <img src="img/thankyou_img01.png" alt="">
        </h1>
        <div class="txArea Area-01 fireworks">

        <p>好きな色でキャラクターを塗って画像を保存しましょう。</p>
        </div>
      </header>
      <p class="nuriettl">
        <img src="img/thankyou_img03.png" alt="" id="mask">
      </p>
      <div class="txArea Area-02">
        <div class="exTextArea">

        <p class="tx-01">スマホで遊べるぬりえです。好きな色にぬってオリジナルの動物を作ることができます。作ったぬりえはLINEやFacebookのアイコンにもすることができます。</p>
        </div>
        <p class="step1 tx-02">
          <img src="img/thankyou_img04_ttl.png" alt="1,ぬるキャラを選ぶ">
        </p>
      </p>

      <div class="active step1" id="itembox">
        <div id="itemArea" class="cf"></div>
        <ul class="arr">
          <li class="left-arr"><img src="img/arr_left.png" alt=""></li>
          <li class="right-arr"><img src="img/arr_right.png" alt=""></li>
        </ul>
      </div>

    <div class="drawArea">
      <div class="fukidashi">
        <img src="img/think_fukidashi.png" alt="画像を長押しして保存してください">
      </div>
      <div id='dom' class="domArea col-12"></div>
    </div>


    <div class="step2">
        <img src="img/thankyou_img05.png" alt="2,エリアをタップして塗る">
      </div>
      <div class="colorboxWrap step2">
    <div class="" id="colorbox">
      <div id="colorBtnArea" ></div>
    </div>
    <ul class="arr">
          <li class="left-arr"><img src="img/arr_left.png" alt=""></li>
          <li class="right-arr"><img src="img/arr_right.png" alt=""></li>
        </ul>
    </div>



      <div id="makebox">
          <span id="make" class="btn">
            <img src="img/thankyou_saveBtn.png" alt="決定する">
          </span>
      </div>
      <div class="step3">
        <a href="/">
        <img src="img/btn_return.png" alt="">
        </a>
      </div>
    </article>
    <footer>
      <small>2019 Example. All Rights Reserved.</small>
    </footer>
  </div>

<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
  <script src="js/jquery.js"></script>
  <script src="js/jscolor.min.js"></script>
  <!--<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>-->
  <script src="js/underscore.js"></script>
  <script src="js/jquery.cookie.js"></script>
  <script src="js/owlcarousel/owl.carousel.min.js"></script>
  <script src="js/functions.js"></script>
  <script type="text/template" id="itembtn">
  <% if(key==0){ %>
      <ul class="cf">
      <%}%>
    <% if(key==max){ %>
      </ul>
    <%}%>
    <% if(key%setnum==0&&key!=0&&key!=max){ %>
      </ul><ul class="cf">
    <%}%>
    <li><span class="border"></span><span class="item" data-svg="<%= svgdata %>"><img src="<%= btnsrc %>"></span></li>
  </script>

  <script type="text/template" id="colorbtn">
    <% if(key==0){ %>
      <ul class="cf">
    <%}%>
    <% if(key==max){ %>
      </ul>
    <%}%>
    <% if(key%setnum==0&&key!=0&&key!=max){ %>
      </ul><ul class="cf">
    <%}%>
    <li>
      <% if(color!=''){ %>
        <span data-color="<%= color %>" ></span>
      <% }else{ %>
        <span></span>
      <% } %>
    </li>
  </script>

</body>
</html>
