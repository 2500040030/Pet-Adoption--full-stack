import { useEffect, useState } from "react";
import api from "../services/api";

const empty = {name:"",breed:"",species:"Dog",age:1,size:"Medium",gender:"Male",category:"Rescue",description:"",image:"",location:"",healthStatus:"Healthy",vaccinations:[],medicalHistory:[]};

export default function Dashboard() {
  const [stats,setStats]=useState({});
  const [pets,setPets]=useState([]);
  const [apps,setApps]=useState([]);
  const [form,setForm]=useState(empty);
  const [editing,setEditing]=useState(null);

  async function load(){
    const [s,p,a]=await Promise.all([api.get("/users/dashboard"),api.get("/pets"),api.get("/adoptions/shelter")]);
    setStats(s.data); setPets(p.data); setApps(a.data);
  }
  useEffect(()=>{load()},[]);

  const change=e=>setForm({...form,[e.target.name]:e.target.value});

  async function save(e){
    e.preventDefault();
    const payload={...form,vaccinations:form.vaccinations?.filter(Boolean),medicalHistory:form.medicalHistory?.filter(Boolean)};
    if(editing) await api.put(`/pets/${editing}`,payload);
    else await api.post("/pets",payload);
    setForm(empty);setEditing(null);load();
  }

  async function remove(id){if(confirm("Delete this pet listing?")){await api.delete(`/pets/${id}`);load();}}
  async function status(id,status){await api.patch(`/adoptions/${id}/status`,{status});load();}

  return <div className="container page">
    <div className="page-title"><span className="eyebrow">SHELTER MANAGEMENT</span><h1>Dashboard</h1></div>
    <div className="stats">
      <div><b>{stats.pets||0}</b><span>Total pets</span></div><div><b>{stats.available||0}</b><span>Available</span></div>
      <div><b>{stats.adopted||0}</b><span>Adopted</span></div><div><b>{stats.applications||0}</b><span>Applications</span></div>
    </div>

    <section className="dashboard-section">
      <h2>{editing ? "Edit Pet" : "Add New Pet"}</h2>
      <form className="dashboard-form" onSubmit={save}>
        <input name="name" placeholder="Pet name" required value={form.name} onChange={change}/>
        <input name="breed" placeholder="Breed" required value={form.breed} onChange={change}/>
        <select name="species" value={form.species} onChange={change}><option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Other</option></select>
        <input name="age" type="number" min="0" placeholder="Age" value={form.age} onChange={change}/>
        <select name="size" value={form.size} onChange={change}><option>Small</option><option>Medium</option><option>Large</option></select>
        <select name="gender" value={form.gender} onChange={change}><option>Male</option><option>Female</option></select>
        <input name="location" placeholder="Location" value={form.location} onChange={change}/>
        <input name="image" placeholder="Image URL" value={form.image} onChange={change}/>
        <input className="wide-field" name="description" placeholder="Description" value={form.description} onChange={change}/>
        <button className="btn btn-primary">{editing ? "Update Pet" : "Add Pet"}</button>
        {editing && <button type="button" className="btn btn-light" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}
      </form>
    </section>

    <section className="dashboard-section"><h2>Pet Listings</h2>
      <div className="table-wrap"><table><thead><tr><th>Pet</th><th>Breed</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{pets.map(p=><tr key={p._id}><td>{p.name}</td><td>{p.breed}</td><td>{p.adoptionStatus}</td><td>
        <button className="small-btn" onClick={()=>{setEditing(p._id);setForm({...p,vaccinations:p.vaccinations||[],medicalHistory:p.medicalHistory||[]})}}>Edit</button>
        <button className="small-btn danger" onClick={()=>remove(p._id)}>Delete</button>
      </td></tr>)}</tbody></table></div>
    </section>

    <section className="dashboard-section"><h2>Adoption Applications</h2>
      <div className="list">{apps.map(a=><div className="application" key={a._id}>
        <div><h3>{a.pet?.name}</h3><p>Applicant: {a.applicant?.name} · {a.applicant?.email}</p><p>{a.reason}</p></div>
        <div className="actions">{a.status==="Pending"&&<><button className="small-btn" onClick={()=>status(a._id,"Approved")}>Approve</button><button className="small-btn danger" onClick={()=>status(a._id,"Rejected")}>Reject</button></>}</div>
      </div>)}</div>
      {!apps.length&&<div className="empty">No applications yet.</div>}
    </section>
  </div>;
}
