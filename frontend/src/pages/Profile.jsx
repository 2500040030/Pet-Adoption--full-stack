import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [form, setForm] = useState({name:"",phone:"",address:""});
  const [message,setMessage]=useState("");
  useEffect(()=>{api.get("/users/profile").then(r=>setForm({name:r.data.name||"",phone:r.data.phone||"",address:r.data.address||""}))},[]);
  async function submit(e){e.preventDefault();await api.put("/users/profile",form);setMessage("Profile updated.");}
  return <div className="auth-page"><form className="form-card" onSubmit={submit}>
    <span className="eyebrow">ACCOUNT</span><h1>My Profile</h1>{message&&<div className="success">{message}</div>}
    <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
    <label>Address<textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
    <button className="btn btn-primary full">Save Changes</button>
  </form></div>;
}
