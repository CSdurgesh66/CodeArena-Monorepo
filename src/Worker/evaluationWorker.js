const {Worker} = require('bullmq');

const redisConnection = require('../config/redisConfig');
const axios = require('axios');



function evaluationWorker(queuename){
    new Worker(
        queuename,
        async job => {
            console.log("Evaluation job worker kicking",job);
            if(job.name=='EvaluationJob'){

                try{
                    const response = await axios.post('http://localhost:3002/sendPayload',{
                        userId : job.data.userId,
                        payload:job.data
                    });
                    console.log(response);
                    

                }catch(error){
                    console.log(error);
                }

            }
        },{
            connection:redisConnection
        }
    )
}

module.exports = evaluationWorker;