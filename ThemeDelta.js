/*Top class to govern the underlying theme data and visuals */
ThemeDelta = function (canvas, container){
	this.container = container;
	this.canvas = canvas;
	this.canvas_scale = 1;
	this.initialize();
};

ThemeDelta.prototype.initialize = function (){
	this.data = new ThemeData();
	this.visuals = new Array();
	
	this.vis_name = this.canvas.set();
	this.vis_line = this.canvas.set();
	this.start_vis = 0;
	this.end_vis = 1;
	this.y_offset = 0;
	
	this.filterThemes = new Array();
	this.filterThemes_name = new Array();
	
	this.generateThemePoints(this.data.themes);
	this.visualize();
	
//	this.canvas.setViewBox(0,0,1500,1000, true);
};

ThemeDelta.prototype.visualize = function (){
//	this.visuals = new Array();
	for (var i=0; i<this.themes.length; i++){
		var updated = false;
		for (var j=0; j<this.visuals.length; j++){
			if (this.visuals[j].name.toString().toLowerCase() == this.themes_name[i].toString().toLowerCase()){
				this.visuals[j].update(this.themes[i]);
				updated = true;
				break;
			}
		}
		if (!updated){
			this.visuals[this.visuals.length] = new Theme(this.themes_name[i], this.themes[i], this);
			this.vis_name.push(this.visuals[this.visuals.length-1].visual_name);
			this.vis_line.push(this.visuals[this.visuals.length-1].visual);
		}
	}
	
    this.setView();

	//	for (j=0; j<this.visuals.length; j++){
//		this.visuals[j].scaleStroke(scale);
//	}
//	this.canvas.setViewBox(0,0,500,500,true);
//	var t=this;
//	setTimeout(function(){t.canvas.setViewBox(0,0,t.vis_width,t.vis_height,true);}, 1000);
};

ThemeDelta.prototype.highlightVisual = function (name, condition){
	for (var i=0; i<this.visuals.length; i++){
		var visual_name = this.visuals[i].name;
		if (visual_name.lastIndexOf("**") != -1)
			visual_name = visual_name.substring(0,visual_name.lastIndexOf("**"));
		if (visual_name == name)
			this.visuals[i].highlight(condition);
	}
	
};

ThemeDelta.prototype.filterData = function (num){	
	var newTheme = this.data.themes_names[num];
	if (newTheme.lastIndexOf("**") != -1) // Remove code before adding
		newTheme = newTheme.substring(0,newTheme.lastIndexOf("**"));
	
	if (ThemeDelta.findArrayIndex(this.filterThemes_name, newTheme, 0) == -1){ // If not already present 
		this.filterThemes_name.splice(0, 0, newTheme); // Adding new theme name
		this.filterThemes.splice(0, 0, ThemeDelta.findArrayIndex(this.data.themes_names, this.filterThemes_name[0], 0));
	}
	else{
		var index = ThemeDelta.findArrayIndex(this.filterThemes_name, newTheme, 0);
		this.filterThemes_name.splice(index, 1); // Removing the current occurence 
		this.filterThemes.splice(index, 1);
		this.filterThemes_name.splice(0, 0, newTheme); // Adding new theme name
		this.filterThemes.splice(0, 0, ThemeDelta.findArrayIndex(this.data.themes_names, this.filterThemes_name[0], 0));
	}
	
	var data = this.data.filterData(this.filterThemes, this.filterThemes_name); // Filtering the data, this will update corresponding numbers
	
	this.filterThemes = new Array(); // Remove the old numbers and populate with updated numbers
	for (var p=0; p<this.filterThemes_name.length; p++){
		var filter = this.filterThemes_name[p];
		this.filterThemes[p] = ThemeDelta.findArrayIndex(this.data.themes_names, filter, 0);
	}
	
	this.generateThemePoints(data);
	var wait = false;
	if (this.visuals.length != 0) wait = true;
	var remove = new Array();
	for (var i=0; i<this.visuals.length; i++){
//		if (ThemeDelta.findArrayIndex(this.themes_name, this.visuals[i].name) == -1){
			this.visuals[i].remove();
			remove[remove.length] = i;
//		}
	}
	this.visuals = new Array();
//	for (i=0; i<remove.length; i++)
//		this.visuals.splice(remove[i]-i, 1);
	var t = this;
	if (wait && remove.length!=0)
		this.visualize();
//		setTimeout(function(){t.visualize();}, 500);
	else
		this.visualize();

	this.displayFilters();
};


//ThemeDelta.prototype.updateVisual = function (num){
//	this.data.sortData(num);
//	this.generateThemePoints(this.data.themes);
//	for (var i=0; i<this.visuals.length; i++){
//		this.visuals[i].update(this.themes[ThemeDelta.findArrayIndex(this.themes_name, this.visuals[i].name)]);
//	}
//};

