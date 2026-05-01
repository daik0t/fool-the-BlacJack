import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthFlipCard.css";

const AuthFlipCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const URL = import.meta.env.API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      // После успешной регистрации переключаем на логин
      setIsLogin(true);
      setLoginEmail(signupEmail);
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      alert("Registration successful! Please log in.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="flip-card">
        <div className="flip-card__toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={!isLogin}
              onChange={(e) => setIsLogin(!e.target.checked)}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
          </label>
        </div>
        <div className={`flip-card__inner ${!isLogin ? "flipped" : ""}`}>
          <div className="flip-card__front">
            <div className="title">Log in</div>
            <form className="flip-card__form" onSubmit={handleLogin}>
              <input
                className="flip-card__input"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                className="flip-card__input"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button className="flip-card__btn">Let`s go!</button>
            </form>
          </div>
          <div className="flip-card__back">
            <div className="title">Sign up</div>
            <form className="flip-card__form" onSubmit={handleSignup}>
              <input
                className="flip-card__input"
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
              <input
                className="flip-card__input"
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                className="flip-card__input"
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button className="flip-card__btn">Confirm!</button>
            </form>
          </div>
        </div>
      </div>
      {error && <div className="auth-error">{error}</div>}
    </div>
  );
};

export default AuthFlipCard;