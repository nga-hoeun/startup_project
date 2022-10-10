import App from "./app";
import UserRoutes from "./src/routes/user.routes";
import AdminRoutes from "./src/routes/admin.routes";
import AuthRoutes from "./src/routes/auth.routes";

const app =  new App([new UserRoutes(), new AdminRoutes(), new AuthRoutes]);

app.listen();