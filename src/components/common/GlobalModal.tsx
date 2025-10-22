import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/uiSlice";
import ModalDaisy from "./modalDaisy";
import type { RootState } from "../../redux/store";

const GlobalModal: React.FC = () => {
    const dispatch = useDispatch();
    const { showModal, modalPage } = useSelector((state: RootState) => state.ui);

    const [show, setShow] = useState(false);
    const [page, setPage] = useState<"login" | "register" | null>(null);

    useEffect(() => {
        if (showModal) {
            setPage(modalPage);
            setShow(true);
        }
    }, [showModal, modalPage]);
    console.log("open = " + closeModal().type);
    return (
        <ModalDaisy
            open={show}
            onClose={() => {
                setShow(false); // fade out animation có thể thêm nếu muốn
                dispatch(closeModal()); // update Redux
            }}
            page={page}
        />
    );
};

export default GlobalModal;
