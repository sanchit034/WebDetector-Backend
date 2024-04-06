const Quiz = require('../model/QuizModel');
const Question = require('../model/QuestionModel');
const Users = require('../model/UserModel');
const bcrypt = require('bcrypt');
const Team = require('../model/TeamModel');


module.exports.fetchQuestion = async (req, res, next) => {
    try {
        const set = req.params.set;
        const testStartTime = new Date('2024-04-06T19:25:00'); // Set the desired start time
        const currentTime = new Date();
        console.log(currentTime + " " + testStartTime)
        if (currentTime < testStartTime) {
            return res.status(403).json(
                {
                    message: 'Test is not available yet', status: false
                }
            );
        }
        if (!set) {
            return res.status(400).json({ message: 'You have not provided set' });
        }

        const teamid = req.headers.teamid;
        const userid = req.headers.userid;
        //check if correct or not9
        console.log({ teamid, userid });
        let maxScore=0;
        const documents = await Quiz.find({ team: teamid });
        if (documents.length === 0) {
            maxScore = 0;
            const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
            //update the score of the user
            const updatedAnswer = await Quiz.findOneAndUpdate(
                { team: teamid },
                { $set: { score: maxScore } },
                { new: true }
            );
            if (!updatedAnswer) {
                console.log("User data not updated")
            }
            let quesHint = [];
            const lastUpdatedTimeStamp = new Date("2024-04-05T22:00:00");
            const timeDiff = (currentTime.getTime() - lastUpdatedTimeStamp.getTime()) / 1000;
            if(timeDiff > 300) {
                quesHint.push(question.queHint[0]);
                if(timeDiff > 600) {
                    quesHint.push(question.queHint[1]);
                    if(timeDiff > 900) {
                        quesHint.push(question.queHint[2]);
                    }
                }
            }
            return res.json({
                message: "Question found",
                status: true,
                questionNo: question.queNo,
                questionURL: question.queUrl,
                questionHint: quesHint,
                lastUpdated: testStartTime
            });
        }
        maxScore = documents[0].score;
        const teamDetails = await Team.find({_id:teamid});
        const lastUpdatedTime = teamDetails[0].updatedAt;

        for (let i = 1; i < documents.length; i++) {
            maxScore = Math.max(maxScore, documents[i].score);
        }

        //check if the score of the user is less than maxscore then 
        //show the latest question to the user
        console.log(maxScore);


        const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        //update the score of the user
        const updatedAnswer = await Quiz.findOneAndUpdate(
            { team: teamid },
            { $set: { score: maxScore } },
            { new: true }
        );
        if (!updatedAnswer) {
            console.log("User data not updated")
        }
        let quesHint = [];
        const lastUpdatedTimeStamp = new Date(lastUpdatedTime);
        const timeDiff = (currentTime.getTime() - lastUpdatedTimeStamp.getTime()) / 1000;
        if(timeDiff > 300) {
            quesHint.push(question.queHint[0]);
            if(timeDiff > 600) {
                quesHint.push(question.queHint[1]);
                if(timeDiff > 900) {
                    quesHint.push(question.queHint[2]);
                }
            }
        }
        return res.json({
            message: "Question found",
            status: true,
            questionNo: question.queNo,
            questionURL: question.queUrl,
            questionHint: quesHint,
            lastUpdated: lastUpdatedTime
        });

    } catch (error) {
        next(error);
    }
}

// API to check user's answer and fetch the next question
module.exports.checkAnswerAndFetchNext = async (req, res, next) => {
    try {
        const set = req.params.set;
        const userAnswer = req.body.answer; // Assuming you send the user's answer in the request body

        if (!set || !userAnswer) {
            return res.status(400).json({ message: 'You have not provided set or answer or queNo' });
        }
        const teamid = req.headers.teamid;
        const userid = req.headers.userid;
        
        const documents = await Quiz.find({ team: teamid });
        let maxScore=0;
        if (documents.length === 0) {
            maxScore=0;
            const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
    
    
            // Check if the user's answer matches the correct answer
            console.log(userAnswer)
            const useranswer = userAnswer.toLowerCase();
    
            const validAnswer = await bcrypt.compare(useranswer, question.queAns)
            console.log(validAnswer)
            if (validAnswer) {
                 
                const updateTeamData = await Team.findOneAndUpdate({_id:teamid},{score:maxScore+1})
                // if(updateTeamData){
                //     res.json({msg:"Team Data Updated"});
                // }
                const userres = new Quiz({
                    team: teamid,
                    answer: useranswer,
                    user: userid,
                    score: maxScore + 1
                })
                userres.save();
    
                return res.json({
                    message: "Answer is correct",
                    status: true,
                    set: set
                })
    
            }
            return res.json({
                message: "Your answer is incorrect",
                status: false
            });
        }
            maxScore = documents[0].score;

            for (let i = 1; i < documents.length; i++) {
                maxScore = Math.max(maxScore, documents[i].score);
            }

            //check if the score of the user is less than maxscore then 
            //show the latest question to the user
            console.log(maxScore);
        
    
        const question = await Question.findOne({ set: set, queNo: maxScore + 1 });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }


        // Check if the user's answer matches the correct answer
        console.log(userAnswer)
        const useranswer = userAnswer.toLowerCase();

        const validAnswer = await bcrypt.compare(useranswer, question.queAns)
        console.log(validAnswer)
        if (validAnswer) {
            const updateTeamData = await Team.findOneAndUpdate({_id:teamid},{score:maxScore+1})
            const checkuser = await Quiz.findOne({user:userid})
            if(checkuser){
                const updateUserData = await Quiz.findOneAndUpdate({user:userid},{score:maxScore+1})
                return res.json({
                message: "Answer is correct",
                status: true,
                set: set
                })
            }

            const userres = new Quiz({
                team: teamid,
                answer: useranswer,
                user: userid,
                score: maxScore + 1
            })
            userres.save();

            return res.json({
                message: "Answer is correct",
                status: true,
                set: set
            })

        }
        return res.json({
            message: "Your answer is incorrect",
            status: false
        });
    } catch (error) {
        next(error);
    }
}
