import { Product } from './product.model'

export class Place {
    constructor(
        public closingTime: string,
        public id: string,
        public image: string,
        public openingTime: string,
        public products: Product[],
        public score: number,
        public title: string,
        ) {}
}