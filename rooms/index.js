
window.onload = function() {
	let img = document.getElementsByTagName('img')[0];
	let src = img.src;
	let con = document.getElementsByClassName('container')[0];
	con.style.backgroundImage = `url(${src})`;
	let h4 = document.getElementsByTagName('h4')[0];
	h4.remove();
	let h1 = document.getElementsByTagName('h1')[0];
	h1.append(h4);
}
