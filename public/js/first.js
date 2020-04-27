var x=document.cookie;
console.log(x);
function getUser(){
    var x=getCookie();
    const Http = new XMLHttpRequest();
    const url='//localhost:3000/users/me';
    Http.open("GET", url);
    Http.setRequestHeader(x[0],x[1]);
    Http.send();
    Http.onreadystatechange =function() {
         console.log(Http.responseText);
    // if(Http.readystate==4 && Http.status==200)
    // {
    //    console.log(Http.responseText);
    // }
    console.log(Http.status);
}}

var getCookie=()=>{
    var cookiesArray=document.cookie.split("; ");
    for(var i=0;i<cookiesArray.length;i++)
    {
        var namevalueArray=cookiesArray[i].split("=");
        if(namevalueArray[0]=="Authorization")
        {
            return namevalueArray;
        }
    }
}