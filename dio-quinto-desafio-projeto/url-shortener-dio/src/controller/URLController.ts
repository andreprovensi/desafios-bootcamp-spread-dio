import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortId from 'shortid';
import { URLModel } from '../database/model/URL'


export class URLController {

	public async shorten(req: Request, res: Response): Promise<void> {
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {
			res.json(url)
			return
		}
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		res.json(newURL)
	}

    public async redirect(req: Request, response: Response): Promise<void> {
        // Get URL hash
        const {hash} = req.params
        //Find original URL by hash
        const url = {
            originURL:"https://cloud.mongodb.com/v2/62b8b382162de96559a683b5#clusters",
            hash: "D9VliETP0",
            shortURL: "http://localhost:5000/D9VliETP0"
        }
        // Redirect to original URL from what was found in DB
        response.redirect(url.originURL)
    }
}