import { Nome } from './Nome'
export class Emprestimo extends Nome
 {
    constructor() {
        super();
    }

    id: number;
    idjogo: number;
    idamigo: number;
    dataEmprestimo: Date;

}
