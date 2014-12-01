

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

 //Styles
var rowItemList = $.createStyle({classes: ['rowItemList']});

//Init config
show();

$.container.open();


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
	
}

function loadItems()
{
	actualPage ++;
	 
	//We already get to finish, no more items to load 
	if (finalRange > collection_Items.length-1)
	{
		 finalRange = collection_Items.length-1;
		 //$.scrollableSlider.scrollingEnabled = true;
		 $.scrollableSlider.removeEventListener('scroll',scrollView_EndScroll); 
	}
	
	for (var i=initRange;i<=finalRange;i++)
	{
		totalItems ++;
		
		var row1 = Ti.UI.createView({});
		row1.applyProperties(rowItemList);
		
		var label1 = Ti.UI.createLabel({
			text: 'View ' + i
		});
		
		row1.add(label1);
		contentView.add(row1); 
		
		
	}
	
	//Active Infinite Scroll
	Ti.App.fireEvent('closeLoading_infiniteScroll');
	//$.scrollableSlider.scrollingEnabled = true;
	$.scrollableSlider.addEventListener('scroll',scrollView_EndScroll);
}	



//////////////////////////////////////////////////////// INFINITE SCROLL  //////////////////////////////////////////
function scrollView_EndScroll(e)
{
    if (Ti.Platform.osname === 'iphone')
    {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
		var lastDistance = 0;

        if (distance < lastDistance)
        {
            // adjust the % of rows scrolled before we decide to start fetching
            var nearEnd = theEnd * .85;
 
            if ((updating === 'true') && (total >= nearEnd))
            {
            	updating = 'false';
                beginUpdate();
            }
        }
        lastDistance = distance;
    }
    else if (Ti.Platform.osname === 'android')
    {
       
       var firstVisibleItemIndex = Math.ceil(e.y / heightItemView);
       var visibleItemCount = $.scrollableSlider.rect.height / 100;
       
       if ((updating === 'true') && ((firstVisibleItemIndex + visibleItemCount) >= (totalItems*0.95)))
        {
        	//$.scrollableSlider.scrollingEnabled = false;
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

	