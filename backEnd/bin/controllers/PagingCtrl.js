"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PagingCtrl {
    static paging(Model, type, search = {}, query, field) {
        if (!query.sort) {
            query.sort = {};
            query.sort[field] = 1;
        }
        else
            query.sort = JSON.parse(query.sort);
        query.page = JSON.parse(query.page);
        if (query.page.search)
            search[field] = { $regex: new RegExp(query.page.search, 'i') };
        return new Promise((resolve, reject) => {
            Model[type](search, (err, data) => {
                if (err)
                    reject(err);
                else {
                    Model[type](search).count((err2, count) => {
                        // get count
                        if (err2)
                            reject(err2);
                        else {
                            resolve({ count: count, list: data });
                        }
                    });
                }
            }).sort(query.sort).skip(query.page.offset * query.page.limit).limit(query.page.limit);
        });
    }
}
exports.default = PagingCtrl;
