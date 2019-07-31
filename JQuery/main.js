$(function()
{
	$("span").mouseenter(function()
	{
		$("span").hide(1000);
		$("#kot").hide(1000)
        $(".instead").show(1000);
		$("#kot2").show(500);
		$("#mishka").show(1000);
	})
	$("#mishka").click(function()
	{
		$("#mishka").rotate({
            animateTo:360,
            center: ["1px", "1px"]
        });
		setTimeout(func, 1000);
	})
	function func()
	{
		$("#kot2").hide(1000);
		$("#mishka").hide(1000);
        $(".instead").hide(1000);
        $("span").show(1000);
        $("#kot").show(500);
	}
}
)