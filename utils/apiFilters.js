class APIFilters {
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name :{
                $regex: this.queryStr.keyword,
                $options: 'i',
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };

        // Fields to remove
        const fieldsToRemove = ['keyword'];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);

        // Advance filter for price, ratings, etc.
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

export default APIFilters;