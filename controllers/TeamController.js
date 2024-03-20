const Team = require('../model/TeamModel');
const User = require('../model/UserModel');
const randomstring = require("randomstring"); 
const jwt = require('jsonwebtoken');

module.exports.createTeam = async (req,res,next)=>{
    try {
        if(!req.headers.userid){
           return res.status(404).json({error : "Cookie error", status : false})
        }
        else{
        const user_id = req.headers.userid;
        if (!user_id) {
            return res.status(400).json({ error: 'Id is required.' });
        }

        const existingUser = await User.findOne({ _id: user_id });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if the user is already in a team
        const existingTeam = await Team.findOne({ 'members': user_id });
        if (existingTeam) {
            return res.status(400).json({ error: 'User is already in a team.' });
        }

        const {teamName} = req.body;
        
        const teamCode = randomstring.generate({
            length: 6,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        })
        const newTeam = new Team({
            teamName: teamName,
            teamCode: teamCode,
            members: [ existingUser ],
            teamHead:existingUser
        });

        await newTeam.save();
        const teamid = await Team.findOne({teamCode});
        // res.cookie('teamid',teamid._id,{httpOnly:true});

        res.status(201).json({ message: 'Team created successfully.', newTeam:{...newTeam,id:teamid._id}});
    }
    } catch (error) {
        next(error);
    }
}

module.exports.joinTeam = async (req,res,next)=>{
    try {
        
        if(req.headers.userid)
        {
        const {teamCode}=req.body;
        const team = await Team.findOne({teamCode:teamCode});
        if(!team)
        {
          return res.json({
            message:"Team not found",
            status:false
          })
        }
        if(team.members.length===3){
                return res.json({
                    message:"Team Limit Exceeded",
                    status:false
                })
        }
        if (team.members.some(member => member.equals(req.headers.userid))) {
            return res.status(400).json({ error: 'User is already a member of the team.' });
        }

        //Add the new member to the team
        team.members.push(req.headers.userid);
        await team.save();
        //res.cookie('teamid',team._id,{httpOnly:true});
        return res.json({
            message : "Team updated successfully",
            status : true,
            team:{...team,id:team._id}
        })
        
    }
    else{
        return res.json({
            message:"User not found",
            status:false
        })
    }
 } catch (error) {
        next(error);
    }
}