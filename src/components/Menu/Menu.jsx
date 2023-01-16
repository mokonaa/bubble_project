import style from "./Menu.module.css"
import { data } from "../../data/data"
import MenuCategory from "../MenuCategory/MenuCategory"
import ProductCard from "../ProductCard/ProductCard"
import Filter from "../Filter/Filter"
import Cart from "../Cart/Cart"
import LogoBubulle from "../../assets/svg/bu.svg"
import { useState, useEffect } from "react"

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState({ category: "boissons", categoryVariety: "", products: Object.keys(data.catégories["boissons"]).map(categoryVariety => data.catégories["boissons"][categoryVariety]["produits"]).flat() });
    const [selectedFilter, setSelectedFilter] = useState("");

    useEffect(() => {
        if(selectedFilter) setSelectedFilter("");
    }, [selectedCategory.category, selectedCategory.categoryVariety])

    return (
        <div className={style["menu"]}>
            <div className={style["menu-sidebar"]}>
                <div className={style["menu-logo"]}>
                    <img src={LogoBubulle} alt="Logo Bubulle" />
                </div>
                <div className={style["menu-categories-title"]}>Catégories</div>
                <ul className={style["menu-categories"]}>
                    {Object.keys(data.catégories).map((category, i) => <MenuCategory key={i} name={category} categoryVarieties={Object.keys(data.catégories[category])} isActive={selectedCategory.category === category} selectedCategory={selectedCategory} selectCategory={setSelectedCategory} />)}
                </ul>
                <div className={style["menu-signature"]}>Made with ❤️ <br /> by Yolène CONSTABLE, Aline HY & Maria GUY DE FONTGALLAND</div>
            </div>
            <div className={style["menu-gallery"]}>
                {selectedCategory.categoryVariety && (
                    <div className={style["filters-container"]}>
                        {data.catégories[selectedCategory.category][selectedCategory.categoryVariety]["filtres"].map((filterName, i) => <Filter key={i} name={filterName} isActive={selectedFilter === filterName} selectedCategory={selectedCategory} selectFilter={setSelectedFilter} filterProducts={setSelectedCategory} />)}
                    </div>
                )}
                <div className={style["product-cards-container"]}>
                    {selectedCategory.products.map((product, i) => <ProductCard key={i} productDetails={product} />)}
                </div>
                <Cart />
            </div>
        </div>
    )
}
