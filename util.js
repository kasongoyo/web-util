(() => {
    'use strict';

    module.exports = {

        /**
         * 
         * This function takes in user query and parse it 
         * to create mongo friendly query conditions
         * 
         * @param {Object} { query }
         *      query ~ query object to parse 
         * @returns {Object} {conditions, fields}
         *      conditions ~ query conditions
         *      fields ~ query fields to select  
         */
        parseQuery({ query }) {
            if (!query || !Object.keys(query).length) {
                return {};
            }

            let conditions = {};
            let fields;
            //if there is the query
            Object.keys(query).forEach(key => {
                if (key !== 'fields' && !Array.isArray(query[key])) {
                    //key is not fields and is not array
                    if (key === 'id') {
                        //Mongo Id must prefixed with underscore
                        conditions._id = query[key];
                        return;
                    }
                    conditions[key] = query[key];
                    return;
                }
                if (key !== 'fields' && Array.isArray(query[key])) {
                    //key is not fields and is an array
                    if (key === 'id') {
                        conditions._id = { '$in': query[key] };
                        return;
                    }
                    conditions[key] = { '$in': query[key] };
                    return;
                }
                if (key === 'fields') {
                    //key is fields and it's value is comma separated
                    fields = query[key].replace(/,/g, ' ');
                }
            });

            return { conditions, fields };
        }
    };
})();