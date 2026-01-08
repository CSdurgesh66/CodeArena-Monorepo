const NotImplemented = require("../errors/notImplemented.error");

function pingProblemController(req,res){
    return res.json({message:'Ping controller is up'});
}

function addProblem(req,res,next){
    try{

        throw new NotImplemented('addProblem')

    }catch(error){
        next(error);
    }
}

function getProblem(req,res,next){

}

function getProblems(req,res,next){

}

function deleteProblem(req,res,next){

}

function updateProblem(req,res){

}


module.exports = {
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}

