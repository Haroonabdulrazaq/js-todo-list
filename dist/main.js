(()=>{const t=(t,e)=>{e.forEach((e=>{t.appendChild(e)}))},e=(t,e)=>{const i=document.createElement(t);return i.innerHTML=e,i},i=t=>{const e=document.createElement("div");return e.setAttribute("class",t),e},s=(t,e="")=>{const i=document.createElement(t);return""!=e&&i.setAttribute("class",e),i},r=(t,e="",i="",s="",r=!1,n="default")=>({title:t,description:e,dueDate:i,priority:s,completed:r,project:"default"}),n=t=>({title:t,tasks:[]}),a=[],c=document.querySelector(".project-list"),o=r=>{const n=i("project card"),o=a.indexOf(r);n.setAttribute("p-index",o);const d=e("h3",r.title),l=s("i","del-project fa fa-trash"),u=s("i","edit-project fa fa-edit ghost"),p=s("input","edit-input");p.classList.add("hide"),p.setAttribute("placeholder","Enter new title here");const m=s("ul","task-list"),k=document.createElement("div"),g=document.createElement("form");let h=document.createElement("input");h.setAttribute("type","text");let v=s("input","task-submit");v.setAttribute("type","submit"),v.setAttribute("value","Add Task"),t(g,[h,v]),t(k,[m,g]),t(n,[d,p,u,l,k]),c.appendChild(n),r.tasks.forEach((n=>{const a=s("li","task-item"),c=i("task-div"),o=s("input","task-checkbox");o.setAttribute("type","checkbox");const d=r.tasks.indexOf(n);c.setAttribute("t-index",d);const l=e("p",n.title),u=s("i","fa fa-edit ghost"),p=s("button","del-task");p.innerHTML="Delete Task",t(c,[o,l,u,p]),a.appendChild(c),m.appendChild(a)}))},d=()=>{if(document.querySelector(".project-list").innerHTML="",a.forEach(o),a.length>0){const t=document.querySelector(".project"),e=t.querySelector(".edit-project");t.addEventListener("mouseover",(t=>{e.classList.remove("ghost")})),t.addEventListener("mouseleave",(t=>{e.classList.add("ghost")}))}if(a.length>0&&a[0].tasks.length>0){const t=document.querySelector(".task-item .task-div"),e=t.querySelector(".fa-edit");t.addEventListener("mouseover",(t=>{e.classList.remove("ghost")})),t.addEventListener("mouseleave",(t=>{e.classList.add("ghost")}))}},l=(t,e)=>0===e?t:l(t.parentNode,e-1),u=document.querySelector(".add-project"),p=document.querySelector(".new-project-form"),m=document.querySelector(".close-project-edit");u.addEventListener("click",(()=>{p.classList.toggle("hide")})),m.addEventListener("click",(()=>{p.classList.toggle("hide")})),document.querySelector(".create-project-btn").addEventListener("click",(t=>{const e=document.querySelector(".new-project-name").value;if(e.length>0){let t=n(e);a.push(t),d()}})),document.querySelector("main").addEventListener("click",(function(t){const e=(t,e)=>t.target&&t.target.matches(e);if(e(t,".task-checkbox")){const e=t.target.parentNode.getAttribute("t-index"),i=l(t.target,5).getAttribute("p-index");a[i].tasks[e].completed=t.target.checked}if(e(t,"i.del-project")){const e=t.target.parentNode.getAttribute("p-index");a.splice(e,1),d()}if(e(t,"i.edit-project")){const e=t.target.parentNode.querySelector(".edit-input"),i=t.target.parentNode.getAttribute("p-index");e.classList.toggle("hide"),e.classList.contains("hide")||document.querySelector(".project-list").addEventListener("keyup",(function(t){t.preventDefault(),"Enter"===t.key&&e.value.length>0&&(a[i].title=e.value,d())}))}if(e(t,"input.task-submit")){t.preventDefault(),l(t.target,2).firstChild;const e=t.target.parentNode.firstChild.value,i=(l(t.target,2).firstChild,l(t.target,3).getAttribute("p-index")),s=a[i];if(""!=e.length){const t=r(e);s.tasks.push(t),d()}}if(e(t,"button.del-task")){const e=t.target.parentNode.getAttribute("t-index"),i=(l(t.target,2).firstChild,l(t.target,2)),s=l(t.target,5).getAttribute("p-index");a[s].tasks.splice(e,1),i.remove()}const i=document.querySelector(".edit-task");if(e(t,".task-div p")||e(t,".task-div i")){const e=t.target.parentNode.getAttribute("t-index"),s=l(t.target,5).getAttribute("p-index"),r=a[s].tasks[e],n=document.querySelector(".task-title h3");i.classList.toggle("hide"),i.setAttribute("pt-indices",`${s}, ${e}`),n.innerHTML="Task: "+r.title,i.classList.contains("hide")&&i.removeAttribute("pt-indices"),d()}const s=(t,e)=>{const s=i.getAttribute("pt-indices").split(",").map(Number);let[r,n]=[...s],c=a[r].tasks[n][t];c=e};let n=document.querySelector(".task-title input");e(t,".task-title .title")&&n.classList.remove("hide"),n.classList.contains("hide")||document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault(),newTaskTitle=n.value,"Enter"===t.key&&n.value.length>0&&(s("title",newTaskTitle),n.classList.add("hide"),document.querySelector(".task-title .title").innerHTML="Task: "+newTaskTitle,d())}));const c=document.querySelector(".task-textarea");e(t,".task-textarea")&&document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault(),"Enter"===t.key&&c.value.length>0&&(s("description",c),document.querySelector(".task-description p").innerHTML=c.value,c.classList.add("hide"),d())})),e(t,".task-description p")&&c.classList.toggle("hide"),e(t,'.task-priority input[name="taskPriority"]')&&s("priority",t.target.value),e(t,".close-edit i")&&i.classList.toggle("hide"),e(t,".date-input")}));const k=n("Project 1");a.push(k);const g=r("task 1");k.tasks.push(g),d()})();