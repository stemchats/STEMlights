const request = require('request')
const cheerio = require('cheerio')

request('https://stemchats1.createsend.com/campaigns/reports/viewCampaign.aspx?d=t&c=9D48DA2F8213BDDE&ID=2999BD115C61677B2540EF23F30FEDED&temp=False&tx=0&source=SnapshotHtml', (error, response, html) => {
    if(!error && response.statusCode == 200)
    {
        console.log(html);
        // const siteHeading = $('.layout_inner');

        // console.log(siteHeading.text())
    }
});
