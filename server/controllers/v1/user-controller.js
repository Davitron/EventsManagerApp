import validator from 'validatorjs';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import model from '../../models';
import Mailer from '../../services/mail-service';
import * as mailTemplate from '../../config/mail-template';
import Pagination from '../../services/pagingService';


dotenv.load();
const Users = model.User;

const mailer = new Mailer();

// compliance rule for user input
const newUserRules = {
  email: 'required|email',
  username: 'required|string|min:3|max:16',
  password: 'required|min:6',
  confirmPassword: 'required|min:6',
  isAdmin: 'boolean'
};

const existingUserRules = {
  email: 'required|email',
  password: 'required'
};

const resetPasswordRules = {
  email: 'required|email',
};

const passwordResetRules = {
  password: 'required|min:6'
};

/**
 * @exports
 *
 * @class
 *
 */
export default class UserController {
  /**
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @return {json} returns ststus and message
   */
  static create(req, res) {
    const { Op } = Sequelize;
    const validate = new validator(req.body, newUserRules);
    if (validate.passes()) {
      return Users.findAll({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
        }
      }).then((users) => {
        if (users.length > 0) {
          res.status(400).json({ message: 'email or username already taken', statusCode: 400 });
        } else if (req.body.password !== req.body.confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match', statusCode: 400 });
        } else {
          const newPassword = bcrypt.hashSync(req.body.password, 10); // hash password
          return Users.create({
            email: req.body.email,
            username: req.body.username,
            password: newPassword,
            isAdmin: Boolean(req.body.isAdmin) || false
          }).then((user) => {
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
            const message = mailTemplate.messageBody.accountCreated(user.username, token);
            mailer.sendMail(user.email, message, 'Welcome to EventsManager');
            const userDetails = {
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              isVerified: user.isVerified
            };
            return res.status(201).json({
              message: 'User registration successfull. An email has been sent for verification',
              userDetails,
              token,
              statusCode: 201
            });
          });
        }
      });
    }
    return res.status(400).json({ message: validate.errors, statusCode: 400 });
  }

  /**
   *
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @return {json} returns user object of authnticated user
   */
  static authenticate(req, res) {
    const validate = new validator(req.body, existingUserRules);
    if (validate.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email
        },
      }).then((user) => {
        if (!user) {
          return res.status(400).json({ message: 'Invalid Login Credentials', statusCode: 400 });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(400).json({ message: 'Invalid Login Credentials', statusCode: 400 });
        }
        const token =
        jwt.sign({
          id: user.id,
          isAdmin: user.isAdmin,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified
        }, process.env.SECRET_KEY, { expiresIn: '1d' });
        const userDetails = {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified
        };
        res.status(200).json({
          message: 'Authentication Is Successful!',
          userDetails,
          Token: token,
          statusCode: 200
        });
      });
    }
    res.status(400).json({ message: validate.errors, statusCode: 400 });
  }

  /**
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} complete user registration
   */
  static completeRegistration(req, res) {
    return Users.findOne({
      where: {
        email: req.decoded.email
      }
    }).then((user) => {
      if (user.isVerified === true) {
        return res.status(400).json({ message: 'User is already verified' });
      }
      return user.update({
        isVerified: true
      }).then(() => {
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({
          message: 'Welcome to Event Manager',
          user: user.username,
          Token: token,
          statusCode: 200
        });
      });
    }).catch(err => res.status(500).json({
      message: 'Oops!, an error has occured',
      error: err.name,
      statusCode: 500
    }));
  }

  /**
   *
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {json} returns all users
   */
  static getUsers(req, res) {
    const limit = parseInt(req.query.limit, 10) || 1;
    let offset = 0;
    const currentPage = parseInt(req.query.page, 10) || 1;
    offset = limit * (currentPage - 1);
    return Users.findAndCountAll({ limit, offset })
      .then((users) => {
        if (users.rows < 1) {
          res.status(200).json({
            message: 'Users Retrieved',
            data: null,
            meta: null,
            statusCode: 200,
          });
        }
      });
  }


  /**
   *
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {json} returns message object id deletion is successful
   */
  static delete(req, res) {
    // to check if user is an admin
    if (req.decoded.isAdmin === true) {
      return Users.findById(req.params.userId)
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'User does not exist',
              statusCode: 404
            });
          }
          user.destroy()
          // to return this center is deleted successfully
            .then(() => res.status(200).json({ message: 'User is successfully  deleted', statusCode: 200 }))
            .catch(error => res.status(500).json({ message: 'Internal Server Error', error, statusCode: 500 }));
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error', error, statusCode: 500 }));
    }
    return res.status(401).json({ message: 'Not an admin', statusCode: 401 });
  }

  /**
   *
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {json} returns message object id deletion is successful
   */
  static resetPasswordRequest(req, res) {
    const validate = new validator(req.body, resetPasswordRules);
    if (validate.passes()) {
      return Users.findOne({
        where: {
          email: req.body.email
        }
      })
        .then((user) => {
          if (user) {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });
            const message = mailTemplate.messageBody.resetPassword(user.username, token);
            mailer.sendMail(user.email, message, 'Password Reset Link');
            return res.status(200).json({ message: 'Password reset link is sent', statusCode: 200, token });
          }
          return res.status(404).json({ message: 'User does not exist', statusCode: 404 });
        });
    }
    return res.status(400).json({ message: validate.errors, statusCode: 400 });
  }

  /**
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {json} returns message object id deletion is successful
   */
  static resetPassword(req, res) {
    const validate = new validator(req.body, passwordResetRules);
    if (validate.passes()) {
      return Users.findOne({
        where: {
          email: req.decoded.email
        }
      })
        .then(user => user.update({ password: bcrypt.hashSync(req.body.password, 10) })
          .then(() => {
            res.status(200).json({ message: 'Password reset successful. Now redirecting....', statusCode: 200 });
          })
          .catch(err => res.status(500).json({ message: 'Oops!, an error has occured', error: err.name, statusCode: 500 })));
    }
    return res.status(400).json({ message: validate.errors, statusCode: 400 });
  }
}
