const nodemailer = require ('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '721244122161-p4lnjuvscr94jpcds5osprabasihkhdi.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04WM3ZOl2jn9mCgYIARAAGAQSNwF-L9IrPqPV11NOUT0KPfZylALbgZLwabF0JboMvTp8kHMDoCqk5q2nP94SYzYdadTg29g8fE0';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  export const sendMail = async(toEmail)=>{
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'sunilmsd007@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: 'SUNILKUMAR <sunilmsd007@gmail.com>',
        to: toEmail,
        subject: 'link to reset password',
        body: 'Hi from gmail using API',
        html: `<h1>To reset your password <a href="http://localhost:4000/api/v1/users/resetpwd">click here </a></h1>`
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  