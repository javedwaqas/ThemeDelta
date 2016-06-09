var themes_string = [
                      [["A","B","C"], ["D","E","F","G"]],
                      [["A","B","C","D"], ["A","E"], ["F","G"]],
                      [["A","G","E"], ["D","F","B"], ["C","A"]],
                      [["A","B","C"], ["D","E","F","G"]],
                      [["A","B","C","D"], ["A","E"], ["F","G"]]
                    ];
var themes_freq = [
                      [[2,4,5], [1,5,8,3]],
                      [[6,7,8,7], [4,6], [3,6]],
                      [[6,7,19], [8,3,6], [2,8]],
                      [[7,9,2], [5,7,9,7]],
                      [[2,6,8,9], [1,3], [6,8]]
                    ];
	
var timeStamps = ["1","2","3","4","5"];

ThemeData = function (){
	this.generateData();
};

ThemeData.prototype.generateData = function (){
	this.themes_string = themes_string;
	this.themes_freq = themes_freq;
	this.timeStamps = timeStamps;

	this.themes_type = new Array();
	
	this.normalizeFreq();
	
	this.generateNum();
	
	this.sortData("0");
};

ThemeData.prototype.normalizeFreq = function(){
	this.groupNormalize = false;
	this.minFreq = 20; //20; //for Obama
	this.maxFreq = 100;
	var min = Number.MAX_VALUE, max = Number.MIN_VALUE;
	this.hashWordFreq = new Array();
	this.wordMaxFreq = Number.MIN_VALUE, this.wordMinFreq = Number.MAX_VALUE;
	var names = new Array();
	
	var i=0,j=0,k=0;
	
	if (!this.groupNormalize){
		for (i=0; i<this.themes_freq.length; i++){ 
			for (j=0; j<this.themes_freq[i].length; j++){
				for (k=0; k<this.themes_freq[i][j].length; k++){
					if (min > this.themes_freq[i][j][k]) min = this.themes_freq[i][j][k];
					if (max < this.themes_freq[i][j][k]) max = this.themes_freq[i][j][k];
					
//					if(this.hashWordFreq[this.themes_string[i][j][k]] && this.hashWordFreq[this.themes_string[i][j][k]]<this.themes_freq[i][j][k])
//						this.hashWordFreq[this.themes_string[i][j][k]] = this.themes_freq[i][j][k];
//					else
//						this.hashWordFreq[this.themes_string[i][j][k]] = this.themes_freq[i][j][k];
					
					if(this.hashWordFreq[this.themes_string[i][j][k]]){
						this.hashWordFreq[this.themes_string[i][j][k]] += this.themes_freq[i][j][k];
					}
					else{
						names[names.length] = this.themes_string[i][j][k];
						this.hashWordFreq[this.themes_string[i][j][k]] = this.themes_freq[i][j][k];
					}
				}
			}
		}
	}
	
	for (i=0; i<names.length; i++){
		var val = this.hashWordFreq[names[i]];
		if (val > this.wordMaxFreq)
			this.wordMaxFreq = val;
		if (val < this.wordMinFreq)
			this.wordMinFreq = val;			
	}
	
	
//	min = 0;
//	max = 1;
	
	for (i=0; i<this.themes_freq.length; i++){ 
		this.themes_type[i] = new Array();
		for (j=0; j<this.themes_freq[i].length; j++){
			this.themes_type[i][j] = new Array();
			if (this.groupNormalize){
				this.minFreq = 10; this.maxFreq = 20;
				min = Number.MAX_VALUE, max = Number.MIN_VALUE;
				for (k=0; k<this.themes_freq[i][j].length; k++){
					if (min > this.themes_freq[i][j][k]) min = this.themes_freq[i][j][k];
					if (max < this.themes_freq[i][j][k]) max = this.themes_freq[i][j][k]; 
				}
			}
			for (k=0; k<this.themes_freq[i][j].length; k++){
				if (min < max)
					this.themes_freq[i][j][k] = this.minFreq + ((this.themes_freq[i][j][k]-min)/(max-min))*(this.maxFreq-this.minFreq);
				else
					this.themes_freq[i][j][k] = this.minFreq;
			}
			for (k=0; k<this.themes_freq[i][j].length; k++){
				if (this.wordMinFreq < this.wordMaxFreq)
					this.themes_type[i][j][k] = 0.2 + ((this.hashWordFreq[this.themes_string[i][j][k]]-this.wordMinFreq)/(this.wordMaxFreq-this.wordMinFreq))*(1-0.2);
				else
					this.themes_type[i][j][k] = 1;
			}
		}
	}
	
};

