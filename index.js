const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 8000;
const URL = `https://www.theguardian.com/uk`;

const articles = [];

axios(URL)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.fc-item__title', html).each(function () {
      const category = $(this).find('.fc-item__kicker').text().trim();
      const title = $(this).find('.fc-item__headline').text().trim();
      const link = $(this).find('a').attr('href').trim();

      articles.push({
        category,
        title,
        link,
      });
    });
  })
  .catch((err) => console.error(err));

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get('*', (req, res) => {
  res.json(articles);
});
