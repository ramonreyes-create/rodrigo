function effectiveConfig(){
  const stored=JSON.parse(localStorage.getItem("dqTeacherConfig")||"{}");
  return Object.assign({}, window.DQ_CONFIG||{}, stored);
}
function buildConfigCode(){
  const c=effectiveConfig();
  return `// DeutschQuest DSD II 6.1
window.DQ_CONFIG = {
  schoolName: ${JSON.stringify(c.schoolName || "DeutschQuest DSD II")},
  sheetUrl: ${JSON.stringify(c.sheetUrl || "")},
  courses: ${JSON.stringify(c.courses || ["DSD II"])},
  passPercent: ${Number(c.passPercent || 80)}
};`;
}
function updateConfigBox(){
  const box=document.getElementById("configCode");
  if(box) box.value=buildConfigCode();
}
function loadTeacherConfig(){
  const c=effectiveConfig();
  document.getElementById("sheetUrl").value=c.sheetUrl||"";
  document.getElementById("schoolName").value=c.schoolName||"DeutschQuest DSD II";
  document.getElementById("courses").value=(c.courses||[]).join(", ");
  updateConfigBox();
}
function saveTeacherConfig(){
  const cfg={
    sheetUrl:document.getElementById("sheetUrl").value.trim(),
    schoolName:document.getElementById("schoolName").value.trim()||"DeutschQuest DSD II",
    courses:document.getElementById("courses").value.split(",").map(x=>x.trim()).filter(Boolean),
    passPercent:80
  };
  localStorage.setItem("dqTeacherConfig",JSON.stringify(cfg));
  const st=document.getElementById("status");
  st.textContent="Konfiguration lokal gespeichert. Für GitHub Pages bitte den Code in js/config.js kopieren.";
  st.className="small saveOk";
  updateConfigBox();
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
async function copyConfig(){
  const text=document.getElementById("configCode").value;
  try{
    await navigator.clipboard.writeText(text);
    const st=document.getElementById("status");
    st.textContent="Config-Code kopiert.";
    st.className="small saveOk";
  }catch(e){
    const st=document.getElementById("status");
    st.textContent="Kopieren nicht möglich. Bitte manuell markieren und kopieren.";
    st.className="small saveBad";
  }
}
loadTeacherConfig();