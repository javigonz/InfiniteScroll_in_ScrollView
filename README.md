
Alloy/Titanium Infinite scroll in a ScrollView - for Android
===

This is a init project to show a information in a scrollView with pagination, but not traditional pagination. A way to show the information in a infinite scroll with interation on draw down

- For now works in Android, and show block of 20 items
```
//How many items show in each pagination
Alloy.CFG.HowManyItemsShow = 20;
```
- In each iteration with pagination, the loading view is change to visible and creates a smoth animations.
```
Ti.App.fireEvent('openLoading_infiniteScroll');
```
- The ScrollView component to be scrolling, its fill of views where you can put any component that you want to show, like images, text, icons ...
```
<ScrollView  class="scrollableSlider"  showPagingControl="false" id="scrollableSlider" >
			
		<!-- Here we put the view items-->
					
</ScrollView>
```
