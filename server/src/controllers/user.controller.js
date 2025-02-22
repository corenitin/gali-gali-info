const loginUser = async (req, res) => {
  const { username } = req.body;
  console.log(username);

  return res.status(200).json({ message: `${username}, તમારું સ્વાગત છે` });
}

export {
    loginUser
}