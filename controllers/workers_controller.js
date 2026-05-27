const Worker = require("../models/Workers");


const make_worker = async(req,res)=>{
    const {name} = req.body;
    try {
        const newWorker = new Worker({
            name:name
        })
        await newWorker.save();
        res.status(200).json({success:true, message: "Succesfully registered the worker into the database"});
    } catch (err) {
        console.log(err);
        res.status(400).json({err,success:false, message: "Unable to create worker because of error"});
    }
}


const get_workers = async(req,res)=>{  
    try {
        const workers = await Worker.find();
        res.status(200).json({workers, success:true, message:"Succesfully got all the workers"})
    } catch (err) {
        console.log(err);
        res.status(500).json({err, success:false, message:"Unable to get workers from the db because of Internal Server Error"});
    }
}
module.exports = {
    make_worker,
    get_workers
}