import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"", address:"", role:"adopter", shelterName:"" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try { const u = await register(form); navigate(u.role === "shelter" ? "/dashboard" : "/pets"); }
    catch (err) { setError(err.response?.data?.message || "Registration failed"); }
  }
  const change = e => setForm({...form,[e.target.name]:e.target.value});

  return <div className="auth-page"><form className="form-card wide" onSubmit={submit}>
    <span className="eyebrow">JOIN PETCONNECT</span><h1>Create account</h1>
    {error && <div className="error">{error}</div>}
    <div className="two-col">
      <label>Name<input name="name" required value={form.name} onChange={change}/></label>
      <label>Email<input name="email" type="email" required value={form.email} onChange={change}/></label>
      <label>Password<input name="password" type="password" required minLength="6" value={form.password} onChange={change}/></label>
      <label>Phone<input name="phone" value={form.phone} onChange={change}/></label>
    </div>
    <label>Address<textarea name="address" value={form.address} onChange={change}/></label>
    <label>Account type<select name="role" value={form.role} onChange={change}><option value="adopter">Adopter</option><option value="shelter">Shelter / Rescue</option></select></label>
    {form.role === "shelter" && <label>Shelter name<input name="shelterName" value={form.shelterName} onChange={change}/></label>}
    <button className="btn btn-primary full">Create Account</button>
    <p className="muted">Already registered? <Link to="/login">Login</Link></p>
  </form></div>;
}
