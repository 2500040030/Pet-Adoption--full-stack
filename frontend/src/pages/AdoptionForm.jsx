import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ reason:"", homeType:"", experience:"" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/adoptions", { ...form, pet: id });
      alert("Application submitted successfully!");
      navigate("/applications");
    } catch (err) { setError(err.response?.data?.message || "Could not submit application"); }
  }

  return <div className="auth-page"><form className="form-card wide" onSubmit={submit}>
    <span className="eyebrow">ADOPTION APPLICATION</span><h1>Tell us about yourself</h1>
    {error && <div className="error">{error}</div>}
    <label>Why would you like to adopt this pet?<textarea required value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/></label>
    <label>Home type<select required value={form.homeType} onChange={e=>setForm({...form,homeType:e.target.value})}>
      <option value="">Select</option><option>Apartment</option><option>Independent house</option><option>Farm / large property</option>
    </select></label>
    <label>Previous pet experience<textarea value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})}/></label>
    <button className="btn btn-primary full">Submit Application</button>
  </form></div>;
}
