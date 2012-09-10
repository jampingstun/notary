<style>
                    body{
                    background-image: url(./assets/img/bg.jpg);
                    background-repeat: repeat;

                }
                
</style>
<!-- Navbar ================================================== -->
<div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
            <ul class="nav pull-left">
<!--        menu kiri        -->
            </ul>
                <p class="brand" style="margin: 0; margin-left: 25%; margin-top: 3px; padding: 0;"><img src="assets/img/header.png"/></p>

                <ul class="nav pull-right">
<!--          menu kanan          -->
                </ul>
        </div>
      </div>
    </div>
    
    
 <!-- Login Form
    ================================================== -->
  <div style="margin-top:5em;">
  <div class="container">
      <div class="content">
          <div class="row">
              <br />
              <br />
              <div class="span8" style="margin-left: 0%">
                <img class="imgberanda" src="assets/img/login.jpg"/>
              </div>
              <div class="span1 login" style="margin-left: 5%">
                <form id="login" method="post">
                    <div class="login-form">
                    <h2>Login</h2>
                        <fieldset>
                            <div>
                                <input  type="text" placeholder="Username" id="username" name="username">
                            </div>
                            <div>
                                <input style="width:152px;" type="password" placeholder="Password" id="password" name="password">
                                <button class=" btn btn-primary" type="submit" style="margin-bottom:9px;">Login</button>
                            </div>

                        </fieldset>
                    </div>
                </form>
              </div>
              
         </div>
          
          
          
             <!-- <div style="margin-top: -100px" class="row">
              <div class="span6" style="margin-left: 28%">
                <img class="imgberanda" src="assets/img/login.jpg"/>
              </div> -->
         </div>     
          
      </div>
  </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <?php
    $keluar = "$('.alert').hide()";
    if (!empty($_GET['error'])) {
        if($_GET['error']=='salah') {
            echo '<br />';
            echo '<div style="margin-left:38%; margin-right:38%;" class="alert alert-block alert-error fade in" id="pesan_error">';
            echo '<button type="button" class="close" onclick='.$keluar.'>×</button>';
            echo 'username dan password salah';
            echo '</div>';
        }
  }
  ?>
      

  
  </div>
