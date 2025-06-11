import * as bcrypt from "bcrypt";

export class PasswordService {

    sign(newPassword: string) {
        let salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        let hashedPassword = bcrypt.hashSync(newPassword, salt);
        return hashedPassword;
    }

    isEqual(password: string, hashedPassword: string) {
        return bcrypt.compareSync(password, hashedPassword);
    }

}