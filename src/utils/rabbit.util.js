const nodemailer = require ('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '721244122161-p4lnjuvscr94jpcds5osprabasihkhdi.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04udtOR_qth_sCgYIARAAGAQSNwF-L9IrTq6Q3_M5m6H8VlRcN_QVS70i-fJzdF-c9dIMkx4YUT-iipGjjNpsZcYtz1zg_KhZZNU';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  export const sendSuccessMail = async(toEmail,firstname,lastname)=>{
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
        subject: 'user registration successfully',
        text: `Hi ${firstname} ${lastname}, You have successfully registered!!`
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  