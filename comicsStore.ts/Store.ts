import { Comics } from "./comics";

class Store {
    static ArStores: Store[] = []
    static NewComics: Comics[] = []
    private Ar_comics: Comics[] = []

    constructor(
        public name: string
    ) {
        Store.ArStores.push(this)
    }


    static ShowNewComics(): Comics[] {
        return Store.NewComics
    }

    getAllComics(): Comics[] {
        return this.Ar_comics
    }

    addComic(comic: Comics): string {
        if (!this.Ar_comics.includes(comic)) {
            this.Ar_comics.push(comic)
            return "Комикс добавлен"
        }
        return "Этот комикс уже добавлен"
    }

    ShowIndex(comic: Comics): { in_all: number, in_new: number, isAllExists: boolean } {
        let in_all = this.Ar_comics.indexOf(comic)
        let in_new = Store.NewComics.indexOf(comic)
        let isAllExists: boolean = false
        if (in_all !== -1 && in_new !== -1) isAllExists = true

        return { in_all, in_new, isAllExists }
    }

    removeComic(comic: Comics): string {
        let { in_all, in_new, isAllExists } = this.ShowIndex(comic)

        if (isAllExists) {
            this.Ar_comics.splice(in_all, 1)
            Store.NewComics.splice(in_new, 1)
            return "Удалено"
        }
        return "В магазине нет такого комикса"
    }

    sellComic(comic: Comics): string {
        if (this.ShowIndex(comic).isAllExists) {
            if (comic.quantity > 0) {
                comic.quantity--
                comic.valueOfSales++
                return "Операция прошла успешно"
            }
            else {
                return "Комикса нет в продаже или он был снят!"
            }
        }
        return "В магазине нет такого комикса"
    }

    writeOffComic(comic: Comics): string {
        if (this.ShowIndex(comic).isAllExists) {
            comic.quantity = 0;
            return "Списано"
        }
        return "В магазине нет такого комикса"
    }

    addDiscount(comic: Comics, discount: number): string {
        if (discount > 100 || discount <= 0 || !this.ShowIndex(comic).isAllExists || !comic.sellingPrice) {
            return "Некорректная скидка или комикса нет"
        }

        comic.sellingPrice -= (comic.sellingPrice * discount / 100)
        return `Скидка ${discount}% применина`
    }


    showComicByProperties(array: Comics[], property: keyof Comics, value: string | number): Comics[] | false {
        let comic: Comics[] | undefined = array.filter(
            el => (String(el[property]).toLowerCase()).includes(String(value).toLowerCase()))
        if (!comic || comic.length == 0) return false
        return comic
    }

    setAsideForBuyer(comic: Comics, buyerName: string): string {
        if (!this.ShowIndex(comic).isAllExists) return "В этом магазине нет такого комикса";
        if (comic.quantity <= 0) return "Нет в продаже";
        if ((comic.ShowArWhoPutAside().includes(buyerName))) return "Этот комикс уже забронирован вами";

        comic.quantity--
        comic.addBuyerName(buyerName)
        return "Забронировано"
    }

    public ShowStores(): Store[] {
        return Store.ArStores
    }
}



export { Store }