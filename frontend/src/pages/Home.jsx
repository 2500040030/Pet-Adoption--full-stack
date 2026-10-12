import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";

export default function Home() {
  const [pets, setPets] = useState([]);
  useEffect(() => { api.get("/pets?status=Available").then(r => setPets(r.data.slice(0, 3))).catch(() => {}); }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">PS40 · PET ADOPTION</span>
            <h1>Every pet deserves a loving home.</h1>
            <p>Find your perfect companion from verified shelters and rescue organizations.</p>
            <div className="actions">
              <Link className="btn btn-primary" to="/pets">Find a Pet</Link>
              <Link className="btn btn-light" to="/register">Become a Member</Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-emoji">🐶</div>
            <h3>Adopt. Don't shop.</h3>
            <p>Browse pets, learn their stories and start an adoption application in minutes.</p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div><span className="eyebrow">MEET THEM</span><h2>Pets waiting for you</h2></div>
          <Link to="/pets">View all →</Link>
        </div>
        <div className="pet-grid">
          {pets.map(p => <PetCard key={p._id} pet={p} />)}
        </div>
      </section>

      <section className="container features">
        <div><span>🔎</span><h3>Easy discovery</h3><p>Search by breed, age, size and category.</p></div>
        <div><span>🏥</span><h3>Health records</h3><p>See vaccination and medical information.</p></div>
        <div><span>🤝</span><h3>Trusted shelters</h3><p>Connect directly with registered shelters.</p></div>
      </section>
    </div>
  );
}
