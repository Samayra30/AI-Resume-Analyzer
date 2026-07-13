const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const crypto = require("crypto");

async function register(req,res){
    try{
        const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

async function login(req,res){
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({
            id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"}
    )
    res.json({token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
        
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports ={register, login}