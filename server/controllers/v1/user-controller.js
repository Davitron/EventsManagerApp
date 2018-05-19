import validator from 'validatorjs';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import model from '../../models';
import Mailer from '../../services/mail-service';
import * as mailTemplate from '../../config/mail-template';
import Pagination from '../../services/pagingService';
import validatonRules from './validation-rules';


dotenv.load();
const Users = model.User;

const mailer = new Mailer();

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
   *
   * @return {json} returns ststus and message
   */
  static handleUserInsert(req, res) {
    Users.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.hashedPassword,
      isAdmin: Boolean(req.body.isAdmin) || false
    })
      .then((user) => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
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
  /**
   * @memberOf UserController
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @param {function} next - call the next function
   *
   * @return {json} returns ststus and message
   */
  static validateNewUser(req, res, next) {
    const { Op } = Sequelize;
    return Users.findAll({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
      }
    }).then((users) => {
      if (users.length > 0) {
        res.status(409).json({ message: 'email or username already taken', statusCode: 409 });
      } else if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match', statusCode: 400 });
      } else {
        req.body.hashedPassword = bcrypt.hashSync(req.body.password, 10);
        next();
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
   * @return {json} returns user object of authnticated user
   */
  static authenticate(req, res) {
    return Users.findOne({
      where: {
        email: req.body.email
      },
    }).then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid Login Credentials', statusCode: 401 });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ message: 'Invalid Login Credentials', statusCode: 401 });
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

  /**
   * @memberof UserController
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
        return res.status(409).json({ message: 'User is already verified', statusCode: 409 });
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
    return Users.findAndCountAll({
      attributes: ['id', 'username', 'email', 'isAdmin', 'isVerified'],
      limit: req.meta.limit,
      offset: req.meta.offset
    })
      .then((users) => {
        if (users.rows < 1) {
          res.status(400).json({
            message: 'No Users Found',
            data: null,
            meta: null,
            statusCode: 400,
          });
        }
        res.status(200).json({
          message: 'Users Retrieved',
          data: users.rows,
          metaData: {
            pagination: Pagination.createPagingData(users, req.meta),
          },
          statusCode: 200
        });
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
    return Users.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User does not exist',
            statusCode: 404
          });
        }
        user.destroy()
          .then(() => res.status(200).json({ message: 'User is successfully  deleted', statusCode: 200 }));
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
  static resetPasswordRequest(req, res) {
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
    const validate = new validator(req.body, validatonRules.passwordReset);
    if (validate.passes()) {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match', statusCode: 400 });
      }
      return Users.findOne({
        where: {
          email: req.decoded.email
        }
      })
        .then(user => user.update({ password: bcrypt.hashSync(req.body.password, 10) })
          .then(() => {
            res.status(200).json({ message: 'Password reset successful. You can proceed to Login', statusCode: 200 });
          })
          .catch(err => res.status(500).json({ message: 'Oops!, an error has occured', error: err.name, statusCode: 500 })));
    }
    return res.status(400).json({ message: validate.errors, statusCode: 400 });
  }
}
