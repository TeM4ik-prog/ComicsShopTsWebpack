import { Store } from "./Store"

class Comics {
    private ArWhoPutAside: string[] = []

    private _valueOfSales: number = 0 //кол-во продаж
    constructor(
        private _title: string = "None",//название комикса
        private _artist: string = "None",//ФИО художника/автора
        private _publisher: string = "None",//название издательства комикса
        private _pageCount: number = NaN,//количество страниц
        private _genre: string = "None",//Жанр
        private _year: number = NaN,//год издания
        private _costPrice: number = NaN,//Себестоимость
        private _sellingPrice: number = NaN,//цена для продажи
        private _quantity: number = 0, //кол-во комиксов
    ) {
        if (this.quantity < 0) this._quantity = 0

        Store.NewComics.push(this)
        if (Store.NewComics.length > 9) {
            Store.NewComics.splice(0, Store.NewComics.length - 10)
        }
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get artist(): string {
        return this._artist;
    }
    public set artist(value: string) {
        this._artist = value;
    }

    public get publisher(): string {
        return this._publisher;
    }
    public set publisher(value: string) {
        this._publisher = value;
    }

    public get pageCount(): number {
        return this._pageCount;
    }
    public set pageCount(value: number) {
        this._pageCount = value;
    }

    public get genre(): string {
        return this._genre;
    }
    public set genre(value: string) {
        this._genre = value;
    }

    public get year(): number {
        return this._year;
    }
    public set year(value: number) {
        this._year = value;
    }

    public get costPrice(): number {
        return this._costPrice;
    }
    public set costPrice(value: number) {
        this._costPrice = value;
    }

    public get sellingPrice(): number {
        return this._sellingPrice;
    }
    public set sellingPrice(value: number) {
        this._sellingPrice = value;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    addBuyerName(name: string) {
        this.ArWhoPutAside.push(name)
    }

    ShowArWhoPutAside(): string[] {
        return this.ArWhoPutAside
    }

    public get valueOfSales(): number {
        return this._valueOfSales;
    }
    public set valueOfSales(value: number) {
        this._valueOfSales = value;
    }

    static ShowAllComicsInAllStores(): Comics[] {
        let AllComics: Comics[] = []
        let ArStores: Store[] = Store.ArStores
        for (let i = 0; i < ArStores.length; i++) {
            let ArComics: Comics[] = (ArStores[i]).getAllComics()
            for (let j = 0; j < ArComics.length; j++) {
                AllComics.push(ArComics[j])
            }
        }
        return AllComics
    }

    static ShowMostComicsSales(): Comics[] {
        let ArMostPopular: Comics[] = []
        let AllComics: Comics[] = this.ShowAllComicsInAllStores()

        AllComics.sort((a: Comics, b: Comics) => b.valueOfSales - a.valueOfSales)
        AllComics = AllComics.filter(comic => comic.valueOfSales !== 0);
        ArMostPopular = AllComics.slice(0, 10)

        return ArMostPopular
    }

    static ShowMostPopularArtists() {
        let ArMostPopularArtists: string[] = []
        let ArMostPopularComic: Comics[] = this.ShowMostComicsSales()

        ArMostPopularComic.forEach(el => {
            ArMostPopularArtists.push(el.artist)
        });
        return ArMostPopularArtists
    }

    ShowComicsInfo(): string {
        return `title: ${this._title}\nartist: ${this._artist}\npublisher: ${this._publisher}\npageCount: ${this._pageCount}\ngenre: ${this._genre}\nyear: ${this._year}\ncostPrice: ${this._costPrice}\nsellingPrice: ${this._sellingPrice}\nquantity: ${this._quantity}\nvalueOfSales:${this._valueOfSales}`
    }
}


export { Comics }