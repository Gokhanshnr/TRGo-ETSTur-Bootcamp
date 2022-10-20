import axios from 'axios'
import { IComment } from './models/IComment'
import { ILocation } from './models/ILocation'
import { ILogin } from './models/ILogin'
import { IOrder } from './models/IOrder'
import { IPicture } from './models/IPicture'
import { IProduct } from './models/IProduct'
import { IProductSimple } from './models/IProductSimple'
import { IProductSingle } from './models/IProductSingle'
import { IRegister } from './models/IRegister'
import { ITaxonomy } from './models/ITaxonomy'
import { ITotal } from './models/ITotal'
import { IUser } from './models/IUser'
import { IUserList } from './models/IUserList'



const baseURL = 'http://localhost:8085/'



const config = axios.create({
    baseURL: baseURL

})

const configJwt = () => {
    const data = sessionStorage.getItem('data')
    const datao: ILogin = JSON.parse(data!)

    const token = "Bearer ".concat(datao.JWT!)
    console.log(token)
    return (axios.create({
        baseURL: baseURL,

        headers: {

            Authorization: token

        }
    }))

}

export const customerRegister = (name: string, surname: string, email: string, password: string) => {

    const sendParams = {
        email: email,
        enabled: true,
        firstName: name,
        lastName: surname,
        password: password,
        roles: [{ "id": 2 }],
        tokenExpired: true
    }

    return config.post<IRegister>('user/register', sendParams)

}


//Kullanıcı Giriş
export const userLogin = (username: string, password: string) => {

    const sendParams = {
        username: username,
        password: password
    }

    return config.post<ILogin>('user/auth', sendParams)

}

/* ##Taxonomy## */

//Taxonomi Listesi
export const taxonomyList = () => {
    return config.get<ITaxonomy>("taxonomy/list")
}

export const addTaxonomy = (name: string, description: string) => {

    const sendParams = {
        name: name,
        description: description
    }

    return configJwt().post<any>('taxonomy/add', sendParams)

}


//Taxonomi Sil
export const taxonomyDelete = (id: number) => {
    return configJwt().delete("taxonomy/delete?id=" + id)
}

/* --Taxonomy-- */


/*##LOKASYON##*/
//Lokasyon sil
export const locationDelete = (id: number) => {
    return configJwt().delete("location/delete?id=" + id)
}

//Lokasyon Listele
export const locationList = () => {
    return config.get<ILocation>("location/list")
}

//Lokasyon Ekle

export const addLocation = (city: string, district: string) => {

    const sendParams = {
        city: city,
        district: district
    }

    return configJwt().post<ILocation>('location/add', sendParams)

}

/*--LOKASYON--*/

/* ##PRODUCT## */

//Ürün Listele
export const productList = () => {
    return config.get<IProduct>("product/list")
}

//Ürün Detay
export const getProduct = (id: number) => {
    return config.get<IProductSingle>("/product/get?id=" + id)
}


/* --PRODUCT-- */

/* ##Comment## */

export const commentList = (id: number) => {
    return config.get<IComment>("/comment/product/list?pid=" + id)
}


export const addComment = (comment: string, proid: string) => {

    const sendParams = {
        comment: comment,
        proid: proid,
        rating: 5
    }

    return configJwt().post<any>('comment/add', sendParams)

}


/* --Comment-- */

/* ##Profile## */

export const updateUser = (firstName: string, lastName: string,email: string) => {

    return configJwt().put<any>('/user/update?firstName='+firstName+'&lastName='+lastName+'&email='+email)

}

export const updatePassword = (oldPass: string, newPass: string) => {

    return configJwt().put<any>('/user/changepassword?oldPassword='+oldPass+'&newPassword='+newPass)

}

export const getUser = (email: string) => {
    return configJwt().get<IUser>("/user/getuser?username=" + email)
}


/* --Profile-- */

/* ##Order## */

export const getOrderList = () => {
    return configJwt().get<IOrder>("/order/list/user")
}

export const addOrder = (person: number, roomId:number,start_date:string, end_date:string) => {

    const sendParams = {
        person: person,
        price: 3000,
        room: { room_id : roomId },
        startDate: start_date,
        endDate: end_date,
        user: { id : 0 }
    }

    return configJwt().post<any>('order/add', sendParams)

}

export const orderDelete= (orderId:number) => {
    return configJwt().delete<any>("/order/delete?id="+orderId)
}

/* --Order-- */

/* ##Admin Otels## */

export const getOtelList = () => {
    return configJwt().get<IProductSimple>("product/list/basic")
}


export const addOtel = (otelName: string, description:string, id:string, starRatings:string, arrPictures:any,arrTaxonomies:any) => {

    const sendParams = {
        otel_name: otelName,
        description: description,
        location: { lid : id },
        pictures: arrPictures,
        star_ratings: starRatings,
        taxonomies: arrTaxonomies
    }

    return configJwt().post<any>('product/add', sendParams)

}


export const addRoom = (roomName: string, description:string, bed:string, price:string, arrPictures:any,productId:string,quantity:string) => {

    const sendParams = {
        name: roomName,
        description: description,
        bed: bed,
        pictures: arrPictures,
        price: price,
        product_id: productId,
        quantity: quantity
    }

    return configJwt().post<any>('room/add', sendParams)

}

export const getTotal= () => {
    return configJwt().get<ITotal>("user/total")
}


export const getUserList= () => {
    return configJwt().get<IUserList>("user/list")
}


/* --Admin Otels-- */

/* ##Picture## */

export const addPicture = (file: string) => {

    const sendParams = {
        file: file
    }

    return configJwt().post<IPicture>('image/add', sendParams)

}

/* --Picture-- */