ThemeData.prototype.generateNum = function (){
	this.themes = new Array();
	this.themes_names = new Array();
	this.themes_string_updated = new Array();
	
	for (var i=0; i<this.themes_string.length; i++){ // Check for repetition
//		this.timeStamps[i] = i;
		this.themes_string_updated[i] = new Array();
		for (var j=0; j<this.themes_string[i].length; j++){
			this.themes_string_updated[i][j] = new Array();
			for (var k=0; k<this.themes_string[i][j].length; k++){
				var check_repeat = false;
				var counter = 0;
				for (var r=0; r<j; r++){
					if (ThemeDelta.findArrayIndex(this.themes_string[i][r], this.themes_string[i][j][k]) != -1){
						check_repeat = true;
						counter++;
					}
				}
				var freq = Math.ceil(this.themes_freq[i][j][k]);
				var type = this.themes_type[i][j][k];
				if (check_repeat) 
					this.themes_string_updated[i][j][k] = {"name":this.themes_string[i][j][k].toString()+"**"+counter, "freq":freq, "type":type};
				else
					this.themes_string_updated[i][j][k] = {"name":this.themes_string[i][j][k].toString(), "freq":freq, "type":type};
			}
		}
	}
	
	for (i=0; i<this.themes_string_updated.length; i++){
		this.themes[i] = new Array();
		for (j=0; j<this.themes_string_updated[i].length; j++){
			this.themes[i][j] = new Array();
			for (k=0; k<this.themes_string_updated[i][j].length; k++){
				if (ThemeDelta.findArrayIndex(this.themes_names, this.themes_string_updated[i][j][k]) == -1){
					this.themes_names[this.themes_names.length] = this.themes_string_updated[i][j][k]["name"];
//					alert("data error: "+this.themes_string[i][j][k]);
				}
				check_repeat = false;
//				for (r=0; r<j; r++){
//					if (ThemeDelta.findArrayIndex(this.themes[i][r], ThemeDelta.findArrayIndex(this.themes_names, this.themes_string_updated[i][j][k])) != -1){
//						check_repeat = true;
//						break;
//					}
//				}
				if (!check_repeat)
					this.themes[i][j][this.themes[i][j].length] = {"index": ThemeDelta.findArrayIndex(this.themes_names, this.themes_string_updated[i][j][k]["name"]), "freq":this.themes_string_updated[i][j][k]["freq"], "type":this.themes_string_updated[i][j][k]["type"]};
				
			}
		}
	}

};

