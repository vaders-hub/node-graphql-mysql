import crypto from "crypto";

const algorithm = "aes-192-cbc";
const secret = "bncaskdbvasbvlaslslasfhj";
const key = crypto.scryptSync(secret, "GfG", 24);
const iv = Buffer.alloc(16, 0);
const encrypt = {
  procEncryption: async (password: string, saltIng?: string): Promise<any> => {
    const salt: string =
      saltIng === undefined ? crypto.randomBytes(32).toString("hex") : saltIng;
    return new Promise((resolve, reject) => {
      try {
        crypto.pbkdf2(
          password,
          salt,
          125723,
          12,
          "sha512",
          (err, derivedKey) => {
            if (err) {
              throw err;
            }
            const hashed = derivedKey.toString("hex");
            resolve({ salt, hashed });
          }
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  cipher: async (password: string) => {
    return new Promise((resolve, reject) => {
      const cipher = crypto.createCipheriv(algorithm, key, iv);

      let encrypted = "";

      try {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            encrypted += chunk.toString("base64");
          }
        });

        cipher.on("end", () => {
          resolve(encrypted);
        });

        cipher.write(password);
        cipher.end();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  deCipher: async (password: string) => {
    return new Promise((resolve, reject) => {
      const decipher = crypto.createDecipheriv(algorithm, key, iv);

      let decrypted = "";

      try {
        decipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString("utf8");
          }
        });

        decipher.on("end", () => {
          resolve(decrypted);
        });

        decipher.write(password, "base64");
        decipher.end();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
};

export default encrypt;
