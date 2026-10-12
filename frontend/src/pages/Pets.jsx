import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ search: "", size: "", species: "", age: "" });

  async function load() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    const { data } = await api.get(`/pets?${params}`);
    setPets(data);
  }

  useEffect(() => { load(); }, []);

  const change = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container page">
      <div className="page-title">
        <span className="eyebrow">FIND YOUR COMPANION</span>
        <h1>Available Pets</h1>
        <p className="muted">Filter the pets to find the right match.</p>
      </div>

      <div className="filters">
        <input name="search" placeholder="Search name or breed..." value={filters.search} onChange={change} />
        <select name="species" value={filters.species} onChange={change}>
          <option value="">All species</option><option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option>
        </select>
        <select name="size" value={filters.size} onChange={change}>
          <option value="">All sizes</option><option>Small</option><option>Medium</option><option>Large</option>
        </select>
        <select name="age" value={filters.age} onChange={change}>
          <option value="">Any age</option><option value="1">≤ 1 year</option><option value="3">≤ 3 years</option><option value="5">≤ 5 years</option>
        </select>
        <button className="btn btn-primary" onClick={load}>Search</button>
      </div>

      <div className="pet-grid">
        {pets.map(p => <PetCard key={p._id} pet={p} />)}
      </div>
      {!pets.length && <div className="empty">No pets found. Try changing your filters.</div>}
    </div>
  );
}
