
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bootstrap Combobox Example</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <link href="../assets/css/bootstrap.css" media="screen" rel="stylesheet" type="text/css">
    <link href="../assets/css/bootstrap-combobox.css" media="screen" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="well">
          <h1>Bootstrap Combobox Example</h1>
        </div>
      </div>
      <div class="row">
        <form class="form-horizontal">
          <fieldset>
            <legend>Transforms a select box into a autoselecting combobox</legend>
            <div class="control-group">
              <label class="control-label">Turns this</label>
              <div class="controls">
                <select>
                  <option></option>
                  <option value="PA">Pennsylvania</option>
                  <option value="CT">Connecticut</option>
                  <option value="NY">New York</option>
                  <option value="MD">Maryland</option>
                  <option value="VA">Virginia</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Into this</label>
              <div class="controls">
                <select class="combobox">
                  <option></option>
                  <option value="PA">Pennsylvania</option>
                  <option value="CT">Connecticut</option>
                  <option value="NY">New York</option>
                  <option value="MD">Maryland</option>
                  <option value="VA">Virginia</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script src="../assets/js/bootstrap-typeahead.js" type="text/javascript"></script>
    <script src="../assets/js/bootstrap-combobox.js" type="text/javascript"></script>
    <script type="text/javascript">
      //<![CDATA[
        $(document).ready(function(){
          $('.combobox').combobox()
        });
      //]]>
    </script>
  </body>
</html>
