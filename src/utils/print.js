const request=require('request');

const printFile=(name)=>{

    console.log(name);
    
    var printURL= `localhost:3000/show?name=${name}`    

    var headers = {
        'Content-Type': 'application/json'
    };
    
    var dataString = {
                    "printerId": 69411433,
                    "title": "My Test PrintJob",
                    "contentType": "pdf_uri",
                    "content": printURL,
                    "source": "api documentation!",
                    "expireAfter": 600,
                    "options": {"copies":2,"pages":"1,3,5","duplex":"long-edge","paper":"A4","bin":"Tray 1"},
                    "authentication": {"type":"BasicAuth","credentials":{"user":"username","pass":"password"}}
            };
    
    var options = {
        url: 'https://api.printnode.com/printjobs',
        method: 'POST',
        headers: headers,
        body: dataString,
        json:true,
        auth: {
            'user': 'rExaAw5k2KApoOmHgEU7WFAFRsM6imxtI5jDXfEZx8g',
            'pass': ''
        }
    };
    
    function callback(error, response, body) {
        console.log(response.statusCode);
        
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    
    request(options, callback);
    

}
module.exports=printFile
