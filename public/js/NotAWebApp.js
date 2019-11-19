/*
//Add new user
function signupUser() {
    document.getElementById('signup-form').action = '/signup';
    document.getElementById('signup-form').submit();
}

//Login user
function loginUser() {
  // attempt to establish input rules here rather than index.js
  // document.getElementById('msg').innerHTML

  // document.getElementById('loginForm')[0].value
  // document.getElementById('loginForm')[1].value
  if (document.getElementById('loginForm')[0].value == "" || document.getElementById('loginForm')[1].value == "") {
    document.getElementById('msg').innerHTML = "Please enter a username and password"
  }
  
  document.getElementById('login-form').action = '/login';
  document.getElementById('login-form').submit();
}
*/
function useMaps() {
  // just a test that the google earth engine APi is in use
  //document.getElementById
  document.getElementById('mapSubmit').action = '/randMap';
  document.getElementById('mapSubmit').submit();
  
}