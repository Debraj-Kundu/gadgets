// jQuery-style each should added.
(function(window, undefined) {
        var jQuery = function(selector) {
            return new jQuery.fn.init(selector);
        },
        doc = window.document,
		win=window,
		addclick,isIE=false;
		
		//Handles all nav-dependent problems once
		 if(navigator.userAgent.indexOf("MSIE")>0){
				addclick=function(ele,func){ele.attachEvent("onclick",func);};
				isIE=true;
				//Add surporting for getElementsByClassName on IE7;
				document.getElementsByClassName = function(className, element){ 
					var children = (element || document).getElementsByTagName('*'); 
					var elements = new Array(),child,classNames;
					for (var i=0; i<children.length; i++){ 
						child = children[i]; 
						classNames = child.className.split(' '); 
						for (var j=0; j<classNames.length; j++){ 
							if (classNames[j] == className){ 
								elements.push(child); 
								break; 
							} 
						} 
					} 
					return elements; 
				}; 
				
				
		   }else if(navigator.userAgent.indexOf("Chrome")>0){
				addclick=function(ele,func){ele.onclick=func;};
		   }else if(navigator.userAgent.indexOf("Firefox")>0){
				addclick=function(ele,func){ele.addEventListener("click",func,false);};
		   }else if(navigator.userAgent.indexOf("Safari")>0){
		        addclick=function(ele,func){};
		   }else{
				addclick=function(ele,func){};
		   }
		
		
        jQuery.fn = jQuery.prototype = {
            init: function(selector) {
				if(!selector||selector==""){
					return win;
				}
				var ret;
				if(typeof(selector)=="string"){
				
					var regclassname=/^\.[\w-]+$/g;
					var regid=/^#[\w-]+$/g;
					var isvalid=false;
					if(regclassname.test(selector))
					{
						selector=selector.substring(1);
						ret=doc.getElementsByClassName(selector);
						isvalid=true;
					}
					else if(regid.test(selector)){
						selector=selector.substring(1);
						ret=[doc.getElementById(selector)];
						isvalid=true;
					}
					if(isvalid){
						ret = Array.prototype.slice.call(ret);
						Array.prototype.push.apply(this, ret);
					}
				}
				if(selector===doc){
					this.ready=function(func){
						win.onload=func;
					};
				}
				
				//Dom element
				if((selector && selector.nodeType && selector.nodeType===1)||(selector && selector.document && selector.document.nodeType && selector.document.nodeType===9)){
					ret = Array.prototype.slice.call([selector]);
					Array.prototype.push.apply(this, ret);
				}
				                
                return this;
            },
            length: 0
        };
 
        jQuery.fn.init.prototype = jQuery.fn;
		
		jQuery.fn.click=function(func){
			for(i=0;i<this.length;i++){
				addclick(this[i],func);
			}
			return this;
		};
		
		jQuery.fn.remove=function(){
			if(isIE){
				d = document.createElement("DIV");
				d.appendChild(this[0]);
				d.innerHTML = '';
			}
			else{
				this[0].remove();
			}
			return this;
		};
		
		jQuery.fn.display=function(state){
			for(i=0;i<this.length;i++){
				this[i].style.display=state;
			}
			return this;
		};
		
		jQuery.fn.data=function(data){
			if(arguments.length==1){
				this[0].value=data;
			}
			return this[0].value;
		};
		
        window.q = window.jQuery = jQuery;
    })(window);
