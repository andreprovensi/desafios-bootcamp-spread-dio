import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortId from 'shortid';


export class URLController {

    public async shorten(req: Request, response: Response):Promise <void>{
        // Check if URL already exists
        // Create the hash for the URL
        const {originURL} = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Save URL in database
        // Return saved URLS
        response.json({originURL,hash,shortURL})
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