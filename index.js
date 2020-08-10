

(function() {

window.onload = loadHandler;
function loadHandler() {
	let imgw = 1592, imgh = 894;
	let hoverFillColor = '#ffe600', hoverStrokeColor = 'black', hoverStrokeWidth = 14;
	let highlightFillColor = '#fffbcf', highlightStrokeColor = 'black', highlightStrokeWidth = 8;
	let imgUrl = 'images/fullStreet.png';

	let rooms = getRooms();

	let svg = document.getElementById('svg-main');
	svg.setAttribute('viewBox',`0 0 ${imgw} ${imgh}`);
	svg.style.strokeWidth = highlightStrokeWidth + 'px';

	let svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
	svgimg.setAttributeNS(null,'height',imgh);
	svgimg.setAttributeNS(null,'width',imgw);
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', imgUrl);
	svgimg.setAttributeNS(null,'x','0');
	svgimg.setAttributeNS(null,'y','0');
	svgimg.setAttributeNS(null, 'visibility', 'visible');
	svg.prepend(svgimg);

	let outputLists = [[],[]], findRoom = null;

	for (let room of rooms) {
		let elm = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		room.elm = elm;
		elm.classList = 'p';
		elm.setAttribute('points',room.points);

		let a = document.createElementNS('http://www.w3.org/2000/svg','a');
		if (room.name != 'empty' && room.name != 'Recreation Centre') {
			let href = room.name.replace(/,.*$/g,'');
			href = href.replace(/ /g,'-');
			a.setAttribute('href','rooms/' + href + '.html');
		}
		room.a = a;

		a.append(elm);
		svg.append(a);

		function mouseEnterHandler(e) {
			room.hovered = true;
			let a = room.a;
			a.remove();
			svg.append(a);
			setTimeout(() => {
				room.hover();
				outputOut(outputLists[1]);
			},0);
			outputIn(room.name,room.subname,outputLists[0]);
		}

		function mouseOutHandler(e) {
			room.hovered = false;
			elm.style.strokeWidth = highlightStrokeWidth;
			setTimeout(() => {
				if (!room.highlighted) {
					room.clear();
					room.highlighted = false;
				} else {
					room.highlight();
					room.highlighted = true;
				}
			},0);
			outputOut(outputLists[0]);
			if (findRoom) outputIn(findRoom.name,findRoom.subname,outputLists[1]);
		}

		elm.addEventListener('mouseenter', mouseEnterHandler);
		elm.addEventListener('mouseout', mouseOutHandler);

		room.hovered = false;
		room.highlighted = false;
		room.highlight = function() {
			this.elm.style.fill = highlightFillColor;
			this.elm.style.stroke = highlightStrokeColor;
			this.elm.style.strokeWidth = highlightStrokeWidth;
		};
		room.hover = function() {
			this.elm.style.fill = hoverFillColor;
			this.elm.style.stroke = hoverStrokeColor;
			this.elm.style.strokeWidth = hoverStrokeWidth;
		};
		room.clear = function() {
			this.elm.style.fill = 'transparent';
			this.elm.style.stroke = 'transparent';
			this.elm.style.strokeWidth = highlightStrokeWidth;
		};
	}

	let input = document.getElementById('input');
	input.addEventListener('input', e => {
		let val = input.value;
		let re = RegExp('.*?' + val + '.*?', 'i');
		let onlyRoom;
		for (let room of rooms) {
			if (val != '' && re.test(room.name)) {
				room.highlighted = true;
				if (!room.hovered) room.highlight();
				onlyRoom = onlyRoom === undefined ? room : null;
			} else  {
				room.highlighted = false;
				if (!room.hovered) room.clear();
			}
		}

		if (onlyRoom && !findRoom) {
			if (!onlyRoom.hovered)
				outputIn(onlyRoom.name,onlyRoom.subname,outputLists[1]);
			findRoom = onlyRoom;
		} else if (!onlyRoom && findRoom) {
			outputOut(outputLists[1]);
			findRoom = null;
		}
	})
}

function outputIn(str1,str2,list) {
	let wrap = document.createElement('div');
	wrap.classList = 'output-wrap';
	let outputs = document.getElementById('outputs');
	outputs.append(wrap);

	let o1 = document.createElement('div');
	o1.classList = 'output1';
	o1.innerHTML = str1;
	if (str1 === 'empty') o1.style.color = 'dimgrey';
	wrap.append(o1);

	let o2 = document.createElement('div');
	o2.classList = 'output2';
	o2.innerHTML = str2;
	wrap.append(o2);

	setTimeout(() => {
		wrap.style.opacity = 1;
		wrap.style.transform = 'none';
	},0)

	list.push(wrap);
	updateOutputsDiv(wrap);
}

function updateOutputsDiv(elm) {
	let l = elm.offsetHeight;
	let div = document.getElementById('outputs');
	if (div.style.height < l) {
		div.style.height = l + 'px';
	}
}

function outputOut(list) {
	for (let out of list) {
		out.style.opacity = 0;
		out.style.transform = 'translateY(20px)';
		setTimeout(() => {
			out.remove();
		},300)
	}
	list.length = 0;
}


function getRooms() {
	return [
		{name: "303-G01",
		 subname:"Mathematics",
		 points: "219,546,219,514,299,473,365,517,285,559,285,587"},
		{name: "303-G02",
		 subname:"Mathematics",
		 points: "365,518,431,561,354,606,354,634,286,587,286,561"},
		{name: "303-G03",
		 subname:"Mathematics",
		 points: "354,606,434,562,562,647,483,686,483,717,352,635"},
		{name: "303-G04",
		 subname:"Mathematics",
		 points: "483,689,482,717,595,792,598,762,674,719,562,644"},
		{name:"empty",
		 subname:"Mathematics",
		 points:"756,679,380,427,297,471,676,723"},
		{name:"303-G13",
		 subname:"Science",
		 points:"757,679,826,640,754,591,683,633"},
		{name:"303-G14",
		 subname:"Mathematics",
		 points:"685,632,753,591,701,557,632,597"},
		{name:"303-G15",
		 subname:"Mathematics",
		 points:"635,597,583,565,655,528,701,558"},
		{name:"303-G16",
		 subname:"Mathematics",
		 points:"656,528,584,479,511,518,583,568"},
		{name:"303-G20",
		 subname:"Mathematics",
		 points:"514,516,380,426,486,373,617,462,619,490,607,498,584,481"},
		{name:"303-G23",
		 subname:"Mathematics",
		 points:"617,464,618,490,719,435,719,407,587,315,483,373"},
	    
	    {name:"303S-G75, 303S-B75, 303S-175, 303S-175, 303S-279",
		 subname:"Statistics and Computer Science",
		 points:"597,794,598,764,828,639,870,697,873,723,610,803"},
	    {name:"303S-G87",
		 subname:"Statistics and Computer Science",
		 points:"873,728,873,698,850,671,921,650,942,677,944,708"},
	    {name:"empty",
		 subname:"Statistics and Computer Science",
		 points:"921,651,882,600,801,623,829,640,850,670"},
	    {name:"303S-G91, 303S-B91, 303S-191",
		 subname:"Statistics and Computer Science",
		 points:"944,709,942,677,884,601,1030,559,1090,636,1092,665"},

		{name:"302-G20",
		 subname:"Science",
		 points:"1022,523,1019,551,1083,596,1085,564,1195,503,1131,460"},
		{name:"302-G40",
		 subname:"Science",
		 points:"1079,593,1166,648,1307,603,1306,577,1195,502,1085,563"},
		{name:"Student Plaza",
		 subname:"Science",
		 points:"1020,551,1002,541,944,555,905,531,906,503,1248,315,1538,507,1541,536,1310,604,1308,575,1131,460,1022,523"},

		{name:"Student Resource Centre",
		 subname:"Science",
		 points:"778,570,683,505,681,475,830,397,925,459,927,487"},
		{name:"Student Advice Centre",
		 subname:"Science",
		 points:"829,397,927,342,1023,408,1023,436,925,487,926,459"},
	    {name:"empty",
		 subname:"Science",
		 points:"1025,437,1024,408,929,345,916,350,889,362,890,333,989,279,972,266,1061,202,1217,305,1219,333"},
	    {name:"301-G050",
		 subname:"Science",
		 points:"889,361,890,333,989,278,897,218,798,273,797,302"},
	    {name:"301-G053",
		 subname:"Science",
		 points:"972,266,1061,201,1023,176,897,217"},

	    {name:"Recreation Centre",
		 subname:"Other",
		 points:"743,297,955,184,955,153,820,65,608,180,608,213"},
	]
}
 
})();

