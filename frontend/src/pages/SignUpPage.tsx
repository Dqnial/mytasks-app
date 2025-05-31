import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, ListTodo, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImageRight from "../components/AuthImageRight";
import toast from "react-hot-toast";

const SignUpPage: React.FC = () => {
  interface FormData {
    fullName: string;
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Введите имя пользователя");
    if (!formData.email.trim()) return toast.error("Введите почту");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Неверный формат почты");
    if (!formData.password) return toast.error("Введите пароль");
    if (formData.password.length < 6)
      return toast.error("Пароль должен содержать не менее 6 символов");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-2 text-center flex flex-col items-center">
          <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ListTodo className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mt-2">Создать аккаунт</h1>
          <p className="text-base-content/60">
            Присоединяйтесь, чтобы держать задачи под контролем и не забывать о
            важном.
          </p>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
              <div className="form-control">
                <label className="input w-full size-12">
                  <User />
                  <input
                    type="text"
                    className="w-full text-base"
                    placeholder="Имя пользователя"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </label>
              </div>
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
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    "Создать аккаунт"
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-base-content/60">
                  У вас уже есть аккаунт?{" "}
                  <Link to="/login" className="link link-primary">
                    Войти
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AuthImageRight title="Добро пожаловать!" subtitle="Создайте аккаунт" />
    </div>
  );
};

export default SignUpPage;
