let seconds=0;
let timerInt;
// LOGIN
function login(){
  let u=document.getElementById("username").value;
  let p=document.getElementById("password").value;

  if(u && p){
    localStorage.setItem("user",u);
    window.location="generator.html";
  }else{
    document.getElementById("msg").innerText="Enter details!";
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("user");
  window.location="login.html";
}

// CHECK LOGIN
if(window.location.pathname.includes("generator.html")){
  if(!localStorage.getItem("user")){
    window.location="login.html";
  }
}
function loadQuote(){

 let quotes=[

 "Success comes from consistency.",

 "Study today, shine tomorrow.",

 "Small progress is still progress.",

 "Never stop learning.",

 "Knowledge is power."

 ];

 let q=
 quotes[
 Math.floor(
 Math.random()*quotes.length
 )
 ];

 let e=
 document.getElementById(
 "quote"
 );

 if(e)
 e.innerText=q;
}
// VOICE INPUT
function startVoice(){
  let rec=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
  rec.onresult=e=>{
    document.getElementById("inputText").value=e.results[0][0].transcript;
  };
  rec.start();
}
function startTimer(){

 timerInt=setInterval(()=>{

   seconds++;

   let h=Math.floor(seconds/3600);

   let m=Math.floor(
   (seconds%3600)/60);

   let s=seconds%60;

   document.getElementById("timer")
   .innerText=
   `${h}:${m}:${s}`;

 },1000);

}

function stopTimer(){

 clearInterval(timerInt);

 let hrs=
 (seconds/3600).toFixed(2);

 localStorage.setItem(
 "hours",
 hrs
 );

 let e=
 document.getElementById(
 "studyHours"
 );

 if(e)
 e.innerText=
 hrs+" hrs";
}
// ANALYSIS
function analyzeText(t){
  let w=t.split(" ").length;
  document.getElementById("wordCount").innerText="Words: "+w;
  document.getElementById("readTime").innerText="Time: "+Math.ceil(w/200)+" min";
  document.getElementById("difficulty").innerText=
    w<100?"Easy":w<200?"Medium":"Hard";
}

// AI
 function fakeAI(t){

 let words=t.split(" ");

 let summary=
 words.slice(
 0,
 Math.ceil(words.length/4)
 ).join(" ");

 let lines=t.split(".");

 return {

  summary:summary,

  points:lines.slice(0,5),

  quiz:[

   "What is the main concept discussed in the text?",

   "List two important points from the content.",

   "Explain the purpose of this topic.",

   "What are the advantages mentioned?",

   "How can this concept be applied?"

  ]

 };

}

// GENERATE
function generateNotes(){
  let t=document.getElementById("inputText").value;
  if(!t) return alert("Enter text");

  analyzeText(t);
  let words=t.split(" ").length;

let analytics=
document.getElementById(
"totalWords"
);

if(analytics){

 analytics.innerText=
 words+" Words Processed";

}
  let d=fakeAI(t);

  document.getElementById("summary").innerText=d.summary;

  let p=document.getElementById("points");
  p.innerHTML="";
  d.points.forEach(x=>{
    let li=document.createElement("li");
    li.innerText=x;
    p.appendChild(li);
  });

  let q=document.getElementById("quiz");
  q.innerHTML="";
  d.quiz.forEach(x=>{
    let li=document.createElement("li");
    li.innerText=x;
    q.appendChild(li);
  });

  generateMindmap(d.points);
}

// MINDMAP
function generateMindmap(p){
  let m=document.getElementById("mindmap");
  m.innerHTML="";
  p.forEach(x=>{
    let d=document.createElement("div");
    d.className="node";
    d.innerText=x;
    m.appendChild(d);
  });
}
function downloadNotes(){

 let text=
 document.getElementById(
 "summary"
 ).innerText;

 let blob=
 new Blob(
 [text],
 {type:"text/plain"}
 );

 let a=
 document.createElement("a");

 a.href=
 URL.createObjectURL(blob);

 a.download=
 "AI_Notes.txt";

 a.click();

}
async function downloadPDF(){

 const { jsPDF } = window.jspdf;

 const doc =
 new jsPDF();

 let summary=
 document.getElementById(
 "summary"
 ).innerText;

 doc.text(
 summary,
 10,
 20
 );

 doc.save(
 "AI_Notes.pdf"
 );

}
// SAVE NOTES
function saveNotes(){
  let s=document.getElementById("summary").innerText;
  let arr=JSON.parse(localStorage.getItem("notes")||"[]");
  arr.push(s);let badge=
document.getElementById(
"badge"
);

if(badge){

 if(arr.length>=5)
 badge.innerText=
 "🥈 Consistent Learner";

 if(arr.length>=10)
 badge.innerText=
 "🥇 Study Master";
}

let total=
document.getElementById(
"totalNotes"
);

if(total)
total.innerText=
arr.length;

let rank=
document.getElementById(
"rank"
);

if(rank){

 if(arr.length>=5)
 rank.innerText=
 "🥈 Intermediate";

 if(arr.length>=10)
 rank.innerText=
 "🥇 Advanced";

 if(arr.length>=20)
 rank.innerText=
 "🏆 Expert";

}
let progress=
Math.min(
arr.length*10,
100
);

let bar=
document.getElementById(
"progressBar"
);

if(bar)
bar.value=progress;
let txt =
document.getElementById(
"progressText"
);

if(txt){

txt.innerText =
progress + "%";

}

  localStorage.setItem("notes",JSON.stringify(arr));
  loadSaved();
  updateParent();
  updateInstitution();
}

// LOAD SAVED
function loadSaved(){
  let arr=JSON.parse(localStorage.getItem("notes")||"[]");
  let ul=document.getElementById("saved");
  if(!ul) return;
  ul.innerHTML="";
  arr.forEach(x=>{
    let li=document.createElement("li");
    li.innerText=x;
    ul.appendChild(li);
  });
}
function saveGoal(){

 let goal=
 document.getElementById(
 "goalHours"
 ).value;

 localStorage.setItem(
 "goal",
 goal
 );

 document.getElementById(
 "goalStatus"
 ).innerText=
 "Goal: "+goal+" Hours";
}
function addTask(){

 let task=
 document.getElementById(
 "taskInput"
 ).value;

 if(!task) return;

 let arr=
 JSON.parse(
 localStorage.getItem("tasks")
 || "[]"
 );

 arr.push(task);

 localStorage.setItem(
 "tasks",
 JSON.stringify(arr)
 );

 loadTasks();
}

  function loadTasks(){

 let arr=
 JSON.parse(
 localStorage.getItem("tasks")
 || "[]"
 );

 let ul=
 document.getElementById(
 "tasks"
 );

 if(!ul) return;

 ul.innerHTML="";

 arr.forEach(t=>{

   let li=
   document.createElement("li");

   li.innerText=t;

   ul.appendChild(li);

 });

}

function updateStreak(){

 let today = new Date().toDateString();

 let last = localStorage.getItem("lastDay");

 let streak = parseInt(
   localStorage.getItem("streak") || 0
 );

 if(last !== today){

   streak++;

   localStorage.setItem("streak", streak);

   localStorage.setItem("lastDay", today);

 }

 let e1 = document.getElementById("streak");
let e2 = document.getElementById("studyStreak");

if(e1){
   e1.innerText = streak + " Days";
}

if(e2){
   e2.innerText = streak + " Days";
}

}
 function showSection(id){

 document
 .querySelectorAll(
 '#summarySection,#quizSection,#mindmapSection,#analyticsSection'
 )
 .forEach(sec=>{

  sec.style.display='none';

 });

 document
 .getElementById(id)
 .style.display='block';

}

function askAI(){

 let q=
 document.getElementById(
 "chatInput"
 ).value.toLowerCase();

 let reply=
 "I am analyzing your question.";

 if(q.includes("summary")){

  reply=
  "Summary gives the key ideas from content.";

 }

 else if(q.includes("quiz")){

  reply=
  "Quiz helps test your understanding.";

 }

 else if(q.includes("mindmap")){

  reply=
  "Mind maps visually organize concepts.";

 }

 document.getElementById(
 "chatReply"
 ).innerText=
 reply;

}
let chartInstance;

function loadChart(){

 let ctx=
 document.getElementById(
 "progressChart"
 );

 if(!ctx) return;

 if(chartInstance){

  chartInstance.destroy();

 }

 chartInstance=
 new Chart(ctx,{

 type:'bar',

 data:{

 labels:[
 'Mon',
 'Tue',
 'Wed',
 'Thu',
 'Fri',
 'Sat',
 'Sun'
 ],

 datasets:[{

 label:
 'Study Activity',

 data:[
 2,4,3,5,6,4,7
 ]

 }]

 }

 });

}
 async function uploadPDF(){

const file =
document.getElementById(
"pdfFile"
).files[0];

if(!file){

alert("Please select a PDF");

return;

}

const reader =
new FileReader();

reader.onload =
async function(){

const typedArray =
new Uint8Array(
this.result
);

const pdf =
await pdfjsLib
.getDocument({
data:typedArray
}).promise;

let text = "";

for(
let i=1;
i<=pdf.numPages;
i++
){

const page =
await pdf.getPage(i);

const content =
await page
.getTextContent();

const strings =
content.items
.map(
item=>item.str
);

text +=
strings.join(" ")
+" ";

}

document
.getElementById(
"inputText"
)
.value = text;

generateNotes();

};

reader.readAsArrayBuffer(
file
);

}
document.addEventListener(
"visibilitychange",
function(){

if(document.hidden){

alert(
"⚠ Stay Focused!"
);

}

});
function updateParent(){

let p =
document.getElementById(
"parentProgress"
);

let s =
document.getElementById(
"parentScore"
);

if(!p || !s)
return;

let progress =
document.getElementById(
"progressBar"
).value;

p.innerText =
"Progress : "
+
progress
+
"%";

s.innerText =
"Saved Notes : "
+
JSON.parse(
localStorage.getItem("notes")
||
"[]"
).length;

}
function updateInstitution(){

let p =
document.getElementById(
"instProgress"
);

let s =
document.getElementById(
"instScore"
);

if(!p || !s)
return;

let progress =
document.getElementById(
"progressBar"
).value;

p.innerText =
"Overall Progress : "
+
progress
+
"%";

s.innerText =
"Total Notes : "
+
JSON.parse(
localStorage.getItem("notes")
||
"[]"
).length;

}
 window.onload=function(){

 loadSaved();

 loadTasks();

 updateStreak();

 loadQuote();

 loadChart();

 updateParent();

 updateInstitution();

 let hrs =
 localStorage.getItem("hours");

 let e =
 document.getElementById(
 "studyHours"
 );

 if(hrs && e){

  e.innerText =
  hrs + " hrs";

 }

}