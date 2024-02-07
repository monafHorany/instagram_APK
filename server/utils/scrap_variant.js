const cheerio = require("cheerio");
const axios = require("axios");
async function scrapVariant(id, link) {
  let variantDetail = [];
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);
  const wrapper = $(
    "div.table.topmargin.variants-table .table-row.headerFont"
  ).slice(1);
  for (let i = 0; i < wrapper.length; i++) {
    const element = wrapper[i];
    const variant_id = $(element)
      .first()
      .find("span.colorLightBlack")
      .first()
      .text()
      .trim();
    const variant_name = $(element)
      .find(
        "div.table-cell.rowheight.addseparator.expand.pad.dowrap a.accent_color"
      )
      .first()
      .text()
      .trim()
      .trim();
    const variant_date = $(element)
      .first()
      .find("span.colorLightBlack span.dateyear_utc")
      .first()
      .text()
      .trim();
    const download_link =
      "https://www.apkmirror.com" +
      $(element)
        .find(
          "div.table-cell.rowheight.addseparator.expand.pad.dowrap a.accent_color"
        )
        .attr("href");
    const architecture = $(element)
      .find("div.table-cell.rowheight.addseparator.expand.pad.dowrap")
      .slice(1)
      .first()
      .text()
      .trim();
    const minimum_version = $(element)
      .find("div.table-cell.rowheight.addseparator.expand.pad.dowrap")
      .slice(2)
      .first()
      .text()
      .trim();
    const screen_dPI = $(element)
      .find("div.table-cell.rowheight.addseparator.expand.pad.dowrap")
      .slice(3)
      .first()
      .text()
      .trim();
    variantDetail.push({
      variant_id,
      variant_name,
      variant_date,
      download_link,
      architecture,
      minimum_version,
      screen_dPI,
      releaseId: id,
    });
  }
  return variantDetail;
}

module.exports = { scrapVariant };
