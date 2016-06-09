ThemeData = function (){
	this.generateData();
};

ThemeData.prototype.generateData = function (){
//	this.themes = [
//	               [[0,1,2], [3,4,5], [6]],
//	               [[0,1,2], [3,4,5,6]],
//	               [[0,1,2,3], [4], [5,6]]
//	              ];
//	this.themes = [
//	               [[0,1], [2,3], [4,5], [6]],
//	               [[0,1,2], [3,4,5,6]],
//	               [[0,1,2,3], [4], [5,6]],
//	               [[6,4], [3,5,1], [2,0]],
//	               [[0,1,2], [3,4,5,6]]
//	              ];
//	this.themes_names = ["A","B","C","D","E","F","G"];
	
	this.themes_string = [
	                      [["A","B","C"], ["D","E","F","G"]],
	                      [["A","B","C","D"], ["A","E"], ["F","G"]],
	                      [["A","G","E"], ["D","F","B"], ["C","A"]],
	                      [["A","B","C"], ["D","E","F","G"]],
	                      [["A","B","C","D"], ["A","E"], ["F","G"]]
	                      ];
	this.themes_freq = [
	                      [[2,4,5], [1,5,8,3]],
	                      [[6,7,8,7], [4,6], [3,6]],
	                      [[6,7,19], [8,3,6], [2,8]],
	                      [[7,9,2], [5,7,9,7]],
	                      [[2,6,8,9], [1,3], [6,8]]
	                      ];
	
//	this.themes_string = [
//	                      [["A"]],
//	                      [["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R"]],
//	                      [["A","G"]],
//	                      [["A","B"]],
//	                      [["A"]]
//	                      ];
//	this.themes_freq = [
//	                      [[1]],
//	                      [[0.1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
//	                      [[1,1]],
//	                      [[1,1]],
//	                      [[1]]
//	                      ];
	
	this.timeStamps = ["1","2","3","4","5"];

	// this.timeStamps = ["1","2","3","4","5"];

	// this.themes_string = [[['two', 'hospital', 'tho', 'city', 'board', 'president'], ['hour', 'epidemic', 'number', 'four', 'pneumonia', 'twenty'], ['county', 'campaign', 'loan', 'work', 'quota', 'committee', 'liberty'], ['church', 'service', 'universe', 'hospital', 'year'], ['german', 'mask', 'general']], [['county', 'court', 'campaign', 'loan', 'business', 'committee', 'liberty'], ['even', 'daughter', 'wife', 'service', 'spent', 'son', 'family', 'home', 'friend'], ['men', 'german', 'camp', 'general', 'call', 'army', 'report', 'company'], ['case', 'disease', 'mask', 'cross', 'red'], ['hour', 'city', 'number', 'hospital', 'four', 'pneumonia', 'board', 'twenty']], [['boy', 'service', 'work', 'number', 'hospital', 'call', 'home', 'cross', 'company', 'red', 'quota'], ['people', 'men', 'two', 'business', 'ban', 'meet'], ['even', 'daughter', 'spent', 'son', 'tho', 'afternoon', 'family', 'year', 'friend'], ['case', 'given', 'camp', 'general', 'pneumonia', 'army'], ['town', 'city', 'report', 'open', 'today']], [['court', 'people', 'church', 'ban', 'meet', 'open'], ['even', 'town', 'daughter', 'wife', 'spent', 'son', 'afternoon', 'family', 'church', 'friend'], ['given', 'service', 'committee', 'president'], ['disease', 'mask', 'universal', 'epidemic', 'hospital', 'four', 'today'], ['boy', 'work', 'cross', 'red']]];
	
	// this.themes_freq = [[[0.09230618697367786, 0.1892824369166644, 0.35235074711817493, 0.18165908402126055, 0.11299617799459702, 0.0714053669756252], [0.17327027494114663, 0.16100099456782796, 0.2045114853471015, 0.1726247347801123, 0.1109367323432332, 0.17765577802057841], [0.17361353853247125, 0.08310531839700575, 0.21611411860445479, 0.11724751336929692, 0.08698256805927268, 0.12593863214552017, 0.19699831089197847], [0.24684414663685836, 0.15959781181772983, 0.18635584339622327, 0.22403305768680723, 0.18316914046238136], [0.3011961899652842, 0.42993869943285173, 0.2688651106018642]], [[0.36805857393308, 0.08586092877798886, 0.10367300453055923, 0.12623724529692987, 0.08873137474042578, 0.10878373367210974, 0.11865513904890664], [0.06569232489223169, 0.08144702507683303, 0.07581072140307783, 0.07098027325577284, 0.10499058765321559, 0.15136896225556604, 0.15487405727115955, 0.20402627634282003, 0.09080977184932339], [0.1831476961592028, 0.189260274014899, 0.1823745790020084, 0.0706008413398864, 0.0744334822598517, 0.15506562851960828, 0.06961973592179505, 0.07549776278274838], [0.2766737259106915, 0.3203883210415653, 0.11999149955519153, 0.13017046929517978, 0.15277598419737207], [0.08949282591704624, 0.18971661966396017, 0.11726239817133906, 0.17612758508013696, 0.11203380562701236, 0.08199992898751475, 0.12604276659567093, 0.10732406995731959]], [[0.10371327087368164, 0.07270828482467741, 0.16186715067232255, 0.05792220499055623, 0.08425274381581782, 0.07266983790609798, 0.06237526942684795, 0.13066693210382457, 0.06746380212065152, 0.11522720940133795, 0.07113329386418436], [0.21169992408567082, 0.20975835591649403, 0.12263476995889891, 0.15025828558539667, 0.10793802731156167, 0.19771063714197787], [0.10093659468085668, 0.11305396729229088, 0.1271145836060599, 0.12785483641582387, 0.13385618016625403, 0.054839175249263704, 0.16571141527216882, 0.11367775928472122, 0.06295548803256099], [0.1837483552997678, 0.13783790263981036, 0.14262939632996857, 0.1983542761305685, 0.18097940441268795, 0.1564506651871967], [0.18323315310182897, 0.247902842520227, 0.23356938981193143, 0.17625899104862827, 0.15903562351738426]], [[0.14067443493552637, 0.139207396137543, 0.21603965234127043, 0.14865464940554116, 0.21381872499583104, 0.14160514218428788], [0.0880108795882475, 0.06838443906961934, 0.1230934361449735, 0.07176142878494922, 0.10257897627673601, 0.13436828517745136, 0.09383522751905518, 0.14999374309974642, 0.07527829972451335, 0.092695284614708], [0.18237750082930757, 0.1885037855430619, 0.2141843780825234, 0.41493433554510717], [0.18792354648798387, 0.08274580754539693, 0.09911659117660364, 0.19678881543038462, 0.1775464846311322, 0.14754874214185656, 0.10833001258664215], [0.2193714348195995, 0.1825696543666587, 0.34234303605805216, 0.25571587475568963]]];
	
	// this.timeStamps = ["1918-09-11,1918-10-09","1918-10-10,1918-12-05","1918-12-06,1918-12-13","1918-12-14,1918-12-28","1918-12-29,1918-12-31"];
	
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
