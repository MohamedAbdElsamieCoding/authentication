import { asyncWrapper } from "../middlewares/asyncWrapper";

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const users = await UserActivation.find({}, { __v: false })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ status: "success", data: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
});

const login = () => {};
export default { getAllUsers, register, login };
