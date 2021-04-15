var express = require('express');
var router = express.Router();
var mailSettings = require('../config/MailSettings');
var nodemailer = require('nodemailer');
var fs = require('fs');
const ejs = require("ejs");

/*sending mail with body as plain text */
router.get('/plainText', function(req, res, next) {
   let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack Integration-plaintext mail', 
      text: 'It is fun to test your mails with mailtrap.' 
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending name with email for plaintext email */
router.get('/plainTextWithNames', function(req, res, next) {
   let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'francis <test@westagilelabs.com>,sachin <ssd1110@gmail.com>',
      subject: 'Mailtrack Integration-plaintext mail', 
      text: 'It is fun to test your mails with mailtrap.' 
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending carbon copy email*/
router.get('/carboncopy', function(req, res, next) {
 let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      cc:'sangram2681@gmail.com',
      bcc:'bcc@westagilelabs.com',
      subject: 'Mailtrack Integration-carbon copy', 
      text: 'It is fun to test your mails with mailtrap.' 
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending mail with html body */
router.get('/html', function(req, res, next) {
 let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack Integration -html mail', 
      html: '<h1>It is fun to test your mails with mailtrap.</h1><p><b>Get Your Act Now!</b></p>'
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending mail with html & text both as body */
router.get('/html_text', function(req, res, next) {
  let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack Integration -html and text both in mail', 
      html: '<h1>It is fun to test your mails with mailtrap.</h1><p><b>Get Your Act Now!</b></p>',
      text: 'some plain text content goes here' 
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending mail with attachment */
router.get('/attachment', function(req, res, next) {
   let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  /*a sample pdf sent as an attachemnt*/
  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack integration-mail with a attachment', 
      html: '<h1>It is fun to test your mails with mailtrap.</h1><p><b>Get Your Act Now!</b></p>',
      attachments: [
         { 
           filename: 'Lorem_ipsum.pdf',
           path: process.cwd() + '/attachments/Lorem_ipsum.pdf'
         }
      ]
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*sending mail with multiple attachments */
router.get('/multiple-attachment', function(req, res, next) {
   let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

   /* two pdf file sent as attachment */
  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack integration -mail with multiple attachments', 
      html: '<h1>It is fun to test your mails with mailtrap.</h1><p><b>Get Your Act Now!</b></p>',
      attachments: [
         { 
           filename: 'Lorem_ipsum.pdf',
           path: process.cwd() + '/attachments/Lorem_ipsum.pdf'
         },
         { 
            filename: 'sample.pdf',
            path: process.cwd() + '/attachments/sample.pdf'
          }
      ]
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

/*read all messages in inbox using pop3 details */
router.get('/pop3', function(req, res, next) {
   var Client = require('yapople').Client;
   var client = new Client({
     host: mailSettings.POP3_HOST,
     port:  mailSettings.POP3_PORT,
     tls: false,
     mailparser: true,
     username: mailSettings.POP3_USERNAME,
     password: mailSettings.POP3_PASSWORD,
     options: {
       secureContext: {
         passphrase: "some pass phrase"
       }
     }
   });

   var popmessages =[]
   client.connect(function() {
     client.retrieveAll(function(err, messages) {
       messages.forEach(function(message) {
         popmessages.push({
            "from":message.from[0].address,
            "to":message.to.map(m=>m.address).join(','),
            "cc":(message.cc && message.cc.length) ?message.cc.map(m=>m.address).join(','):'',
            "subject":message.subject,
            "body":message.html?message.html :message.text,
            "attachments":(message.attachments && message.attachments.length) ?message.attachments.map(m=>m.fileName).join(','):'',
            "isHTML":message.html? true :false,
         })

         //check if we can download attachment files from pop message
         if(message.attachments && message.attachments.length > 0 )
         {
            for(var j=0;j< message.attachments.length;j++)
            {
               if(message.attachments[j].content  && message.attachments[j].content.length && message.attachments[j].fileName)
               {
                  var buf = Buffer.alloc(message.attachments[j].length);
                  for(var i=0;i< message.attachments[j].length;i++)
                  {
                     buf[i]= message.attachments[j].content[i]
                  }
                  fs.writeFile("downloads/" + message.attachments[j].fileName, buf, "base64", function(err,rs){
                     if (err)  console.log(err);
                     console.log('file created');
                  })
               }else{
                  console.log("content not found")
               }
            }


         }else{
            console.log("attachment not found");
         }

       });
       client.quit();
       res.send(popmessages);
     })
   }) 
});

/*sending mail with html body using express.js ejs template*/
router.get('/ejs-template', async function(req, res, next) {
 
   let transport = nodemailer.createTransport({
      host: mailSettings.SMTP_HOST,
      port: mailSettings.SMTP_PORT,
      auth: {
         user: mailSettings.SMTP_USERNAME,
         pass: mailSettings.SMTP_PASSWORD
      }
  });

  const data = await ejs.renderFile(process.cwd() + '/views/' + "mailTrack.ejs", 
                  { title: 'MailTrack Integration',company:'Cypress Lawn' });


  const message = {
      from: 'sangram.d@westagilelabs.com', 
      to: 'test@westagilelabs.com,ssd1110@gmail.com',
      subject: 'Mailtrack Integration-Mail rendered from view', 
      html: data
   };

   transport.sendMail(message, function(err, info) {
      if (err) {
        res.send(err);
      } else {
         res.send(info);
      }
  });
});

module.exports = router;
