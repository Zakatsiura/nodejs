import express, { Request, Response } from "express";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const databaseFile = "database.json";

interface IUser {
  name: string;
  age: number;
  gender: string;
}
let users: IUser[] = [];

fs.readFile(databaseFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading database file:", err);
    return;
  }
  users = JSON.parse(data);
  console.log("Database loaded from JSON file.");
});

const saveUsersToDatabase = () => {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync(databaseFile, data);
  console.log("Database saved to JSON file.");
};

app.get("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user, index) => index === +id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/users", (req: Request, res: Response) => {
  const { name, age, gender } = req.body;
  if (name && name.length > 3 && age >= 0) {
    const newUser = { name, age, gender };
    users.push(newUser);
    saveUsersToDatabase();
    res.status(201).json({
      message: "User created.",
      user: newUser,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, gender } = req.body;
  if (name && name.length > 3 && age >= 0) {
    const user = users.find((user, index) => index === +id);
    if (user) {
      user.name = name;
      user.age = age;
      user.gender = gender;
      saveUsersToDatabase();
      res.status(200).json({
        message: "User updated",
        user,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user, index) => index === +id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    saveUsersToDatabase();
    res.status(200).json({
      message: "User deleted",
      user: deletedUser,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
