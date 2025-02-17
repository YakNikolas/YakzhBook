
export interface IBook {
    title: string,
    subtitle: string,
    isbn13: string,
    price: string,
    image: string,
    url: string,
    count?:number
};

export interface Iisbn13Book {
    error: string,
    title: string,
    subtitle: string,
    authors: string,
    publisher: string,
    language: string,
    isbn10: string,
    isbn13: string,
    pages: string,
    year: string,
    rating: string,
    desc: string,
    image: string,
    url: string,
    pdf: any,
    count?:number
}