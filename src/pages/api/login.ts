import API from "@/service/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    
    const method = req.method
    if (method !== "POST") {
        res.statusCode = 200,
        res.json({
            status: 500,
            msg: "Không được"
        })
    }
    const data = req.body;
    try {
        const response = await API.callJson('/jwt-auth/v1/token', data, 'POST')
        const currentTime = new Date()
        const nextYear = new Date(currentTime.getFullYear() + 1, currentTime.getMonth())
        if (response.token) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('X-token', 'value fadfd dtrr')
            res.setHeader('Set-Cookie', `token=${response.token}; expires=${nextYear.toUTCString()};Path=/`)
            res.json(response)
        } else {
            res.statusCode = 200;
            console.log(response);
            res.json(response)
        }
    } catch (err) {
        res.statusCode = 200
        res.json({
            status: 500,
        })
        console.log(err);
    }
}