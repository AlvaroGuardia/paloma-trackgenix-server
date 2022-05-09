const express = require('express');
const fs = require('fs');
const path = require('path');
const superAdmin = require('../data/super-admins.json');
// bringing the json data
const router = express.Router();
// Get all the super admin
router.get('/get', (req, res) => {
  res.send(superAdmin);
  // bringing the json data saved in the const superAdmin
});
// Obtain a super admin
router.get('/getById/:superAdminID', (req, res) => {
  const findsuperAdmin = parseInt(req.params.superAdminID, 10);
  const superAdminFound = superAdmin.find((superAdminPara) => superAdminPara.ID === findsuperAdmin);
  if (superAdminFound) {
    res.send(superAdminFound);
  } else {
    res.send('Super Admin is not found');
  }
});
// Create a super admin
router.post('/newSuperAdmin', (req, res) => {
  const newSuperAdmin = {
    ID: superAdmin.length + 1,
    Name: req.body.Name,
    LastName: req.body.LastName,
    email: req.body.email,
    Password: req.body.Password,
  };
  // console.log(path.resolve(__dirname))
  const file = fs.readFileSync(path.resolve(__dirname, '../data/super-admins.json'));
  // fs allows me to edit the file, readFileSync allows me to read it,
  // and path.resolve helps the program to find the file
  const data = JSON.parse(file);
  // converts the JSON in an array
  data.push(newSuperAdmin);
  const newData = JSON.stringify(data);
  fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'), newData, (err) => {
    if (err) {
      res.send(err);
    }
    // rewrites the file with the new array
  });
  res.send('New Super Admin was created successfully');
});
// Delete superAdmin
router.delete('/delete-superAdmin/:superAdminID', (req, res) => {
  const findSA = parseInt(req.params.superAdminID, 10);
  const filteredSA = superAdmin.filter((sa) => sa.ID !== findSA);
  if (superAdmin.length !== filteredSA.length) {
    fs.writeFile(path.resolve(__dirname, '../data/super-admins.json'), JSON.stringify(filteredSA), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super Admin deleted');
      }
    });
  } else {
    res.send('Could not delete the super admin because it was not found');
  }
});
module.exports = router;
// exports the router const with express and methods
