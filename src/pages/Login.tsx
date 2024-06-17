import "../../public/library/bootstrap-social/bootstrap-social.css";

import login from "../api/login";
import useAuth from "../store/Auth";
import useLoginErrorStore from "../store/LoginError";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setValidate = useAuth((state) => state.setValidate);

    const error = useLoginErrorStore((state) => state.error);

    const [loading, setLoading] = useState(false);

    const setError = useLoginErrorStore((state) => state.setError);
    const clearError = useLoginErrorStore((state) => state.clearError);

    const messageError = "Email or Password is wrong";

    const handleLogin = async () => {
        try {
            if (email && password) {
                setLoading(true);
                if (await login({ email, password })) {
                    navigate("/article");
                    setValidate();
                    clearError();
                    setLoading(false);
                } else {
                    setError();
                    setLoading(false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card card-success">
            <div className="card-header">
                <h4 className="text-success">Login</h4>
            </div>

            <div className="card-body">
                <form
                    method="POST"
                    action="#"
                    className="needs-validation"
                    noValidate={false}
                >
                    <div className="form-group">
                        <div className="d-block">
                            <label htmlFor="email">Email</label>
                        </div>
                        <input
                            id="email"
                            type="email"
                            className={
                                error
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            name="email"
                            tabIndex={1}
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <div className="d-block">
                            <label htmlFor="password" className="control-label">
                                Password
                            </label>
                        </div>
                        <input
                            id="password"
                            type="password"
                            className={
                                error
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            name="password"
                            tabIndex={2}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error ? (
                            <>
                                <div className="invalid-feedback">
                                    {messageError}
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success btn-lg btn-block"
                            tabIndex={4}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span>Wait...</span>
                                    <div
                                        className="spinner-border spinner-border-sm ml-2"
                                        role="status"
                                    ></div>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
