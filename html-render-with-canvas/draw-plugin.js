(function(q){
	var errmsg;
	var WHITESPACE=" ";
	var LEFTSYN="<";
	var RIGHTSYN=">";
	var TAGP='p';
	var ULOFFSET=20;
	var TAGI='i';
	var TAGB='b';
	var TAGUL='ul';
	var TAGLI='li';
	var TAGU='u';
	var VALIDTAGS=['p','i','b','ul','li','u'];
	var REGEXFIRSTVALIDTAG=/^([^<]*)(((<(p|i|b|ul|li|u)>(.*)<\/\5>)+?([\s\S]*))*)$/i;	
	var REGEXPRETEXTTAG=/^([^<]*)(.*)$/i;	
	var REGEXSPLITTAG=/^([^<]*)((<(p|i|b|ul|li|u)>+?)(.*))/i;
	q.draw=function(data){
		if(!data||!data.text||typeof(data.text)!=="string"){
			return;
		}
		var text=data.text.replace(/[\r\n\t]/g,WHITESPACE).replace(/\s+/g,WHITESPACE).trim();
		if(text.length===0){
			return;
		}
		var successfunc=data.success;
		var errorfun=data.error;			
		var canvas=data.canvas;
		var MARGIN=5;
		var canvaswidth=canvas.width-MARGIN;
		var canvasheight=canvas.height;
		var ctx=canvas.getContext("2d");
		var ITALIC="italic normal 16px/18px arial,sans-serif";
		var BOLD="normal bold 16px/18px  arial,sans-serif";
		var NORMAL="normal normal 16px/18px  arial,sans-serif";
		var ITALICBOLD="italic bold 16px/18px arial,sans-serif";
		var LINEHEIGHT=18;
		var FONTSIZE=16;
		
		var xoffset=MARGIN;
		var yoffset=LINEHEIGHT;
		
		Array.prototype.contains=function(item){
			return new RegExp("^" + this.join("|")+ "$","i").test(item.toString());
		}
		
		try{
			ctx.clearRect(0,0,canvas.width,canvas.height);
			
			var  drawtext=function(data){
				data=data.trim();
				var len=data.length;
				if(len==0){
					return;
				}
				if(!nowrap&&xoffset>MARGIN){
					xoffset = MARGIN+uloffset;
					yoffset += LINEHEIGHT;	
				}
				
				if(isicon){
					ctx.beginPath();
					ctx.arc(MARGIN+uloffset+MARGIN,yoffset-MARGIN,MARGIN,0,Math.PI*2,true);
					ctx.closePath();
					ctx.fill();
					xoffset +=30;
				}
				
				
				var index=0;
				var renderindex=0;
				ctx.font=font;
				while(index<len){
					while(canvaswidth-xoffset>ctx.measureText(data.substring(renderindex,++index)).width){
						if(index===len){
							break;
						}
					}
					
					if(index==len){
						ctx.fillText(data.substring(renderindex,index),xoffset,yoffset);
						if(isunderline){
							canvas.strokeStyle = "red";
							canvas.lineWidth = 5;
							ctx.beginPath();
							ctx.moveTo(xoffset, yoffset); 
							ctx.lineTo(xoffset+ctx.measureText(data.substring(renderindex,index)).width, yoffset);
							ctx.closePath();
							ctx.stroke();
						}
						xoffset+=ctx.measureText(data.substring(renderindex,index)).width;
						break;
					}
					ctx.fillText(data.substring(renderindex,--index),xoffset,yoffset);
					if(isunderline){
						canvas.strokeStyle = "red";
						canvas.lineWidth = 5;
						ctx.beginPath();
						ctx.moveTo(xoffset, yoffset); 
						ctx.lineTo(canvaswidth, yoffset);
						ctx.closePath();
						ctx.stroke();
					}
					
					
					renderindex=index;
					xoffset = MARGIN;
					yoffset += LINEHEIGHT;
				}
				return;
			};
			
			
			
			var len=text.length;
			var uloffset=0;
			var index=0;
			var txtwidth=0;
			var lastxoffset=xoffset;
			var font=NORMAL;
			var tagnames=[];
			var tagname=[];
			var fontsarr=[];
			var texttodraw=[];
			var isitalic=false;
			var isbold=false;
			var isunderline=false;
			var isicon=false;
			var nowrap=false;
			
			while(text[index]!=LEFTSYN||((index+1<len)&&(text[index+1]==WHITESPACE))){
				index++;
				if(!text[index]){
					break;
				}
			}

			drawtext(text.substring(0,index));
			fontsarr.push(font);
			if(index>=len)return;
			text=text.substring(index);
			len=text.length;
			index=0;
			
			//Reaches valid html '<.' every loop;
			while(index<len){
				index++;
				if(text[index]=="/"){
					var arr=[];
					while(++index<len&&text[index]!=RIGHTSYN&&text[index]!=LEFTSYN){
						arr.push(text[index]);
					}
					if(index==len)return;
					if(text[index]==LEFTSYN)break;
					var tag=arr.join('').trim().toLowerCase();
					if(tag==tagnames[tagnames.length-1]){
						font=fontsarr.pop();
						tagnames.pop();
						if(tag==TAGUL){
							uloffset -=ULOFFSET;
							uloffset =(uloffset>0)?uloffset:0;
						}
						if(!tagnames.contains(tag)){
							if(tag==TAGI){
								font=font.replace("italic",'normal');
								isitalic=false;
							}
							else if(tag==TAGB){
								font=font.replace("bold",'normal');
								isbold=false;
							}
							else if(tag==TAGU){
								isunderline=false;
							}
						}
					}
				}
				else{
					while(text[index]!=WHITESPACE&&text[index]!=RIGHTSYN){
						tagname.push(text[index++]);
						if(index==len)break;
					}
					if(index==len)return;
					while(text[index]!=RIGHTSYN){
						if(index==len){
							break;
						}
					}
					var tag=tagname.join('').toLowerCase();
					tagname=[];
					if(tag==TAGB){
						isbold=true;
					}
					else if(tag==TAGI){
						isitalic=true;
					}
					else if(tag==TAGLI){
						isicon=true;
					}
					else if(tag==TAGU){
						isunderline=true;
					}
					if(tag==TAGP||tag==TAGLI||tag==TAGUL){
						nowrap=false;
					}
					else{
						nowrap=true;
					}
					if(tag==TAGUL){
						uloffset+=ULOFFSET;
					}
					
					if(isitalic==true&&isbold==true){
						font=ITALICBOLD;
					}
					else if(isitalic==false&&isbold==true){
						font=BOLD;
					}
					else if(isitalic==true&&isbold==false){
						font=ITALIC;
					}
					else{
						font=NORMAL;
					}
					if(VALIDTAGS.contains(tag)){
						tagnames.push(tag);
						fontsarr.push(font);
					}
				}
				
				//Hereby '>' should occures!
				if(index==len||++index==len)return;
				
				while(text[index]!=LEFTSYN||((index+1<len)&&(text[index+1]==WHITESPACE))){
					texttodraw.push(text[index++]);
					if(!text[index]){
						break;
					}
				}
				drawtext(texttodraw.join(''));
				texttodraw=[];
				isicon=false;
				if(index+1>=len)return;
			}
			//if(successfunc && typeof(successfunc)==="function"){
			//	successfunc();
			//}
		}
		catch(e){
			if(errorfun && typeof(errorfun)==="function"){
				errorfun({msg:e.message});
				return;
			}
			throw e;
		}
		finally{
			data=null;
		}
		return;
	}
})(q);