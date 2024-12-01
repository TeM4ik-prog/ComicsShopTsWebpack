import { Store } from "./comicsStore.ts/Store";
import { Comics } from "./comicsStore.ts/comics";
import { comic_info } from "./pattern/comicInfo";

function randInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1))
}

function SetOptionShop(array: Store[], select?: HTMLElement) {
    if (!select) return

    for (let i = 0; i < array.length; i++) {
        let option: HTMLOptionElement = document.createElement("option")
        option.value = array[i].name
        option.innerText = array[i].name

        select.appendChild(option)
    }
}

function ShowComicsInStore(array: Comics[] | string[], needStore?: Store) {
    let container: HTMLElement | null = document.querySelector("#container")
    if (!container) return

    for (let i = 0; i < array.length; i++) {
        let htmlInfo: string = ''
        if (Array.isArray(array) && array[0] instanceof Comics) {
            htmlInfo = comic_info.replace('{{info}}', (array[i] as Comics).ShowComicsInfo())
        }
        else if (Array.isArray(array) && typeof array[0] == "string") {
            htmlInfo = comic_info.replace('{{info}}', String(array[i]))
        }
        if (!htmlInfo) return

        let fragment = (document.createRange()).createContextualFragment(htmlInfo)//магия 

        let button_buy: HTMLElement | null = fragment.querySelector(".buy")
        let button_reserve: HTMLElement | null = fragment.querySelector(".reserve")
        let input_reserve: HTMLInputElement | null = (fragment.querySelector(".input_reserve"))
        let button_delete: HTMLInputElement | null = (fragment.querySelector(".delete"))


        if (!input_reserve || !button_reserve || !button_buy || !button_delete) return

        let comic: Comics = array[i] as Comics
        if (needStore) {
            button_buy.addEventListener("click", () => alert(needStore.sellComic(comic)))
            button_reserve.addEventListener("click", () => alert(needStore.setAsideForBuyer(comic, String(input_reserve?.value))))
            button_delete.addEventListener("click", () => alert(needStore.removeComic(comic)))
        }
        else {
            input_reserve.style.display = "none"
            button_reserve.style.display = "none"
            button_buy.style.display = "none"
            button_delete.style.display = "none"
        }
        container.appendChild(fragment)
    }
}

function clearContainerInfo(): void {
    let container: HTMLElement | null = document.querySelector("#container")
    if (!container) return
    container.innerHTML = ''
}

function generateRandomComics(): Comics {
    const titles = ["Spider-Man", "Batman", "Superman", "Wonder Woman", "Iron Man"];
    const artists = ["John Doe", "Jane Doe", "Alex Smith", "Emily Johnson", "Michael Brown"];
    const publishers = ["Marvel", "DC Comics", "Image Comics", "Dark Horse Comics"];
    const genres = ["Superhero", "Fantasy", "Sci-Fi", "Mystery", "Adventure"];

    const title = titles[randInt(0, titles.length - 1)];
    const artist = artists[randInt(0, artists.length - 1)];
    const publisher = publishers[randInt(0, publishers.length - 1)];
    const genre = genres[randInt(0, genres.length - 1)];

    const costPrice = Number((Math.random() * 50 + 5).toFixed(2));
    const sellingPrice = Number((costPrice * (Math.random() * 0.5 + 1.5)).toFixed(2));

    return new Comics(title, artist, publisher, randInt(10, 1000), genre, randInt(1900, 2024), costPrice, sellingPrice, randInt(1, 10));
}

function ShowAllMyAside(buyerName: string): void {
    let ArMyAside: Comics[] = []
    let AllStores = Store.ArStores
    for (let i = 0; i < AllStores.length; i++) {
        let comics_in_store: Comics[] = AllStores[i].getAllComics()
        for (let j = 0; j < comics_in_store.length; j++) {
            let comicCl: Comics = comics_in_store[j]
            if (comicCl.ShowArWhoPutAside().includes(String(buyerName))) {
                ArMyAside.push(comicCl)
            }
        }
    }
    ShowResult(ArMyAside)
}

function AlertNotFound(): void {
    alert("К сожалению комиксов с такими параметрами в этом магазине нет")
}

function ShowResult(filtred_comics: Comics[] | string[], needStore?: Store) {
    clearContainerInfo()
    ShowComicsInStore(filtred_comics, needStore)
}






function FilterComics(ArStores: Store[]): void {
    let InpSelect_shop: HTMLOptionElement | null = document.querySelector("#select_shop")
    let InpTitle: HTMLInputElement | null = document.querySelector("#title")
    let InpArtist: HTMLInputElement | null = document.querySelector("#artist")
    let InpGenre: HTMLInputElement | null = document.querySelector("#genre")

    if (!InpSelect_shop || !InpTitle || !InpArtist || !InpGenre) return

    let store: Store | undefined = ArStores.find(el => el.name === InpSelect_shop?.value)
    if (!store) return


    //по хорошему передавать массив/объект тех параметров, по которым идет фильтрация, но так тоже можно:
    let filtred_comics: Comics[] | false
    filtred_comics = store.showComicByProperties(store.getAllComics(), "title", (InpTitle.value))
    if (!filtred_comics) return AlertNotFound()

    filtred_comics = store.showComicByProperties(filtred_comics, "artist", (InpArtist.value))
    if (!filtred_comics) return AlertNotFound()

    filtred_comics = store.showComicByProperties(filtred_comics, "genre", (InpGenre.value))
    if (!filtred_comics) return AlertNotFound()

    //и тд.

    ShowResult(filtred_comics, store)
}


export {
    SetOptionShop,
    ShowComicsInStore,
    generateRandomComics,
    ShowResult,
    randInt,
    FilterComics,
    ShowAllMyAside
}