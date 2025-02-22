const loginUser = async (req, res) => {
  const { username } = req.body;
  console.log(username);

  return res.status(200).json({ message: `User: ${username} logged in successfully` });
}

export {
    loginUser
}