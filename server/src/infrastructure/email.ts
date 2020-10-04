import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

export default ()=>{
    return{
        async sendActivactionMail(id: string, email: string){
            if(!process.env.TOKEN_K) throw new Error('no varibles!');
            const activationToken = jwt.sign({id}, process.env.TOKEN_K+"activation");
            const activationLink = "http://localhost:3000/accept/"+activationToken;
    
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
                from: '"JeżCzat"',
                to: email,
                subject: "Confirm your account",
                html: `Thanks for signing up with Paseo!\nYou must follow this link to activate your account:\n  <a href="${activationLink}">link</a>`,
            });
        }
    
    }
}