import{W as n,j as e}from"./app-21fba438.js";import{N as a,r as s}from"./NavBar-aba35179.js";import"./SVGicon-e0660a63.js";function p({bscstestimonials:r}){const{delete:c}=n({});function i(t){c(route("bscstestimonials.forceDelete",t))}return e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx("div",{class:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsxs("div",{class:"border-b border-gray-200 bg-white p-6",children:[e.jsx("div",{class:"mb-2 flex justify-end",children:e.jsx("a",{href:route("bscstestimonials.create"),className:"href",children:e.jsx(s.Button,{children:"Create"})})}),e.jsxs("table",{class:"min-w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{class:"bg-gray-300",children:[e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"ID"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Name"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Position"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Date"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Action"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:e.jsx("span",{class:"sr-only",children:"Action"})})]})}),e.jsx("tbody",{children:r.map((t,l)=>e.jsxs("tr",{children:[e.jsx("td",{class:"px-3 py-2 text-center",children:t.id}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.name}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.position}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.created_at}),e.jsxs("td",{class:"px-3 py-2 text-center",children:[e.jsx("a",{href:route("bscstestimonials.edit",{id:t.id}),className:"href",children:e.jsx(s.Button,{children:"edit"})}),e.jsx(s.Button,{type:"button",onClick:()=>i(t.id),children:"Delete"})]})]}))})]})]})})]})}export{p as default};