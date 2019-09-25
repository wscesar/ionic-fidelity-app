export class Place {
    constructor(
        public id: string,
        public title: string,
        public image: string,
        public openingTime: string,
        public closingTime: string,
        public score: number
    ) {}
}