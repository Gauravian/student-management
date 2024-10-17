import { mysqlpool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import sendmailSecond from '../middlewares/sendmailSecond.js'
import sendMailThird from '../middlewares/sendMailThird.js'

export const Registration = async (req, res) => {
  try {
    const { email, name, password, role, std } = req.body;

    if (!email || !name || !password || !role || !std) {
      res.status(400).json({
        success: false,
        msg: "please Provide All messege",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);



    const [data] = await mysqlpool.query(
      "INSERT INTO details_management (email,name,password,role,std,isApproved) VALUES (?,?,?,?,?,?)",
      [email, name, hashpassword, role, std,'pending']
    );

    const otp = Math.floor(Math.random() * 1000000)

    const emailData = {
      name,
      otp
    }

    const [otpData] = await mysqlpool.query("INSERT INTO otp_management (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))",[email, otp]);


    await sendMail(
      email,
      'student management system',
      emailData
    )

    if (!data) {
      res.status(400).json({
        success: false,
        msg: "no data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Data Created Successfully...!!!",
      msg:"OTP Send To Your Mail...!!!",
      userData: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error,
    });
    console.log(error);
  }
};

export const verifyUser = async(req,res) => {
  try {

    const {otp} = req.body;
    

    if(!otp){
      res.status(400).json({
        success: false,
        msg: "please provide OTP ",
        error,
      });

    }

    const [otpData] = await mysqlpool.query(
      "SELECT otp, expires_at FROM otp_management WHERE otp = ?",
      [otp]
    );

    if (!otpData || otpData.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Invalid OTP",
      });
    }

    const { otp: storedOtp, expires_at: expiresAt } = otpData[0];


    // Check if OTP is expired
    if (new Date() > new Date(expiresAt)) {
      return res.status(400).json({
        success: false,
        msg: "OTP has expired",
      });
    }
    if (storedOtp.toString().trim() === otp.toString().trim()) {
      return res.status(201).json({
        success: true,
        msg: "OTP verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Invalid OTP",
      });
    }




  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error,
    });
  }

}

export const login = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      res.status(400).json({
        success: false,
        msg: "Please fill up all data",
      });
    }
    const [data] = await mysqlpool.query(
      "SELECT * FROM details_management WHERE email = ? AND role = ?",
      [email, role]
    );
    if (data.length === 0 || data[0].isApproved === 'pending' || data[0].isApproved === 'denied' && data[0].role !== 'admin') {
      return res.status(400).json({
        success: false,
        msg: "User not varified by Admin",
      });
    }
    const isMatch = await bcrypt.compare(password, data[0].password);
    if (!isMatch) {
      return res.status(404).json({ msg: "wrong password" });
    }
    if (!data) {
      res.status(400).json({
        success: false,
        msg: "Data not Found",
      });
    }
    const token = jwt.sign({ id: data[0].id, role: data[0].role }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });

    // Retrieve teacher's std (class/standard)
    const teacherStd = data[0].std;

    res.status(201).json({
      success: true,
      msg: "Login successful!",
      token: token,
      userData: data,
      teacherStd, // Include teacher's std in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
    console.log(error);
  }
};

export const Timetable = async (req, res) => {
  try {
    const [data] = await mysqlpool.query("SELECT * FROM time_table");

    if (!data) {
      return res.status(404).send({
        success: false,
        msg: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      msg: "Time Table  ",
      length: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
    console.log(error);
  }
};

export const Prof_Data = async (req, res) => {
  try {
    const [data] = await mysqlpool.query("SELECT * FROM prof_table");

    if (!data) {
      return res.status(404).send({
        success: false,
        msg: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      msg: "Time Table  ",
      length: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
    console.log(error);
  }
};

// export const authorization = (req,res,next) => {

//     try {

//         const token = req.headers.authorization;
//         console.log(token);
//         const verify = jwt.verify(token,process.env.JWT_TOKEN)
//         console.log(verify);

//     } catch (error) {

//     }

// }

export const getPendingRequests = async (req, res) => {
  try {
    const [data] = await mysqlpool.query(
      "SELECT * FROM details_management WHERE isApproved = 'pending'"
    );

    if(!data){
      res.status(400).json({
        success: false,
        msg: "No Records found",
      })
    }

    res.status(200).json({
      success: true,
      msg: "Pending requests retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error,
    });
  }
};


export const approveUser = async (req, res) => {
  const { email } = req.body; // Get the email from the request body
  try {
    // Update the user's approval status in the database
    await mysqlpool.query(
      "UPDATE details_management SET isApproved = 'approved' WHERE email = ?",
      [email]
    );

    const message = 'Congratulations! Your account has been approved. You can now log in.'

    // Send approval email
    await sendmailSecond(
      email,
      'Your Account Has Been Approved',
      message
    );

    
    

    res.status(200).json({
      success: true,
      msg: 'User approved successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
};


export const denyUser = async (req, res) => {
  const { email } = req.body; // Get the email from the request body
  try {
    // Update the user's approval status in the database
    await mysqlpool.query(
      "UPDATE details_management SET isApproved = 'denied' WHERE email = ?",
      [email]
    );

    const message = 'We regret to inform you that your account has been denied. Please contact support for further information.'

    // Send denial email
    await sendMailThird(
      email,
      'Your Account Has Been Denied',
      message
      
    );

    res.status(200).json({
      success: true,
      msg: 'User denied successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
};


export const Teacher = async (req, res) => {
  try {
    const [data] = await mysqlpool.query(
      "SELECT * FROM details_management WHERE role = 'Student' "
    );

    if(!data){
      res.status(400).json({
        success: false,
        msg: "No Records found",
      })
    }

    res.status(200).json({
      success: true,
      msg: "Pending requests retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error,
    });
  }
};



