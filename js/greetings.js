const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(e){
    // form submit 시 새로고침이 기본이다. => preventDefault 로 기본 동작을 막는다
    e.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreetings(username);
}

// 이벤트 리스너의 함수에  ()를 넣지 않는 이유. 즉시 실행되지 않고 이벤트 일어날때 실행됨.
// () 를 추가한다는 것은 즉시 실행한다는 의미.
loginForm.addEventListener("submit", onLoginSubmit);

function paintGreetings(username){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${username}`;
}
// localStorage 이용하여 세션 저장
const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else{
    paintGreetings(savedUsername);
}