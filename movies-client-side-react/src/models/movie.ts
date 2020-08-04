// Movie Model

export class Movie {
    public constructor(
        public _id ?: string,
        public name ?: string ,
        public category ?: string,
        public rating ?:number | any,
        public fileName?: string,
      
    ) { }
}

