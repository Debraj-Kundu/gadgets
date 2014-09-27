function draw(){
	var text=q('#inputhtml').data();
	var canvas=document.getElementById("myCanvas");
	var data={
		canvas:canvas,
		text:text,
		success:function(data){
			closedlg();
		},
		error:function(data){
			showerrmsg(data.msg);
			closedlg();
		}
	};
	q.draw(data);
	closedlg();
}

function showerrmsg(msg){
	alert(msg);
}

function closedlg(event){
	q("#dlg").display("none");
}

function clearinput(){
	q('#inputhtml').data("");
}

function showinfo(){
	q("#dlg").display("block");
}