module.exports = () => [
  {
    "path": "/backend/user/(.*)",
    "proxy": {
      "instance": "user:3500",
      "path": "/v1.0/invoke/user/method/$1"
    }
  }
];
