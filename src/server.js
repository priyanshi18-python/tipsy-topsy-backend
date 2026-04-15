import "dotenv/config";   // ✅ ye hi enough hai
import app from "./app.js";
import { env } from "./config/env.js";

// ✅ BigInt fix
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const PORT = env.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});