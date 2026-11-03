import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { hasErrors, invalidProps, validateRegister } from "../utils/validation";
import PageLayout from "../components/layout/PageLayout";
import Field from "../components/forms/Field";

const empty = { name: "", email: "", password: "", password2: "" };

function RegisterPage() {
  const { register, isRegistered } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(empty);
  const [submitted, setSubmitted] = useState(false);

  function check(v: typeof values) {
    const errors = validateRegister(v);
    if (!errors.email && isRegistered(v.email)) errors.email = "Bu e-posta ile zaten kayıt olunmuş.";
    return errors;
  }
  const errors = submitted ? check(values) : {};

  function set(name: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  return (
    <PageLayout title="Kayıt Ol">
      <form
        className="etkinlik-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          if (hasErrors(check(values))) return;
          register({ name: values.name, email: values.email, password: values.password });
          navigate("/admin");
        }}
      >
        <Field id="adsoyad" label="Ad Soyad" error={errors.name}>
          <input type="text" id="adsoyad" autoComplete="name" value={values.name}
            onChange={(e) => set("name", e.target.value)}
            {...invalidProps("adsoyad", errors.name)} />
        </Field>

        <Field id="eposta" label="E-posta" error={errors.email}>
          <input type="email" id="eposta" autoComplete="email" value={values.email}
            onChange={(e) => set("email", e.target.value)}
            {...invalidProps("eposta", errors.email)} />
        </Field>

        <Field id="sifre" label="Şifre" error={errors.password}>
          <input type="password" id="sifre" autoComplete="new-password" value={values.password}
            onChange={(e) => set("password", e.target.value)}
            {...invalidProps("sifre", errors.password)} />
        </Field>

        <Field id="sifre2" label="Şifre (tekrar)" error={errors.password2}>
          <input type="password" id="sifre2" autoComplete="new-password" value={values.password2}
            onChange={(e) => set("password2", e.target.value)}
            {...invalidProps("sifre2", errors.password2)} />
        </Field>

        <button type="submit">Kayıt ol</button>
      </form>

      <p className="form-linkler">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </PageLayout>
  );
}

export default RegisterPage;
