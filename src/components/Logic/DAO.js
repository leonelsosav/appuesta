import { db, collectionf, queryf, wheref, getDocsf, addDocf, setDocf, docf, getDocf, deleteDocf, orderByf, limitf, updateDocf   } from '../../firebase/Firebase'

const DAO = () => {

    const createItem = async (collection, data) => {
        return await new Promise(async (resolve, reject) => {
            try {
                let docCreated = await addDocf(collectionf(db, collection), data)
                resolve({...data, Id:docCreated.id});
            } catch (error) {
                reject({ error: error });
            }
        });
    };

    const updateItem = async (collection, document, data) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const docRef = docf(db, collection, document.toString());
                await updateDocf(docRef, data);
                resolve({ done: "correct"});
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const deleteItem = async (collection, document) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const deletedDoc = await deleteDocf(docf(db, collection, document.toString()));
                resolve({...deletedDoc.data(), Id: deletedDoc.id});
            } catch (error) {
                reject({ error: error });
            }
        });
    };

    const getById = async (collection, document) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const res = await getDocf(docf(db, collection, document));
                res.exists() ? resolve({...res.data(), Id: res.id}) : resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getAll = async (collection) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const querySnapshot = await getDocsf(collectionf(db, collection));
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push({...doc.data(), Id: doc.id});
                    });
                    resolve(newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getWhere = async(collection, campo, comparacion, valor) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), wheref(campo, comparacion, valor));
                const querySnapshot = await getDocsf(q);
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push({...doc.data(), Id: doc.id});
                    });
                    resolve(newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getWhereWhere = async(collection, campo, comparacion, valor, campo2, comparacion2, valor2) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), wheref(campo, comparacion, valor), wheref(campo2, comparacion2, valor2));
                const querySnapshot = await getDocsf(q);
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push({...doc.data(), Id: doc.id});
                    });
                    resolve(newArr.length === 1 ? newArr[0]: newArr);
                } else resolve({ error: "Vacio" });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    const getOrderByLimit = async(collection, campo, orden, limitNumber) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const q = queryf(collectionf(db, collection), orderByf(campo, orden), limitf(limitNumber));
                const querySnapshot = await getDocsf(q)
                if (!querySnapshot.empty) {
                    let newArr = [];
                    querySnapshot.forEach(doc => {
                        newArr.push({...doc.data(), Id: doc.id});
                    });
                    resolve(newArr.length === 1 ? newArr[0]: newArr);
                } else resolve({ Id: 0 });
            } catch (error) {
                reject({ error: error });
            }
        });
    }

    return {
        createItem, updateItem, deleteItem, getById, getAll, getWhere, getOrderByLimit, getWhereWhere
    }
}

export default DAO
