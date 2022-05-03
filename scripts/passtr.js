
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

function $() {
	var arrElms = [];
	for (var i=0; i < arguments.length; i++) {
		var elm = arguments[i];
		if (typeof(elm == "string")) { elm = document.getElementById(elm); }
		if (arguments.length == 1) { return elm; }
		arrElms.push(elm);
	}
	return arrElms;
}

String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
    
	//strOrig = ' texttotrim ';
	//strReversed = strOrig.revstring();
};

function chkPass(pwd) {
	var oScorebar = $("scorebar");
	var oScore = $("score");
	var oComplexity = $("complexity");
	var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0, upper_set=0, lower_set=0, num_set=0, symb_set=0, charset=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=10, nMultSeqSymbol=10;
	var nMultLength=3, nMultNumber=3;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphaUC="0", sAlphaLC="0", sNumber="0", sSymbol="0", sMidChar="0", sRequirements="0", sAlphasOnly="0", sNumbersOnly="0", sRepChar="0", sConsecAlphaUC="0", sConsecAlphaLC="0", sConsecNumber="0", sSeqAlpha="0", sSeqNumber="0", sSeqSymbol="0";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "0123456789";
	var sSymbols = "!@#$%^&*()";
	var sComplexity = "Too Short";
	var sStandards = "Below";
	var nMinPwdLen = 12;
	if (document.all) { var nd = 0; } else { var nd = 1; }
	if (pwd) {
		nScore = parseInt(pwd.length * nMultLength);
		nLength = pwd.length;
		var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;
		
		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		for (var a=0; a < arrPwdLen; a++) {
			if (arrPwd[a].match(/[A-Z]/g)) {
                upper_set=26;
				if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
				nTmpAlphaUC = a;
				nAlphaUC++;
			}
			else if (arrPwd[a].match(/[a-z]/g)) { 
                lower_set=26;
				if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
				nTmpAlphaLC = a;
				nAlphaLC++;
			}
			else if (arrPwd[a].match(/[0-9]/g)) { 
                num_set=10;
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
			}
			else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
                symb_set=33;
                             
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
				nTmpSymbol = a;
				nSymbol++;
			}
			/* Internal loop through password to check for repeat characters */
			var bCharExists = false;
			for (var b=0; b < arrPwdLen; b++) {
				if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
					bCharExists = true;
					
					nRepInc += Math.abs(arrPwdLen/(b-a));
				}
			}
			if (bCharExists) { 
				nRepChar++; 
				nUnqChar = arrPwdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
			}
            
		}
        charset = upper_set+lower_set+num_set+symb_set;
        
		
		/* Check for sequential alpha string patterns (forward and reverse) */
		for (var s=0; s < 23; s++) {
			var sFwd = sAlphas.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
		}
		
		/* Check for sequential numeric string patterns (forward and reverse) */
		for (var s=0; s < 10; s++) {
			var sFwd = sNumerics.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
		}
		
		/* Check for sequential symbol string patterns (forward and reverse) */
		for (var s=0; s < 10; s++) {
			var sFwd = sSymbols.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
		}
		
	/* Modify overall score value based on usage vs requirements */

		/* General point assignment */
		//$("nLengthBonus").innerHTML = "+ " + nScore; 
		if (nAlphaUC > 0 && nAlphaUC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
			sAlphaUC = "+ " + parseInt((nLength - nAlphaUC) * 2); 
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
			sAlphaLC = "+ " + parseInt((nLength - nAlphaLC) * 2);
		}
		if (nNumber > 0 && nNumber < nLength) {	
			nScore = parseInt(nScore + (nNumber * nMultNumber));
			sNumber = "+ " + parseInt(nNumber * nMultNumber);
		}
		if (nSymbol > 0) {	
			nScore = parseInt(nScore + (nSymbol * nMultSymbol));
			sSymbol = "+ " + parseInt(nSymbol * nMultSymbol);
		}
		if (nMidChar > 0) {	
			nScore = parseInt(nScore + (nMidChar * nMultMidChar));
			sMidChar = "+ " + parseInt(nMidChar * nMultMidChar);
		}
        /*
		$("nAlphaUCBonus").innerHTML = sAlphaUC; 
		$("nAlphaLCBonus").innerHTML = sAlphaLC;
		$("nNumberBonus").innerHTML = sNumber;
		$("nSymbolBonus").innerHTML = sSymbol;
		$("nMidCharBonus").innerHTML = sMidChar; */
		
		/* Point deductions for poor practices */
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
            sAlphasOnly = "- " + nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
            
			sNumbersOnly = "- " + nLength;
            
		}
		if (nRepChar > 0) {  // Same character exists more than once
			nScore = parseInt(nScore - nRepInc);
			sRepChar = "- " + nRepInc;
		}
		if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
			sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
		}
		if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
			sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
		}
		if (nConsecNumber > 0) {  // Consecutive Numbers exist
			nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
			sConsecNumber = "- " + parseInt(nConsecNumber * nMultConsecNumber);
		}
		if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
			sSeqAlpha = "- " + parseInt(nSeqAlpha * nMultSeqAlpha);
		}
		if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
			sSeqNumber = "- " + parseInt(nSeqNumber * nMultSeqNumber);
		}
		if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
			sSeqSymbol = "- " + parseInt(nSeqSymbol * nMultSeqSymbol);
		}
        
        /*         
        $("nAlphasOnlyBonus").innerHTML = sAlphasOnly;
		$("nNumbersOnlyBonus").innerHTML = sNumbersOnly; 
		$("nRepCharBonus").innerHTML = sRepChar; 
		$("nConsecAlphaUCBonus").innerHTML = sConsecAlphaUC; 
		$("nConsecAlphaLCBonus").innerHTML = sConsecAlphaLC; 
		$("nConsecNumberBonus").innerHTML = sConsecNumber;
		$("nSeqAlphaBonus").innerHTML = sSeqAlpha; 
		$("nSeqNumberBonus").innerHTML = sSeqNumber; 
		$("nSeqSymbolBonus").innerHTML = sSeqSymbol;  */

		/* Determine if mandatory requirements have been met and set image indicators accordingly */
		var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
            
            
                  
			var oImg = $('div_' + arrCharsIds[c]);
			//var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrCharsIds[c] == "nLength") { var minVal = parseInt(nMinPwdLen - 1); } else { var minVal = 0; }
			if (arrChars[c] >= parseInt(minVal + 1)) { nReqChar++; oImg.className = "pass"; //oBonus.parentNode.className = "pass"; 
                                                     }
			else if (arrChars[c] > parseInt(minVal + 1)) { nReqChar++; //oImg.className = "exceed"; //oBonus.parentNode.className = "exceed";
                                                         }
			else { oImg.className = "fail"; //oBonus.parentNode.className = "fail";
                 }
		}
		nRequirements = nReqChar;
		if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
		if (nRequirements > nMinReqChars) {  // One or more required characters exist
			nScore = parseInt(nScore + (nRequirements * 2)); 
			sRequirements = "+ " + parseInt(nRequirements * 2);
		}
		//$("nRequirementsBonus").innerHTML = sRequirements;

		/* Determine if additional bonuses need to be applied and set image indicators accordingly */
		var arrChars = [nMidChar,nRequirements];
		var arrCharsIds = ["nMidChar","nRequirements"];
		var arrCharsLen = arrChars.length;
        for (var c=0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			//var oBonus = $(arrCharsIds[c] + 'Bonus');
			//$(arrCharsIds[c]).innerHTML = arrChars[c];
			//if (arrCharsIds[c] == "nRequirements") { var minVal = nMinReqChars; } else { var minVal = 0; }
			//if (arrChars[c] == parseInt(minVal + 1)) { oImg.className = "pass"; oBonus.parentNode.className = "pass"; }
			//else if (arrChars[c] > parseInt(minVal + 1)) { oImg.className = "exceed"; oBonus.parentNode.className = "exceed"; }
			//else { oImg.className = "fail"; oBonus.parentNode.className = "fail"; } 
		}

		/* Determine if suggested requirements have been met and set image indicators accordingly */
		//var arrChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecAlphaUC,nConsecAlphaLC,nConsecNumber,nSeqAlpha,nSeqNumber,nSeqSymbol];
		//var arrCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol"];
        var arrChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecNumber,nSeqAlpha,nSeqNumber,nSeqSymbol];
		var arrCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol"];
		var arrCharsLen = arrChars.length;
       
		for (var c=0; c < arrCharsLen; c++) {
            
          if (nConsecAlphaLC > 3) { $("row_nConsecAlphaLC").className = "show-row"; $("div_nConsecAlphaLC").className = "warn";}
          else { $("row_nConsecAlphaLC").className = "hide"; }
            if (nConsecAlphaUC > 2) { $("row_nConsecAlphaUC").className = "show-row"; $("div_nConsecAlphaUC").className = "warn";}
          else { $("row_nConsecAlphaUC").className = "hide"; }
          
			var oImg = $('div_' + arrCharsIds[c]);
            var wRows= $('row_' + arrCharsIds[c]);
			//var oBonus = $(arrCharsIds[c] + 'Bonus');
			//$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrChars[c] > 0) { oImg.className = "warn"; //oBonus.parentNode.className = "warn"; 
                                  $("warnings").className = "show-row"; wRows.className = "show-row";
                                  
                                 }
			else { //oImg.className = "pass"; //oBonus.parentNode.className = "pass"; 
                  wRows.className = "hide";  
                 }
		}
		
		/* Determine complexity based on overall score */
		if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
		if (nScore >= 0 && nScore < 30) { sComplexity = "Very Weak"; }
		else if (nScore >= 30 && nScore < 60) { sComplexity = "Weak"; }
		else if (nScore >= 60 && nScore < 70) { sComplexity = "Good"; }
		else if (nScore >= 70 && nScore < 85) { sComplexity = "Strong"; }
		else if (nScore >= 85 && nScore <= 100) { sComplexity = "Very Strong"; }
        
        
        function secondsToHms(sec) {
    sec = Number(sec);
    var y = Math.floor(sec / (3600 * 24 *365));
    var d = Math.floor(sec % (3600 * 24 *365) / 86400);
    var h = Math.floor(sec % 86400 / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);
    
                
    var yDisplay = y > 0 ? y + (y == 1 ? " year, " : " years, ") : "";
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    
    return yDisplay + dDisplay + hDisplay + mDisplay + sDisplay; 
}
		
        var entropy = Math.log(charset) * nLength / Math.log(2);
        $("entropy").innerHTML = entropy.toFixed(2) +" bits";
        
        var pc = 1*Math.pow(10, -6)*Math.pow(charset, nLength)*0.45;
        var botnet = pc/100000*0.45;
        if (pc < 1 ){ var pctime = "In Miliseconds";}
        else { var pctime = secondsToHms(pc);}
        if (botnet < 1 ){ var botnettime = "In Miliseconds";}
        else { var botnettime = secondsToHms(botnet);}
        
        $("crack").innerHTML = "<p>With a Modern PC (eg. 8 cores, 2.7 GHz ): <span id='pccolor'>" + pctime + "</span><br>Supercomputer or Medium Size Botnet: <span id='botcolor'>" + botnettime + "</span></p></div>";
        if (pc <= 5356800 ) {$('pccolor').style.color="red";}
        if (botnet <= 5356800 ) {$("botcolor").style.color="red";}  
       
		/* Display updated score criteria to client */
		//oScorebar.style.backgroundPosition = "-" + parseInt(nScore * 4) + "px";
         $("scorebar").style.width = nScore + "%";
        $("scorebar").style.backgroundColor = 'rgb(' + ((100 - nScore) *4) +',' + (parseInt(nScore) *2) +',0)';
		oScore.innerHTML = "Score " + nScore + "%";
		oComplexity.innerHTML = sComplexity;
         
	}
	else {
        var entropy = 0;
        $("entropy").innerHTML = entropy.toFixed(2) +" bits";
        $("crack").innerHTML = "";
        oComplexity.innerHTML = "";
            
        $("div_nAlphaLC").className = "fail";
        $("div_nAlphaUC").className = "fail";
        $("div_nNumber").className = "fail";
        $("div_nSymbol").className = "fail";
        $("row_nAlphasOnly").className = "hide"; 
        $("row_nNumbersOnly").className = "hide"; 
        $("row_nRepChar").className = "hide"; 
        $("row_nSeqAlpha").className = "hide"; 
        $("row_nSeqNumber").className = "hide"; 
        $("row_nSeqSymbol").className = "hide"; 
       
		/* Display default score criteria to client */
		initPwdChk();
		oScore.innerHTML = "Score " + nScore + "%";
		//oComplexity.innerHTML = sComplexity;
	}
    
    //console.log(pwd);
    if (pwd.length > 5) {
       
     var found = false;    
     for (i = 0; i < myObj.length; i++) {
     if ( myObj[i].includes(pwd.toLowerCase()) ) {
         found = true;
         $("blacklist").innerHTML = "<span style='color:red'><strong>FAILED!</strong> - This password exists in a blacklist, and it's one of the most used passwords in recent years. It will be cracked instantly.</span>";
     }
     if (found == false) {$("blacklist").innerHTML = "<strong style='color:green'>PASSED</strong> - This password does not exist in our blacklist.";}
        
}   
        
    }
    else {$("blacklist").innerHTML = "";}
    
  
   myObj = ["123456","123456789","qwerty","password","111111","12345678","abc123","1234567","password1","12345","1234567890","123123","000000","iloveyou","1234","1q2w3e4r5t","qwertyuiop","123","monkey","dragon","123456a","654321","123321","666666","1qaz2wsx","myspace1","121212","homelesspa","123qwe","a123456","123abc","1q2w3e4r","qwe123","7777777","qwerty123","target123","tinkle","987654321","qwerty1","222222","zxcvbnm","1g2w3e4r","gwerty","zag12wsx","gwerty123","555555","fuckyou","112233","asdfghjkl","1q2w3e","123123123","qazwsx","computer","princess","12345a","ashley","159753","michael","football","sunshine","1234qwer","iloveyou1","aaaaaa","fuckyou1","789456123","daniel","777777","princess1","123654","11111","asdfgh","999999","11111111","passer2009","888888","love","abcd1234","shadow","football1","love123","superman","jordan23","jessica","monkey1","12qwaszx","a12345","baseball","123456789a","killer","asdf","samsung","master","azerty","charlie","asd123","soccer","FQRG7CS493","88888888","jordan","michael1","jesus1","linkedin","babygirl1","789456","blink182","thomas","qwer1234","333333","liverpool","michelle","nicole","qwert","j38ifUbn","131313","asdasd","987654","lovely","q1w2e3r4","0123456789","gfhjkm","andrew","hello1","joshua","Status","justin","anthony","angel1","iloveyou2","1111111","zxcvbn","hello","1111","jennifer","hunter","naruto","bitch1","welcome","159357","101010","tigger","147258369","babygirl","jessica1","parola","5201314","robert","fuckyou2","696969","102030","0987654321","loveme","123456q","apple","pokemon","mother","money1","secret","anthony1","purple","q1w2e3r4t5y6","baseball1","qazwsxedc","1111111111","abc","buster","matthew","andrea","soccer1","basketball","hannah","freedom","golfer","chelsea","passw0rd","george","trustno1","friends","william","iloveu","amanda","number1","chocolate","qwerty12","summer","flower","charlie1","maggie","pakistan","samantha","asdf1234","letmein","asshole1","superman1","marina","147258","batman","fuk19600","butterfly","010203","qweqwe","29rsavoy","forever","1","mustang","sunshine1","ashley1","internet","london","666","harley","alexander","xbox360","00000000","12341234","q1w2e3","pepper","family","loveyou","50cent","joseph","whatever","!","jasmine","orange","user","junior","cookie","martin","qweasdzxc","212121","1qazxsw2","password12","google","password2","111222","lol123","hello123","jordan1","shadow1","patrick","3rJs1la7qE","ginger","nicole1","mylove","arsenal","12344321","abcdef","love12","232323","VQsaBLPzLa","taylor","myspace","brandon","angel","12345q","brandon1","chris1","diamond","snoopy","asshole","qweasd","starwars","matrix","mickey","school","jonathan","melissa","eminem","1234561","cjmasterinf","lovers","1234567891","nikita","richard","1342","yellow","12345qwert","oliver","q1w2e3r4t5","cheese","a123456789","christian","290966","walle","12345678910","12413","sophie","tudelft","DIOSESFIEL","dpbk1234","PE#5GZ29PTZMSE","bailey","U38fa39","mercedes","victoria","147852","asdasd5","matthew1","abcdefg","peanut","456789","red123","happy1","sandra","benjamin","dragon1","444444","123654789","$HEX","elizabeth","prince","amanda1","angels","angela","qqqqqq","samuel","banana","barcelona","ghbdtn","computer1","michelle1","william1","hockey","monster","carlos","justin1","antonio","qwertyu","nathan","55555","123789","0000","killer1","11223344","chicken","lucky1","gabriel","welcome1","zaq12wsx","jasmine1","silver","hunter1","bubbles","hottie1","purple1","andrew1","daniel1","liverpool1","1qaz2wsx3edc","rainbow","morgan","natasha","fuckoff","jackson","austin","vanessa","mommy1","madison","adidas","xxxxxx","252525","america","james1","metallica","slipknot","chicken1","87654321","jesus","NULL","0000000000","alexis","!ab#cd$","spiderman","steven","ferrari","lauren","456123","robert1","147852369","qwaszx","buddy1","butterfly1","!~!1","tinkerbell","bandit","danielle","0123456","nicholas","hannah1","qwerty12345","1234554321","asdfasdf","pokemon1","nirvana","destiny","scooter","cookie1","123qweasd","loveme1","chelsea1","chocolate1","1234567a","juventus","rachel","111222tianya","qazxsw","zzzzzz","monica","stella","america1","999999999","jennifer1","freedom1","taylor1","741852963","yamaha","victor","00000","qwertyui","a1b2c3","ronaldo","1password","smokey","david1","money","daddy1","cocacola","a838hfiD","1234abcd","joshua1","123asd","buster1","myspace123","booboo","madison1","samantha1","heather","7654321","elizabeth1","poop","tigger1","family1","mustang1","142536","november","jasper","lovely1","diamond1","success","edward","music1","valentina","harley1","sweety","tennis","zxc123","friend","qaz123","whatever1","thomas1","nothing","N0=Acc3ss","super123","casper","Password","chester","Exigent","password123","cheese1","spongebob1","mynoob","hahaha","hellokitty","098765","alexandra","canada","david","1q2w3e4r5t6y","dennis","december","olivia","a1b2c3d4","playboy","sabrina","patricia","summer1","friends1","mexico1","dakota","barbie","loulou","johnny","music","123456m","Password1","lover1","maggie1","pretty","123hfjdk147","nicolas","qwert1","charles","phoenix","rebecca","thunder","sexy123","iloveu2","123456789q","batman1","beautiful","carolina","4815162342","vincent","jeremy","spider","master1","heather1","weed420","Sojdlg123aljg","pepper1","sebastian","yankees","dallas","pussy1","cameron","caroline","peanut1","guitar","startfinding","midnight","i","iw14Fi9j","yankees1","elephant","124578","scorpion","sexy","tweety","bubbles1","fuckoff1","cowboys1","fuckme","fucker","louise","dolphin","852456","patrick1","loser1","mother1","lalala","naruto1","veronica","melissa1","sparky","newyork","adrian","123456s","september","heaven","alexander1","jessie","crystal","tigers","k:","p","iloveyou!","chris","gemini","raiders1","135790","zxcvbnm1","peaches","merlin","12121212","spongebob","scooby","stephanie","shannon","james","246810","1a2b3c","555666","sergey","lovelove","202020","159951","precious","123456j","lakers","manchester","ginger1","134679","cristina","apples","a1234567","qqww1122","pussy","daniela","jackson1","123456b","jackie","rocky1","asdfghjkl1","sakura","qazwsx123","yellow1","flower1","apple1","010101","newyork1","sammy1","alex","muffin","cherry","poohbear","richard1","nigger1","test123","destiny1","flowers","slipknot1","cooper","753951","monster1","paSSword","baby123","mexico","blessed1","toyota","spiderman1","beauty","fuck","emmanuel","genius","winston","tiffany","charlotte","741852","iloveu1","diablo","onelove","tiger1","badboy","maverick","joseph1","winner","mickey1","creative","beautiful1","softball","hotmail","421uiopy258","brittany","1314520","aa123456","asdf123","lastfm","manuel","sayang","kristina","austin1","stupid1","hottie","booboo1","murphy","stalker","carmen","doudou","qazqaz","scorpio","m123456","pimpin1","pass","badoo","garfield","0000000","fuckme1","scooter1","151515","aaaaa","brandy","kitty1","myspace2","steelers","compaq","claudia","123456d","rabbit","bailey1","crazy1","august","isabella","orange1","october","q123456","green1","black1","samson","aaaa","angelo","1a2b3c4d","9876543210","boomer","junior1","12345678a","shorty1","tyler1","456456","kimberly","guitar1","cowboys","shorty","passion","soleil","christ","1v7Upjw3nT","111","albert","andrey","ranger","dexter","lucky7","popcorn","babyboy1","bitch","alyssa","brittany1","123456abc","forever1","fucker1","barney","1122334455","blessed","metallica1","1029384756","karina","krishna","cameron1","california","christian1","melanie","j123456","password!","happy","963852741","woaini","danielle1","samsung1","gangsta1","icecream","letmein1","qwerty123456","eagles","love13","qwert123","uQA9Ebw445","fucku2","smokey1","leonardo","asdfgh1","police","christine","windows","bismillah","miguel","iloveyou12",":","snickers","arsenal1","7758521","bubba1","cowboy","denise","pretty1","george1","q12345","winter","dancer","coffee","player1","fernando","maxwell","swordfish","rangers","horses","francis","951753","martina","fylhtq","chivas1","secret1","s123456","marlboro","qwerty1234","kitten","lauren1","twilight","florida","141414","pass123","YAgjecc826","jason1","54321","nathan1","sydney","pumpkin","molly1","dolphin1","vfhbyf","natalie","hiphop","skater1","fishing","bond007","kobe24","barbara","loveyou1","tiffany1","john316","cassie","iloveme","hardcore","stupid","fatima","alexis1","rockstar","abc1234","123456z","playboy1","321321","123123a","greenday","baby","maria","angelina","starwars1","google1","b123456","school1","bonnie","123qwe123","SZ9kQcCTwY","lucky","father","courtney","sexy12","007007","crystal1","abc123456","fluffy","kissme","marseille","trinity","sweet1","candy1","qwerty7","password3","alejandro","a","pookie","roberto","sarah1","player","justinbieb","turtle","poohbear1","simone","corvette","jackass1","lolita","jonathan1","steven1","alicia","lollipop","jackass","123456c","786786","biteme","honey","motorola","nicholas1","friendster","angel123","portugal","iloveme1","simple","012345","vfrcbv","brooklyn","morgan1","darkness","rainbow1","shelby","slayer","natalia","snowball","chicago","454545","aaaaaa1","1234512345","people","lovers1","sharon","golden","snoopy1","shannon1","raiders","123qweasdzxc","sweetie","789789","teresa","blue123","242424","awesome","boston","victoria1","pamela","wilson","ssssss","mike","kevin","test","klaster","123456k","kenneth","bonjour","tucker","catherine","hockey1","pa55word","9379992","password","eminem1","love11","mnbvcxz","logitech","redsox","remember","popcorn1","kevin1","isabelle","P3Rat54797","seven7","steelers1","qwe","marcus","bulldog","yfnfif","cricket","lakers24","edward1","tweety1","qazwsx1","123456t","single","lizottes","nastya","amber1","sarah","blessing","marley","rockstar1","fender","aaa111","willow","camille","aaaaaaaa","florida1","peaches1","bella1","carlos1","connor","d123456","love4ever","cutie1","indian","goodluck","marie1","loveme2","marine","hammer","chance","stephen","121314","123456l","z123456","santiago","strawberry","abcdefg1","bigdaddy","daisy1","thunder1","asdfghjk","marvin","mmmmmm","vanessa1","happy123","abcd123","fuckyou!","iverson3","hotdog","svetlana","arthur","1212","never","tintin","234567","iceman","orlando","satan666","superstar","babygurl1","090909","johnson","fyfcnfcbz","freddy","rachel1","magic","qwert12345","chester1","loverboy","miller","cookies","parker","azertyuiop","porsche","teacher","5555555555","angelica","yourmom1","bullshit","sunday","christopher","love1234","travis","5555555","evildick","666999","monika","nissan","qwer","asdfg","midnight1","williams","please","55555555","spencer","aaaaa1","gateway","tiger","dallas1","111111a","charles1","321654","gracie","raymond","ladybug","sweetpea","rush2112","greenday1","sunflower","1123581321","baby12","jason","precious1","lakers1","brooklyn1","stephanie1","undertaker","m","12345t","sweetheart","ihateyou","zachary","emily1","fktrcfylh","123698745","tamara","asdfjkl","21212121","456852","lebron23","andrei","paradise","doctor","kawasaki","PolniyPizdec0211","a12345678","money123","171717","sophia","winnie","bianca","bigboy","22222222","qqq111","jacob1","andrea1","john","julian","pantera","lucky13","poopoo","lollol","3d8Cubaj2E","lorenzo","sasuke","babyboy","nascar","hahaha1","vladimir","abc12345","sierra","shopping","career121","12345qwerty","genesis","christina","bandit1","mylove1","cool","nelson","abcd","january","sweet","qq123456","scarface","159159","montana","ricardo","dolphins","giovanni","frankie","soccer12","johnny1","facebook","changeme","zxcvbnm123","jerome","sassy1","password11","123454321","qw123321","dakota1","australia","southside1","soccer10","zoosk","maryjane","brenda","rebecca1","baller1","honey1","jeffrey","xavier","eagles1","ryan","getmoney1","brianna1","realmadrid","8675309","k","scooby1","westside","minnie","bobby1","vampire","linkinpark","asdasdasd","francesco","inuyasha","1478963","asdfg1","falcon","123456r","green","laura","1q1q1q","aaa","rosebud","katie1","alex123","111222333","asdfghj","iG4abOX4","sergio","nigger","sterling","sophie1","claire","100200","italia","ronaldo7","timothy","jaguar","mariana","maksim","abigail","isabel","sairam","520520","jackie1","savannah","bigdaddy1","courtney1","disney","bigboy1","nigga1","blue","zaqwsx","love22","c123456","dancer1","1qwerty","musica","single1","123456aa","valentin","brooke","oliver1","chicago1","cherry1","london1","cjkysirj","alberto","jesus123","565656","blabla","maria1","warcraft","patches","cat123","mahalkita","banana1","P","monkey123","hollister1","alyssa1","lover","butter","walter","black","alessandro","778899","W5tXn36alfW","tigers1","password7","danny1","awesome1","bestfriend","dominic","gabriel1","michele","gateway1","oscar1","sex","cancer","helpme","volleyball","yuantuo2012","marie","123456g","princess12","love69","justine","chouchou","bitch123","champion","france","kitty","element1","963852","jasmin","fishing1","4444","darling","united","manutd","teddybear","regina","natalie1","passwort","francesca","181818","abcdef1","maximus","rafael","buddy","victory","qwerasdf","animal","student","hawaii","apple123","spirit","jamaica","carter","kayla1","gabriela","mariposa","abcdefgh","love23","super","yahoo1","rental","eddie1","dreams","sexy69","cheyenne","babygirl12","poop123","1234321","england","eduardo","valeria","zachary1","1986","bob123","antonio1","sniper","napoli","panther","willie","redsox1","hallo","zaq123","calvin","veronika","111111111","lol","nintendo","copper","millie","georgia","ybccfy","dog123","brianna","123zxc","happiness","diesel","monkey12","mohamed","123321a","camaro","bigdog","7895123","100000","engineer","bitches1","estrella","grandma1","princesa","oksana","gloria","penguin","virginia","skater","scarface1","suzuki","martin1","blue22","donald","123456e","PASSWORD","1234560","newlife","chris123","123qaz","leslie","jimmy1","sweet16","anderson","abcdefg123","77777777","blahblah","wwwwww","aleksandr","shelby1","adriana","kisses","giuseppe","softball1","skyline","audrey","fucku1","trouble","badboy1","rey619","tristan","celtic","vkontakte","love101","pimpin","simpsons","liberty","7777","jeremy1","godisgood","angels1","262626","cupcake","twilight1","skate1","potter","bradley","warrior","qw123","miranda","pumpkin1","barbie1","sexsex","100","147896325","smile","hesoyam","debbie","ruslan","online","maddie","jessie1","pink123","speedy","taurus","loveyou2","olivia1","ladybug1","wizard","allison","pierre","domino","benjamin1","apples1","silvia","kingkong","bobby","monday","polina","fuckyou123","honda1","mercury","nokia","rascal","pepsi1","6969","silver1","angela1","florence","adgjmptw","cookies1","margarita","hallo123","monique","258456","fuck123","9111961","love14","pass1234","children","zzzzzzzz","tyler","123451","cristian","star","justice","password5","booger","knight","mamapapa","dreamer","siemens","esther","soccer11","hollywood","qawsed","password01","monkey2","cassie1","anna","inuyasha1","amoremio","sister","gregory","191919","serenity","natali","sabrina1","N8ZGT5P0sHw=","prince1","rangers1","camila","123456qwerty","ncc1701","1bitch","nirvana1","ronald","business","texas1","element","avatar","panasonic","gangster","serega","brandy1","asasas","25802580","missy1","colorado","jenny1","microsoft","cowboy1","909090","1989","sammy","jupiter","stanley","madonna","123456p","serena","valerie","superstar1","legolas","Groupd2013","31415926","dbrnjhbz","rocket","megan1","airforce1","apollo","3Odi15ngxB","internet1","westside1","qwer123","brooke1","kelsey","pebbles","system","catdog","christina1","flowers1","Passw0rd","sultan","icecream1","bulldog1","redneck1","123457","123987","gizmo1","johncena1","danger","chichi","donkey","nfnmzyf","asdzxc","india","titanic","compaq1","thebest","kirill","javier","hamster","myspace!","223344","gangsta","packers","asdasd123","pookie1","hitman","kathleen","qwqwqw","cupcake1","skittles","sports","coucou","frankie1","P@ssw0rd","aaron1","christmas","molly","casper1","qti7Zxh18U","blondie","football12","smiley","snickers1","lasvegas","sam123","445566","september1","2222","jayjay","basket","elena","ireland","110110","123456789m","k123456","tommy1","jesus7","madrid","marshall","vegeta","people1","minecraft","terminator","security","drowssap","sparky1","123456789z","19871987","poiuytrewq","j12345","pauline","jackson5","jetaime","p@ssw0rd","ronnie","skippy","kimberly1","rammstein","alexandre","scotland","nikki1","rocky","asdfjkl:","motdepasse","stefan","celine","harrypotter","aaaaaaa","babydoll","manman","violet","dddddd","192837465","pizza1","legend","321654987","iloveyou","bella","truelove","harvey","tanner","runescape1","fantasy","peter","casanova","friday","robbie","katrina","philips","spencer1","francisco","cool123","viktor","exigent","fluffy1","qwertz","chocolat","christophe","phoenix1","poiuyt","z","bambam","jesus777","99999999","1qaz1qaz","323232","pussy69","killer123","rhbcnbyf","alejandra","muffin1","kelly1","stonecold","aurora","chivas","loser","gordon","love21","gandalf","lalala1","jasper1","a1s2d3f4","spanky","love10","mitchell","g9l2d1fzPY","jack","babygirl2","19851985","welcome123","franklin","russia","carpediem","aaaaaaaaaa","linked","zaq1xsw2","megaparol12345","travis1","admin123","daisy","lorena","froggy","smiles","douglas","handsome","shithead","1blood","tatiana","santos","little1","anastasia","unicorn","5555","12369874","savannah1","tinker1","sweetie1","jenny","dIWtgm8492","1234567q","super1","margaret","viking","muhammad","maxwell1","pppppp","sexyboy","phantom","fatboy","m12345","tomtom","080808","monica1","ballin1","eclipse","andres","elijah","maurice","piglet","baxter","123456654321","pikachu","india123","platinum","gangster1","garcia","passport","jesuschrist","kelly","sandra1","hotmail1","mahalko","charmed","loving","272727","corazon","katherine","michel","myspace12","access","bunny1","123321123","wisdom","mozart","snowball1","147147","asdfghjkl:","patches1","abcde","chloe1","horses1","D1lakiss","98765","church","everton","12345m","nicola","peace1","marcus1","trouble1","13579","dylan1","tinker","161616","candy","69696969","valentine","grace","sandy1","hercules","123456f","beatrice","puppy1","cooper1","wolverine","12345s","mama","jamesbond","jamie1","theman","anton","19841984","toshiba","cthutq","maradona","emily","gibson","787878","bingo1","green123","marcel","lolipop","maganda","penis1","turtle1","amsterdam","joanna","fashion","mercedes1","yahoocom","123000","19861986","britney","boston1","goldfish","power","james123","kitkat","network","lawrence","pass1","112358","beatles","winston1","saibaba","princess2","trevor","promise","norman","14789632","hotdog1","idontknow","hollywood1","damian","star123","123456y","diamonds","trinity1","ihateyou1","kkkkkk","cutiepie","soccer13","bulldogs","felipe","yoyoyo","heaven1","enigma","marion","angel12","brian1","jayden","germany","mario","onelove1","369369","soccer7","casey1","sasha","brother","matteo","max123","melody","jimmy","success1","simona","julien","hjvfirf","loveu2","digital","english","reggie","shalom","power1","einstein","forever21","karate","135792468","hello12","bubble","nathalie","benfica","billy","spartak","hahahaha","harrison","timothy1","mom123","123456123","danny","kingdom","poopoo1","admin","gunner","ranger1","1234asdf","anhyeuem","helena","sasha1","buttercup","argentina","water1","cocacola1","polska","soccer123","omsairam","saturn","hg0209","manager","georgia1","stephen1","baller","282828","forest","12345r","johncena","sweets","elaine","maryjane1","dragonball","milano","stargate","colombia","brian","19891989","captain","infinity","pandora","amelia","trfnthbyf","dianne","eagle1","redskins","digital1","sexybitch1","general","pogiako","dinosaur","zidane","7894561230","colt45","spring","sureno13","arnold","catdog1","jesse1","eugene","teddy1","penelope","19921992","runescape","paintball1","little","blood1","test1234","summer08","billy1","nadine","myname","therock","rusty1","fatboy1","ciaociao","football2","swimming","wesley","travel","Telechargement","zxczxc","orlando1","nonmember","grandma","password4","654123","tennis1","shithead1","denise1","thuglife","bbbbbb","vRbGQnS997","nothing1","nigga","asd","subaru","chacha","tequiero","moomoo","charly","penis","chopper","comeon11","lacrosse","12345j","scoobydoo","butter1","gracie1","sadie1","zxcv1234","iverson","bowwow1","123789456","bullshit1","020202","faith1","kitten1","monique1","pink","victor1","wordpass","bullet","r123456","duncan","a11111","1qa2ws3ed","adrian1","laura1","thx1138","russell","love15","cutiepie1","flatron","sebastian1","gordon24","sexygirl1","123321q","ilovegod","asdf12","pickle","mememe","mar","kristen","143143","kittycat","420420","bamboo","mylife","e123456","walker","oscar","boobies","cleopatra","pascal","alaska","testing","dragons","??????","19821982","qwerty321","pippo","porsche1","perfect","password13","hummer","justme","303030","Megaparol12345","sammie","smile1","19801980","david123","teddybear1","baseball12","blue12","joker1","dustin","katerina","cynthia","11112222","mario1","harry1","qazwsx12","fabian","samuel1","fuckyou69","cecilia","roland","2","golfcourse","070707","daddy","magic1","313131","alfred","martinez","elephant1","2004","fktrctq","katie","ass123","yahoo","ilovejesus","l123456","123456123456","houston1","allison1","smoke420","godzilla","bernard","ganesh","peterpan","mybaby","brutus","pitbull","buddy123","iloveme2","skittles1","spurs1","logan1","x4ivygA51F","9-11-1961","ciccio","pineapple","panthers","napoleon","chopper1","honda","drummer1","louise1","holiday","11235813","federico","music123","houston","startrek","vincent1","qazxswedc","alabama","mohammed","qwe12345","cambiami","iloveyou3","christine1","gggggg","friendship","911911","pa55w0rd","pokemon123","mountain","boomer1","steve","galina","12301230","vfvjxrf","college","biteme1","raymond1","bitches","looking","bhf","bradley1","packers1","berlin","lindsay","linkin","isabella1","hassan","hacker","booger1","987456","my3kids","scotty","storm1","19831983","martha","5211314","123456789s","bigdog1","catch22","mariah","marco","catalina","wildcats","solomon","caramel","michigan","oicu812","44444","butthead","myspace","13131313","vampires","philip","amber","cheer1","753159","sunny1","peewee","bob","charmed1","change","hiphop1","yourmom","mybaby1","theman1","strength","panther1","tommy","badass1","jjjjjj","cdtnkfyf","charlotte1","barcelona1","hardcore1","bubba","1loveyou","pussycat","spitfire","myself","Tnk0Mk16VX","babygurl","qweasd123","chanel","fender1","howard","andreas","megan","bluebird","a123123","123456987","carolina1","asdqwe123","sexygirl","sandy","popeye","matt","ybrbnf","pickles","2012comeer","medicine","autumn","something","evelyn","misty1","cutie","naruto123","peter1","soccer2","maxime","miriam","10101010","grace1","fordf150","asd123456","ilovehim1","moonlight","caprice","lonely","123098","t123456","skipper","damien","llllll","angel2","10203040","YfDbUfNjH10305070","spider1","johnson1","deejay","giulia","africa","joel","saints","bananas","bonita","password10","tucker1","rodrigo","runner","joanne","000","567890","archie","birthday","77777","baseball2","trixie","mark","789123","dearbook","spike1","19951995","null","password0","q1q1q1","pimp123","blackberry","lilwayne1","king","maddog","sugar1","linda","elvis1","66666666","the","ffffff","firebird","kermit","jake","phoebe","aaliyah","7758258","123456n","alison","s12345","22222","s","123465","salvador","barney1","sexy101","drpepper","melanie1","miracle","aaa123","c","mypassword","caitlin","wxcvbn","fred","harry","ironman","thebest1","natasha1","ferrari1","fuku00198","d","usa123","lololo","102938","pebbles1","898989","abigail1","a111111","thumper","familia","rfrfirf","spartan117","chance1","goober","2222222","qwerty11","brenda1","monkeys","cassandra","aaron","2cute4u","darren","135246","tiger123","always","smokie","steve1","freddie","nick","poopy1","genesis1","panget","guinness","chiara","athena","personal","alabama1","jaimatadi","gators","israel","darkangel","ellie","evony192","19881988","smoke1","knopka","hershey","budlight1","peace","lovebug","alicia1","pencil","mikey1","a1a1a1","predator","ka_dJKHJsy6","alejandro1","torres","hayden","newport1","montana1","111111q","marcos","lvbnhbq","QWERTY","bigdick","20102010","chevy1","fuckme69","sporting","indonesia","fernanda","aezakmi","olivier","devil666","147369","pizza","aquarius","dragon123","bonnie1","kelsey1","mexican1","12qw23we","1234567890q","future","franco","vikings","rahasia","222333","jayden1","44444444","diana","sunset","lovelife","love01","theone","Sample123","b","penguin1","lizzie","bearshare","denver","my3sons","remember1","drummer","lorraine","12345d","aaliyah1","lindsey","davide","scott","nemesis","blondie1","mike123","hector","holly1","tarzan","jeremiah","brasil","badass","pimp","magnum","temp","boogie","death1","connie","capricorn","12131415","wrestling1","private","potato","special","good","manuela","cherokee","florian","asdfasdf1","kenneth1","blablabla","sexy13","lincoln","friend1","sheila","christ1","yvonne","minnie1","turkey","dipset1","yamaha1","veronica1","punk","summer09","a1s2d3","love09","passer2011","sex123","kennedy","2hot4u","marine1","maddie1","cricket1","nikki","selena","goldie","cooldude","giants","broncos","123qwerty","juliana","myspace3","buddha","skateboard","sk84life","chloe","buttons","westlife","norte14","lizard","kissme1","111qqq","defender","dumbass1","favour","shaggy","vampire1","456654","darkness1","tequila","daniel123","azerty123","1984","bball1","assassin","testtest","youbye123","samurai","dragons1","sk8ter","505050","hello2","14531453","penny1","11111a","federica","marian","killa1","dance1","explorer","simple1","ibrahim","death","matilda","dickhead","qwer12","pioneer","ducati","babylove","formula1","crazy","angel13","janice","789654","micheal","password9","jayjay1","hailey","wangyut2","363636","1987","l","dfvgbh","marissa","gilbert","cheyenne1","canada1","f","faith","12345z","monkeys1","dominique","tokiohotel","xxx","j","delete","miller1","deedee","alexandra1","cantik","1985","kenny1","12345k","mama123","connor1","antoine","papillon","111555","123455","dolphins1","haha123","123456h","babyblue","pitbull1","emerald","1313","love16","miranda1","343434","beauty1","fondoom","sebastien","hhhhhh","simon","teacher1","monalisa","ekaterina","19941994","larisa","hearts","jeffrey1","sapphire","disney1","england1","alex12","wolves","jamie","warren","surfer","subzero","gustavo","arizona","bear","puppies","freeman","19931993","april","julia","1234567899","vision","k","telefon","1myspace","jacob","pink12","sydney1","dragon12","killer12","theresa","agent007","123456789j","getmoney","33333333","picasso","idontknow1","linda1","morris","spooky","julius","336699","design","camilla","wrestling","jamaica1","racing","lucky123","9999","salvatore","loverboy1","shanna","19901990","fuck69","pinky1","panthers1","snowman","brownie","lollipop1","murphy1","kkkkkkkk","random","hughes","1princess","death666","shirley","321456","cjkywt","roberta","digger","miguel1","stefano","zoey101","19811981","dude","benson","money2","sierra1","jayson","sputnik","9999999999","watermelon","iloveyou7","654321a","alpha1","special1","valera","bambam1","8888","bluefish","525252","american","voodoo","malibu","123456w","rabbit1","dodgers1","slayer1","amore","carmen1","april1","money12","frank","blahblah1","poopie1","123123q","050505","dustin1","elijah1","cuddles","fucking","winter1","ily123","liliana","fuckit","scott1","frank1","abcde1","karolina","shelly","bonbon","90210","6666","tigger2","justice1","1234566","adidas1","shadow12","harmony","fuckit1","deborah","qazwsxedcrfv","1lover","babydoll1","sam","king123","paloma","golden1","bethany","pimp12","julie","celeste","sachin","906090","123456qwe","marines","bulldogs1","hotrod","forget","369258147","bollocks","daniele","gerald","dalejr88","abcde12345","132435","mustafa","password00","6hBf28W791","kisses1","broncos1","sweetpea1","ficken","kitty123","buttercup1","987456321","alessia","dominik","zk:","lilmama1","kissmyass","mommy","stellina","123456asd","d12345","dragonfly","karen","bitch12","matrix1","980099","loser123","dominic1","password8","lindsey1","stinky","sublime","ronaldinho","volcom1","asdasd1","shit","summer07","jacobs","garrett","hotstuff","smiley1","qweqweqwe","gundam","24680","19911991","beckham","maison","blood5","candy123","000000000","thegame","nightmare","water","235689","best","bunny","ghjcnj","doggy1","password69","thailand","password22","simpson","sexymama1","raven1","february","lala123","stella1","lovebug1","viktoria","oooooo","newlife1","josh","doggie","soccer3","201301","redwings","aspirine","tobias","pirate","badger","energy","charlene","adam","emilie","5678","dickhead1","letter","123456789k","master123","dennis1","n","geronimo","gregor","redneck","riley1","beaver","atlanta","atlanta1","dadada","mariam","funny1","garden","545454","country","mommy123","james23","mookie","electra","buffalo","curtis","xavier1","scorpio1","yousuck1","god","barbara1","justdoit","massimo","marley1","pakistan1","olga","122333","ytrewq","19781978","tatyana","josephine","1980","qawsedrf","ladygaga","f123456","singer","carrie","soccer9","lover123","yankees2","popopo","godislove","cuteako","valencia","insanity","sk8ordie","molly123","twins2","creative1","fountain","harold","driver","redskins1","suckit","rose","3333","mollie","poop12","queen1","kristen1","dexter1","bella123","bitch2","liberty1","rolltide","madmax","german","dylan","jazzy1","valentino","christmas1","vanilla","connect","clowns","burrito","october1","sunny","schalke04","preston","prettygirl","tornado","panda1","stacey","cloud9","willie1","sammy123","pavilion","vacation","love08","tottenham","5hsU75kpoT","callie","broken","love143","hey123","coffee1","2222222222","fish","hihihi","UsdopaA","fireball","yankee","privet","bobbob","shakira","soccer14","noway","akopa123","illinois","pantera1","rockon","newcastle","samsam","daniels","kkkkkkk","shadow123","drpepper1","sexy11","scarlett","season","gabby1","cedric","teddy","melvin","avalon","a1b2c3d4e5","321123","usdopaa","lucas","12345679","ashton","froggy1","shamrock","tomcat","shawn1","marius","simba1","mariah1","frances","eternity","12345b","vagina","volcom","wallace","goodboy","rosemary","marlon","lollypop","paris1","bubble1","rooster","topgun","sasasa","g123456","psycho","patricia1","332211","warcraft1","123456789d","gerard","qwerqwer","donkey1","dick","young1","dodgers","milena","canyon","magnet","kristin","blackie","sanane","1jesus","989898","1945","manuel1","redrose","bacchus","Linkedin","19791979","zombie","01020304","flores","poopie","phillip","area51","taco","fatass1","12","gabrielle","holland","magnolia","784512","naruto12","314159","666777","budlight","1951","fresh1","tanner1","chandler","1982","hello!","11111q","maxmax","jellybean","soccer5","paramore","romeo1","stratfor","istanbul","john123","4200","ragnarok","goddess","sunflower1","andromeda","dollar","redbull","sweety1","cinderella","michael2","mamama","mason1","bigred","laguna","9999999","warrior1","november1","rocker","dinamo","258258","passion1","lala","delfin","1022","sasuke1","blacky","marines1","030303","1234567890a","sanchez","annie1","fuckme2","tattoo","cool12","hamilton","batista","2000","galaxy","000111","dillon","police1","education","whitney","rosario","henry1","porsche911","bogdan","antonella","gregory1","michigan1","alessandra","cookie123","cxfcnmt","99999","yoyoyo1","sunrise","copper1","casablanca","vikings1","20092009","wilson1","1988","starcraft","vivian","enterprise","famous1","OcPOOok325","lionking","marissa1","samira","temppass","100100","19751975","lucifer","my2girls","a1a2a3","rooney","patriots","zxasqw12","qazwsxedc1","ghbdtnbr","123456789l","sabina","fuckyou12","isaiah","judith","respect","cme2012","yahoo123","reddog","chargers1","yasmin","sparkle","passat","wayne1","iluvu2","aaron431","brother1","stanley1","samara","simon1","country1","bettyboop","blazer","swordfish1","1010","nigeria","3333333","info","theone1","marketing","december1","newport","dog","dorothy","karen1","p123456","amores","boobies1","alice","hola","chris12","leonard","spam","catherine1","98765432","sobaka","julian1","kent","ricky1","kittycat1","patriots1","manson","hershey1","outlaw","sidney","1qa2ws","dance","johanna","monkey7","family5","998877","holly","stratus","moomoo1","sara","holden","monkey11","anything","bluesky","blueeyes","kurt","samson1","perfect1","carter1","1979","willow1","andreea","000001","twinkle","123456789p","carlitos","coconut","haha","scoobydoo1","lester","skyline1","roxanne","madeline","rosie1","fucky0u","south13","douglas1","butterfly2","pisces","bentley","blackjack","122001","mamamia","newton","bigdick1","19961996","redhead","hotties","mahal","boubou","corona","baby13","peewee1","micheal1","baseball7","desiree","wow12345","gogogo","caroline1","dupont","shane1","hongkong","b12345","pickles1","ticket","marilyn","space1","bobmarley","classic","wonderful","qwe123qwe","ethan1","1q2w3e4","widget","zvezda","laptop","kevin123","thuglife1","youngmoney","underground","indiana","w123456","acmilan","hailey1","smile123","224466","1983","7777777777","4321","tripper","yomama1","red","fireman","renata","billabong","777888","annette","bernie","blossom","chase1","williams1","football10","lakshmi","joe123","makaveli","456321","almond","ninja1","sugar","panda","sigma","love24","burton","google123","clifford","pepito","daddysgirl","morena","stormy","1357924680","cartman","kristine","nikola","washington","freckles","bishop","trigger","1q2w3e4r5","hendrix","password23","tristan1","cracker","detroit","beatriz","lilwayne","oblivion","giovanna","spike","gizmo","germany1","fortuna","paul","kayla","callum","maverick1","parker1","soccer4","bscirc","alfredo","lisa","bettyboop1","divine","sister1","coupons","megaman","353535","poison","broken1","myspaceco","juggalo1","star12","blah","blue13","blowme","060606","markus","jeter2","coming","starfish","Welcome1","toronto","sandrine","amigos","ronnie1","telephone","jordan12","thankyou","renee1","stardust","chubby","billybob","258369","armando","skywalker","rebel1","freddy1","snowman1","babies","lindsay1","montreal","herman","jesse","777","hotboy1","jester","ncc1701d","football7","alladin79","mierda","k12345","heyhey1","random1","1977","peugeot","monkey3","333666","cassidy","mandy1","therock1","myspace7","albert1","arianna","casey","max","savage","just4fun","mate1","20082008","hernandez","spiderman3","horse1","marianne","apollo13","paintball","katherine1","789987","azerty1","fucklove1","godbless","mobile","baseball3","robinson","munchkin","hayley","000000a","eeyore","1asshole","ronaldo9","punkrock","icehouse","skeeter","sharp","serenity1","brownie1","everton1","chemistry","joejoe","292929","gothic","paris","warcraft3","ireland1","sergei","missy","bubblegum1","hotstuff1","mykids","claudia1","gators1","1981","hookem","jrcfyf","12345qwe","griffin","kaktus","dietcoke","asdfg123","bitch69","cashmoney","cashmoney1","steaua","brazil","1236987","jack123","ilove1","snuggles","snowflake","martini","entropy","bubblegum","1q2w3e4r5t6y7u8i9o0p","piazza","deftones","longhorns1","123456789o","aobo2010","redrum","kaylee","nicole12","damilola","christy","aol123","marlboro1","loveme123","callofduty","michaela","pegasus","bluemoon","tony","flipper","sheena","omg123","spanky1","marshall1","Michael","eric","192837","catfish","bruno","superman12","please1","jerry1","juliette","521521","garfield1","ILOVEYOU","artist","something1","birdie","mouse1","carson","blueberry","warriors","tyson1","1122","PolniyPizdec110211","12345abc","september2","millie1","speedy1","cheater1","sexxxy","wicked","claudio","cracker1","mackenzie","19761976","unknown","sanjay","michal","trevor1","janine","lancer","great1","brandi","5xfgs3Ii9D","stefania","sommer","arizona1","paddle","love18","superman2","1978","y6p67FtrqJ","timmy1","hanuman","universal","monkey13","hammer1","jojo","lighthouse","password6","rock","coco","marcelo","656565","pop123","rosebud1","angelito","dalton","testpass","rocky123","winner1","kingston","bozo","esperanza","roscoe","cat","andre","singapore","scrappy1","skyhawk","rjntyjr","rayray1","doodle","rocknroll","magdalena","jordan123","boxcar","rajesh","cougar","thumper1","slayer666","braves","yolanda","1234qwe","fake123","enrique","n123456","service","rrrrrr","cubs","allah1","helpme1","love07","black123","flamingo","tester1","pinky","linkedin1","rastaman","extreme","dkflbvbh","blizzard","baseball11","1qwert","antonia","soulmate","112211","sharon1","qwertyqwerty","skate4life","1babygirl","incubus","office","point","marisa","gjkbyf","ramona","*****","alexia","butthead1","kolobok","fellow","bastard","raquel","buffy1","derrick","jeanne","nuttertools","blackcat","cynthia1","iforgot","369258","19731973","momdad","yomama","mememe1","my2kids","godfather","zxzxzx","elvis","mamita","1990","sexy14","banane","maximus1","123456789123","ironmaiden","1991","geheim","lkjhgfdsa","mister","fatcat","semperfi","qwerty2","coolio","mommy2","angel7","sassy","elodie","richie","mendoza","3","pastor","tasha1","lane","revolution","fisher","santana","whitney1","as123456","indigo","purple12","ilovehim","account","angie1","rascal1","leslie1","225588","colombia1","poppy1","soccer15","raptor","maria123","wicked1","jay123","cccccc","hilary","fiesta","baseball10","maxine","t","1a2s3d4f","felicia","toyota1","ilove","111aaa","amour","motherlode","12qwas","1monkey","clover","debbie1","shopping1","nks230kjs82","galatasaray","123456as","milan","just4me","dreamer1","sexybitch","golf","kaitlyn","camero1","priyanka","tyler123","fashion1","tootsie","powers","rfnthbyf","praise","target","ricardo1","rayray","c12345","babygirl13","112233445566","ashley12","biscuit","princess10","evolution","pwd1234","romain","trooper","webhompass","blonde","23232323","preston1","lightning","bianca1","rbhbkk","felix","SKIFFY","alejandra1","ivanov","westham","sports1","wildcats1","princesse","lollol1","olamide","585858","alexandru","tttttt","champion1","yugioh","research","12345c","88888","cutie123","pokemon12","number2","nichole1","lilly1","animal1","ashley123","animals","johnjohn","labrador","g-unit","nathaniel","paulina","dingdong","12345g","smallville","lavender","annie","boricua1","jakarta","12345l","imissyou","19771977","hitler","sonic1","vagina1","love12345","susana","gladiator","january1","rodney","russell1","qqqqqqqq","sweetness","moose1","handball","quentin","scruffy","jojo123","1976","playstation","mauricio","gemini1","marijuana","justinbieber","lovelove1","twister","anamaria","daniel12","moloko","19971997","zk","classof09","ibanez","techno","my2boys","redred","simpsons1","ariana","chipper","sammie1","ingrid","azsxdc","eastside1","family4","monkey22","sherry","12345678q","windows1","suckit1","alessio","hobbit","bananas1","dave","papamama","suzanne","987654321a","danilo","aragorn","warhammer","casino","hottie101","kaitlyn1","naughty","nick123","derrick1","trinidad","123love","joker","25252525","baseball5","daddy123","unreal","henry","xxxxxx1","oceane","laurent","carebear","anthony2","dusty1","12345671","pinkfloyd","raphael","nicole123","jason123","reggie1","pizza123","zxcasdqwe","bigred1","esmeralda","street","stewart","1975","monday1","pickle1","immortal","000000000","iceman1","andy","truelove1","allen1","panzer","gabriella","hehehe","atlantis","beatles1","gibson1","larry1","spartan","katana","123456v","shane","girls","power123","zeppelin","vincenzo","julia1","vaffanculo","metal666","surfing","happy2","369852","mission","qwe123456","hornet","jerry","football11","darwin","virgin","asddsa","cadillac","corvette1","mary","diana1","garrett1","123456789987654321","loveless","scrappy","applepie","aurelie","radiohead","heyhey","zxcvbn1","snowboard","123456qw","counter","brown1","frederic","private1","babycakes1","insane","rodriguez","stinky1","believe","19741974","larissa","1234abc","godisgreat","inlove","youtube","1Fr2rfq7xL","julie1","puppies1","sexy01","hayden1","diablo2","111213","scarlet","logan","aaaa1111","soccer22","6666666","MaprCheM56458","baller23","424242","wedding","cheryl","kittykat","michael123","sophia1","randy1","teresa1","nintendo1","valerie1","wonder","sublime1","arturo","coolman","weed","bowling","gabriele","eleven11","harris","monitor","watson","asshole2","esteban","qqqqqq1","robbie1","lolo","logitech1","flying","hallo1","pepsi","sherlock","iloveyou13","pineapple1","1992","fuck12","skate","iloveyou22","smith","roman","qweasdzxc123","vfhecz","clement","pamela1","marianna","fireman1","autumn1","jajaja","baby11","money6","man","hannah123","caitlin1","granny","zxcvbnm","kenshin","qwertyuio","cindy","rough","w1985a","peter123","australia1","gorgeous","what","pasaway","dthjybrf","clayton","angelica1","mathew","justin123","fuckyou3","787898","nascar1","pancho","anderson1","denis","r","sandman","888999","Unknown","sampson","emma","poopy","blake1","chrissy","verbatim","phantom1","wildcat","tdutybq","nugget","w1980a","trisha","jakjak","breanna1","myspace11","frosty","asterix","2468","cindy1","alibaba","monkey5","skorpion","maureen","motherfucker","jumpman23","apache","chico1","kickass","graham","wwe123","vfrcbvrf","sprite","babyko","riccardo","asdf3423","123456789123456789","paige1","homer1","andre1","gagged","rockon1","drowssap1","coyote","ernesto","colleen","jose123","sunshine2","808080","pornstar","qwerty6","purple123","lasvegas1","habibi","nana","fuckyou","brendan","empire","marlene","enter","5532361cnjqrf","123456789b","fernando1","sarah123","w1979a","sooners1","love17","rusty","voyager","madman","iloveyou14","258963","romance","heart","smudge","college1","cotton","1974","password21","horse","wolfgang","armani","detroit1","irish1","nevermind","secret666","football9","23456789","collins","a801016","miamor","ghetto1","angelina1","vfksirf","dixie1","inferno","juliet","highheel","chrisbrown","z1x2c3","w1990a","123567","theking","bethany1","a23456","kelvin","bowwow","fire","abhishek","1a1a1a","norton","ultimate","jersey","retard1","bryan1","tester","fighter","backspace","osiris","987987","zaqxsw","disturbed1","francis1","kaiser","f00tball","control","1a2b3c4d5e","carebear1","gbpltw","spiderman2","free","robin","mitchell1","polaris","katrina1","iloveyou4","ericsson","gonzalez","bigman","134679852","sexyboy1","airforce","awful","campbell","chevrolet","babyface","jojojo","aleksandra","haley1","1598753","w1989a","jungle","cookie12","soccer17","car","deepak","hawaii50","xyz123","romashka","jillian","mermaid","cassidy1","qwertyuiop","ninja","donald1","whore1","irina","jellybean1","ghost1","boobs","carole","24682468","devils","200000","francois","football3","hakr","123456ab","halloween","axio","morrison","blaze1","cactus","global","motocross","111000","abraham","chevelle","sarita","fucklove","h123456","skolko","iloveyou11","princess13","1020304050","unicorn1","vladik","hunting1","kenny","blue1234","buttons1","lucas1","415263","162534","princess11","soccer8","pyon","soldier","sandiego","halo123","southpark","sentnece","1973","erika","america10","schatz","london12","anjali","aditya","emilia","laurence","daisy123","1million","moreno","ash123","kissmyass1","phone","austin316","prayer","elvira","q123456789","nature","bryan","universe","aztnm","hola123","1969","master12","diego","doggie1","h","pk3x7w9W","romeo","starlight","toulouse","richmond","86","desire","cinnamon","holiday1","allstar","mexico13","punkin","puppy","hunting","isaiah1","airborne","w1982a","charlie2","w1984a","viper1","steph1","raven","patience","university","147741","nokia1","1993","keyboard","mastermind","jonas1","kucing","kramer","delpiero","lestat","unique","farmer","phillip1","action","adriana1","qwe321","noodles","britney1","abcdefghij","carina","xxxxx","crazy123","boogie1","window","2cool4u","renault","hawaii1","passwort1","hamster1","rocker1","merlin1","jesusislord","33333","sayangku","castle","football5","d71lWz9zjS","virginia1","rocket1","ganteng","emanuel","thegame1","flower123","angel01","lennon","house1","purple2","baxter1","timber","cuddles1","xxxxxxxx","letmein2","ktyjxrf","yankee1","joey","25251325","w1986a","justin12","14344","sabine","my","jesus12","cheese123","whynot","1angel","jefferson","nnnnnn","iloveyou5","meghan","aliali","stars","sexylady","12345678900","eleonora","iloveyou123","fucku","jeremiah1","nichole","r2d2c3po","qazwsxedc123","mamamama","malcolm","kiki","franklin1","w1988a","xxxx","raider","sucker","kathryn","malina","backend","lover12","angel11","sexy15","bobcat","UvGX8f8232","1994","a1a2a3a4","emilio","7","iamthebest","jessica123","1314521","makayla1","slimshady","ghetto","nellie","reaper","stephane","tomato","bruno1","faggot1","794613","amorcito","aspire","cheche","treasure","family6","cannabis","house","babygirl10","calvin1","sirius","wordpass1","titans","Ñ","rockyou","assass","sandeep","maestro","metal1","salman","walter1","123ewq","vodafone","pirates","alisha","mushroom","love33","jesucristo","rebelde","ï¿½ï¿½","stuart","deedee1","w1983a","deniska","babyblue1","mouse","taekwondo","amelie","kotenok","cheval","messi10","naughty1","billabong1","peanuts","9","hottie12","kennedy1","webster","lonely1","giants1","hannah12","philippe","345678","malika","goldfish1","chantal","natalya","president","firefly","baseball13","charity","1000000","amazing","168168","netlog","w1975a","southside","james007","A123456","scruffy1","deathnote","skate123","princess3","catcat","maurice1","chrissy1","nokia6300","princess7","lucy","hottie123","faithful","556677","kingkong1","theking1","suckme","nicolas1","helene","lawyer","agnieszka","history","12345678901","lillian","w1987a","qqqqq1","mississippi","1995","love123456","united1","vietnam","marvin1","dudley","kristin1","opensesame","mexican","1andonly","rebelde1","jake123","19721972","guadalupe","blackie1","captain1","1230","rambler","father1","pearljam","soledad","angel3","mimi","newcastle1","hermione","qweewq","babyboo1","rochelle","hudson","simba","melinda","national","falcons1","franky","spunky","summer06","dating","pimp101","taytay1","landon","sailor","kamikaze","543210","pingpong","corey1","chevy","dracula","pussy123","hunter12","indiana1","soccer21","calimero","myspace13","granny1","brittney","saints1","southpark1","boomboom","rfhbyf","jessica2","nelson1","seattle","gandako","misty","oxford","adriano","1a2s3d","1234568","dan","games","viewsonic","mike12","download","marcela","big","ABC123","skippy1","w1981a","angeles","qqq123","yamahar1","herbert","colorado1","w1978a","diablo1","forgot","jocelyn","1234569","diesel1","121212a","jackass2","fenerbahce","pentium","svetik","castillo","1qaz","sylvia","159632","littleman1","renato","g","renegade","noodle","whiskey","international","juggalo","ironman1","felix1","amadeus","american1","freaky1","microlab","sally1","676767","bonjovi","erica1","ivan","trumpet1","dumbass","devin1","teamo1","victory1","3rJs1la2qE","redman","sexy23","mnbvcxz1","shadow2","daniela1","summer12","killbill","annabelle","penny","palermo","charlie123","ihateyou2","beverly","megane","hellfire","nursing","claude","yousuck","eclipse1","ryan123","hearts1","jordan2","friday13","shelly1","sharks","information","lover2","12345678s","skipper1","ashleigh","8","love4u","teamo","horny","vfvekz","interests","qwertyu1","justme1","6543210","betty1","cosmos","bridget","beyonce","gunner1","home","luckydog","man123","freaky","w1976a","rosita","marie123","ab123456","tyrone","mohammad","onepiece","r12345","friends2","billie","bronco","princess01","password1234","789654123","1972","kasper","153624","panama","manolo","natalia1","moose","romania","foster","123456789c","babylon5","kyle","sexylady1","redhead1","2323","guest","caesar","wombat","d9Zufqd92N","nicole2","alpha","dallas214","ilovemymom","jobsearch","discovery","abdullah","route66","blowjob","nissan1","jenna1","darius","myspace5","savage1","chiquita","bitch!","135791","qweqwe123","blue11","qwertyuio1","qwert12","ali123","chipie","666888","vitalik","batista1","15426378","kiss","vanille","wesley1","tarheels","wolfpack","andrew12","shadow13","dolores","19981998","dirtbike1","august1","goodman","felicidade","rhfcjnrf","classof08","123456789r","football21","anita","123456789t","t12345","deadman","asdqwe","1zn6FpN01x","3girls","123456qq","arschloch","guillaume","leticia","hobbes","2005","elisabeth","woody1","belinda","payton","seven","golfer1","shiloh","w1977a","jeff","doraemon","aleksey","western","squirrel","blood","sparta","mirage","werewolf","lampard","skeeter1","madonna1","mittens","soccer23","momdad1","lucas123","123mudar","ricky","inside","dude123","mikey","sampson1","devil","lincoln1","pass1word","dominique1","emo123","white1","1family","sadie","eddie","junjun","terry1","killer2","thanks","batman123","lacoste","pimp69","babygirl3","asd456","pompier","memory","rommel","nascar24","alenka","allstar1","hot123","alex1234","andrew123","cassandra1","honeybee","lilman1","inlove1","enter1","murray","darkside","winnie1","kittens","ciao","million","trucker1","texas","rooster1","AKAX89Wn","qwert6","kinder","kaylee1","oscar123","gerrard8","ashton1","brandi1","hotgirl1","javier1","luciano","2121","karina1","marathon","hello1234","matias","hottie2","libertad","shutup","louloute","zxcvbnm:","asdfgh123","freak1","Password123","3rJs5la8qE","g13916055158","sweetness1","manutd1","zxcvb","vladislav","bleach","strong","cellphone1","ssyu1314","lovehurts1","hi","blue42","science","miami305","coco123","lovingyou","babycakes","princess!","rachael","lilian","etoile","leanne","dfkthbz","3children","monkey69","soccer16","audia4","damian1","karachi","elliott","memphis","120120","football22","falcon1","v123456","sherman","swimming1","again1","123QWE123","alberto1","krystal","chicken2","258852","eunice","chandra","chichi1","mathilde","heart1","sandro","jacqueline","tonton","vfvfgfgf","nutella","jehovah","2girls","josh123","james12","violeta","a000000","fallen","goober1","q1q2q3","domenico","leelee","azsxdcfv","ji394su3","kristina1","fernandez","p4ssw0rd","michael12","jobs","farfalla","odessa","chris2","kamila","soccer6","chocolate2","132456","michele1","alfonso","maxima","manman1","gloria1","island","johndeere","my3girls","fussball","qarglr123","963258","4","joyjoy","money5","12qw34er","ronaldo1","gerrard","green12","boo123","scotland1","001122","angie","loveme12","newjob","sexy21","lacrosse1","turkey1","peace123","bigfoot","sunshine12","catfish1","foxpass","1230123","5","iloveu123","474747","jean","roberto1","123qwer","6V21wbgad","2sexy4u","layouts1","fuckyou7","airplane","volume","thompson","verizon1","nightmare1","dalejr8","pothead1","attila","china1","robin1","danny123","TempPassWord","sasha123","cute","krystal1","corona1","porkchop","change1","king12","timmy","eileen","ganda","sayang1","mathieu","angel5","misiek","kokoko","melina","nopassword","regina1","mama12","milton","dawson","qwertyuiop1","dancing","shooter","singer1","Qwerty","badgirl","mymother","designer","macmac","camaro1","anubis","000007","nikolas","nancy","papa","alexandr","cheater","elizabeth2","hamlet","janjan","12345abcde","toshiba1","potter1","hooters","maiden","drjynfrnt","alex13","adgjmp","motorola1","peyton","01234567","jonjon","monkey!","makayla","tacobell1","ilovemyself","patata","marjorie","amandine","bullet1","fktrcfylhf","harvey1","elliot","sk8board","carlos123","fallen1","ashlee","behappy","emily123","bobby123","newpass","hunter123","desiree1","malaysia","tigger12","erica","Omni","ass","12345e","fuckthis1","nancy1","flames","goodgirl","manunited","qqqq","123450","eduardo1","salome","12345p","chosen1","1234567890-","112112","kakashi","blonde1","curtis1","waheguru","q","123456x","xiang123456","myspace01","theresa1","platinum1","eagle","priscilla","poppop","pedro","kendall","love45","chargers","babylove1","loving1","baby01","rolltide1","PolniyPizdec1102","attitude","newman","flamengo","diamonds1","project1","nascar88","nina","ramirez","losangeles","chronic","gladys","5150","poisson","marina1","jasmin1","kendra","socrates","dwade3","salvation","wachtwoord","cristiano","doggy","iubire","inter","spongebob2","killme","464646","hellohello","ilikepie","figaro","thomas123","paula","admin1","player69","kayleigh","moimoi","brittney1","qqqqqqq","rose123","danila","syncmaster","viper","mnbvcx","leo123","fuckfuck","lourdes","champ1","mario123","sweet123","loveya","presario","freddie1","breanna","facebook1","amerika","john12","steph","express","cartman1","1qaz!QAZ","dodge1","password14","qwedsa","linkedin123","kingdom1","loser12","heckfy","pangit","amber123","happy12","polska1","skyler","school123","fatty1","yasmine","honey123","alina","nounours","brucelee","357159","Qwerty123","cookie2","larry","digimon","insane1","tazmania","jacob123","hell666","fu7u4a#$$$","professional","wanker","321321321","fitness","963963","8888888888","wow123","mookie1","69camaro","opeyemi","Eh1K9oh335","cheetah","eeeeee","surfing1","freestyle","nokia123","m123456789","pontiac","oracle","member","pacman","tuning","converse","jerome1","qdujvyG5sxa","caleb1","xxx123","sally","poland","nguyen","11221122","shotgun","hernandez1","booty1","girls1","doberman","poppy","fuckoff!","keith1","geraldine","placebo","http","dodger","beavis","futbol","sexy10","lupita","search","castro","lovelife1","eastside","caramelo","kristi","z1x2c3v4","24681012","central","lilly","abcdef123","whocares","l12345","johannes","636363","lexmark","microsoft1","emerson","marika","sissy1","757575","tony123","dante1","playa1","vvvvvv","walker1","040404","ziggy1","bitch101","voiture","candice","201314","virginie","martine","chicco","hector1","honesty","snake1","cardinal","mylife1","2112","homer","bangladesh","pasword","church1","sailing","milagros","122002","babygirl11","sexymama","anaconda","sniper1","mexico123","planet","topolino","110092","12345f","rock123","hariom","dragon2","samsung123","musique","lollypop1","lionel","coupon","mamma","shasta","ashley2","sexy16","Aa123456","maryam","lobster","laurie","dragon13","musicman","bintang","sesame","bomber","a654321","jessica12","baseball9","abracadabra","555777","general1","scotty1","xander","1357911","20002000","Daniel","gotohell","benny1","bill","porter","boots1","nofear","gianni","stars1","delphine","18atcskD2W","1996","racecar","tacobell","love19","yfdbufnjh63","angel10","summer123","333","1q2w3e4r5t6y7u","bigboss","omg199","gonzales","oklahoma","student1","taylor12","anthony123","smooth","bigtits","whiskers","testing123","1970","vfczyz","nounou","safety","walmart1","ilovesex","123aaa","darkstar","sylvester","myfamily","alfaromeo","betty","wolf","excalibur","969696","juanita","badgirl1","myspace4","0102030405","laetitia","zxcasd","blue32","velvet","trunks","19071907","tabitha","555","queen","harrison1","trumpet","buster123","morgane","celtic1","tammy1","coolio1","password99","bright","buckeyes","car123","littleman","7uGd5HIp2J","whatthezor","marta","donna1","kitkat1","summertime","star69","abcabc","library","debora","ganesha","741258","dream","messenger","snowflake1","simone1","katelyn","amanda123","solnce","quincy","love4life","jesus2","yoyo","wrangler","katie123","carolyn","martinez1","wanted","paradise1","111112","lovers2","cintaku","c43qpul5RZ","rctybz","love25","leopard","qwe1122334","selena1","sexy22","suresh","111333","buffalo1","kim123","openup","armagedon","radio","london123","lovehurts","party1","manish","wendy1","zxcvb1","kirsten","baby14","mersedes","megadeth","okokok","gerard1","familyguy1","lizzie1","monamour","allen","trombone","prodigy","frogger","water123","vanilla1","cartoon","carrot","101112","123456781","gsxr1000","1971","beyonce1","surfer1","CM6E7Aumn9","martha1","roadrunner","satellite","landon1","123456A","piglet1","hellboy","smile4me","gunners","angel101","lee123","stoner420","happiness1","harmony1","brandon2","abcd12","eleanor","baseball8","pupsik","love88","komputer","joseluis","layout1","1truelove","electric","rambo1","carla","sundance","shaman","bigman1","aussie","godisgood1","marino","love20","demon1","freebird","beast1","fuckoff2","jazmin","pakistan123","moocow","smackdown","monaco","ihateu","matt123","shaggy1","nickjonas1","cutie12","19691969","12345654321","blah123","briana","marisol","firefox","business1","ismail","dangerous","kisskiss","ben","mandy","snakes","marcin","register","p0o9i8u7","nokian73","rachelle","bhbirf","8ix6S1fceH","shadow11","groovy","margot","isabel1","wolverine1","easy123","anakin","tangkai","squirt","thankgod","insert","thomas12","teiubesc","friday1","jennie","fredfred","trabajo","conner","4runner","garcia1","miley1","james2","ballet","ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½","brigitte","baker3","ethan","oakland1","maroon5","rootbeer","asshole123","ashish","jeanette","2525","tottenham1","lakers8","dfktynbyf","carmela","ford","packers4","iw14Fi9jxL","weezer","20012001","jose","mackenzie1","summer11","ramses","glitter","angelika","goblue","heslo","theboss","mystery","career","voyager1","sonia","bobbie","love77","sahara","kathleen1","deanna","stevie","sascha","hotrod1","ilovegod1","hummer1","sofia","lowrider","mammamia","melisa","welcome2","moscow","66666","raider1","lola","iloveher1","momof3","I","Parola12","pikachu1","imagine","gianluca","369852147","2002","snake","akatsuki","ronald1","stranger","a123456a","mattie","whatsup","white","bryant","ramesh","dogdog","giggles","aaa123123","chucky","dima","omega1","852963","billybob1","qazzaq","filippo","computer12","sparkle1","anastasiya","chandler1","rebound1","babybaby","qwerasdfzxcv","zxcv123","senha123","sunday1","alex11","wassup","qwertyuiop123","bentley1","robert123","yellow12","kicker","falcons","lorenzo1","tina","alvaro","asd12345","married","blasted1","darren1","daredevil","bingo","spanish","ernest","kIkeunyw","vectra","madness","1234qw","happyday","beagle","rainbow6","claire1","jericho","butterfly7","supernova","maman","ilovemom","morpheus","dandan","LinkedIn","miami1","rfrnec","emmanuel1","kangaroo","football23","ntktajy","neptune","accord","carol","sexsexsex","tigger123","sailormoon","metal","cooldude1","philly1","patrik","bangalore","hotboy","strike","brooks","nobody","famous","alice1","878787","guardian","soldier1","mine","cecile","becky1","freak","smart1","M","desmond","simran","me1234","gameboy","clarence","sonic","q1234567","running","alexandria","amanda12","2580","buster12","369963","derek1","joshua12","blueberry1","standard","arlene","marijuana1","omarion1","zzzzzzz","evangelion","fantasy1","amazing1","iloveyou8","crazy8","poop11","hamburg","kathy1","scania","dragonballz","trigger1","capslock","yvette","ultima","adam12","hitman1","ViPHV5J736","me","kakashka","giorgio","escape","456","sean","chargers21","cats","lalalala","dublin","qweasdzxc1","Thomas","purple7","ghost","hannibal","gameover","fuck11","clayton1","pas","suckmydick","999666","penguins","trixie1","moneymaker","shelley","sharma","oleg","lastfm","stacey1","jenny123","Million2","camera","oranges","qwerty13","ramones","courage","mateusz","junebug","9876543","cristal","******","pink11","mongoose","pyramid","carrie1","johndeere1","myangel","1999","000webhost","smith1","shirley1","mumbai","cooler","cfitymrf","wasser","mylove123","172839","estrella1","wolves1","clinton","8888888","redhot","loveu1","welcome12","caterina","randy","philly","enrico","asdfg12345","654654","ace123","juicy1","mother123","3333333333","bubba123","q2w3e4r5","dannyboy","sergio1","19701970","salope","pa","zipper","1966","michelle12","anarchy","koshka","roger1","1231234","benny","nelly1","westham1","biggie","lesbian","pooper","charger","angel14","security1","movies","sameer","13243546","kentucky","delta1","queenie","matematica","sexy1234","adgjm","125125","juanito","danger1","coldplay","lokomotiv","michael7","schalke","collin","alonso","namaste","ilovemom1","iforgot1","mommy3","babyphat1","159263","monopoly","mazda626","741963","cherry123","flash1","funny","z12345","stingray","200","katarina","bonita1","fuckyou13","1968","univers2l","patriot","014789","trinity3","nintendo64","tom","goblin","Patrick","jeffhardy1","1qazwsx","bernardo","valentine1","qweasd1","santosh","batman12","medina","1z2x3c","retard","snowboard1","blackdog","backspace1","dorian","algerie","hendrix1","bushido","asdfgh12","bitchy1","v","joe","leavemealone","marino13","lonewolf","flyers","aubrey","swimmer","sakura1","moneyman1","mickeymouse","cristo","sooners","jesusis1","myspace08","momma1","2fast4u","donnie","jimbob","baby1234","01230123","cucciolo","umbrella","louis","6666666666","denver1","diego1","123456o","20202020","tracey","goodbye","686868","abc123abc","god123","12qw12qw","killer7","katelyn1","110","rodney1","megaman1","anthony12","knight1","575757","fletcher","bitch13","hellothere","soccer18","yellow123","lol12345","love06","angelo1","kickass1","trance","iloveu!","king23","hello5","margaret1","christy1","guigui","nonono","fuckyou666","hello11","122112","summer69","vfhufhbnf","741741","joker123","goldberg","kristian","angel22","bball23","love99","ana123","donovan","morales","magic123","858585","zxcvbnm","22446688","paladin","brutus1","brown","vitoria","kendra1","belle","515151","buffy","2001","rupert","barsik","wutang","jordan11","software","madina","woodstock","dalton1","my3boys","bigmac","dondon","mattia","punisher","rosie","sisters","000123","11","hayley1","cheese12","playboy69","none","waters","987321","trucker","football13","poodle","dan123","jimmy123","gilbert1","godzilla1","baby08","bubbles2","angelique","antony","baseball4","callie1","147963","machine","lilmama","adam123","shawn","manisha","girl","mountain1","1997","tractor","fortune","houston713","windows7","primavera","madden","piggy1","snuggles1","reebok","kieran","eugene1","sonny1","godfather1","babatunde","gorilla","lahore","together","buddy2","gratis","goldie1","myname1","bastard1","briana1","holahola","jeffhardy","integra","mechanical","qwert1234","postal","basket1","hot","server","benito","redalert","bugsbunny","gretchen","dragonfly1","","button","jesuschris","december12","princess5","polopolo","maldita","june12","12345w","money$","ferret","1a2a3a","wildcat1","hanna","honeyko","daphne","money23","bayern","wendy","hollister","smitty","romano","dookie","duke","hussain","tiger2","michelle2","busted","kendall1","qwaszx12","michael3","maryann","baby23","family123","everest","roger","alucard","candy12","bears1","letmein123","iloveyou10","pudding","bearbear","sandiego1","123456789n","babygirl01","papito","benoit","blaster","sparrow","10203","19711971","mathias","dont4get","prakash","kamasutra","vegeta1","estelle","nana123","535353","catarina","booboo2","616161","monty1","tootsie1","Megaparol","beach1","katrin","holden1","trucks","help","2010","legend1","jared1","852852","bitchass1","anna123","404040","anime1","hondacivic","sponge","better","wizard1","cardinals1","sexybeast1","guillermo","pokemon2","cheesecake","television","love00","spirit1","blue23","poker1","summer10","noodles1","414141","as790433","devon1","english1","elaine1","spartan1","ben123","123456789g","prelude","fabulous","andres1","reading","nikolay","beckham7","hurricane","peekaboo","tyrone1","#1bitch","pussycat1","studio","spooky1","positive","20022002","britt1","memphis1","manager1","mon","estrela","alaska1","skylar","baseball22","contact","beethoven","maximilian","kristy","arthur1","grizzly","lancelot","chanel1","loved1","loveya1","popo","francisco1","sunny123","scorpion1","taytay","coolcat","shadow01","hihihi1","cody","audrey1","santiago1","devil1","dimitri","1football","turner","hunter01","taylor123","cheer","babyface1","always1","coolguy","alpine","lena","innocent","joyce","tkfkdgo","kosmos","muslim","goddess1","infiniti","soccer09","fatass","fytxrf","jewels","norman1","lawrence1","1q1q1q1q","allah786","silence","74108520","original","monkey01","joaquin","ravens","aqwzsx","chickens","blades","pedro1","mamour","pink13","packard","nathaniel1","balls","supergirl","meowmeow","Alexander","jesussaves","hayabusa","chicken123","connie1","sandy123","112233a","medion","gerardo","domino1","yellow2","woaini1314","colton","ybrjkfq","babygirl14","hotmama1","anjing","carlo","chelsea123","cleveland","love55","eleven","pallmall","hawkeye","767676","frances1","werder","edison","cha","center","7753191","q11111","hotshot","flower12","2008","tattoo1","tanya","dragon11","marco1","comfort","higgins","yfnfkmz","passpass","trooper1","666666a","longhorn","beach","chloe123","softball12","dragoon","poonam","my4kids","giorgia","incorrect","leandro","kontol","trebor","morning21","warlock","joanna1","email","gunit1","chipper1","oakland","kosama","tarheels1","matthew2","team","demon666","grapes","temp123","128500","mariano","dillon1","dragon69","shutup1","arianna1","myspace10","goofy1","lemons","orange123","qqqqq","j123456789","fabiola","striker","krista","terry","2007","noname","dmitriy","director","unique1","sanchez1","puppy123","faithful1","destroy","youyou","money3","crimson","eatshit","annette1","jacques","mariposa1","gamecube","jersey1","ilove69","moneyman","lesbian1","mexico12","gegcbr","cocoa1","dirtbike","gatito","juancarlos","santana1","marcia","network1","braves1","chuck1","Jundian2011xr","eureka","fucking1","milana","dell123","sylvie","stormy1","chemical","minime","pencil1","kawasaki1","demon","fatcat1","puertorico","jones","123456i","92k2cizCdP","daniil","dharma","mihail","2006","paradox","mazdarx7","weasel","1234zxcv","thirteen13","mishka","french","fuckyou22","fallout","howard1","dad123","meredith","Abcd1234","nyq28Giz1Z","grandpa1","printer","cancer1","redbull1","angelbaby1","ab1234","anything1","cavalier","hentai","paramore1","123456789e","145236","triumph","lulu","noelle","william2","iloveme123","starbucks","pimp13","rdfhnbhf","monkey10","sunshine7","jesus01","luciana","david12","elefante","class09","fatman","purple11","taylor2","lovergirl1","love2010","matthias","1967","mama1234","summer01","smiles1","brendan1","159753456","qqqq1111","iamnumber1","sassy123","haters1","222","apple2","jasmine2","pepper12","e12345","mckenzie","lala12","qaz","portland","mahesh","khalid","0987654","kentucky1","longhorns","vb","knights","boss","justin2","321","loveyou123","susan","prasad","1998","revenge","whiskey1","soccer101","showtime","holla1","gatita","joshua123","e","mankind","123456789abc","1fuckyou","456987","stoner1","hope","kimkim","sevilla","yfcntymrf","kjkszpj","cristina1","babyboo","yamahar6","boobs1","pepsi123","456456456","lebron","impala","dream1","doodle1","hejsan","zouzou","onlyme","maymay","felicidad","333444","jones1","lol1234","lovegod","auburn","riley","kipper","kittykat1","srinivas","azamat","angel21","zaqxswcde","marvel","purple13","tom123"]
     
}


