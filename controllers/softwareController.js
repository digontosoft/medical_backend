const Software = require('../models/Software');
const OpenAI = require('openai');
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
    const { name, description, version, author, status, repository_url } = req.body;
    // try {
    //   const openai = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    //   });

    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //       {
    //         role: "system",
    //         content: "You are a medical software risk assessment expert. Respond only with 'HIGH_RISK' or 'LOW_RISK'."
    //       },
    //       {
    //         role: "user", 
    //         content: `Analyze this medical software description and determine if it is high risk or low risk: ${description}`
    //       }
    //     ],
    //     temperature: 0,
    //     max_tokens: 10
    //   });

    //   const riskLevel = response.choices[0].message.content.trim();
    //   console.log("riskLevel",riskLevel)
      
    //  // Add risk level to request body
    //   // req.body.riskLevel = riskLevel;

    // } catch (aiError) {
    //   console.error('OpenAI API Error:', aiError);
    //   return res.status(500).json({ message: 'Error analyzing risk level', error: aiError.message });
    // }
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

    const sendEmail = require("../utils/sentEmail");
    const message = `
    <html>
    <body>
      <p>Software Details:</p>
      <p>Name: ${updatedSoftware.name}</p>
      <p>Version: ${updatedSoftware.version}</p>
      <p>Medical Use Cases: ${updatedSoftware.medicalUseCases}</p>
      <p>Status: Your software submission has been ${updatedSoftware.status === 'approved' ? 'ACCEPTED' : 'REJECTED'}</p>
    </body>
    </html>
    `

    await sendEmail({
      email: req.body.emailAddress,
      subject: "Software Submission Status",
      message,
    });

    
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