RangeSelector = function (canvas, container, width, height, listener){
	this.canvas = canvas;
	this.container = container;
	this.listener = listener;
	this.x = 1;
	this.y = 5;
	this.width = width-2*this.x;
	this.height = height/2;
	this.selector_width = 10;
	this.visualize();
};

RangeSelector.prototype.visualize = function (){
	this.base_rect = this.canvas.rect(this.x,this.y,this.width,this.height,5).attr({"fill":"lightgray"});
	this.rect = this.canvas.rect(this.x,this.y,this.width,this.height,5).attr({"fill":"gray", "stroke":null, "title":"drag to select time range"});
	this.addRangeRectListener(this.rect);
	this.selector1 = this.canvas.rect(this.x, this.y, this.selector_width, this.height, 5).attr({"fill":"white", "stroke":"black", "title":"drag to select time range"});
	this.addSelectorListener(this.selector1, true);
	this.selector2 = this.canvas.rect(this.x+this.width-this.selector_width, this.y, this.selector_width, this.height, 5).attr({"fill":"white", "stroke":"black", "title":"drag to select time range"});
	this.addSelectorListener(this.selector2, false);
};


RangeSelector.prototype.addSelectorListener = function (object, left_selector){
	object.mouseover(function(){
		document.body.style.cursor='w-resize';
	});
	
	object.mouseout(function(event){
		document.body.style.cursor='default';
	});
	
	var t = this;
	var selector = object;
	
	object.drag(function(dx, dy, x, y, event){ // move function
		x = x-t.container.offsetLeft;
//		if (t.selector1.x>=t.x && t.selector1.x+t.selector1.width<=t.selector2.x && t.selector2.x+t.selector2.width <=t.x+t.width)
		if (x>=t.x && x <= t.x+t.width-t.selector_width){
			if (left_selector && x+t.selector_width<t.selector2.getBBox().x)
				selector.attr({"x":x});
			else if (!left_selector && t.selector1.getBBox().x+t.selector1.getBBox().width < x)
				selector.attr({"x":x});
			t.update(true);
			event.stop();
		}
        
	}, function(x, y){ // drag start function
		
	}, function(){ // drag end function
		
	}
	);
};

RangeSelector.prototype.addRangeRectListener = function (object){
	object.mouseover(function(){
		document.body.style.cursor='move';
	});
	
	object.mouseout(function(event){
		document.body.style.cursor='default';
	});
	
	var t = this;
	var rect = object;
	var sx=0;
	object.drag(function(dx, dy, x, y, event){ // move functions
        var shift = dx-sx;
        if (rect.getBBox().x+shift>=t.x && rect.getBBox().x+rect.getBBox().width+shift<=t.x+t.width){
        	rect.attr({"x":rect.getBBox().x+shift});
        	t.update(false);
        	
        }
        sx = dx;        	
	}, function(x, y){ // drag start function
		sx = 0;
		
	}, function(){ // drag end function
		sx = 0;
	}
	);
};


RangeSelector.prototype.update = function (selector_update){
	if (selector_update)
		this.rect.attr({"x":this.selector1.getBBox().x, "width":this.selector2.getBBox().x - this.selector1.getBBox().x+this.selector1.getBBox().width});
	else{
		this.selector1.attr({"x":this.rect.getBBox().x});
		this.selector2.attr({"x":this.rect.getBBox().x+this.rect.getBBox().width-this.selector_width});
	}
	this.updateRange();
};

RangeSelector.prototype.updateRange = function (){
	var range = new Array();
	var start = (this.selector1.getBBox().x-this.x)/this.width;
	var end = (this.selector2.getBBox().x+this.selector2.getBBox().width-this.x)/this.width;
	this.listener.updateRange(start, end);
};

RangeSelector.prototype.refresh = function (){
	this.rect.attr({"x":this.x, "width":this.width});
	this.selector1.attr({"x":this.x});
	this.selector2.attr({"x":this.x+this.width-this.selector_width});
};