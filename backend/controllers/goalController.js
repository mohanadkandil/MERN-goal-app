const asyncHandler = require('express-async-handler');

// get the goal model and use it with mongoose methods
const Goal = require('../model/goalModel');
const User = require('../model/userModel');

// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    // find the user link with the goal model
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc   Set Goal
// @route  POST /api/goals/
// @access Private
const setGoal = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    console.log(req.body);

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc   Update Goal
// @route  PUT /api/goals/Lid
// @access Private
const updateGoal = asyncHandler(async (req, res) => {

    // Get the goal by the id in the URL
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user 
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    // Find the goal by id and updated, {new: true} if the goal is not in the DB, create one
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.status(200).json(updatedGoal);
})

// @desc  Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {

    // Get the id of the goal to make the operation(delete)
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user 
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    // mongoose remove command
    goal.remove();
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    updateGoal,
    deleteGoal,
    setGoal
}