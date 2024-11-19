const express=require('express');
const Task=require('../../models/Task');
const authenticateToken=require('../../middleware/auth');
const { findByIdAndDelete } = require('../../models/User');

const router=express.Router();

//create task
router.post('/', authenticateToken,  async(req,res)  =>{
    try{
        const task= new Task({...req.body, userId:req.user._id});
        await  task.save();
        res.status(201).json(task);
    }
    catch(error){
        res.status(400).json({message:"Something went wrong"})
    }
})

//gets all tasks
router.get('/', authenticateToken, async(req,res) =>{
    try{
        const getAllTasks= await Task.find({userId:req.user._id})
        res.json(getAllTasks)
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
})

//gets one task
router.get('/:id', authenticateToken, async(req,res) =>{
    try{
        const userId=req.user._id;
        const taskId=req.params.id;
        const task=await Task.findOne({_id:taskId, userId:userId});
        if(task){
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json({message:"Task not found"})
        }
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"})
    }
})

//update task
router.put('/:id', authenticateToken, async(req,res)  =>{
    try{
        const id=req.params.id;
        const userBody=req.body;
        const updateTask=await Task.findByIdAndUpdate(id,userBody, {
            new:true,
        });
        if(updateTask){
            return  res.json(updateTask)
        }
        else{
            return res.status(404).json({message:"Task not found"})
        }

    }
    catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
})

//delete task
router.delete('/:id', authenticateToken, async(req,res) =>{
    try{
        const id=req.params.id;
        const deleteTask= await Task.findByIdAndDelete(id);
        if(deleteTask){
            return res.status(200).json({message:"Task is deleted"})
        }
        else{
            return res.status(404).json({message:"Task not found"})
        }
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
})

module.exports=router;