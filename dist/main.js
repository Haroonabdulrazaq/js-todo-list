(()=>{const t=(t,e)=>{e.forEach((e=>{t.appendChild(e)}))},e=(t,e)=>{const n=document.createElement(t);return n.innerHTML=e,n},n=t=>{const e=document.createElement("div");return e.setAttribute("class",t),e},r=(t,e="")=>{const n=document.createElement(t);return""!=e&&n.setAttribute("class",e),n},i=(t,e="",n="",r="",i=!1,s="default")=>({title:t,description:e,dueDate:n,priority:r,completed:i,project:"default"}),s=t=>({title:t,tasks:[]}),a=[],o=document.querySelector(".project-list"),d=i=>{const s=n("project"),d=a.indexOf(i);s.setAttribute("p-index",d);const c=e("h3",i.title),l=r("button","del-project");l.innerHTML="Delete Project";const u=r("button","edit-project");u.innerHTML="Edit Project";const p=r("input","edit-input");p.classList.add("hide");const k=r("ul","task-list"),m=document.createElement("div"),g=document.createElement("form");let h=document.createElement("input");h.setAttribute("type","text");let b=r("input","task-submit");b.setAttribute("type","submit"),b.setAttribute("value","Add Task"),t(g,[h,b]),t(m,[k,g]),t(s,[c,p,u,l,m]),o.appendChild(s),i.tasks.forEach((s=>{const a=r("li","task-item"),o=n("task-div"),d=r("input","task-checkbox");d.setAttribute("type","checkbox");const c=i.tasks.indexOf(s);o.setAttribute("t-index",c);const l=e("p",s.title),u=r("button","task-del");u.innerHTML="Delete Task",t(o,[d,l,u]),a.appendChild(o),k.appendChild(a)}))},c=()=>{document.querySelector(".project-list").innerHTML="",a.forEach(d)},l=document.querySelector(".add-project"),u=document.querySelector(".new-project-form");l.addEventListener("click",(()=>{u.classList.toggle("hide")})),document.querySelector(".create-project-btn").addEventListener("click",(t=>{const e=document.querySelector(".new-project-name").value;if(e.length>0){let t=s(e);a.push(t),c()}})),document.querySelector("main").addEventListener("click",(function(t){const e=(t,e)=>t.target&&t.target.matches(e);if(e(t,".task-checkbox")){const e=t.target.parentNode.getAttribute("t-index"),n=t.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("p-index");a[n].tasks[e].completed=t.target.checked,console.log(e)}if(e(t,"button.del-project")){const e=t.target.parentNode.getAttribute("p-index");a.splice(e,1),c()}if(e(t,"button.edit-project")){const e=t.target.parentNode.querySelector(".edit-input"),n=t.target.parentNode.getAttribute("p-index");e.classList.toggle("hide"),e.classList.contains("hide")||document.querySelector(".project-list").addEventListener("keyup",(function(t){t.preventDefault(),"Enter"===t.key&&e.value.length>0&&(a[n].title=e.value,c())}))}if(e(t,"input.task-submit")){t.preventDefault(),t.target.parentNode.parentNode.firstChild;const e=t.target.parentNode.firstChild.value,n=(t.target.parentNode.parentNode.firstChild,t.target.parentNode.parentNode.parentNode.getAttribute("p-index")),r=a[n];if(""!=e.length){const t=i(e);r.tasks.push(t),c()}}if(e(t,"button.task-del")){const e=t.target.parentNode.getAttribute("t-index"),n=(t.target.parentNode.parentNode.firstChild,t.target.parentNode.parentNode),r=t.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("p-index");a[r].tasks.splice(e,1),n.remove()}const n=document.querySelector(".edit-task");if(e(t,".task-div p")){const e=t.target.parentNode.getAttribute("t-index"),r=t.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("p-index"),i=a[r].tasks[e],s=document.querySelector(".task-title h3");n.classList.toggle("hide"),n.setAttribute("pt-indices",`${r}, ${e}`),s.innerHTML="Task: "+i.title,n.classList.contains("hide")&&n.removeAttribute("pt-indices")}const r=(t,e)=>{const r=n.getAttribute("pt-indices").split(",").map(Number);let[i,s]=[...r];a[i].tasks[s][t]=e};let s=document.querySelector(".task-title input");e(t,".task-title .title")&&s.classList.remove("hide"),s.classList.contains("hide")||document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault(),newTaskTitle=s.value,"Enter"===t.key&&s.value.length>0&&(r("title",newTaskTitle),s.classList.add("hide"),document.querySelector(".task-title .title").innerHTML="Task: "+newTaskTitle,c())}));const o=document.querySelector(".task-textarea");e(t,".task-textarea")&&document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault(),"Enter"===t.key&&o.value.length>0&&(r("description",o),document.querySelector(".task-description p").innerHTML=o.value,o.classList.add("hide"),c())})),e(t,".task-description p")&&o.classList.toggle("hide"),e(t,'.task-priority input[name="taskPriority"]')&&r("priority",t.target.value),e(t,".close-edit i")&&n.classList.toggle("hide")}));const p=s("Project 1");a.push(p);const k=i("task 1");p.tasks.push(k),c()})();