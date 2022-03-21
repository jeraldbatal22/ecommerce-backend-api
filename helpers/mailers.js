const nodemailer = require('nodemailer');

exports.sendMailerActivation = (user) => {
  const firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
  const lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jrld.sample@gmail.com',
      pass: 'zaasgcmlaelrvzqw' // naturally, replace both with your real credentials or an application-specific password
    }
  });

  const mailOptions = {
    from: 'ecommerce@gmail.com',
    to: user.email,
    subject: 'Account pending',
    // text: 'Dudes, we really need your money.',
    html: `
    <div>
      <h1 style="color:#000">Good day, ${firstname} ${lastname}.</h1>
      <p style="color:#000">You are successfully created your account. To complete your account, please verify your account below. Thankyou.</p>
      <button style="background: skyblue; padding:10px 20px; border-radius:50px; border: none; cursor:pointer; font-weight:bold;"><a href="http://localhost:3001/api/users/activate_account/${user._id}" style="text-decoration:none; color:#000">Verify Account</a></button>
    </div>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error('error')
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.sendMailerActivationSuccess = (user) => {
  const firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
  const lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jrld.sample@gmail.com',
      pass: 'zaasgcmlaelrvzqw' // naturally, replace both with your real credentials or an application-specific password
    }
  });

  const mailOptions = {
    from: 'ecommerce@gmail.com',
    to: user.email,
    subject: 'Successfully Verified Account',
    // text: 'Dudes, we really need your money.',
    html: `
    <div>
      <h1 style="color:#000">Good day, ${firstname} ${lastname}.</h1>
      <p style="color:#000">Congratulations you are now completely verified. Enjoy shopping. Thankyou.</p>
      <button style="background: skyblue; padding:10px 20px; border-radius:50px; border: none; cursor:pointer; font-weight:bold;"><a href="" style="text-decoration:none; color:#000">Shop Now</a></button>
    </div>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error('error')
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}