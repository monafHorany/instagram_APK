const asyncHandler = require("express-async-handler");
const release = require("../models/release");
const variant = require("../models/variants");
const { scrapRelease } = require("../utils/scrap_release");
const { scrapVariant } = require("../utils/scrap_variant");

const releases = asyncHandler(async (req, res, next) => {
  var resultRelease = [];
  var resultVariant = [];
  await release.deleteMany({});
  await variant.deleteMany({});
  resultRelease.push(
    await scrapRelease(
      "https://www.apkmirror.com/uploads/?appcategory=instagram-instagram"
    )
  );
  let page_num = 2;
  try {
    while (resultRelease.flat().length < 10) {
      resultRelease.push(
        await scrapRelease(
          `https://www.apkmirror.com/uploads/page/${page_num}/?appcategory=instagram-instagram`
        )
      );
      page_num++;
    }
    const result = await release.insertMany(resultRelease.flat().slice(0, 10));

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      resultVariant = [];
      resultVariant.push(await scrapVariant(element._id, element.release_link));
      await variant.insertMany(resultVariant.flat());
    }
    return res.status(201).send("All Releases Refreshed");
  } catch (error) {
    return res.status(500).send(error);
  }
});

exports.releases = releases;
