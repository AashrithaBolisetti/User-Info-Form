import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

function UserForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = (name, value) => {
    let message = "";

    if (!value.trim()) message = "Required";

    if (name === "email" && value) {
      const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!r.test(value)) message = "Invalid Email";
    }

    if (name === "phone" && value) {
      if (!/^\d{10}$/.test(value)) message = "Phone must be 10 digits";
    }

    if (name === "pan" && value) {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) message = "Invalid PAN";
    }

    if (name === "aadhaar" && value) {
      if (!/^\d{12}$/.test(value)) message = "Aadhaar must be 12 digits";
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid =
    Object.values(form).every((v) => v.trim() !== "") &&
    Object.values(errors).every((e) => e === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    navigate("/details", { state: form });
  };

  return (
    <div className="container">
      <h2>User Info Form</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div className="row" key={field}>
            <input
              type={
                field === "password"
                  ? showPass
                    ? "text"
                    : "password"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
            />

            {field === "password" && (
              <button
                type="button"
                className="showBtn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            )}

            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}

        <button disabled={!isFormValid} className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
