import HTTPNotificationHelper from "../../utils/HTTPNotificationHelper";
import axios from "axios";
import {api_helper} from "../../utils/api_helper";

const addVisitorProductToCart = ({title, id, quantity, product, size_id, size_value}) => {
    const add = async () => {
        let productsInCart = JSON.parse(localStorage.getItem("visitorCartProducts"));
        const foundItem = productsInCart.find(item => {
            return (item.id || item.product_id) === id && item.size_id === size_id
        });

        HTTPNotificationHelper({
            httpStatus: 201,
            title: "Sepete eklendi",
            message: title + " sepete eklendi"
        })

        if (foundItem) {
            foundItem.quantity += quantity
        } else {
            product.quantity = quantity
            product.size_id = size_id
            product.size_value = size_value
            productsInCart.push(product)
        }

        await localStorage.setItem("visitorCartProducts", JSON.stringify(productsInCart))
    }

    add()
}

const addVisitorProductToCartIfNotExists = ({title, id, quantity, size_id, size_value}) => {
    const add = async () => {
        let productsInCart = JSON.parse(localStorage.getItem("visitorCartProducts"));
        const foundItem = productsInCart.some(item => {
            return (item.id || item.product_id) === id && item.size_id === size_id
        });

        if (foundItem) {
            HTTPNotificationHelper({
                title: "Ürün zaten sepetinizde",
                httpStatus: 409,
            })
        } else {
            HTTPNotificationHelper({
                httpStatus: 201,
                title: "Sepete eklendi",
                message: title + " sepete eklendi"
            })
            productsInCart.push({
                id: id,
                quantity: quantity,
                size_id: size_id,
                size_value: size_value
            })
            await localStorage.setItem("visitorCartProducts", JSON.stringify(productsInCart))
        }
    }

    add()
}


const updateVisitorProductCart = ({id, quantity, selectedSize, title}) => {
    const update = async () => {
        let productsInCart = JSON.parse(localStorage.getItem("visitorCartProducts"));

        let found = false;
        productsInCart.map(item => {
            if ((item.id || item.product_id) === id) {
                item.quantity += quantity
                found = true
            }
            return item
        });
        if (!found) {
            productsInCart.push({
                id: id,
                quantity: quantity,
                selectedSize: selectedSize
            })
        }

        await localStorage.setItem("visitorCartProducts", JSON.stringify(productsInCart))

        HTTPNotificationHelper({
            httpStatus: 201,
            title: "Sepete eklendi",
            message: title + " sepete eklendi"
        })
    }

    update()
}

const syncVisitorCartProductsToLoggedInUserCartProducts = async ({cartProducts, secret}) => {
    await axios.post(api_helper.api_url + api_helper.carts.sync, {
        products: cartProducts
    }, {
        headers: {
            "Authorization": `Bearer ${secret}`,
        }
    }).then(async res => {
    }).catch(error => {
    })
}

const getVisitorCartProducts = async ({cartProducts, setProducts}) => {
    const cartProductsLocal = JSON.parse(cartProducts)

    if (cartProductsLocal.length) {
        await axios.post(api_helper.api_url + api_helper.carts.visitor_products, {
            products: cartProductsLocal
        }).then(async res => {
            const mapped = res.data.data.map((product) => {
                product.product_id = product.id
                return product
            })
            await setProducts(mapped)
        }).catch(error => {
            console.log("error getting visitor cart products", error)
        })
    }
}

export {
    addVisitorProductToCart,
    updateVisitorProductCart,
    syncVisitorCartProductsToLoggedInUserCartProducts,
    getVisitorCartProducts,
    addVisitorProductToCartIfNotExists
}