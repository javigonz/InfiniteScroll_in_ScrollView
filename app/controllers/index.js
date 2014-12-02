

var numberTableRowsDisplayed = Alloy.CFG.HowManyItemsShow;
var initRange = 0;
var finalRange = Alloy.CFG.HowManyItemsShow;
var rows = [];
var updating = 'true';
var nearBottom = 'false';
var contentView;
var totalItems = 0;
var heightItemView = 0;
var actualPage = 0;

show();


/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/

function show(){

	if (Ti.Platform.osname == "iphone")
	{
		heightItemView = 200;
	}
	else
	{
		
		if (Titanium.Platform.displayCaps.dpi <= 240)
		{
			heightItemView = 100;
		}
		else if ((Titanium.Platform.displayCaps.dpi > 240)	 && 	(Titanium.Platform.displayCaps.dpi <= 320))	
		{
			heightItemView = 200;
		}
		else
		{
			heightItemView = 300;
		}														
		
	}
	
	contentView = Ti.UI.createView({
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					layout: 'vertical',
					top:0,
					left:0,
					backgroundColor:'transparent'
	});
			
	$.scrollableSlider.add(contentView);
	
	//Now, we call the fucntion who load the items
	loadItems();
	
	$.container.open();
	
}

function loadItems()
{
	 //Styles
	var rowItemList = $.createStyle({classes: ['rowItemList']});
	var separator = $.createStyle({classes: ['separator']});
	var styleText = $.createStyle({classes: ['styleText']});

	actualPage ++;
	 
	//We already get to finish, no more items to load 
	if (finalRange > collection_Items.length-1)
	{
		 finalRange = collection_Items.length-1;
		 $.scrollableSlider.removeEventListener('scroll',scrollView_EndScroll); 
	}
	
	for (var i=initRange;i<=finalRange;i++)
	{
		totalItems ++;
		
		var row1 = Ti.UI.createView({});
		row1.applyProperties(rowItemList);
		
		var separatorView = Ti.UI.createView({});
		separatorView.applyProperties(separator);
		
		var label1 = Ti.UI.createLabel({
			text: 'View ' + i
		});
		label1.applyProperties(styleText);
		
		row1.add(label1);
		row1.add(separatorView);
		contentView.add(row1); 
		
		
	}
	
	//Active Infinite Scroll
	Ti.App.fireEvent('closeLoading_infiniteScroll');
	$.scrollableSlider.addEventListener('scroll',scrollView_EndScroll);
}	



//////////////////////////////////////////////////////// INFINITE SCROLL  //////////////////////////////////////////
function scrollView_EndScroll(e)
{
    if (Ti.Platform.osname === 'iphone')
    {
       //Future implementation
    }
    else if (Ti.Platform.osname === 'android')
    {
       
       var firstVisibleItemIndex = Math.ceil(e.y / heightItemView);
       var visibleItemCount = $.scrollableSlider.rect.height / 100;
       
       if ((updating === 'true') && ((firstVisibleItemIndex + visibleItemCount) >= (totalItems*0.95)))
        {
        	$.scrollableSlider.removeEventListener('scroll',scrollView_EndScroll);
        	updating = 'false';
            beginUpdate();
        }

    }
 
}
 
function beginUpdate()
{

    numberTableRowsDisplayed = numberTableRowsDisplayed + Alloy.CFG.HowManyItemsShow;
    
    if ( (numberTableRowsDisplayed - collection_Items.length) > Alloy.CFG.HowManyItemsShow)
    {	
    	//No more data to load
    	$.scrollableSlider.scrollingEnabled = true;
    	$.scrollableSlider.removeEventListener('scroll',scrollView_EndScroll); 
    	updating = 'false';
    }
    else
    {

    	Ti.App.fireEvent('openLoading_infiniteScroll');
    	
    	//two secods delayed its important to view the loader working
    	var miniTimer = setTimeout(function () {
			clearInterval( miniTimer );
	        initRange = finalRange+1;
	        finalRange += Alloy.CFG.HowManyItemsShow;
	        updating = 'true';
	        loadItems();
	    }, 2000);
  
    }
    
}	

	