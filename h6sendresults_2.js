// New code edits for update project are from lines 159-228

//CODE FOR HANDLING SENDING OF RESULTS
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}//end if dataURL passed?

		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));

// BEGIN HOTPOT
var UserName = '';
var StartTime = (new Date()).toLocaleString();

// The following creates the HTML structure to be filled by SendResults() in lines 191-224

var ResultForm = '<html><style>table{width:100%;}td{border:1px solid black;font-size:25px;}</style><body><form name="Results">';
ResultForm += '<table><tr>';
ResultForm += '<td>Exercise:</td><td><p>[strEscapedExerciseTitle]</p></td>';
ResultForm += '</tr><tr>';
ResultForm += '<td>Student:</td><td><input type="hidden" name="realname" value="" readonly></input><p id="realName"></p></td>';
ResultForm += '</tr><tr>';
ResultForm += '<td>Score:</td><td><input type="hidden" name="Score" value="" readonly></input><p id="studentScore"></p></td>';
ResultForm += '</tr><tr>';
ResultForm += '<td>Start Time:</td><td><input type="hidden" name="Start_Time" value="" readonly></input><p id="startTime"></p></td>';
ResultForm += '</tr><tr>';
ResultForm += '<td>End Time:</td><td><input type="hidden" name="End_Time" value="" readonly></input><p id="endTime"></p></td>';
ResultForm += '</tr>';
[inclPageBGColor]ResultForm += '<input type="hidden" name="bgcolor" value="[strPageBGColor]"></input>';[/inclPageBGColor]
ResultForm += '<input type="hidden" name="text_color" value="[strTitleColor]"></input>';
ResultForm += '</table></form></body></html>';


// Alert prompt grabs student's name
function GetUserName(){
	UserName = prompt('[strNamePlease]','');
	UserName += '';
	if ((UserName.substring(0,4) == 'null')||(UserName.length < 1)){
		UserName = prompt('[strNamePlease]','');
		UserName += '';
		if ((UserName.substring(0,4) == 'null')||(UserName.length < 1)){
			history.back();
		}
	}
}

// This function replaces the original PHP push request and creates a blank HTML page with the student's results. Send results MUST be enabled in the HotPot individual file in order for this function to be called.
function SendResults(Score){
// Generate date info
	var today = new Date;
	var dateFormat = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
	var NewName = '' + today.getTime();
    var NewWin = window.open('', NewName, 'toolbar=no,location=no,directories=no,status=no, menubar=no,scrollbars=yes,resizable=no,');

// If user has prevented popups, no way to proceed -- exit
	if (NewWin == null){
		return;
	};

// Works for non-mobile browsers. There might be security problems with mobile browsers.
	var studentName = UserName;
	var fileName = 'Homework_Results for '+ studentName + ' on ' + dateFormat + '.html';
		
	NewWin.document.clear();
	NewWin.document.open();
	NewWin.document.write(ResultForm);
	NewWin.document.Results.Score.value = Score + '%';
	NewWin.document.getElementById('studentScore').innerHTML = NewWin.document.Results.Score.value;
	NewWin.document.Results.realname.value = UserName;
	NewWin.document.getElementById('realName').innerHTML = NewWin.document.Results.realname.value;
	NewWin.document.Results.End_Time.value = (new Date()).toLocaleString();
	NewWin.document.getElementById('endTime').innerHTML = NewWin.document.Results.End_Time.value;
	NewWin.document.Results.Start_Time.value = StartTime;
	NewWin.document.getElementById('startTime').innerHTML = NewWin.document.Results.Start_Time.value;
// Download file as HTML or open into new window
	download(NewWin.document.body.outerHTML, fileName, "text/html");
	
	//var studentScoreValue = NewWin.document.Results.Score.value;
	//document.cookie = "score="+studentScoreValue;
	NewWin.document.close();
}
