const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// takes username from req.body and getting a user from chat engine if not create a user
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try{
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      {username: username, secret: username, first_name: username},
      {headers: {"PRIVATE-KEY": process.env.CHAT_ENGINE_KEY}}
    )
    // response for api call will get status and data in
    return res.status(r.status).json(r.data);
  }catch (e) {
    return res.status(e.response.status).json(e.response.data)
  }
});

app.listen(3001);