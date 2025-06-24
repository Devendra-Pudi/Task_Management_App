const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    // Log the request data in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating task with data:', {
        body: req.body,
        user: req.user.id
      });
    }

    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    // Create the task with user ID
    const taskData = {
      ...req.body,
      createdBy: req.user.id,
      status: req.body.status || 'To Do',
      priority: req.body.priority || 'Medium'
    };

    const task = await Task.create(taskData);

    // Log success in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Task created successfully:', task);
    }

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
};
