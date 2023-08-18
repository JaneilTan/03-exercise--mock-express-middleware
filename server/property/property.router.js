const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorizationMiddleware");

const getProperty = async () => {
  try {
    const result = await db.query(
      `SELECT
        id,
        address,
        asking_price AS "askingPrice",
        description,
        img,
        title
      FROM property 
      ORDER BY
        id
      `
    );
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const createProperty = async (property) => {
  try {
    const { address, askingPrice, description, img, title } = property;
    const newProperty = await db.query(
      `INSERT INTO 
        property (address, asking_price, description, img, title) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING
         id,
         address,
         asking_price AS "askingPrice",
         description,
         img,
         title`,
      [address, askingPrice, description, img, title]
    );
    return newProperty.rows[0];
  } catch (error) {
    throw Error(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperty();

    return res.json(properties);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkJwt, checkScopes, async (req, res, next) => {
  try {
    const property = await createProperty(req.body);

    return res.status(201).json(property);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
