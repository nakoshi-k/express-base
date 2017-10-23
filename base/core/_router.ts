import * as express from "express";
import * as sequelize from "sequelize";
import * as service from "./service";
import * as bodyParser from "body-parser";
import * as csurf from "csurf";
import * as inflection from "inflection";

import {system,helper} from "../core";

export abstract class router{


    mapping = {

    }
    middleWare = []
    create = () => {
        let router = express.Router()
    }


}

