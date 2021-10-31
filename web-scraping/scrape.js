const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');
const got = require('got');

function callback()
{
    console.log("job completed")
}

// request('https://stemchats1.createsend.com/campaigns/reports/viewCampaign.aspx?d=t&c=9D48DA2F8213BDDE&ID=2999BD115C61677B2540EF23F30FEDED&temp=False&tx=0&source=SnapshotHtml', (error, response, html) => {
//     if(!error && response.statusCode == 200)
//     {
//         //console.log(html);
//         fs.writeFile('page.html', html, callback)
//         // const siteHeading = $('.layout_inner');

//         // console.log(siteHeading.text())
//     }
// });

const editionURL= 'https://stemchats1.createsend.com/t/ViewEmail/t/CC5B48597780665A2540EF23F30FEDED/C67FD2F38AC4859C/?tx=0&previewAll=1&print=1&source=PrintPreview&context=BE1559E32AC7F640D744A813E2B67A32';

got(editionURL).then(response => {
  const $ = cheerio.load(response.body);
  fs.writeFile('page.html', $.html(), callback)
}).catch(err => {
  console.log(err);
});
