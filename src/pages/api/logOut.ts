import API from "@/service/api";
import { useGlobalState } from "@/state";
import { serialize } from "cookie";
import Cookies from "js-cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        res.setHeader('Set-Cookie', [
            serialize('token', '', {
                maxAge: -1,
                path: '/'
            })
        ])
        res.statusCode = 200
        return res.redirect('localhost:3000')
    } catch (err) {
        res.statusCode = 200
        res.json({
            status: 500,
            message: 'Có lỗi xảy ra vui lòng thử lại sau'
        })
    }
}