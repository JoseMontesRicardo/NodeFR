class KellyModel extends Bases.BaseModelMongorito {

    constructor(data = {}) {
        super(data);
    }

    get connection () {
        return 'connection2';
    }
}

export default KellyModel;

