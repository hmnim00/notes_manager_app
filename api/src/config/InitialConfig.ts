import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const initialSetup = async () => {
  const query = getRepository(User);

  const adminExists = await query.find();

  if (adminExists.length > 0) return;
  else {
    const admin = new User();
    admin.username = "admin";
    admin.email = "admin@example.com";
    admin.password = "admin123456";
    admin.role = "admin";

    // save new user
    try {
      admin.encryptPassword();
      await query.save(admin);
    } catch (error) {
      console.log(error);
    }

    console.log("Admin has been created");
  }
};
