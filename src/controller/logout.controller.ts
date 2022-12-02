import ActiveSession from "../models/activeSession";

export const logoutUser = (req: any, res: any) => {
  const { token } = req.body;

  ActiveSession.findOneAndDelete({ token })
    .then(() => res.json({ success: true }))
    .catch(() => {
      res.json({ success: false, msg: "Token revoked" });
    });
};
