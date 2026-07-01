function effectiveConfig(){
  const stored=JSON.parse(localStorage.getItem("dqTeacherConfig")||"{}");
  return Object.assign({}, window.DQ_CONFIG||{}, stored);
}
function loadTeacherConfig(){
  const c=effectiveConfig();
  document.getElementById("sheetUrl").value=c.sheetUrl||"";
  document.getElementById("schoolName").value=c.schoolName||"DeutschQuest DSD II";
  document.getElementById("courses").value=(c.courses||[]).join(", ");
}
function saveTeacherConfig(){
  const cfg={
    sheetUrl:document.getElementById("sheetUrl").value.trim(),
    schoolName:document.getElementById("schoolName").value.trim()||"DeutschQuest DSD II",
    courses:document.getElementById("courses").value.split(",").map(x=>x.trim()).filter(Boolean)
  };
  localStorage.setItem("dqTeacherConfig",JSON.stringify(cfg));
  const st=document.getElementById("status");
  st.textContent="Konfiguration gespeichert.";
  st.className="small saveOk";
}
async function testConnection(){
  saveTeacherConfig();
  const c=effectiveConfig();
  const st=document.getElementById("status");
  if(!c.sheetUrl){st.textContent="Bitte zuerst eine Web-App-URL eintragen.";st.className="small saveBad";return;}
  try{
    await fetch(c.sheetUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({timestamp:new Date().toISOString(),name:"TEST",course:"TEST",theme:"TEST",mode:"Verbindungstest",correct:1,total:1,percent:100,timeSeconds:0,errors:"",userAgent:navigator.userAgent})});
    st.textContent="Test gesendet. Prüfe dein Google Sheet.";
    st.className="small saveOk";
  }catch(e){
    st.textContent="Test fehlgeschlagen.";
    st.className="small saveBad";
  }
}
loadTeacherConfig();