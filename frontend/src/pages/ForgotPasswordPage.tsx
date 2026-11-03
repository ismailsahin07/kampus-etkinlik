import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/auth-context";
import { hasErrors, invalidProps, validateForgot } from "../utils/validation";
import PageLayout from "../components/layout/PageLayout";
import Field from "../components/forms/Field";

function ForgotPasswordPage() {
  const { isRegistered } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sentTo, setSentTo] = useState("");

  function check(value: string) {
    const errors = validateForgot(value);
    if (!errors.email && !isRegistered(value)) errors.email = "Bu e-posta ile kayıtlı hesap yok.";
    return errors;
  }
  const errors = submitted ? check(email) : {};

  return (
    <PageLayout title="Şifremi Unuttum">
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

      <form
        className="etkinlik-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          if (hasErrors(check(email))) return;
          // Sunucu yok: gerçek e-posta gitmez, sadece onay mesajı gösterilir.
          setSentTo(email.trim());
        }}
      >
        <Field id="eposta" label="E-posta" error={errors.email}>
          <input type="email" id="eposta" autoComplete="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setSentTo(""); }}
            {...invalidProps("eposta", errors.email)} />
        </Field>

        {sentTo && (
          <p id="form-message" className="basarili" role="status">
            Şifre yenileme bağlantısı {sentTo} adresine gönderildi.
          </p>
        )}

        <button type="submit">Bağlantı gönder</button>
      </form>

      <p className="form-linkler">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </PageLayout>
  );
}

export default ForgotPasswordPage;
