<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
	alert($(".mw-headline").html());
//        var html = $('.word').html();
//        $('body').html(html);
//        $('#logo').remove();
//        $('#logo2').remove();
//        $('#titl').remove();
    })
</script>
<style type="text/css">
    .btn{
        width: 10px !important;
    }
</style>
<?php
$id = $_GET['id'];
$my_var = file_get_contents("https://en.wikipedia.org/wiki/Main_Page");
echo $my_var;
exit;
?>

<form action="https://en.wikipedia.org/wiki/Special:RandomInCategory" method="post" enctype="application/x-www-form-urlencoded" class="mw-htmlform-ooui oo-ui-layout oo-ui-formLayout"><div class="oo-ui-layout oo-ui-fieldsetLayout">
        <input type="text" name="wpcategory" maxlength="255" required="required" >
        <button type="submit">
            <span class="oo-ui-iconElement-icon oo-ui-image-invert"></span>
            <span class="oo-ui-labelElement-label">Go</span>
            <span class="oo-ui-indicatorElement-indicator oo-ui-image-invert"></span>
        </button>
</form>