import App from "./app";
import UserRoutes from "./src/routes/user.routes";
import AdminRoutes from "./src/routes/admin.routes";

const app =  new App([new UserRoutes(), new AdminRoutes()]);

app.listen();