import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function PetCard({ pet }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  async function favorite(e) {
    e.preventDefault();
    if (!user) return alert("Please login to save favorites.");
    try {
      if (!saved) {
        await api.post(`/favorites/${pet._id}`);
        setSaved(true);
      } else {
        await api.delete(`/favorites/${pet._id}`);
        setSaved(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Could not update favorite");
    }
  }

  return (
    <article className="pet-card">
      <div className="pet-image-wrap">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <button className="heart" onClick={favorite} aria-label="favorite">
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="pet-card-body">
        <div className="row-between">
          <h3>{pet.name}</h3>
          <span className="badge">{pet.adoptionStatus}</span>
        </div>
        <p className="muted">{pet.breed} · {pet.age} year{pet.age === 1 ? "" : "s"}</p>
        <p className="muted">{pet.size} · {pet.gender} · {pet.location}</p>
        <Link className="btn btn-primary full" to={`/pets/${pet._id}`}>View Profile</Link>
      </div>
    </article>
  );
}
