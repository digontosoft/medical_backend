const Software = require('../models/Software');

// Get all software entries
exports.getAllSoftware = async (req, res) => {
  try {
    const software = await Software.find().sort({ createdAt: -1 });
    res.status(200).json(software);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching software data', error: error.message });
  }
};

// Get a single software entry by ID
exports.getSoftwareById = async (req, res) => {
  try {
    const software = await Software.findById(req.params.id);
    if (!software) {
      return res.status(404).json({ message: 'Software not found' });
    }
    res.status(200).json(software);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching software data', error: error.message });
  }
};

// Create a new software entry
exports.createSoftware = async (req, res) => {
  try {
    const newSoftware = new Software(req.body);
    const savedSoftware = await newSoftware.save();
    res.status(201).json(savedSoftware);
  } catch (error) {
    res.status(400).json({ message: 'Error creating software entry', error: error.message });
  }
};

// Update a software entry
exports.updateSoftware = async (req, res) => {
  try {
    const updatedSoftware = await Software.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSoftware) {
      return res.status(404).json({ message: 'Software not found' });
    }
    
    res.status(200).json(updatedSoftware);
  } catch (error) {
    res.status(400).json({ message: 'Error updating software entry', error: error.message });
  }
};

// Delete a software entry
exports.deleteSoftware = async (req, res) => {
  try {
    const software = await Software.findByIdAndDelete(req.params.id);
    
    if (!software) {
      return res.status(404).json({ message: 'Software not found' });
    }
    
    res.status(200).json({ message: 'Software deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting software', error: error.message });
  }
}; 