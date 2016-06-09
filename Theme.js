Theme = function (name, data, themeDelta){
	this.name = name;
	this.points= data;
	this.increment = 4;
//	this.number = num; 
	this.canvas = themeDelta.canvas;
	this.themeDelta = themeDelta;
	this.initialize();
};

Theme.prototype.initialize = function (){
	this.theme_stroke_width = 1;
	this.theme_curveSlope = 0.45;
	this.startDelta = 4;
	this.font_size = 20;
	this.display_label_at_each_timeStamp = true;
	this.change_font_size = true;
	this.visualize();
};


Theme.prototype.visualize = function (){
	/*path is an array that has data in the form [x1,y1, x2,y2, ...]*/
	var path_length = this.points.length;
	var path_string = null;//"M"+this.points[0]+" "+this.points[1];
	var path_string_1 = null;
//	this.visual = this.canvas.path(path_string).attr({"stroke":"pink", "title":this.name, "stroke-width":this.theme_stroke_width});

	this.visual = this.canvas.set();
	this.visual_name = this.canvas.set(); 
	this.visual_array = new Array();
	this.visual_name_array = new Array();
	var tempVis, tempName;
	
	
	for (var i=0; i<path_length; i=i+this.increment){ /*creating the string for the path*/
		if (this.points[i] != null && path_string == null){
			// Selecting type colors
			this.color = "red";
			this.highlight_color = "blue";
			this.opacity = this.points[i+3];
			
			// start of a new line segment
			path_string = "M"+(this.points[i]-this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8))+"C"+(this.points[i]-this.themeDelta.deltaX/this.startDelta+(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*3/8))+" "+(this.points[i]-(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*1/8))+" "+this.points[i]+" "+(this.points[i+1]);
			path_string_1 = "C"+(this.points[i]-(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*7/8))+" "+(this.points[i]-this.themeDelta.deltaX/this.startDelta+(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*5/8))+" "+(this.points[i]-this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8))+"Z";
			tempVis = this.canvas.path(path_string).attr({"stroke":this.color, "stroke-opacity":this.opacity, "fill":this.color, "fill-opacity":this.opacity, "title":this.name, "stroke-width":this.theme_stroke_width}).toBack();
			this.visual.push(tempVis);
			this.visual_array[this.visual_array.length] = tempVis;
			var name = this.name;
			if (this.name.lastIndexOf("**") != -1)
				name = this.name.substring(0,this.name.lastIndexOf("**"));

			if (this.change_font_size) this.font_size = this.points[i+2];
//			tempName = this.canvas.text(this.points[i], this.points[i+1]+(this.font_size/2), name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
			tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
			tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
			
			this.visual_name.push(tempName);
			this.visual_name_array[this.visual_name_array.length] = tempName;
		}
		if (this.points[i] != null && path_string != null && this.points[i+this.increment] != null){
			// continuation of a line segment
			path_string = path_string+"C"+(this.points[i]+(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+this.points[i+1]+" "+(this.points[i+this.increment]-(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+this.points[i+this.increment+1]+" "+this.points[i+this.increment]+" "+this.points[i+this.increment+1];
			path_string_1 = "C"+(this.points[i+this.increment]-(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+(this.points[i+this.increment+1]+this.points[i+this.increment+2])+" "+(this.points[i]+(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+(this.points[i+1]+this.points[i+2])+" "+this.points[i]+" "+(this.points[i+1]+this.points[i+2])+path_string_1;
			
			if(this.display_label_at_each_timeStamp){
				name = this.name;
				if (this.name.lastIndexOf("**") != -1)
					name = this.name.substring(0,this.name.lastIndexOf("**"));

				if (this.change_font_size) this.font_size = this.points[i+2];
//				tempName = this.canvas.text(this.points[i], this.points[i+1]+(this.font_size/2), name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
				
				this.visual_name.push(tempName);
				this.visual_name_array[this.visual_name_array.length] = tempName;
			}
		}
		if (this.points[i] != null && path_string != null && this.points[i+this.increment] == null){
			// end of a line segment
			path_string = path_string+"C"+(this.points[i]+(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*1/8))+" "+(this.points[i]+this.themeDelta.deltaX/this.startDelta-(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*3/8))+" "+(this.points[i]+this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8));
			path_string_1 = "C"+(this.points[i]+this.themeDelta.deltaX/this.startDelta-(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*5/8))+" "+(this.points[i]+(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*7/8))+" "+this.points[i]+" "+(this.points[i+1]+(this.points[i+2]*8/8)) + path_string_1;
			path_string = path_string+path_string_1;
			tempVis.animate({"path":path_string},500, "linear");
//			tempVis.attr({"path":path_string});
//			tempVis.attr({"stroke-width":'10,15,20'});
			path_string = null;
			
			if(this.display_label_at_each_timeStamp){
				name = this.name;
				if (this.name.lastIndexOf("**") != -1)
					name = this.name.substring(0,this.name.lastIndexOf("**"));

				if (this.change_font_size) this.font_size = this.points[i+2];
//				tempName = this.canvas.text(this.points[i], this.points[i+1]+(this.font_size/2), name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
				
				this.visual_name.push(tempName);
				this.visual_name_array[this.visual_name_array.length] = tempName;
			}
		}
	}	
//	this.canvas.path(tempVis.getSubpath(0,1)).attr({"stroke":"black","stroke-width":this.theme_stroke_width*2});
//	this.visual.animate({"path":path_string},1000, "linear");
//	this.visual_name = this.canvas.text(this.points[0],this.points[1], this.name).attr({"text-anchor":"start", "font-size":20});
	this.addListeners(this.visual);
	this.visual_name.attr({"cursor":"default"});
	this.addListeners(this.visual_name);
	
//	this.visual.scale(0.5,0.5, 0, 0);
};

Theme.prototype.update = function (points){
	/*path is an array that has data in the form [x1,y1, x2,y2, ...]*/
	this.points = points;
	var path_length = this.points.length;
	var path_string = null;
	var path_string1 = null;
	
	this.visual_name.remove();
	
	var counter = 0;
	for (var i=0; i<path_length; i=i+this.increment){ /*creating the string for the path*/
		if (this.points[i] != null && path_string == null){
			// start of a new line segment
			path_string = "M"+(this.points[i]-this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8))+"C"+(this.points[i]-this.themeDelta.deltaX/this.startDelta+(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*3/8))+" "+(this.points[i]-(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*1/8))+" "+this.points[i]+" "+(this.points[i+1]);
			path_string_1 = "C"+(this.points[i]-(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*7/8))+" "+(this.points[i]-this.themeDelta.deltaX/this.startDelta+(this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*5/8))+" "+(this.points[i]-this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8))+"Z";
//			if (this.visual_name_array[counter] != null)
//				this.visual_name_array[counter].animate({"text-anchor":"start", "x":this.points[i], "y":this.points[i+1]}, 500);
			
			var name = this.name;
			if (this.name.lastIndexOf("**") != -1)
				name = this.name.substring(0,this.name.lastIndexOf("**"));
			if (this.change_font_size) this.font_size = this.points[i+2];
//			tempName = this.canvas.text(this.points[i], this.points[i+1]+(this.font_size/2), name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
			tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
			tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
			this.visual_name.push(tempName);
			this.visual_name_array[this.visual_name_array.length] = tempName;			
			
		}
		if (this.points[i] != null && path_string != null && this.points[i+this.increment] != null){
			// continuation of a line segment
			path_string = path_string+"C"+(this.points[i]+(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+this.points[i+1]+" "+(this.points[i+this.increment]-(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+this.points[i+this.increment+1]+" "+this.points[i+this.increment]+" "+this.points[i+this.increment+1];
			path_string_1 = "C"+(this.points[i+this.increment]-(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+(this.points[i+this.increment+1]+this.points[i+this.increment+2])+" "+(this.points[i]+(this.points[i+this.increment]-this.points[i])*this.theme_curveSlope)+" "+(this.points[i+1]+this.points[i+2])+" "+this.points[i]+" "+(this.points[i+1]+this.points[i+2])+path_string_1;
			
			if(this.display_label_at_each_timeStamp){
				name = this.name;
				if (this.name.lastIndexOf("**") != -1)
					name = this.name.substring(0,this.name.lastIndexOf("**"));
				if (this.change_font_size) this.font_size = this.points[i+2];
//				tempName = this.canvas.text(this.points[i], this.points[i+1]+(this.font_size/2), name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
				this.visual_name.push(tempName);
				this.visual_name_array[this.visual_name_array.length] = tempName;
			}
		}
		if (this.points[i] != null && path_string != null && this.points[i+this.increment] == null){
			// end of a line segment
			path_string = path_string+"C"+(this.points[i]+(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*1/8))+" "+(this.points[i]+this.themeDelta.deltaX/this.startDelta-(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*3/8))+" "+(this.points[i]+this.themeDelta.deltaX/this.startDelta)+" "+(this.points[i+1]+(this.points[i+2]*4/8));
			path_string_1 = "C"+(this.points[i]+this.themeDelta.deltaX/this.startDelta-(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*5/8))+" "+(this.points[i]+(this.points[i]-this.points[i]+this.themeDelta.deltaX/this.startDelta)*this.theme_curveSlope)+" "+(this.points[i+1]+(this.points[i+2]*7/8))+" "+this.points[i]+" "+(this.points[i+1]+(this.points[i+2]*8/8)) + path_string_1;
			path_string = path_string+path_string_1;
			if (this.visual_array[counter] != null)
				this.visual_array[counter].animate({"path":path_string},500);
			counter++;
			path_string = null;
			
			if(this.display_label_at_each_timeStamp){
				name = this.name;
				if (this.name.lastIndexOf("**") != -1)
					name = this.name.substring(0,this.name.lastIndexOf("**"));
				if (this.change_font_size) this.font_size = this.points[i+2];
				tempName = this.canvas.text(0, 0, name).attr({"text-anchor":"start", "font-size":this.font_size, "title":this.name}).toFront();
				tempName.attr({"x":(this.points[i]-tempName.getBBox().width/2), "y": (this.points[i+1]+this.font_size/2)});
				this.visual_name.push(tempName);
				this.visual_name_array[this.visual_name_array.length] = tempName;
			}
		}
	}	
	this.visual_name.attr({"cursor":"default"});
	this.addListeners(this.visual_name);
};

Theme.prototype.highlight = function(condition){
	if (condition){
		this.visual.attr({"stroke":this.highlight_color, "fill":this.highlight_color});
//		this.visual_name.attr({"stroke":"white", "fill":"white"});
		this.visual_name.toFront();
	}
	else{
		this.visual.attr({"stroke":this.color, "fill":this.color});
//		this.visual_name.attr({"stroke":"black", "fill":"black"});
//		this.visual.attr({"fill":"pink"});
	}
};

Theme.prototype.mouseover = function(condition){
	name = this.name;
	if (this.name.lastIndexOf("**") != -1)
		name = this.name.substring(0,this.name.lastIndexOf("**"));
	this.themeDelta.highlightVisual(name, condition);
};

Theme.prototype.addListeners = function (object){
	var t = this;
	var themeDelta = this.themeDelta;
	var name = this.name;
	object.click(function(){		
		var num = ThemeDelta.findArrayIndex(themeDelta.data.themes_names, name, 0);
		themeDelta.filterData(num);
	});
	object.mouseover(function(){
		t.mouseover(true);
	});
	object.mouseout(function(){
		t.mouseover(false);		
	});
};

Theme.prototype.remove = function(){
	var t = this;
//	for(var i=0; i<this.visual_array.length; i++){
//		var path_string = "M"+this.visual_array[i].getPointAtLength(1).x+" "+this.visual_array[i].getPointAtLength(1).y;
//		this.visual_array[i].animate({"path":path_string},500, "linear", function(){this.remove(); t.visual_name.remove();});
//	}
	
//	this.visual.animate({"path":path_string},1000, "linear", function(){this.remove(); t.visual_name.remove();});
	this.visual.remove();
	this.visual_name.remove();
};

Theme.prototype.scaleStroke = function (num){
	this.visual.attr({"stroke-width":this.theme_stroke_width*num});
};