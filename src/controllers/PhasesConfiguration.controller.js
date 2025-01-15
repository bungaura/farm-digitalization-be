const {
  phaseConfigurationService,
} = require("../services/PhasesConfiguration.service");

exports.addPhasesConfiguration = async function (req, res) {
  try {
    const result = await phaseConfigurationService.addPhasesConfiguration(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePhaseConfiguration = async function (req, res) {
  try {
    const result = await phaseConfigurationService.changePhaseConfiguration(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPhasesConfiguration = async function (req, res) {
  try {
    const result = await phaseConfigurationService.getPhasesConfiguration(
      req.params
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
