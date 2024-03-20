const Team = require('../model/TeamModel');

module.exports.getWinners = async (req,res,next) => {
    try {
        const teams = await Team.find()
            .sort({ score: -1, updatedAt: 1 }) 
        res.json(teams);
    } catch (error) {
        next(error);
    }
}