ThemeDelta.prototype.generateThemePoints = function (graph){
	this.themes = new Array();
	this.themes_name = new Array();
	this.startX = 100;
	this.startY = 10;
	this.deltaX = 600;
	this.deltaY = 200;
	this.minY_space = 15;
	
	this.vis_x = 0;
	this.vis_y = 0;
	this.vis_width = this.deltaX*(graph.length-1) + 2*this.startX;
	this.vis_height = this.startY;
	
	var max_height = Number.MIN_VALUE;
	var max_width = (graph.length-1)*this.deltaX;
	var start_index = 0;
	var end_index = graph.length-1;
	var increment = 4;
	
	for (var i=0; i<graph.length; i++){
		var tempY_distance = 0;
		var temp = 0;
		for (var j=0; j<graph[i].length; j++){
			var freq_spacing = 0;
			for (var k=0; k<graph[i][j].length; k++){
				var theme_name = this.data.themes_names[graph[i][j][k]["index"]];
				var theme_pos = ThemeDelta.findArrayIndex(this.themes_name, theme_name);
				if (theme_pos == -1){
					theme_pos = this.themes.length;
					this.themes[theme_pos] = new Array();
					this.themes_name[theme_pos] = theme_name;
				}

				if (i > 0 && this.themes[theme_pos][increment*(i-1)] == null){ //Connecting this start of repetition to the previous string 
					var name = theme_name;
					if (name.lastIndexOf("**") != -1){
						name = name.substring(0,name.lastIndexOf("**"));
						var pos = ThemeDelta.findArrayIndex(this.themes_name, name);
						if (pos != -1){
							this.themes[theme_pos][increment*(i-1)] = this.themes[pos][increment*(i-1)];
							this.themes[theme_pos][increment*(i-1)+1] = this.themes[pos][increment*(i-1)+1];
							this.themes[theme_pos][increment*(i-1)+2] = this.themes[pos][increment*(i-1)+2];
							this.themes[theme_pos][increment*(i-1)+3] = this.themes[pos][increment*(i-1)+3];
						}
					}
					
				}
				
				this.themes[theme_pos][increment*i] = this.startX + i*this.deltaX;
				if (j==0)
					this.themes[theme_pos][increment*i+1] = this.startY + k*this.minY_space + freq_spacing + tempY_distance;
				else
					this.themes[theme_pos][increment*i+1] = this.startY + this.deltaY + k*this.minY_space + freq_spacing + tempY_distance;
				this.themes[theme_pos][increment*i+2] = graph[i][j][k]["freq"]; // Adding frequency
				freq_spacing = freq_spacing+graph[i][j][k]["freq"];
//				if (i==0)
//					alert(graph[i][j][k]["type"]);
				this.themes[theme_pos][increment*i+3] = graph[i][j][k]["type"]; // Adding type
				temp = this.themes[theme_pos][increment*i+1]+this.themes[theme_pos][increment*i+2];
				
			}
			tempY_distance = temp; 
			if (temp>this.vis_height)
				this.vis_height = this.startY+temp+150;
			if (max_height < tempY_distance)
				max_height = tempY_distance;
		}
	}
	
//	this.vis_x = start_index*this.deltaX+this.startX/2; 
//	this.vis_width = this.deltaX*(end_index-start_index) + 2*this.startX;
	
	this.addGrid(start_index, end_index, this.startY, max_height);
//	this.addRangeSelector(max_width, max_height);
};

ThemeDelta.prototype.highlightThemes = function (name){
	
};

ThemeDelta.prototype.setFilterCanvas = function (canvas){
	this.displayFiltersCanvas = canvas;
	this.vis_filters = this.displayFiltersCanvas.set();
};

ThemeDelta.prototype.displayFilters = function(){
	this.vis_filters.remove();
	
	for (var i=0; i<this.filterThemes_name.length; i++){
		var filter = this.filterThemes_name[i];
		var dummy_filter = this.filterThemes_name[i];
		if (filter.toString().lastIndexOf("**") != -1)
			filter = filter.toString().substring(0,filter.toString().lastIndexOf("**"));

		var title = filter;
		if (filter.length > 15)
			title = filter.substring(0, 12)+"...";
		
		var text = this.displayFiltersCanvas.text(10,i*40+20, title).attr({"text-anchor":"start", "font-size":20, "title":filter, "cursor":"default"}).toFront();
		var dim = text.getBBox();
		this.vis_filters.push(text);
		this.cross_size = 10;
		this.vis_filters.push(this.displayFiltersCanvas.rect(dim.x-5,dim.y-5, dim.width+10, dim.height+10, 10).attr({"fill":"pink", "stroke":null}).toBack());
		var cross = this.displayFiltersCanvas.set();
		cross.push(this.displayFiltersCanvas.path("M"+(dim.x+dim.width)+" "+(dim.y-4)+"L"+(dim.x+dim.width-this.cross_size)+" "+(dim.y-4+this.cross_size)));
		cross.push(this.displayFiltersCanvas.path("M"+(dim.x+dim.width-this.cross_size)+" "+(dim.y-4)+"L"+(dim.x+dim.width)+" "+(dim.y-4+this.cross_size)));
		var t = this;
		var cross_rect = this.displayFiltersCanvas.rect((dim.x+dim.width-this.cross_size), (dim.y-4), this.cross_size, this.cross_size).attr({"fill":"pink", "title": "click to remove", "stroke":null, "opacity":0.1, "cursor":"pointer"});
		cross.push(cross_rect);
		this.displayFilterListener(cross_rect, dummy_filter);
		this.vis_filters.push(cross);
	}
};

