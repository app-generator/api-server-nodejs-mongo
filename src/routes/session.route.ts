import express from "express";
const router = express.Router();
import { githubOauthHandler } from "../controller/auth.controller";

router.get("/oauth/github", githubOauthHandler);

export default router;
