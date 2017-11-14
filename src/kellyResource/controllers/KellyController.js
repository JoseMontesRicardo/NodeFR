import KellyRepository from '../repositories/KellyRepository';

class KellyController extends Bases.BaseController {

    constructor() {
        super();
        this.kellyRepository = new KellyRepository();
    }

    index() {
        return async (req, res) => {
            let a = await this.kellyRepository.index();
            res.send(a);
        }
    }

    show() {
        return async (req, res) => {
            let a = await this.kellyRepository.show(req.params.id);
            res.send(a);
        }
    }

    store() {
        return async (req, res) => {
            let a = await this.kellyRepository.store(req.body);
            res.send(a);
        }
    }

    update() {
        return async (req, res) => {
            let a = await this.kellyRepository.update(req.params.id, req.body);
            res.send(a);
        }
    }


    destroy() {
        return async (req, res) => {
            let a = await this.kellyRepository.delete(req.params.id);
            res.send(a);
        }
    }

}

export default KellyController;

