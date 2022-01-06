import { userSerialiser } from "../../serialisers/user";
import { AuthRequestHandler } from "../route-wrapper";

const getMe: AuthRequestHandler<void, void, void, api.User> = async ({
  user
}) => userSerialiser(user);

export default getMe;
