import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ListTodo, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-200 border-b border-base-300 fixed w-full z-40 top-0 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex justify-between h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ListTodo className="size-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">MyTasks</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <button
                  onClick={logout}
                  className="btn rounded-xl border-none gap-2 bg-base-300"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
