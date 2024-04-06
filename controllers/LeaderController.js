const Team = require('../model/TeamModel');

module.exports.getWinners = async (req,res,next) => {
    try {
        const teams = await Team.find()
            .sort({ score: -1, updatedAt: 1 }) 
            teams.forEach(eachTeam => {
                eachTeam.members = [];
                eachTeam.teamCode = "";
            });
        res.json(teams);
    } catch (error) {
        next(error);
    }
}