import validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import app from '../server';
import model from '../models';


dotenv.load();
const Users = model.User;

// compliance rule for user input
const newUserRules = {
  email: 'required|email',
  username: 'required|string|min:3|max:10',
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
  isAdmin: 'boolean'
};

const existingUserRules = {
  email: 'required|email',
  password: 'required|min:6'
};

/**
 *
 */
export default class UserController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @return {json} returns ststus and message
   */
  static create(req, res) {
    const validate = new validator(req.body, newUserRules);
    // check for user input compliance
    if (validate.passes()) {
      // check if user with email already exists
      return Users.findAll({
        where: {
          email: req.body.email
        }
      }).then((users) => {
        if (users.length > 0) {
          res.status(400).json({
            message: 'User with mail already exists' // to return this if user exists
          });
        }
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(403).json({ message: 'Passwords do not match' }); 
        }
        const newPassword = bcrypt.hashSync(req.body.password, 10); // hash password
        return Users.create({
          email: req.body.email,
          username: req.body.username,
          password: newPassword,
          isAdmin: Boolean(req.body.isAdmin) || false
        }).then(user => res.status(201).json({
          message: 'New User Is Created Successfully!', userDetails: user // to return this if user creation is successful
        })).catch(err => res.status(500).json({ message: 'Oops!, an error has occured', error: err }));
      });
    }
    return res.status(400).json({ message: validate.errors }); // to record this if validation fails
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @return {json} returns user object of authnticated user
   */
  static authenticate(req, res) {
    const validate = new validator(req.body, existingUserRules);
    console.log('users', Users);
    // check validation compliance
    if (validate.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email // check email availabilty
        },
      }).then((user) => {
        if (!user) {
          return res.status(400).json({ message: 'Invalid Login Credentials' }); // to retun this if user does not exist
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(400).json({ message: 'Invalid Password' });
        }
        // encode user info to geerated token
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ message: 'Authentication Is Successful!', userDetails: user, Token: token });
      }).catch(err => res.status(500).json({
        message: 'Oops!, an error has occured',
        error: err.name
      }));
    }

    res.status(400).json({ message: validate.errors });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns all users
   */
  static getUsers(req, res) {
    return Users.findAll().then((users) => {
      res.status(200).json(users);
    }).catch(err => res.status(500).json({
      message: 'Oops!, an error has occured',
      error: err.name
    }));
  }
}
