// File by: Griffin
import React,{useState,useEffect} from "react";
import { db, auth } from "../firebase";
import AdminPanel from "./AdminPanel";

function AdminUI() {
    const currentUser = auth.currentUser;
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        db.collection("administrators").doc(currentUser.uid).onSnapshot((doc) => {
            if (doc.exists) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    }, [currentUser.uid]);
    if (isAdmin) {
        return <AdminPanel />;
    } else {
        return null;
    }
}

export default AdminUI;