const fs = require('fs')
const base64 = require('base-64')
const utf8 = require('utf8')
const path = require('path')

class Ranks_of_pic {
    constructor() {}
    /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    deleteItem(req, res, next) {
        let email = JSON.parse(base64.decode(utf8.decode(req.cookies.auth)))

        let filename = JSON.parse(req.query.q)

        fs.unlink(
            path.join(
                __dirname,
                '..',
                'database',
                'accounts',
                email.email,
                'storage',
                filename.filename + '.json',
            ),
            err => {
                if (err) {
                    res.send({ del: false })
                    throw err
                }

                fs.unlink(
                    path.join(
                        __dirname,
                        '..',
                        'database',
                        'storage',
                        filename.filename,
                    ),
                    err => {
                        if (err) {
                            res.send({ del: false })
                            throw err
                        }

                        res.send({ del: true })
                    },
                )
            },
        )
    }
}
exports.deletePic = new Ranks_of_pic()
