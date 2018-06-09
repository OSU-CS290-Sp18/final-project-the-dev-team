

function uploadForm(){
       var tag = submitForm['name'].value;
       var platform;
       if(submitForm['platform-psn'].checked){
         platform = submitForm['platform-psn'].value;
       }
       else if(submitForm['platform-xbl'].checked){
         platform = submitForm['platform-xbl'].value;
       }
       else{
         platform = submitForm['platform-steam'].value;
       }
       var userObj = {
              platform: platform,
              tag:      tag
       }
       var requestBody = JSON.stringify(userObj);
       request.setRequestHeader('Content-Type','application/json');
       request.send(requestBody);


}





var submitButton = document.getElementById('submit-button');
var submitForm = document.forms[0];
submitButton.addEventListener('click',uploadForm);

//var testButton = document.getElementById('test-button');
//testButton.addEventListener('click',postTest);
