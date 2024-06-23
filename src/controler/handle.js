import { getMeaning } from "../helper/scrape.js";


export const getResponse = async (req, res) => {
        const { word } = req.params;
        try {
            const meaning = await getMeaning(word);

            console.log(meaning);
            res.json({ success: true, results: { word, meaning } });
        } catch (error) {
            res.status(500).json({ success: false, error: "Error fetching data" });
        }
    };