ThemeData.prototype.sortData = function (sortTheme){ /* Sort the data with respect to the sortTheme*/
	
	var dummy_sortTheme_name = this.themes_names[sortTheme];
	var sortTheme_name = this.themes_names[sortTheme];
	if (sortTheme_name.lastIndexOf("**") != -1) // removing the code
		sortTheme_name = sortTheme_name.substring(0,sortTheme_name.lastIndexOf("**"));
	
	var theme_pos = new Array();
	counter = 0;
	for (var i=0; i<this.themes.length; i++){
		var temp_counter = 0;
		
//		for (var j=0; j<this.themes[i].length; j++){
//			// Sorting groups
//			if (i!=0){
//				var min = j;
//				var pos=Number.MAX_VALUE;
//				var tempa=0;
//				var pos_array = new Array();
//				for (var k=0; k<this.themes[i][j].length; k++){
//					if (theme_pos[this.themes[i][j][k]["index"]]){
//						pos_array.push(theme_pos[this.themes[i][j][k]["index"]]);
//						tempa += theme_pos[this.themes[i][j][k]["index"]];
//					}
//				}
//				if (tempa > 0){
//					pos = tempa/Math.max(pos_array.length, 1);
////				   pos = tempa;
//				}
//				for (var r=j+1; r<this.themes[i].length; r++){
//					var temp_array = new Array();
//					var temp_pos = Number.MAX_VALUE;
//					tempa = 0;
//					for (k=0; k<this.themes[i][r].length; k++){
//						if (theme_pos[this.themes[i][r][k]["index"]]){
//							temp_array.push(theme_pos[this.themes[i][r][k]["index"]]);
//							tempa += theme_pos[this.themes[i][r][k]["index"]];
//						}							
//					}
//					if (tempa > 0){
//						temp_pos = tempa/Math.max(temp_array.length, 1);
////						temp_pos = tempa;
//					}
//					if (pos>temp_pos){
//						min = r;
//						pos_array = temp_array;
//					}
//				}
//				if (min != j){
//					temp = this.themes[i][j]; 
//					this.themes[i][j] = this.themes[i][min];
//					this.themes[i][min] = temp;
//				}				
//			}
//		}
		
		// new code ******************
		if (i!=0){
         var themes = this.themes;
         this.themes[i].sort(function (a, b){
            var a_pos = -1, b_pos=-1;
            
            var tempa=0;
            var pos_array = new Array();
            for (var k=0; k<a.length; k++){
               if (theme_pos[a[k]["index"]]){
                  pos_array.push(theme_pos[a[k]["index"]]);
                  tempa += theme_pos[a[k]["index"]];
               }
            }
            if (tempa > 0){
               a_pos = tempa/Math.max(pos_array.length, 1);
            }
            
            var temp_array = new Array();
            tempa = 0;
            for (k=0; k<b.length; k++){
               if (theme_pos[b[k]["index"]]){
                  temp_array.push(theme_pos[b[k]["index"]]);
                  tempa += theme_pos[b[k]["index"]];
               }                    
            }
            if (tempa > 0){
               b_pos = tempa/Math.max(temp_array.length, 1);
            }
            
            if (a_pos<b_pos)
               return -1;
            if (a_pos>b_pos)
               return 1;
            // a must be equal to b
            return 0;
         });
		}
		// **************************
		
		
		for (j=0; j<this.themes[i].length; j++){
			// Sorting Focus Groups
			var insert = false;
			for (k=0; k<this.themes[i][j].length; k++){
				var theme_name = this.themes_names[this.themes[i][j][k]["index"]];
				if (theme_name.lastIndexOf("**") != -1){ // removing the code
					theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
				}
				
				if (theme_name == sortTheme_name){
					var temp = this.themes[i][j][k];
					this.themes[i][j][k] = this.themes[i][j][0];
					this.themes[i][j][0] = temp;
					insert = true;
					break;
				}
			}
			if (insert){
				temp = this.themes[i][j];	
				if (this.themes[i][j][0]["index"] == sortTheme && temp_counter!=0){
					this.themes[i][j] = this.themes[i][0];
					this.themes[i][0] = temp;
				}
				temp = this.themes[i][j];	
				this.themes[i].splice(j,1);
				this.themes[i].splice(temp_counter,0,temp);
				temp_counter++;
			}
			
		}
		
		theme_pos = new Array();
		
		for (j=0; j<this.themes[i].length; j++){			
			// Sorting words within groups
			for (k=0; k<this.themes[i][j].length-1; k++){
				temp = k;
				if (theme_pos[this.themes[i][j][k]["index"]] == null){
					theme_name = this.themes_names[this.themes[i][j][k]["index"]];
					if (theme_name.lastIndexOf("**") != -1){ // removing the code
						theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
					}
					if (theme_name == sortTheme_name)
						theme_pos[this.themes[i][j][k]["index"]] = -1;
					else{
						theme_pos[this.themes[i][j][k]["index"]] = counter;
						counter++;
					}
				}
				for (r=k+1; r<this.themes[i][j].length; r++){
					if (theme_pos[this.themes[i][j][r]["index"]] == null){
						theme_name = this.themes_names[this.themes[i][j][r]["index"]];
						if (theme_name.lastIndexOf("**") != -1){ // removing the code
							theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
						}
						if (theme_name == sortTheme_name)
							theme_pos[this.themes[i][j][r]["index"]] = -1;
						else{
							theme_pos[this.themes[i][j][r]["index"]] = counter;
							counter++;
						}
					}
					if (theme_pos[this.themes[i][j][r]["index"]] < theme_pos[this.themes[i][j][temp]["index"]]){
						temp = r;
					}
					
				}
				if (temp != k){
//					var temp1 = this.themes[i][j][temp];
//					this.themes[i][j][temp] = this.themes[i][j][k];
//					this.themes[i][j][k] = temp1;
				}
				theme_name = this.themes_names[this.themes[i][j][k]["index"]];
				if (theme_name.lastIndexOf("**") != -1){ // removing the code
					theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
				}
				if (theme_name == sortTheme_name)
					theme_pos[this.themes[i][j][k]["index"]] = -1;
				else{
					theme_pos[this.themes[i][j][k]["index"]] = counter;
					counter++;
				}
			}
			if (this.themes[i][j].length >0)
				theme_pos[this.themes[i][j][this.themes[i][j].length-1]["index"]] = counter;
			counter++;
			
			
		// new code ********************
       if (i != 0){
          var themes_names = this.themes_names;
          var themes = this.themes[i-1];
            this.themes[i][j].sort(function(a, b){
                 var a_pos = 0, b_pos = 0, c=0;
                for (var jj=0; jj<themes.length; jj++){       
                   // Sorting words within groups for first time segment
                   for (var kk=0; kk<themes[jj].length; kk++){
                         if (a["index"] == themes[jj][kk]["index"]){
                            a_pos = c;
                         }
                         if (b["index"] == themes[jj][kk]["index"]){
                            b_pos = c;
                         }
                         c++;
                   }
                }
                var theme_name = themes_names[a["index"]];
                if (theme_name.lastIndexOf("**") != -1){ // removing the code
                   theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
                }
                
                if (theme_name == sortTheme_name){
                   return -1;
                }
                if (a_pos<b_pos)
                   return -1;
                if (a_pos>b_pos)
                   return 1;
                // a must be equal to b
                return 0;
            });
       }
         // ********************
			
			
		}
		counter = 0;
	}	
	
// sort only the first time segment
   var themes_names = this.themes_names;
// for (i=this.themes.length-2; i>=0; i--){
   for (i=0; i>=0; i--){      
      for (j=0; j<this.themes[i].length; j++){     
         var themes = this.themes[i+1];
         this.themes[i][j].sort(function(a, b){
              var a_pos = -1, b_pos = -1, c=0;
             for (var jj=0; jj<themes.length; jj++){       
                // Sorting words within groups for first time segment
                for (var kk=0; kk<themes[jj].length; kk++){
                      if (a["index"] == themes[jj][kk]["index"]){
                         a_pos = c;
                      }
                      if (b["index"] == themes[jj][kk]["index"]){
                         b_pos = c;
                      }
                      c++;
                }
             }
             var theme_name = themes_names[a["index"]];
             if (theme_name.lastIndexOf("**") != -1){ // removing the code
                theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
             }
             
             if (theme_name == sortTheme_name){
                return -1;
             }
             if (a_pos<b_pos)
                return -1;
             if (a_pos>b_pos)
                return 1;
             // a must be equal to b
             return 0;
         });
      }
      
   }
	
	// Again generating num to sort the repetitions as well
	
	this.themes_string = new Array();
	for ( i=0; i<this.themes.length; i++){ // Check for repetition
		this.themes_string[i] = new Array();
		for (j=0; j<this.themes[i].length; j++){
			this.themes_string[i][j] = new Array();
			for (k=0; k<this.themes[i][j].length; k++){
				theme_name = this.themes_names[this.themes[i][j][k]["index"]];
				var freq = this.themes[i][j][k]["freq"];
				var type = this.themes[i][j][k]["type"];
				if (theme_name.lastIndexOf("**") != -1){ // removing the code
					theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
				}				
				this.themes_string[i][j][k] = theme_name;
				this.themes_freq[i][j][k] = freq;
				this.themes_type[i][j][k] = type;
			}
		}
	}
	this.generateNum();
	return ThemeDelta.findArrayIndex(this.themes_names, dummy_sortTheme_name, 0);
	
};

