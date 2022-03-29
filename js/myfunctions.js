function loadDoc(page) {
    console.log(page);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("content").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
  }
  
  window.onload=function loadFirst() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("content").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "page1.html", true);
    xhttp.send();
  }

  function saveData() {
      //console.log("Buttonia klikattu");
      let fname=document.getElementById("fn").value ;
      let lname=document.getElementById("ln").value ;
      console.log(fname+" "+lname);
      document.getElementById("infoDiv").innerHTML="Terve "+fname+" "+lname;
  }

  function showData(){
      let word=document.getElementById("wordTest").value ;
      document.getElementById("infoSpan").innerHTML=word;
  }

  function showLanguage(){
	let select=document.getElementById("source_language");
	console.log(select);
	let source_language=select.value;
	console.log(source_language);
	let target_language=document.getElementById("target_language");
	target_language.value=source_language;
}

function showPhone(phone){
	console.log(phone);
	//let target_phone=document.getElementById("target_phone");
	//target_phone.value=phone;
    document.getElementById("target_phone").value=phone;
}

function login(){
    let username=document.getElementById("username").value ;
    let password=document.getElementById("password").value ;
    document.getElementById("login_info").innerHTML="tunnus : "+username;
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("login").hidden=true;
    document.getElementById("logout").hidden=false;
}

function logout(){
    document.getElementById("login").hidden=false;
    document.getElementById("login_info").innerHTML="Kirjauduit ulos";
    document.getElementById("logout").hidden=true;
}