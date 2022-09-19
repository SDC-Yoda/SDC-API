const pool = require('../db.js')
module.exports = {
  getProduct: (req, res) => {
    const query = {
      text: `SELECT products.id, name, slogan, description, category, default_price, json_agg(json_build_object('feature', feature, 'value', value)) as features
      FROM products
      LEFT JOIN features
      ON products.id = features.product_id
      WHERE products.id = $1
      GROUP BY products.id`,
      values: [req.params.product_id]
    }
    pool.query(query)
      .then((response) => {
        res.send(response.rows[0]);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  },
  getProducts: (req, res) => {
    const last =  (req.params.quantity * req.params.page + 1 || 6);
    const first = last - req.params.quantity - 1 || 0;
    const query = {
      text: `SELECT * FROM products
      WHERE id > $1 AND id < $2`,
      values: [first, last],
    }
    pool.query(query)
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  },
  getStyle: (req, res) => {
    const returnObject = {
      product_id: req.params.product_id,
      results: [],
    }
    const query = {
      text: `SELECT DISTINCT ON(style_id) style_id, name, sale_price, original_price, default_style, json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos,
      json_object_agg(skus.id, json_build_object('size', size, 'quantity', quantity)) as skus
            FROM styles
            LEFT JOIN photos
            ON styles.style_id = photos.styleid
          LEFT JOIN skus
            ON styles.style_id = skus.styleid
            WHERE product_id = $1
            GROUP BY style_id, photos.id
          ORDER BY style_id`,
      values: [req.params.product_id]
    }
    pool.query(query)
      .then((response) => {
        returnObject.results = response.rows;
        res.send(returnObject);
      })
      .catch((err) => {
        res.status(500).send(err);
      })

  },
  getRelated: (req, res) => {
    const query = {
      text: `SELECT
      ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = $1`,
      values: [req.params.product_id],
    }
    pool.query(query)
    .then((response) => {
      res.send(response.rows[0].array_agg);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }
}
