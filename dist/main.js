(()=>{"use strict";const t=(t,e="",r="",i="",a=!1,n="default")=>({title:t,description:e,dueDate:r,priority:i,completed:a,project:"default"}),e=t=>({title:t,tasks:[]}),r=(()=>{const t=(e,r)=>0===r?e:t(e.parentNode,r-1);return{addChildren:(t,e)=>{e.forEach((e=>{t.appendChild(e)}))},textEl:(t,e)=>{const r=document.createElement(t);return r.innerHTML=e,r},classyDiv:t=>{const e=document.createElement("div");return e.setAttribute("class",t),e},createTag:(t,e="")=>{const r=document.createElement(t);return""!=e&&r.setAttribute("class",e),r},storageAvailable:t=>{var e;try{e=window[t];var r="__storage_test__";return e.setItem(r,r),e.removeItem(r),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}},nthParent:t}})(),i=t=>{document.querySelector(".project-list").innerHTML="",t.forEach((e=>{((t,e)=>{const i=document.querySelector(".project-list"),a=r.classyDiv("project card"),n=t.indexOf(e);a.setAttribute("p-index",n);const s=r.textEl("h3",e.title),c=r.createTag("i","del-project fa fa-trash"),o=r.createTag("i","edit-project fa fa-edit"),d=r.createTag("input","edit-input input");d.classList.add("hide"),d.setAttribute("placeholder","Enter new title here");const l=r.createTag("ul","task-list"),u=document.createElement("div"),p=document.createElement("form");let g=r.createTag("input","input");g.setAttribute("placeholder","Enter a new task here"),g.setAttribute("type","text");let m=r.createTag("input","task-submit button mt-4 is-info");m.setAttribute("type","submit"),m.setAttribute("value","Add Task"),r.addChildren(p,[g,m]),r.addChildren(u,[l,p]),r.addChildren(a,[s,d,o,c,u]),i.appendChild(a),e.tasks.forEach((t=>{const i=r.createTag("li","task-item"),a=r.classyDiv("task-div"),n=r.createTag("input","task-checkbox");n.setAttribute("type","checkbox");const s=e.tasks.indexOf(t);a.setAttribute("t-index",s);const c=r.textEl("p",t.title),o=r.createTag("i","fa fa-edit"),d=r.createTag("i","fa fa-trash");r.addChildren(a,[n,c,o,d]),i.appendChild(a),l.appendChild(i)}))})(t,e)})),r.storageAvailable("localStorage")&&localStorage.setItem("projects_store",JSON.stringify(t))},a=localStorage.getItem("projects_store")?JSON.parse(localStorage.getItem("projects_store")):[];(a=>{const n=document.querySelector(".add-project"),s=document.querySelector(".new-project-form"),c=document.querySelector(".close-project-edit");n.addEventListener("click",(()=>{s.classList.toggle("hide")})),c.addEventListener("click",(()=>{s.classList.toggle("hide")})),document.querySelector(".create-project-btn").addEventListener("click",(t=>{const r=document.querySelector(".new-project-name").value;if(r.length>0){let t=e(r);a.push(t),i(a)}}));const o=document.querySelector(".edit-task"),d=document.querySelector(".task-textarea");document.querySelector("main").addEventListener("click",(function(e){const n=(t,e)=>t.target&&t.target.matches(e),s=(t,e)=>{const r=o.getAttribute("pt-indices").split(",").map(Number);let[i,n]=[...r];a[i].tasks[n][t]=e};if(n(e,".description-submit")&&d.value.length>0){s("description",d);let t=document.querySelector(".description-submit");document.querySelector(".task-description p").innerHTML=d.value,d.classList.add("hide"),t.classList.add("hide"),i(a)}if(n(e,".task-checkbox")){const t=e.target.parentNode.getAttribute("t-index"),i=r.nthParent(e.target,5).getAttribute("p-index");a[i].tasks[t].completed=e.target.checked}if(n(e,"i.del-project")){const t=e.target.parentNode.getAttribute("p-index");a.splice(t,1),i(a)}if(n(e,"i.edit-project")){const t=e.target.parentNode.querySelector(".edit-input"),r=e.target.parentNode.getAttribute("p-index");t.classList.toggle("hide"),t.classList.contains("hide")||document.querySelector(".project-list").addEventListener("keyup",(function(e){e.preventDefault(),"Enter"===e.key&&t.value.length>0&&(a[r].title=t.value,i(a))}))}if(n(e,"input.task-submit")){e.preventDefault(),r.nthParent(e.target,2).firstChild;const n=e.target.parentNode.firstChild.value,s=(r.nthParent(e.target,2).firstChild,r.nthParent(e.target,3).getAttribute("p-index")),c=a[s];if(""!=n.length){const e=t(n);c.tasks.push(e),i(a)}}if(n(e,".task-item .fa-trash")){const t=e.target.parentNode.getAttribute("t-index"),i=(r.nthParent(e.target,2).firstChild,r.nthParent(e.target,2)),n=r.nthParent(e.target,5).getAttribute("p-index");a[n].tasks.splice(t,1),i.remove()}if(n(e,".task-div p")||n(e,".task-div .fa-edit")){const t=e.target.parentNode.getAttribute("t-index"),n=r.nthParent(e.target,5).getAttribute("p-index"),s=a[n].tasks[t],c=document.querySelector(".task-title h3"),d=document.querySelector(".task-description p"),l=document.querySelector(".task-description textarea");o.classList.toggle("hide"),o.setAttribute("pt-indices",`${n}, ${t}`),s.description.length>0?(document.querySelector(".description-submit"),l.classList.add("hide"),l.value="",d.innerHTML=s.description):(l.classList.remove("hide"),l.value="",d.innerHTML=""),s.priority?document.querySelector("input#"+s.priority).click():["High","Medium","Low"].forEach((t=>{document.querySelector("input#"+t).checked=!1})),c.innerHTML="Task: "+s.title,o.classList.contains("hide")?o.removeAttribute("pt-indices"):document.querySelector(".date-input").value=s.dueDate,i(a)}let c=document.querySelector(".task-title input");n(e,".task-title .title")&&c.classList.remove("hide"),c.classList.contains("hide")||(c.value="",document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault();let e=c.value;"Enter"===t.key&&c.value.length>0&&(s("title",e),c.classList.add("hide"),document.querySelector(".task-title .title").innerHTML="Task: "+e,i(a))}))),n(e,".task-textarea")&&document.querySelector("main").addEventListener("keyup",(function(t){t.preventDefault(),"Enter"===t.key&&d.value.length>0&&(s("description",d.value),document.querySelector(".task-description p").innerHTML=d.value,i(a))})),n(e,".task-description p")&&(d.classList.toggle("hide"),document.querySelector(".description-submit").classList.toggle("hide"),d.value=""),n(e,'.task-priority input[name="taskPriority"]')&&s("priority",e.target.value),n(e,".close-edit i")&&o.classList.toggle("hide")})),document.querySelector(".date-input").addEventListener("change",(t=>{const e=o.getAttribute("pt-indices").split(",").map(Number);let[r,i]=[...e];a[r].tasks[i].dueDate=t.target.value}))})(a);const n=e("Project 1");a.push(n);const s=t("task 1");s.priority="Medium",n.tasks.push(s);const c=t("task 2");n.tasks.push(c),i(a)})();