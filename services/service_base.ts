import * as express from "express";
import * as sequelize from "sequelize";

export class service_base{
    public models:sequelize.ModelsHashInterface;    
    constructor () {
        let models = require('../models');
        this.models = models;
    }
}