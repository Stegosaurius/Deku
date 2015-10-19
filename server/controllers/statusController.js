var Status = require('../models/statusModel');

module.exports = {

  getStatuses: function (req, res) {
    var id = req.params.id;
    Status.getStatuses(id, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(statuses);
      }
    })
  },

  updateStatus: function (req, res) {
    var id = req.params.id;
    Status.addStatus(req.body, function (err, status) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(status);
      }
    })
  }

}