import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate(from, { replace: true });
    }

  }, [navigate, from]);

  const validate = () => {

    const e = {};

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email";
    }

    if (!form.password) {
      e.password = "Password is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((er) => ({
        ...er,
        [name]: "",
      }));
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      toast.success("Welcome back!");

      navigate(from, { replace: true });

    } catch (err) {

      const msg =
        err?.response?.data?.message ||
        "Invalid email or password";

      toast.error(msg);

      setErrors({
        password: msg,
      });

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="auth-page">

      {/* Left panel */}
      <div className="auth-panel auth-panel--left">

        <div className="auth-panel__bg">

          <div className="auth-panel__circle auth-panel__circle--1" />

          <div className="auth-panel__circle auth-panel__circle--2" />

          <div className="auth-panel__grid" />

        </div>

        <div className="auth-panel__content">

          <Link to="/" className="auth-panel__logo">
            <span style={{ color: "var(--accent)" }}>✦</span> Inkwell
          </Link>

          <blockquote className="auth-panel__quote animate-fade-up">

            <p>
              "Writing is the painting of the voice."
            </p>

            <cite>— Voltaire</cite>

          </blockquote>

          <div className="auth-panel__features animate-fade-up delay-2">

            {[
              "Publish to a global audience",
              "Rich text editor with media",
              "Analytics and reader insights",
              "Engage through comments",
            ].map((f, i) => (

              <div key={i} className="auth-panel__feature">

                <span className="auth-panel__feature-check">
                  ✓
                </span>

                {f}

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Right panel */}
      <div className="auth-panel auth-panel--right">

        <div className="auth-form-wrap animate-fade-up">

          <div className="auth-form-header">

            <p className="subheading">
              Welcome back
            </p>

            <h1 className="auth-form-title">
              Sign in to
              <br />
              your account
            </h1>

          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="auth-form"
          >

            {/* Email */}
            <div className="form-group">

              <label
                htmlFor="email"
                className="form-label"
              >
                Email address
              </label>

              <div className="auth-input-wrap">

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`form-input auth-input ${
                    errors.email
                      ? "auth-input--error"
                      : ""
                  }`}
                  placeholder="you@example.com"
                />

              </div>

              {errors.email && (
                <span className="form-error">
                  {errors.email}
                </span>
              )}

            </div>

            {/* Password */}
            <div className="form-group">

              <div className="auth-label-row">

                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>

              </div>

              <div className="auth-input-wrap">

                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className={`form-input auth-input ${
                    errors.password
                      ? "auth-input--error"
                      : ""
                  }`}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="auth-pass-toggle"
                  onClick={() =>
                    setShowPass((v) => !v)
                  }
                >
                  {showPass ? "Hide" : "Show"}
                </button>

              </div>

              {errors.password && (
                <span className="form-error">
                  {errors.password}
                </span>
              )}

            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <Loader variant="inline" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}

            </button>

          </form>

          <p className="auth-switch">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="auth-switch-link"
            >
              Create one free
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}