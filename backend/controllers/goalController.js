const asyncHandler = require('express-async-handler');

// get the goal model and use it with mongoose methods
const Goal = require('../model/goalModel');

// @desc  Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find() // find all goals in the db

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
        text: req.body.text
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

    // Find the goal by id and updated, {new: true} if the goal is not in the DB, create one
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.status(200).json(updateGoal);
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