const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with MongoDB in production)
const users = new Map();
const diagnosisHistory = new Map();

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    let user = users.get(userId);
    
    if (!user) {
      // Create default user if not exists
      user = {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        avatar: null,
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          language: 'english'
        }
      };
      users.set(userId, user);
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    let user = users.get(userId) || {
      id: userId,
      createdAt: new Date().toISOString()
    };

    // Update user data
    user = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    users.set(userId, user);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user profile'
    });
  }
};

// Get diagnosis history
exports.getDiagnosisHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const userHistory = diagnosisHistory.get(userId) || [];
    
    const paginatedHistory = userHistory
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
      success: true,
      data: {
        total: userHistory.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        diagnoses: paginatedHistory
      }
    });

  } catch (error) {
    console.error('Error fetching diagnosis history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch diagnosis history'
    });
  }
};

// Save diagnosis
exports.saveDiagnosis = async (req, res) => {
  try {
    const { userId } = req.params;
    const diagnosisData = req.body;

    const diagnosis = {
      id: diagnosisData.id || uuidv4(),
      userId,
      plant: diagnosisData.plant,
      disease: diagnosisData.disease,
      confidence: diagnosisData.confidence,
      image: diagnosisData.image,
      solutions: diagnosisData.solutions || [],
      info: diagnosisData.info || '',
      date: diagnosisData.date || new Date().toISOString(),
      savedAt: new Date().toISOString()
    };

    const userHistory = diagnosisHistory.get(userId) || [];
    userHistory.push(diagnosis);
    diagnosisHistory.set(userId, userHistory);

    res.json({
      success: true,
      message: 'Diagnosis saved successfully',
      data: diagnosis
    });

  } catch (error) {
    console.error('Error saving diagnosis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save diagnosis'
    });
  }
};

// Delete diagnosis
exports.deleteDiagnosis = async (req, res) => {
  try {
    const { userId, diagnosisId } = req.params;

    const userHistory = diagnosisHistory.get(userId) || [];
    const updatedHistory = userHistory.filter(d => d.id !== diagnosisId);
    
    if (userHistory.length === updatedHistory.length) {
      return res.status(404).json({
        success: false,
        error: 'Diagnosis not found'
      });
    }

    diagnosisHistory.set(userId, updatedHistory);

    res.json({
      success: true,
      message: 'Diagnosis deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete diagnosis'
    });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const userHistory = diagnosisHistory.get(userId) || [];
    
    const stats = {
      totalScans: userHistory.length,
      savedDiagnoses: userHistory.length,
      plantsScanned: [...new Set(userHistory.map(d => d.plant))].length,
      diseasesByPlant: userHistory.reduce((acc, d) => {
        acc[d.plant] = (acc[d.plant] || 0) + 1;
        return acc;
      }, {}),
      recentActivity: userHistory
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(d => ({
          disease: d.disease,
          plant: d.plant,
          date: d.date
        }))
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user statistics'
    });
  }
};
