import DataSourceRepository from '../repositories/DataSourceRespository';

class TestResourceController extends Bases.BaseController {

    constructor() {
        super();
        this.dataSourceRepository = new DataSourceRepository();
    }

    index() {
        return async (req, res) => {
            let a = await this.dataSourceRepository.index();
            res.send(a);
        }
    }

    show() {
        return async (req, res) => {
            let a = await this.dataSourceRepository.show(req.params.id);
            res.send(a);
        }
    }

    store() {
        return async (req, res) => {
            let a = await this.dataSourceRepository.store(req.body);
            res.send(a);
        }
    }

    update() {
        return async (req, res) => {
            let a = await this.dataSourceRepository.update(req.params.id, req.body);
            res.send(a);
        }
    }


    destroy() {
        return async (req, res) => {
            let a = await this.dataSourceRepository.delete(req.params.id);
            res.send(a);
        }
    }

}

export default TestResourceController;