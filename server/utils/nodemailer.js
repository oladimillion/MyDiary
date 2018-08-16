import nodemailer from "nodemailer";
import dotenv from "dotenv";

import config from "./nodemailer.config";

dotenv.config();

// create reusable transporter object using the default SMTP transport


class NodeMailer{

  constructor(ReminderModel){
    this.transporter = this.createTransport();

    this.reminderModel = new ReminderModel();
    this.reminderData = [];
    this.intervalID = null;

    this.interval = 1;

    this.getAll();
    this.watch();

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
        clientId: config.CLIENT_ID || process.env.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET || process.env.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN || process.env.REFRESH_TOKEN,
        accessToken: config.ACCESS_TOKEN || process.env.ACCESS_TOKEN,
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
      to, // list of receivers
      subject: "Hey there", // Subject line
      text: "It time to record your thought for today", // plain text body
      html: `
      <div style="font-size: 16px; font-weight: 600;">
        It time to record your thought for today
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
          this.isGreaterOrEqual(
            this.getClientTime(value.time),
            this.getServerTime(value.zone_offset)
          ) 
          && 
          (
            this.getMinutesMilliSeconds(value.time)
            - this.getMinutesMilliSeconds(
              this.getServerTime(value.zone_offset)
            ) <=  
              this.minutesToMilliSeconds(this.interval)
          )
          && 
          (
            this.getMinutesMilliSeconds(value.time)
            - this.getMinutesMilliSeconds(
              this.getServerTime(value.zone_offset)
            ) >  0
          )
        );
      })
      .map(data => data.email);
  }


  sendMail(callback){

    // setup email data
    const to = this.filterEmails();

    console.log("SEND ---- EMAIL")
    // console.log(this.reminderData);
    console.log(to);
    console.log("SEND ---- EMAIL")

    if(!to.length){
      return;
    }

    let mailOptions = this.mailOptions(to);

    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("NodeMailer:ERROR: ", error);
        callback(error, null)
      }

      if(info){
        console.log('Message sent: %s', info.messageId);
        callback(null, info.messageId);
      }
    });
  }

  watch(){
    this.intervalID = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
      this.sendMail((err, success) => {
      })
    }, this.minutesToMilliSeconds(this.interval))
  }

  fixTimeZone(time, offset){
    offset = 60000 * parseInt(offset);
    return new Date(time - offset).toTimeString();
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

  isGreaterOrEqual(local, server){
    local = local.split(":");
    server = server.split(":");

    return parseInt(local[0]) >= parseInt(server[0]);
  }

}



export default NodeMailer;





