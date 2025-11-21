document.querySelector('#categories').addEventListener('click', function(e) {
    console.log('Event Target:', e);
    if(e.target && e.target.nodeName === "LI") {
        console.log(`e.target is: ${e.target}`);
        console.log(`e.target.nodeName is: ${e.target.nodeName}`);
        console.log("List item ", e.target.id, " was clicked!");
        const childClicked =document.querySelector(`#${e.target.id}`)
        childClicked.style.backgroundColor = 'yellow';
        childClicked.innerHTML=`Clicked item is ${e.target.id}`;
    }
});


let user ={
  name:"shubhanshu",
  address: {
    city: "bengalore",
    area: "Thuraballi"
  },
  campany:{
    name: "techpearl",
    address:{
      city: "bengalore",
      area: "HMT-5"
    }
  }
}

const getData=()=>{
//   const input = document.querySelector('#input').value;
  console.log("Fetching data...")
}
// console.log(solve(user,"user"))
const myDebounce=(fn,delay)=>{
  let timer;
  return function(){
    let context=this;
    let args=arguments;
    clearTimeout(timer);
    timer=setTimeout(()=>{
      fn.apply(context,args)
    },delay)
    }   
}

const betterFunction=myDebounce(getData,500);

const myThrottle=(fn,delay)=>{
  let flag=true;
  return function(){
    let context=this;
    let args=arguments;
    if(flag)
    {
        fn.apply(context,args)
        flag=false;
        setTimeout(()=>{
            flag=true;  
        },delay)
    }
  }
}
const refreshData=()=>{
  console.log("Refreshing  data...")
}
const betterRefresh=myThrottle(refreshData,2000);   

Function.prototype.mybind = function(...arg){
    return (...args2)=> this.call( ...arg,...args2);
    
}

Function.prototype.myBind = function(...arg){
    let fn = this;
    return function(...args2){
        fn.apply(arg[0],[...arg.slice(1), ...args2]);
    }
}

const printName=function(){
    console.log(this.name);
}
let obj =printName.myBind(user);
obj()

const myNewFxn=()=>{
    let y = 10;
    const innerFxn=()=>{
       return  ()=>{
            console.log(y);
       }
       
    }
    return innerFxn;
}
// innerFxn()
const abc = myNewFxn();
const def = abc();
def();

// console.log(mutation(['hello', 'hey']))

// const myDivTag = document.createElement('div');
// const node = document.createTextNode("This is new Parent.");
// myDivTag.appendChild(node);

// document.querySelector("#ShubhNode").addEventListener('click', (e)=>{
//   e.stopPropoation()
//   console.log("Parent")
// },false)
// x=20
let x
x=30

const res ={}
  
const helper=(obj)=>{
  
  console.log(obj.prototype)
}
function solve(obj,par=""){

  for(const key in obj){

    
    if(typeof obj[key] === 'object' && obj[key]!=null){
      solve(obj[key], `${par}_${key}`)
    }
    else res[`${par}_${key}`] =obj[key]
  }
}
// console.log(solve(user,"user"));

// console.log(res)

// const GIT_HUB_API ="https://api.github.com/users/Shubhanshu-ism"
// const userData = fetch(GIT_HUB_API)
// console.log(userData)
// const data = userData.then((res)=>res.json())
// console.log()
// // .then((res)=>res.json())

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const handleResize = throttle(() => {
  // Update element positions
  console.log('Window resized at', new Date().toLocaleTimeString());
}, 2000);

// Simulate rapid calls to handleResize every 100ms
let intervalId = setInterval(() => {
  handleResize();
}, 100);
// 'Window resized' is outputted only every 2 seconds due to throttling
