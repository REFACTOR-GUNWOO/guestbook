import { useState, type FormEvent } from "react";
import { signIn, signUp } from "../services/authService";
import "./Login.css";

type Mode = "signin" | "signup";

export default function Login() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setNotice(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn(trimmedEmail, password);
      } else {
        await signUp(trimmedEmail, password);
        setNotice(
          "가입 요청이 완료됐어요. 이메일 인증이 필요한 경우 메일함을 확인해 주세요."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "처리 중 오류가 발생했어요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      <div className="login__field">
        <label className="login__label" htmlFor="login-email">
          이메일
        </label>
        <input
          id="login-email"
          className="login__input"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          required
        />
      </div>

      <div className="login__field">
        <label className="login__label" htmlFor="login-password">
          비밀번호
        </label>
        <input
          id="login-password"
          className="login__input"
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          required
        />
      </div>

      {error && <p className="login__error">{error}</p>}
      {notice && <p className="login__notice">{notice}</p>}

      <button className="login__submit" type="submit" disabled={submitting}>
        {submitting
          ? "처리 중…"
          : mode === "signin"
          ? "로그인"
          : "회원가입"}
      </button>

      <button
        className="login__toggle"
        type="button"
        onClick={() => {
          setMode((m) => (m === "signin" ? "signup" : "signin"));
          setError(null);
          setNotice(null);
        }}
        disabled={submitting}
      >
        {mode === "signin"
          ? "계정이 없으신가요? 회원가입"
          : "이미 계정이 있으신가요? 로그인"}
      </button>
    </form>
  );
}
