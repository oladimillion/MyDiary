import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// create reusable transporter object using the default SMTP transport


class NodeMailer{

  constructor(ReminderModel){
    this.reminderModel = new ReminderModel();
    this.reminderData = [];
    this.intervalID = null;

    this.interval = 1;

    this.getAll();

    if(process.env.NODE_ENV === "production"){
      this.watch();
    }

    this.sendMail = this.sendMail.bind(this);
  }

  createTransport(){
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        type: 'OAuth2',
        user: "oladimillion.dev@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 3000
      }
    }); 
  }

  getAll(){
    this.reminderModel.getAllUsersAndReminder()
      .then(data => {
        this.reminderData = data.rows;
      })
      .catch(err => {
        console.log(err)
      });
  }

  getOne(data){
    this.reminderModel
      .getOneUsersAndReminder({userId: data.user_id})
      .then(result => {
        this.updateOrAddReminderData(result.rows[0]);
      })
      .catch(err => {
        console.log(err)
      });
  }

  mailOptions(to) {
    return {
      from: '"MyDiary" <oladimillion.dev@gmail.com>', // sender address
      to : to.join(", "), // list of receivers
      subject: "Hey there", // Subject line
      text: "It's time to record your thought for today", // plain text body
      html: `
      <div style="font-size: 16px; font-weight: 600;">
        It's time to record your thought for today
      </div>
      ` // html body
    };
  }

  updateOrAddReminderData(data){
    let exist = false;
    this.reminderData = this.reminderData
      .map((value, index) => {
        if(value.user_id === data.user_id){
          exist = true;
          return data; 
        }
        return value;
      })

    if(!exist){
      this.reminderData.push(data);
    }
  }

  filterEmails(){
    return this.reminderData
      .filter(value => {
        return (
          this.getClientTime(value.time) ===
          this.getServerTime(value.zone_offset)
        );
      })
      .map(data => data.email);
  }


  sendMail(){
    return new Promise((resolve, reject) => {
      const transporter = this.createTransport();

      // setup email data
      const to = this.filterEmails();

      console.log(to);

      if(!to.length){
        resolve("no email");
      }

      const mailOptions = this.mailOptions(to);

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }

        if(info){
          // console.log('Message sent: %s', info.messageId);
          resolve("email sent");
        }
      });
    });
  }

  watch(){
    this.intervalID = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
      this.sendMail()
        .then((msg) => {
          console.log(msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }, this.minutesToMilliSeconds(this.interval));
  }

  fixTimeZone(time, offset){
    offset = 60000 * parseInt(offset);
    return new Date(time - offset).toTimeString();
  }

  hoursToMilliSeconds(hours){
    return 1000 * 60 * 60 * parseInt(hours);
  }

  minutesToMilliSeconds(minutes){
    return 1000 * 60 * parseInt(minutes);
  }

  getServerTime(zoneOffset){
    return this.fixTimeZone(new Date(), zoneOffset)
      .substring(0,5);
  }

  getClientTime(time){
    return time.substring(0,5);
  }

  getTimeMilliSeconds(timeString){
    timeString = timeString.split(":");
    return this.hoursToMilliSeconds(timeString[0]) +
      this.minutesToMilliSeconds(timeString[1]);
  }

  getMinutesMilliSeconds(time){
    return this.minutesToMilliSeconds(time.split(":")[1]);
  }

}



export default NodeMailer;





