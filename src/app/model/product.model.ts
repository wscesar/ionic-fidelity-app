export class Product {
    constructor(
        public title: string,
        public score: number,
        public image: string,
        public id?: string,
        public restaurant?: string
    ) {}
  }
  