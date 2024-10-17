import {createTransport} from 'nodemailer'

const sendMail = async(email, subject, data) => {
    const Transport = createTransport({
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.Gmail,
            pass:process.env.password
        }
    })

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Allowed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
            font-size: 28px;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Verification</h1>
        <p>We regret to inform you that your account has been denied. Please contact support for further information.</p>
        <p class="otp">Sorry , You are not Allowed in Student Managment System</p> 
    </div>
</body>
</html>
`;

    await Transport.sendMail(
        {
            from:process.env.Gmail,
            to:email,
            subject,
            html
        }
    )

}

export default sendMail;