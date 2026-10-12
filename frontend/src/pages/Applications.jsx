import { useEffect, useState } from "react";
import api from "../services/api";

export default function Applications() {
  const [apps, setApps] = useState([]);
  useEffect(() => { api.get("/adoptions/mine").then(r=>setApps(r.data)); }, []);

  return <div className="container page">
    <div className="page-title"><span className="eyebrow">MY JOURNEY</span><h1>Adoption Applications</h1></div>
    <div className="list">
      {apps.map(a => <div className="application" key={a._id}>
        <img src={a.pet?.image} alt={a.pet?.name}/>
        <div><h3>{a.pet?.name}</h3><p>{a.pet?.breed}</p><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></div>
        <time>{new Date(a.createdAt).toLocaleDateString()}</time>
      </div>)}
      {!apps.length && <div className="empty">You have not submitted an application yet.</div>}
    </div>
  </div>;
}
