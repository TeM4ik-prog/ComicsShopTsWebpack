console.clear()
import { Store } from "./comicsStore.ts/Store";
import { Comics } from "./comicsStore.ts/comics";
import { FilterComics, SetOptionShop, ShowAllMyAside, ShowComicsInStore, ShowResult, generateRandomComics, randInt } from "./helper";


//магазинов может быть хоть бесконечность
for (let i = 0; i < randInt(5, 13); i++) {
    let comicsStore = new Store("Store" + (i + 1))
    for (let j = 0; j < randInt(5, 13); j++) {
        comicsStore.addComic(generateRandomComics())
    }
}

let butt: HTMLElement | null = document.querySelector("#result")
butt?.addEventListener("click", () => FilterComics(Store.ArStores))



let MyReserved: HTMLInputElement | null = document.querySelector("#inp_Myreserved")
let butt_serv: HTMLElement | null = document.querySelector("#reserved")
butt_serv?.addEventListener("click", () => ShowAllMyAside(String(MyReserved?.value)))



let addComic: HTMLElement | null = document.querySelector("#add_comic")
let addComic_screen: HTMLFormElement | null = document.querySelector("#containerAddComic")


addComic?.addEventListener("click", () => {
    if (!addComic_screen) return
    addComic_screen.style.display = "flex"

    document.addEventListener("keydown", (e) => {
        if (!addComic_screen) return
        if (e.keyCode == 27) {
            addComic_screen.style.display = "none"
        }
    })
})


let button_addComic: HTMLElement | null = document.querySelector("#add_comic_butt")
button_addComic?.addEventListener("click", (e) => {
    e.preventDefault()
    let InpSelect_shop: HTMLOptionElement | null = document.querySelector("#containerAddComic #select_shop")


    if (!addComic_screen) return
    const formData = new FormData(addComic_screen)

    let formObject: { [key: string]: string } = {}
    formData.forEach(function (value: any, key: any) {
        formObject[key] = value
    });


    let { artist, costPrice, genre, pageCount, publisher, quantity, sellingPrice, title, year } = formObject
    let store: Store | undefined = (Store.ArStores).find(el => el.name == InpSelect_shop?.value)
    let NewComic: Comics = new Comics(title, artist, publisher, Number(pageCount), genre, Number(year), Number(costPrice), Number(sellingPrice), Number(quantity))

    store?.addComic(NewComic)
})


let button_showNewComics: HTMLElement | null = document.querySelector("#show_new_comics")
button_showNewComics?.addEventListener("click", () => {
    ShowResult(Store.ShowNewComics())
})


let button_showNMostSales: HTMLElement | null = document.querySelector("#MostSales")
button_showNMostSales?.addEventListener("click", () => {
    ShowResult(Comics.ShowMostComicsSales())
})


let button_showNMostPopAutors: HTMLElement | null = document.querySelector("#MostPopArtist")

button_showNMostPopAutors?.addEventListener("click", () => {
    ShowResult(Comics.ShowMostPopularArtists())
})


let selec1: HTMLElement | null = document.querySelector("#select_shop")
let selec2: HTMLElement | null = document.querySelector("#containerAddComic #select_shop")

console.log(selec1, selec2)


if (selec1 && selec2) {
    SetOptionShop(Store.ArStores, selec1)
    SetOptionShop(Store.ArStores, selec2)
}





setInterval(() => {
    console.clear()
    console.log(Comics.ShowAllComicsInAllStores())
}, 5000)




