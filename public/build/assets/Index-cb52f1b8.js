import{W as n,j as e}from"./app-21fba438.js";import{N as d,r as s}from"./NavBar-aba35179.js";import"./SVGicon-e0660a63.js";function p({faculties:r}){const{delete:i}=n({});function c(t){i(route("faculties.destroy",t))}return e.jsxs(e.Fragment,{children:[e.jsx(d,{}),e.jsx("div",{class:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsxs("div",{class:"border-b border-gray-200 bg-white p-6",children:[e.jsx("div",{class:"mb-2 flex justify-end",children:e.jsx("a",{href:route("faculties.create"),className:"href",children:e.jsx(s.Button,{children:"Create"})})}),e.jsxs("table",{class:"min-w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{class:"bg-gray-300",children:[e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"ID"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Name"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Position"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Content"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Date"}),e.jsx("th",{class:"px-3 py-2 uppercase tracking-tight",children:"Action"})]})}),e.jsx("tbody",{children:r.map((t,a)=>e.jsxs("tr",{children:[e.jsx("td",{class:"px-3 py-2 text-center",children:t.id}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.name}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.position}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.content}),e.jsx("td",{class:"px-3 py-2 text-center",children:t.created_at}),e.jsxs("td",{class:"px-3 py-2 text-center",children:[e.jsx("a",{href:route("faculties.show",{id:t.id}),children:e.jsx(s.Button,{children:"show"})}),e.jsx("a",{href:route("faculties.edit",{id:t.id}),className:"href",children:e.jsx(s.Button,{children:"edit"})}),e.jsx(s.Button,{type:"button",onClick:()=>c(t.id),children:"Delete"})]})]}))})]})]})})]})}export{p as default};