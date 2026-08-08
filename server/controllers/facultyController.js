import faculty from "../models/faculty";
import Student from "../models/student";
import Subject from "../models/subject";
import attendance from "../models/attendance";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//login faculty
export const loginFaculty = async(req,res,next)=>{
    const {email,password} = req.body;
    const errors={usernameErr:String,passwordErr:String};
    try {
        const exsitingUser = await faculty.findOne({email:email});
         if(!exsitingUser){
        errors.usernameErr="user do not exist"
        return res.status(404).json(errors)
         }
        //password checking 
        const ismatch = bcrypt.compare(password,exsitingUser.password);
        if(!ismatch){
            errors.passwordErr = "wrong userName or password";
            return res.status(404).json(errors);
        }
        //token generation
        const token = jwt.sign({email:exsitingUser.email,id:exsitingUser._id},"secret",{expiresIn:"1h"});
        return res.status(200).json({result:exsitingUser,token:token});     
    } catch (error) {
        return res.status(500).json({message:"internal error"})
        
    }
}

//updated password
export const updatepassword =async(req,res,next)=>{
    const {newPassword,confirmedPassword,email} =req.body;
    const errors = { mismatchError: String };
    if(newPassword!== confirmedPassword){
        errors.mismatchError =
        "Your password and confirmation password do not match";
        return res.status(400).json(errors)
    }
    try {
        const updatedFaculty = await faculty.findOne({email:email});
        //hashing password
        const hashedPassword = await bcrypt.hash(newPassword,10);
        updatedFaculty.password = hashedPassword;
        await updatedFaculty.save();
        if(updatedFaculty.updatepassword ===false){
            updatedFaculty.updatepassword=true;
            await updatedFaculty.save();
        }
        return res.status(200).json({success:true,message:"password updated successfully",response:updatedFaculty}); 
        
    } catch (error) {
        const errors ={ backendError: String };
        error.backendError = error;
        return res.status(500).json(error);
        
    }

}

export const updateFaculty = async(req,res,next)=>{
    try {
        const {name,department,avatar,dob,contactNumber,email,designation}=req.body;
        const updatedFaculty = await faculty.findOne({email:email});
        if(name){
            updateFaculty.name=name;
            await updateFaculty.save();
        }
        if(department){
            updateFaculty.department= department;
            await updateFaculty.save();
        }
        if(avatar){
            updateFaculty.avatar=avatar;
            await updateFaculty.save();
        }
        if(dob){
            updateFaculty.dob =dob;
            await updateFaculty.save();
        }
        if(contactNumber){
            updateFaculty.contactNumber = contactNumber;
            await updateFaculty.save();
        }
        if(email){
            updateFaculty.email=email;
            await updateFaculty.save();
        }
        if(designation){
            updateFaculty.designation=designation;
            await updateFaculty.save();
        }
        res.status(200).json(updateFaculty);
        
    } catch (error) {
        const errors ={ backendError: String };
        error.backendError = error;
        return res.status(500).json(error);
        
        
    }

}