function togPwdMask() {
	var oPwd = $("passwordPwd");
	var oTxt = $("passwordTxt");
	var oMask = $("mask");
	if (oMask.checked) { 
		oPwd.value = oTxt.value;
		oPwd.className = ""; 
		oTxt.className = "hide"; 
	} 
	else { 
		oTxt.value = oPwd.value;
		oPwd.className = "hide"; 
		oTxt.className = "";
	}
}

function initPwdChk(restart) {
	/* Reset all form values to their default */
	//var arrZeros = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol","nMidChar","nRequirements","nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol","nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus","nRequirementsBonus","nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus","nSeqAlphaBonus","nSeqNumberBonus","nSeqSymbolBonus"];
	var arrPassPars = ["nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus","nSeqAlphaBonus","nSeqNumberBonus","nSeqSymbolBonus"];
	var arrPassDivs = ["div_nAlphasOnly","div_nNumbersOnly","div_nRepChar","div_nConsecAlphaUC","div_nConsecAlphaLC","div_nConsecNumber","div_nSeqAlpha","div_nSeqNumber","div_nSeqSymbol"];
	var arrFailPars = ["nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus","nRequirementsBonus"];
	var arrFailDivs = ["div_nLength","div_nAlphaUC","div_nAlphaLC","div_nNumber","div_nSymbol","div_nMidChar","div_nRequirements"];
	var arrZeros = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
    for (var i in arrZeros) { $(arrZeros[i]).innerHTML = "0"; }
	//for (var i in arrPassPars) { $(arrPassPars[i]).parentNode.className = "pass"; }
	//for (var i in arrPassDivs) { $(arrPassDivs[i]).className = "pass"; }
	//for (var i in arrFailPars) { $(arrFailPars[i]).parentNode.className = "fail"; }
	//for (var i in arrFailDivs) { $(arrFailDivs[i]).className = "fail"; }
    
	$("passwordPwd").value = "";
	$("passwordTxt").value = "";
	$("scorebar").style.backgroundPosition = "0";
	if (restart) {
		$("passwordPwd").className = "";
		$("passwordTxt").className = "hide";
		$("mask").checked = true;
        
	}
    
}

addLoadEvent(function() { initPwdChk(1); });



