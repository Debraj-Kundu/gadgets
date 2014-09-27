var activeMac;
function closedlg(event){
	q("#dlg").display("none");
	q('#inputres').data("");
	activeMac=null;
}

function addres(event){
	var inputdata=q('#inputres').data();
	var regres=/^[\w-]+(\s*,\s*[\w-]+)*,?$/g;
	if(inputdata==""||!regres.test(inputdata)){
		q('#errormsg').display('inline');
		return;
	}
	
	var arr=inputdata.split(',');
	appenditems(activeMac,arr);
	closedlg();
}


function deleteitem(obj){
	//q(this.parentElement?this.parentElement.parentElement:this).remove(event.srcElement.parentNode.parentNode);
	q(obj.parentElement.parentElement).remove();
}

function additems(event){
	q("#dlg").display("block");
	activeMac=this.parentElement?this:event.srcElement;
}

function appenditems(obj,arr){
	if((arr instanceof Array)&&arr.length>0){
		if(!obj.parentElement.getElementsByClassName){
			obj.parentElement.getElementsByClassName=document.getElementsByClassName;
		}
		var parent=obj.parentElement.getElementsByClassName('items',obj.parentElement)[0];
		var len=parent.childNodes.length;
		var child;
		var html=parent.childNodes[0].outerHTML;
		var regempty=/^\s*$/g;
		for(var mem in arr){
			//if(arr[mem].trim()=="") continue;
			if(regempty.test(arr[mem])) continue;
			parent.innerHTML +=html;
			child=parent.childNodes[len++];
			child.childNodes[0].innerText=arr[mem].toString();
			q(child).display('inline');
		}
	}
}

function showinfo(){
	q("#info").display("block");
}

function closeinfo(event){
	q("#info").display("none");
}

