import{W as o,j as e}from"./app-21fba438.js";import{I as a}from"./InputLabel-6992b3dc.js";import{N as m,r as d}from"./NavBar-aba35179.js";import"./SVGicon-e0660a63.js";function g(){const{data:r,setData:t,post:n,processing:l,errors:c,reset:u}=o({name:"",position:"",image:"",content:""});function i(s){s.preventDefault(),n(route("bscstestimonials.store"))}return e.jsxs(e.Fragment,{children:[e.jsx(m,{}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"border-b border-gray-200 bg-white p-6",children:e.jsxs("form",{onSubmit:i,children:[e.jsxs("div",{className:"mb-2",children:[e.jsx(a,{children:"Name"}),e.jsx("input",{type:"text",name:"name",value:r.name,onChange:s=>t("name",s.target.value),required:!0})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx(a,{children:"Image"}),e.jsx("input",{type:"file",accepts:"images/*",name:"image",onChange:s=>t("image",s.target.files[0]),required:!0})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx(a,{children:"Position"}),e.jsx("input",{type:"text",name:"position",onChange:s=>t("position",s.target.value),required:!0})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx(a,{children:"Content"}),e.jsx("textarea",{name:"content",onChange:s=>t("content",s.target.value),cols:30,rows:10,required:!0})]}),e.jsx("div",{className:"mb-2",children:e.jsx(d.Button,{type:"submit",children:"Create"})})]})})})})]})}export{g as default};