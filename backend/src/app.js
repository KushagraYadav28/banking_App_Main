const express = require('express');
const cookieparser = require('cookie-parser');
const authRouter = require('./routes/auth_route')
const accountRoute = require('./routes/account_route')
const transactionRoute = require('./routes/transaction_route');
const getAccountRoute = require('./routes/getAccount_route')
const issytemUserRoute = require('./routes/isSystmeUser')
const cors = require('cors');
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://banking-app-main-mu.vercel.app',
    'https://banking-app-main-9e46bv1xc-kushagra-s-projects8.vercel.app',
    'https://banking-app-main-git-main-kushagra-s-projects8.vercel.app'
  ],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use(express.json());
app.use(cookieparser());
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRoute);
app.use('/api/Info', getAccountRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/check', issytemUserRoute);

const cron = require('node-cron');
const User = require('./models/user_model');

cron.schedule('*/2 * * * *', async () => {
  const now = new Date();

  await User.updateMany({'otp_login.expires_at': {$lt: now}}, {
    $unset: {
      otp_login: '',
    },
  });

  console.log('Expired OTPs cleared');
});
module.exports = app;