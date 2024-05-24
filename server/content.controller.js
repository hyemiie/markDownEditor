const { marked } = require("marked");

const getText = (req, res) => {
    const { he } = req.body;
    console.log("userInput", he);

    // Convert markdown to HTML
    const html = marked(he);
console.log(html)
res.status(200).json({ html });
};

module.exports = { getText };