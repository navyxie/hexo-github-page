(function($) { 
	// When to show the scroll link
	// higher number = scroll link appears further down the page：显示返回顶部的位置
	var upperLimit = 500;
	
	// Our scroll link element
	var scrollElem = $('#totop');
   
	// Scroll to top speed：回滚速度
	var scrollSpeed = 500;

   //cache document
   	var doc = $(document);

	// Show and hide the scroll to top link based on scroll position   
	scrollElem.hide();
	$(window).scroll(function () {            
		var scrollTop = doc.scrollTop();       
		if ( scrollTop > upperLimit ) {
			scrollElem.stop().fadeTo(300, 1); // fade back in           
		}else{       
			scrollElem.stop().fadeTo(300, 0); // fade out
		}
	});

	// Scroll to top animation on click
	$('body').on('click','#totop',function(){
		$('html, body').animate({scrollTop:0}, scrollSpeed); 
	});
})(jQuery);