ThemeDelta.prototype.displayFilterListener = function (object, filter){
	var t = this;
	object.mouseover(function (){
	});
	object.click(function (){
		t.removeFilter(filter);
	});
};

ThemeDelta.prototype.removeFilter = function (filter){
	var index = ThemeDelta.findArrayIndex(this.filterThemes_name, filter, 0);
	this.filterThemes_name.splice(index, 1);
	this.filterThemes.splice(index, 1);
	if (this.filterThemes.length != 0)
		this.filterData(this.filterThemes[0]);
	else
		this.refresh();
};

ThemeDelta.prototype.updateRange = function(start, end){ // start and end are in terms of the percentage
	this.start_vis = start;
	this.end_vis = end;
	this.setView();
};

ThemeDelta.prototype.setView = function (){
//	this.canvas.setViewBox(this.vis_x+this.vis_width*this.start_vis,this.vis_y,this.vis_width*(this.end_vis-this.start_vis),this.vis_height,true);
	if ((this.end_vis-this.start_vis)<0.97 && this.vis_width*(this.end_vis-this.start_vis)<=this.vis_height){
		this.canvas.setSize(this.container.offsetWidth-20, this.container.offsetHeight-20+(this.vis_height-this.vis_width*(this.end_vis-this.start_vis)));
//		this.canvas.setViewBox(this.vis_x+this.vis_width*this.start_vis,this.vis_y,this.vis_width*(this.end_vis-this.start_vis),this.vis_height,true);
		this.canvas.setViewBox(this.vis_x+this.vis_width*this.start_vis,0,this.vis_width*(this.end_vis-this.start_vis),this.vis_height,true);
	}
	else{
		this.canvas.setSize(this.container.offsetWidth-20, this.container.offsetHeight-20);

		if(this.vis_height<(this.vis_width/2)*(this.end_vis-this.start_vis))
			this.y_offset = this.vis_y-(this.vis_height-(this.vis_width*(this.end_vis-this.start_vis))/2);
//		this.canvas.setViewBox(this.vis_x+this.vis_width*this.start_vis,this.y_offset,this.vis_width*(this.end_vis-this.start_vis),this.vis_height,true);
		this.canvas.setViewBox(this.vis_x+this.vis_width*this.start_vis,0,this.vis_width*(this.end_vis-this.start_vis),this.vis_height,true);
	}
	
};

ThemeDelta.prototype.addGrid = function(start_index, end_index, y, height){
	if (this.grid)
		this.grid.remove();
	this.grid = this.canvas.set();
	for (var i=start_index; i<=end_index; i++){
		this.grid.push(this.canvas.path("M"+(this.startX+i*this.deltaX)+" "+y+"L"+(this.startX+i*this.deltaX)+" "+height).attr({"stroke-dasharray":"--", "stroke":"gray"}));
		this.grid.push(this.canvas.text(this.startX+i*this.deltaX, height+40, this.data.timeStamps[i]).attr({"text-anchor":"center", "font-size":40}));
	}
};

ThemeDelta.prototype.refresh = function (){
	this.vis_filters.remove();
	this.filterThemes = new Array();
	this.filterThemes_name = new Array();
	
	this.data = new ThemeData();
	this.generateThemePoints(this.data.themes);
	this.start_vis = 0;
	this.end_vis = 1;
//	this.visuals = new Array();
	this.visualize();
};

ThemeDelta.prototype.hideBusysign = function () {
	   document.getElementById('busy').style.display ='none';
};

ThemeDelta.prototype.showBusysign = function() {
	   document.getElementById('busy').style.display ='inherit';
};

ThemeDelta.prototype.testvisualize = function (){
	var points = [100,100,200,200,300,100,500,50,600,500,700,400,900,300];
	var theme = new Theme("Theme", points, this.canvas);
	theme.visualize();
	var check = true;
	document.getElementById('holder').onmouseup = function (event){
		if (check){
			points = [0,0,200,500,300,300,500,20,600,100,700,200,900,500];
			check = false;
		}
		else{
			points = [100,100,200,200,300,100,500,50,600,500,700,400,900,300];
			check = true;
		}
		theme.update(points);
	};
};

ThemeDelta.findArrayIndex = function(array, object, fromIndex){
	if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, array.length + fromIndex);
    }
    for (var i = fromIndex, j = array.length; i < j; i++) {
        if (array[i].toString().toLowerCase() === object.toString().toLowerCase())
            return i;
    }
    return -1;
};