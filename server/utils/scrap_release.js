const cheerio = require("cheerio");
const axios = require("axios");
async function scrapRelease(link) {
  let releaseDetail = [];
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);
  const wrapper = $(
    ".widget.widget_appmanager_recentpostswidget .listWidget div .appRow"
  );
  for (let i = 0; i < wrapper.length; i++) {
    const element = wrapper[i];
    const release_name = $(element)
      .find("h5.appRowTitle.wrapText.marginZero.block-on-mobile a")
      .text()
      .trim();
    const release_id = $(element)
      .next()
      .first()
      .find("p span.infoSlide-value")
      .first()
      .text()
      .trim();
    const release_date = $(element)
      .next()
      .first()
      .find("p span.infoSlide-value span.datetime_utc")
      .first()
      .text()
      .trim();
    const variant_available = $(element)
      .find("div.appRowVariantTag.wrapText a")
      .text()
      .trim();
    const release_link =
      "https://www.apkmirror.com" +
      $(element)
        .find("h5.appRowTitle.wrapText.marginZero.block-on-mobile a")
        .attr("href");

    releaseDetail.push({
      release_name,
      release_id,
      release_date,
      variant_available,
      release_link,
    });
    releaseDetail = releaseDetail.filter((r) => {
      if (r.release_name.includes("alpha") === false) {
        return r;
      }
    });
    releaseDetail = releaseDetail.filter((r) => {
      if (r.release_name.includes("beta") === false) {
        return r;
      }
    });
  }
  return releaseDetail;
}

module.exports = { scrapRelease };
