const base_url="http://localhost:3001";

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
    let userName=document.getElementById("username").value ;
    let passWord=document.getElementById("password").value ;
    //document.getElementById("login_info").innerHTML="tunnus : "+userName;
    document.getElementById("username").value="";
    document.getElementById("password").value="";

    let postData =
        '{"username": "' + userName + '", "password": "' + passWord + '" }';

    let url = base_url+"/login";
    let xmlLogin = new XMLHttpRequest();
    xmlLogin.onreadystatechange = function () {
        if (xmlLogin.readyState == 4 && xmlLogin.status == 200) {
            console.log(this.response);
            window.localStorage.setItem('myToken', this.response);
            //lenght of false =5
            if (window.localStorage.getItem('myToken').length == 5) {
                document.getElementById('login_info').innerHTML = "Tunnus ja salasana ei täsmää";
            }
            else {
                document.getElementById('login_info').innerHTML =userName;
                document.getElementById("login").hidden=true;
                document.getElementById("logout").hidden=false;
                window.localStorage.setItem('username',userName);

            }
        }
        else {
            document.getElementById('login_info').innerHTML = "Something went wrong";
        }
    };
    xmlLogin.open('POST', url, true);
    xmlLogin.setRequestHeader("Content-Type", "application/json");
    xmlLogin.send(postData);

}

function logout(){
    document.getElementById("login").hidden=false;
    document.getElementById("login_info").innerHTML="Kirjauduit ulos";
    document.getElementById("logout").hidden=true;
    window.localStorage.clear();
    loadDoc('page1.html');
}

function showBorrows(){
    if (!window.localStorage.getItem('myToken')) {
        document.getElementById("myBorrowsDiv").innerHTML="Et ole kirjautunut, et voi katsella tietoja";
    }
    else {
    let userName=window.localStorage.getItem('username');
    //console.log("username="+userName);
    let token=window.localStorage.getItem('myToken');
    let url=base_url+"/user/myborrows/"+userName;
    let xmlBorrows=new XMLHttpRequest();
    xmlBorrows.open("GET",url);
    xmlBorrows.setRequestHeader('Authorization',"Bearer "+token);
    xmlBorrows.send();
    xmlBorrows.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            //console.log(this.response);
            let borrows = JSON.parse(this.response);
            console.log(borrows);
            let borrowData='<ul>';
            borrows.map(row=>{
                borrowData+='<li key='+row.id_borrows+'>'+row.name+", "+row.author+", "+row.date+'</li>';
            });
            borrowData+='</ul>';
            document.getElementById("myBorrowsDiv").innerHTML=borrowData;
        }
        else {
            //console.log("no data");
        }
    }
    }
}