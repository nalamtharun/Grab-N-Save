const storeService = require('../data/storeService');

// @desc    Submit a user-found deal
// @route   POST /api/submissions
exports.createSubmission = async (req, res) => {
  try {
    const { storeName, title, code, discount, categoryName, affiliateUrl, expiryDate, submittedBy, notes } = req.body;

    if (!storeName || !title || !discount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide store name, title, and discount amount',
      });
    }

    const sub = await storeService.createSubmission({
      storeName,
      title,
      code: code ? code.trim().toUpperCase() : '',
      discount,
      categoryName: categoryName || 'General',
      affiliateUrl: affiliateUrl || '',
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      submittedBy: submittedBy || 'Community Member',
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Deal submitted for review! Thank you for contributing to the community.',
      data: sub,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit deal',
      error: error.message,
    });
  }
};

// @desc    Get all deal submissions (Admin)
// @route   GET /api/submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await storeService.getSubmissions();
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message,
    });
  }
};
