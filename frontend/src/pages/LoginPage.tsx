import React from "react";
import AuthImageRight from "../components/AuthImageRight";
import { Eye, EyeOff, ListTodo, Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
  interface FormData {
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-2 text-center flex flex-col items-center">
          <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ListTodo className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mt-2">Вход</h1>
          <p className="text-base-content/60">
            Войдите, чтобы управлять своими задачами
          </p>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
              <div className="form-control">
                <label className="input w-full size-12">
                  <Mail />
                  <input
                    type="text"
                    className="w-full text-base"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input w-full size-12">
                  <Lock />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full text-base"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    ) : (
                      <EyeOff
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </button>
                </label>
              </div>
              <div className="form-control">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-base size-12"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    "Войти"
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-base-content/60">
                  Ещё нет аккаунта?{" "}
                  <Link to="/signup" className="link link-primary">
                    Зарегистрируйтесь
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AuthImageRight title="Добро пожаловать!" subtitle="Войдите в аккаунт" />
    </div>
  );
};

export default LoginPage;
