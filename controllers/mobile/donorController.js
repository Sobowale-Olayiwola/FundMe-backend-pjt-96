require("express-async-errors");
const DonorService = require("../../services/mobile/donorService");

module.exports = class DonorController {
  static async createDonorProfile(request, response) {
    let Donor = await DonorService.createDonorProfile(request.body);
    response.status(201).json({ code: "SUCCESS", success: Donor, error: null });
  }

  static async getAllDonors(request, response) {
    try {
      let Donor = await DonorService.getAllDonors();

      response
        .status(200)
        .json({ code: "SUCCESS", success: Donor, error: null });
    } catch (error) {
      response.status(500).json({
        code: "FAILED",
        success: null,
        error:
          error.message ||
          " You cannot get all the list of Donors at the moment",
      });
    }
  }

  static async getDonorById(request, response) {
    let userId;
    try {
      if (request.params.id) {
        userId = request.params.id;
      } else if (request.userId) {
        userId = request.userId;
      }
      let Donor = await DonorService.getDonorById(userId);
      Donor.password = null;
      response.status(200).json({
        code: "SUCCESS",
        success: Donor,
        token: request.token,
        error: null,
      });
    } catch (error) {
      response.status(500).json({
        code: "FAILED",
        success: null,
        error:
          error.message ||
          "You cannot access this Donor's account at the moment",
      });
    }
  }

  static async deleteDonorById(request, response) {
    let userId;
    try {
      if (request.params.id) {
        userId = request.params.id;
      } else if (request.userId) {
        userId = request.userId;
      }
      let Donor = await DonorService.deleteDonorById(userId);
      response
        .status(200)
        .json({ code: "SUCCESS", success: Donor, error: null });
    } catch (error) {
      response.status(500).json({
        code: "FAILED",
        success: null,
        error:
          error.message ||
          "You cannot delete this Donor's account at the moment",
      });
    }
  }

  static async updateDonorByid(request, response) {
    let userId;
    try {
      if (request.params.id) {
        userId = request.params.id;
      } else if (request.userId) {
        userId = request.userId;
      }
      let Donor = await DonorService.updateDonorById(userId, request.body);
      response
        .status(200)
        .json({ code: "SUCCESS", success: Donor, error: null });
    } catch (error) {
      response.status(500).json({
        code: "FAILED",
        success: null,
        error:
          error.message ||
          "You cannot access this Donor's account at the moment",
      });
    }
  }
};
