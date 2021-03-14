/**/
function loadScripts(urls,script){
	if(urls.length==0)return 0;
	script=document.createElement("script");
	script.type="text/javascript";script.src=urls[0];
	script.onload=function(){
		loadScripts(urls.slice(1));
	}
	document.head.appendChild(script);
	
}
urls=[
	"Forest-tst.js",
	"Forest-Peacock-tst.js",
	"Forest-Spider-tst.js",
	"Forest-Monkey-tst.js",
	"ForestSigma2D.js"
].map(function(i){
	return "https://veryhardbit.github.io/Forest.js/"+i;
}).concat([
	"SetupObject.js"
]);
loadScripts(urls);