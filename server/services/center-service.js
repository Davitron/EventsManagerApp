import Sequelize from 'sequelize';
import cloudinary from 'cloudinary';
import fs from 'fs';
import model from '../models';


const Centers = model.Center;
const Events = model.Event;
const States = model.State;

/**
 *
 */
export default class CenterService {
  /**
   *
   * @param {*} req
   * @param {*} imageUrl
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static create(req, imageUrl) {
    const facilityArr = req.body.facilities.split(',')
      .map(facility => facility.trim().toLowerCase())
      .filter(word => word !== ' ');
    return Centers.create({
      name: req.body.name,
      stateId: parseInt(req.body.stateId, 10),
      address: req.body.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10),
      carParkCapacity: parseInt(req.body.carParkCapacity, 10),
      facilities: facilityArr,
      image: imageUrl,
      createdBy: parseInt(req.decoded.id, 10),
      updatedBy: parseInt(req.decoded.id, 10),
      price: parseInt(req.body.price, 10)
    });
  }

  /**
   * @returns {json} returns an array of center objects
   */
  static getAll() {
    return Centers.findAll({
      attributes: ['id', 'stateId', 'name', 'image', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['statName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }]
    });
  }

  /**
   *
   * @param {*} id
   * @returns {json} returns a single center object
   */
  static getOne(id) {
    return Centers.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy', 'image'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['statName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }, {
        model: Events,
        as: 'events',
        attributes: ['id', 'eventName', 'startDate', 'endDate', 'status']
      }]
    });
  }

  /**
   *
   * @param {*} req
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static checkNameAvalability(req) {
    return Centers.findOne({
      where: {
        name: req.body.name,
        address: req.body.address,
        stateId: req.body.stateId,
        id: {
          [Sequelize.Op.ne]: req.params.centerId
        }
      }
    });
  }

  /**
   *
   * @param {*} body
   * @param {*} center
   * @param {*} data
   * @returns {json} returns center object if successful and error object if otherwise
   */
  static update(body, center) {
    let facilityArr;
    if (body.facilities) {
      facilityArr = body.facilities.split(',')
        .map(facility => facility.trim().toLowerCase())
        .filter(word => word !== ' ');
    }

    return center.update({
      name: body.name || center.name,
      stateId: parseInt(body.stateId, 10) || center.stateId,
      address: body.address || center.address,
      hallCapacity: parseInt(body.hallCapacity, 10) || center.hallCapacity,
      carParkCapacity: parseInt(body.carParkCapacity, 10) || center.carParkCapacity,
      facilities: facilityArr || center.facilities,
      image: body.image || center.image,
      updatedBy: parseInt(body.admin, 10) || center.updatedBy,
      price: parseInt(body.price, 10) || center.price
    });
  }

  /**
   *@returns {json} returns all states
   */
  static getAllStates() {
    return States.findAll({ limit: 37 });
  }

  /**
   * @param {*} imageUrl
   * @returns {*} get public id; for cloudinary update
   */
  static getPid(imageUrl) {
    const strArr = imageUrl.split('/');
    const img = strArr[strArr.length - 1].split('.');
    return img[0];
  }

  /**
   * @param {*} path
   * @returns {*} handles delete of media files
   */
  static async cleanUpFiles(path) {
    fs.unlink(path, (err) => {
      if (err) {
        console.log('ERROR DELETING FILE');
      } else {
        console.log('DELETED FILE SUCCESSFULLY');
      }
    });
  }

  /**
   *
   * @param {*} path
   * @returns {*} handles image upload
   */
  static handleImageUpload(path) {
    let imageLink = '';
    cloudinary.config({
      cloud_name: 'eventsmanager',
      api_key: '829791658334495',
      api_secret: 'yf6RHQWR4EFFUm3eLcCnz2e7GRI'
    });
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(path, (error, response) => {
        if (error) {
          reject(error);
        }
        this.cleanUpFiles(path);
        imageLink = response.url;
        resolve(imageLink);
      });
    });
  }

  /**
   *
   * @param {*} path
   * @param {*} currentImg
   * @returns {*} handles image upload
   */
  static handleImageUpdate(path, currentImg) {
    let imageLink = '';
    cloudinary.config({
      cloud_name: 'eventsmanager',
      api_key: '829791658334495',
      api_secret: 'yf6RHQWR4EFFUm3eLcCnz2e7GRI'
    });
    return new Promise((resolve, reject) => {
      if (currentImg === null || currentImg === undefined) {
        cloudinary.v2.uploader.upload(path, (error, response) => {
          if (error) {
            console.log(error);
          }
          this.cleanUpFiles(path);
          imageLink = response.url;
          resolve(imageLink);
        });
      } else {
        console.log('here');
        const publicId = this.getPid(currentImg);
        console.log(publicId);
        cloudinary.v2.uploader.upload(path, { public_id: publicId, invalidate: true }, (error, response) => {
          if (error) {
            reject(error);
          }
          console.log(response);
          this.cleanUpFiles(path);
          imageLink = response.url;
          resolve(imageLink);
        });
      }
    });
  }

  /**
   *
   * @param {*} imageLink
   * @returns {*} handles image upload
   */
  static handleImageDelete(imageLink) {
    const publicId = this.getPid(imageLink);
    cloudinary.config({
      cloud_name: 'eventsmanager',
      api_key: '829791658334495',
      api_secret: 'yf6RHQWR4EFFUm3eLcCnz2e7GRI'
    });
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
}
