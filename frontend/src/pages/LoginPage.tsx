import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { hasErrors, invalidProps, validateLogin } from "../utils/validation";
import PageLayout from "../components/layout/PageLayout";
import Field from "../components/forms/Field";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  const errors = submitted ? validateLogin(email, password) : {};

  return (
    <PageLayout title="Giriş Yap">
      <form
        className="etkinlik-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          if (hasErrors(validateLogin(email, password))) return;
          if (login(email, password)) navigate("/admin");
          else setFailed(true);
        }}
      >
        <Field id="eposta" label="E-posta" error={errors.email}>
          <input type="email" id="eposta" autoComplete="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setFailed(false); }}
            {...invalidProps("eposta", errors.email)} />
        </Field>

        <Field id="sifre" label="Şifre" error={errors.password}>
          <input type="password" id="sifre" autoComplete="current-password" value={password}
            onChange={(e) => { setPassword(e.target.value); setFailed(false); }}
            {...invalidProps("sifre", errors.password)} />
        </Field>

        {failed && (
          <p id="form-message" className="hatali" role="alert">E-posta veya şifre hatalı.</p>
        )}

        <button type="submit">Giriş yap</button>
      </form>

      <p className="form-linkler">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </PageLayout>
  );
}

export default LoginPage;
