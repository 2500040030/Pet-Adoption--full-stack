import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";

export default function Favorites() {
  const [pets, setPets] = useState([]);
  useEffect(() => { api.get("/favorites").then(r => setPets(r.data.map(x => x.pet).filter(Boolean))); }, []);
  return <div className="container page">
    <div className="page-title"><span className="eyebrow">SAVED PETS</span><h1>Your Favorites</h1></div>
    <div className="pet-grid">{pets.map(p=><PetCard key={p._id} pet={p}/>)}</div>
    {!pets.length && <div className="empty">No favorites yet.</div>}
  </div>;
}
