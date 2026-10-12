import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => { api.get(`/pets/${id}`).then(r => setPet(r.data)).catch(() => setPet(false)); }, [id]);

  if (pet === null) return <div className="loading">Loading...</div>;
  if (!pet) return <div className="container page"><div className="empty">Pet not found.</div></div>;

  return (
    <div className="container page">
      <div className="details">
        <img src={pet.image} alt={pet.name} className="details-image" />
        <div>
          <span className="badge">{pet.adoptionStatus}</span>
          <h1>{pet.name}</h1>
          <p className="lead">{pet.breed} · {pet.age} year{pet.age === 1 ? "" : "s"} · {pet.size} · {pet.gender}</p>
          <p>{pet.description}</p>
          <div className="info-grid">
            <div><strong>Species</strong><span>{pet.species}</span></div>
            <div><strong>Location</strong><span>{pet.location}</span></div>
            <div><strong>Health</strong><span>{pet.healthStatus}</span></div>
            <div><strong>Shelter</strong><span>{pet.shelter?.shelterName || pet.shelter?.name}</span></div>
          </div>
          <h3>Vaccinations</h3>
          <ul>{pet.vaccinations?.map(v => <li key={v}>{v}</li>)}</ul>
          <h3>Medical History</h3>
          <ul>{pet.medicalHistory?.length ? pet.medicalHistory.map(v => <li key={v}>{v}</li>) : <li>No major medical history.</li>}</ul>
          {pet.adoptionStatus === "Available" && (
            <Link className="btn btn-primary" to={`/pets/${pet._id}/apply`}>Apply to Adopt</Link>
          )}
        </div>
      </div>
    </div>
  );
}
