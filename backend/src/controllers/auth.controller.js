import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Пароль должен содержать минимум 6 символов" });
    }

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Email уже используется" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Неверные данные пользователя" });
    }
  } catch (error) {
    console.log(`Ошибка в контроллере регистрации: ${error.message}`);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Неверные учетные данные" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(500).json({ message: "Неверный пароль" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Ошибка в контроллере входа:", error.message);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Вы успешно вышли из аккаунта" });
  } catch (error) {
    console.log("Ошибка в контроллере выхода:", error.message);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Ошибка в контроллере проверки авторизации: ${error.message}`);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
