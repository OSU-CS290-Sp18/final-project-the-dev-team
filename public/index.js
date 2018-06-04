$('.dropdown-toggle').dropdown();

function uploadForm(){
  var username = submitForm['name'].value;
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

  var request = new XMLHttpRequest();
  var requestURL = '/callofduty/wwii/submit';
  request.open('POST',requestURL);
  var userObj = {
    username:username,
    platform:platform,
    title:'wwii',
    days:1,
    type:'core',
    time:'monthly',
    mode:'career'
  };
  console.log("this is",userObj);
  var requestBody = JSON.stringify(userObj);
  request.setRequestHeader(
    'Content-Type','application/json'
  );
  request.addEventListener('load',function(event){
    if(event.target.status!=200){
      alert("form submit failure");
    }
    else{

    }
  });

  request.send(requestBody);
}

var submitButton = document.getElementById('submit-button');
var submitForm = document.forms[0];
console.log(submitForm);
submitButton.addEventListener('click',uploadForm);
