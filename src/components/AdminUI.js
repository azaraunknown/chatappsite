import React,{useState,useEffect} from "react";
import { db, auth } from "../firebase";
import AdminPanel from "./AdminPanel";

function AdminUI() {
    const currentUser = auth.currentUser;
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        db.collection("administrators").doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    }, []);
    if (isAdmin) {
        return <AdminPanel />;
    } else {
        return null;
    }
}

export default AdminUI;