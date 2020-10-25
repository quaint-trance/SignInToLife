import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

export default ()=>{
    return{
        async sendActivactionMail(id: string, email: string){
            if(!process.env.TOKEN_K) throw new Error('no varibles!');
            const activationToken = jwt.sign({id}, process.env.TOKEN_K+"activation");
            const activationLink = "https://signintolife.netlify.app/accept?token="+activationToken;
    
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                   user: process.env.EMAIL_L,
                   pass: process.env.EMAIL_P,
                },
            });
            transporter.sendMail({
                from: '"Sign In To Life"',
                to: email,
                subject: "Confirm your account",
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
                    <style>
                        *{
                            font-family: 'Roboto', sans-serif;
                        }
                        body{
                            font-family: 'Roboto', sans-serif;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                    </style>
                </head>
                <body>
                    <img  src="https://signintolife.netlify.app/logo.png" alt='logo'>
                    <h1> Thanks for joining us! </h1>
                    <span>
                        You must follow this 
                        <a href="${activationLink}">link</a>
                         to activate your account.
                    </span>
                </body>
                </html>
                    `,
            });
        }
    
    }
}