ThemeData.prototype.filterData = function (filterTheme, filterTheme_names) {
//	var filterTheme_names = new Array();
//	for (var p=0; p<filterTheme.length; p++){
//		filterTheme_names[p] = this.themes_names[filterTheme[p]];
//	}
	
	var updatedData = new Array();  
	
	filterTheme = this.sortData(filterTheme[0]); // sort data to bring filterTheme at the front
	var neighbors = new Array();
	for (var p=0; p<filterTheme_names.length; p++){
		var filterTheme_name = filterTheme_names[p];
		neighbors[neighbors.length] = filterTheme_name;
	}
	
	// Finding which Themes are related to the filterTheme 
	for (var i=0; i<this.themes.length; i++){
		for (var j=0; j<this.themes[i].length; j++){
			var add_to_list = false;
			var theme_name;
			for (p=0; p<this.themes[i][j].length; p++){
				theme_name = this.themes_names[this.themes[i][j][p]["index"]];
				if (theme_name.lastIndexOf("**") != -1){ // removing the code
				theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
			}
				if (ThemeDelta.findArrayIndex(filterTheme_names, theme_name, 0) != -1){
//				if (theme_name == filterTheme_names[0]){
					add_to_list = true;
					break;
				}
			}
			
//			theme_name = this.themes_names[this.themes[i][j][0]];
//			if (theme_name.lastIndexOf("**") != -1){ // removing the code
//				theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
//			}
////			alert(theme_name);
////			if (this.themes[i][j][0] == filterTheme){
//			if (theme_name == filterTheme_name){
			if (add_to_list){
//				alert("test");
				for (var k=0; k<this.themes[i][j].length; k++){
					theme_name = this.themes_names[this.themes[i][j][k]["index"]];
					if (theme_name.lastIndexOf("**") != -1){ // removing the code
						theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
					}
//					if (ThemeDelta.findArrayIndex(neighbors, this.themes[i][j][k]) == -1)
					if (ThemeDelta.findArrayIndex(neighbors, theme_name) == -1)
//						neighbors[neighbors.length] = this.themes[i][j][k];
						neighbors[neighbors.length] = theme_name;
				}			
			}
		}
	}
	// Generating filter data
	for (i=0; i<this.themes.length; i++){
//		var temp_i = new Array();
		updatedData[i] = new Array();
		for (j=0; j<this.themes[i].length; j++){
			var temp_j = new Array();
			
			var remove_code = false;
			for (p=0; p<this.themes[i][j].length; p++){ // checking if needed to remove code
				var temp =  this.themes_names[this.themes[i][j][p]["index"]];
				if (temp.lastIndexOf("**") != -1) // removing the code
					temp = temp.substring(0,temp.lastIndexOf("**"));
				if (ThemeDelta.findArrayIndex(filterTheme_names, temp, 0) != -1){
					// Removing code if it is in the group of filter word
					remove_code = true;
					break;
				}
			}
			
			for (k=0; k<this.themes[i][j].length; k++){
				theme_name = this.themes_names[this.themes[i][j][k]["index"]]; // No need to remove code because we only need the first occurrence if its not the filter theme
				if (remove_code && theme_name.lastIndexOf("**") != -1){ // removing the code
					theme_name = theme_name.substring(0,theme_name.lastIndexOf("**"));
				}
				
				if (ThemeDelta.findArrayIndex(neighbors, theme_name) != -1)
					temp_j[temp_j.length] = this.themes[i][j][k]; 
			}
			if (temp_j.length != 0)
				updatedData[i][updatedData[i].length] = temp_j;				
		}
	}
	return updatedData;
};
