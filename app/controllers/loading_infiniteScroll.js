
//Listener para abrir los tabs
Ti.App.addEventListener('openLoading_infiniteScroll', function(e) {
	openLoading();
});

Ti.App.addEventListener('closeLoading_infiniteScroll', function(e) {
	closeLoading();
});

show();


$.activityIndicator.show();



var FadeIn_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 1,
    duration: 300
});

var FadeOut_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 0,
    duration: 300
});

var FadeInMid_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 0.6,
    duration: 300
});



/* ***********************************************************
 * Public functions
 * ***********************************************************/
function openLoading(){
	
	Ti.App.removeEventListener('openLoading_infiniteScroll', function(e) {
		openLoading();
	});

	if (Ti.Platform.osname == "iphone")
	{
		
	}
	else
	{
		$.winloadingInfiniteScroll.width = Ti.UI.FILL;
		$.winloadingInfiniteScroll.height = 45;
	}
	
	$.winloadingInfiniteScroll.animate(FadeInMid_Opacity);
	
}

function closeLoading(){
	
	Ti.App.removeEventListener('closeLoading_infiniteScroll', function(e) {
		closeLoading();
	});

	if (Ti.Platform.osname == "iphone")
	{
		
	}
	else
	{
		$.winloadingInfiniteScroll.width = 0;
		$.winloadingInfiniteScroll.height = 0;
	}
	
	$.winloadingInfiniteScroll.animate(FadeOut_Opacity);
		
	
}



/* ***********************************************************
 * Private functions
 * ***********************************************************/

function show(){
	
	if (Ti.Platform.osname == "iphone")
	{
		$.winloadingInfiniteScroll.top = Ti.Platform.displayCaps.platformHeight  - 80;
	}
	else
	{
		$.winloadingInfiniteScroll.top = (Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160)) - 120;
	}
}

/* ***********************************************************
 * Event handlers
 * ***********************************************************/



