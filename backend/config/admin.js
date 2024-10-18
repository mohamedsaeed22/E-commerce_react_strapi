module.exports = ({ env }) => ({
  auth: {
    secret: require("crypto").randomBytes(64).toString("hex"),
  },
  apiToken: {
    salt: require("crypto").randomBytes(64).toString("hex"),
  },
  transfer: {
    token: {
      salt: require("crypto").randomBytes(64).toString("hex"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
